import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { MessageAlert } from "../../Components/MessageAlert";
import { CustomLoader } from "../../Components/CustomLoader";
import { useNotificationHandling } from "../../Components/useNotificationHandling ";
import { CustomPagination } from "../../Components/CustomPagination";
import CustomerServices from "../../services/CustomerService";
import { Popup } from "../../Components/Popup";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import CustomTextField from "../../Components/CustomTextField";

export const MasterCustomerVisitList = () => {
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [assign, setAssign] = useState("");
  const [plannedDate, setPlannedDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const data = useSelector((state) => state.auth);
  const userData = data.profile;
  const assigned = userData.active_sales_user || [];
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const getAllCompanyDetails = useCallback(async () => {
    try {
      setOpen(true);
      const response = await CustomerServices.getAllCustomerMasterList(
        currentPage
      );
      setCompanyData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
      setOpen(false);
    } catch (error) {
      handleError(error);
      console.log("while getting company details", error);
    } finally {
      setOpen(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllCompanyDetails();
  }, [getAllCompanyDetails]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // handle selected company id
  const handleCheckboxChange = (id) => {
    setSelectedCustomer((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const Tableheaders = useMemo(() => ["CHECKBOX", "NAME", "CITY", "STATE"], []);

  //open modal

  const HandleOpenModal = (item) => {
    setSelectedCustomer(item);
    setModalOpen(true);
  };
  //assign to sales person

  const updateAssigned = async (e) => {
    console.log(e);
    try {
      setOpen(true);
      const req = {
        customer_list: selectedCustomer,
        visited_by: assign,
        planned_date: plannedDate,
      };
      console.log(req);
      const response = await CustomerServices.createCustomerVisitPlan(req);
      const successMessage = response.data.message;
      handleSuccess(successMessage);

      setTimeout(() => {
        setModalOpen(false);
        setSelectedCustomer([]);
      }, 300);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />
      <div>
        <div
          style={{
            padding: "16px",
            margin: "16px",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(255, 255, 255)", // set background color to default Paper color
          }}
        >
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                {selectedCustomer.length > 0 && (
                  <Button
                    variant="contained"
                    onClick={() => HandleOpenModal(selectedCustomer)}
                  >
                    Assign
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Company List
                </h3>
              </Grid>
            </Grid>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 400,
              "&::-webkit-scrollbar": {
                width: 15,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f2f2f2",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#aaa9ac",
              },
            }}
          >
            <Table
              sx={{ minWidth: 1200 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <StyledTableRow>
                  {Tableheaders.map((header, i) => (
                    <StyledTableCell key={i} align="center">
                      {header}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {companyData.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      <Checkbox
                        checked={selectedCustomer.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.state}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // marginTop: "2em",
            }}
          >
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>

          <Popup
            maxWidth={"xl"}
            title={"Assigned To"}
            openPopup={modalOpen}
            setOpenPopup={setModalOpen}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomAutocomplete
                  sx={{
                    minWidth: 260,
                  }}
                  size="small"
                  onChange={(e, value) => setAssign(value.email)}
                  options={assigned}
                  getOptionLabel={(option) => `${option.name}`}
                  label={"Assign To"}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="date"
                  size="small"
                  label="Select plan Date"
                  variant="outlined"
                  value={plannedDate}
                  onChange={(e) => setPlannedDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Set minimum date to today
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={updateAssigned}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Popup>
        </div>
      </div>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#006BA1", // Remove padding from header cells
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: 8, // Remove padding from body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
