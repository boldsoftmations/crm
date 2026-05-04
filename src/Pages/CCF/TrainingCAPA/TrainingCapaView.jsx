import React, { useCallback, useEffect, useState } from "react";
import {
  styled,
  TableCell,
  Paper,
  Button,
  Grid,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Switch,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import CustomerServices from "../../../services/CustomerService";
import SearchComponent from "../../../Components/SearchComponent ";
import { CustomPagination } from "../../../Components/CustomPagination";
import { Popup } from "../../../Components/Popup";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomSnackbar from "../../../Components/CustomerSnackbar";

const TrainingCapaView = () => {
  // ================= STATE =================
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [CCFData, setCCFData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [capaStatus, setCapaStatus] = useState("");

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [trainedMap, setTrainedMap] = useState({});

  const statusOptions = ["Pending", "Completed"];

  // ================= API =================
  const getAllCAPAData = useCallback(async () => {
    try {
      setLoader(true);
      const response = await CustomerServices.getAllCapaData(
        currentPage,
        searchQuery,
        "",
        false,
      );

      if (response && response.data) {
        setCCFData(response.data.results || []);
        setTotalPages(Math.ceil(response.data.count / 25));
      }
    } catch (error) {
      console.error("Error fetching CAPA data:", error);
    } finally {
      setLoader(false);
    }
  }, [currentPage, searchQuery, capaStatus]);

  useEffect(() => {
    getAllCAPAData();
  }, [getAllCAPAData]);

  // ================= UPDATE API =================
  const updateTrainingStatus = async () => {
    if (!selectedRow || !selectedRow.id) return;

    try {
      setLoader(true);

      const response = await CustomerServices.UpdateCapa(selectedRow.id, {
        is_training: true,
      });

      setMessage(
        response && response.data && response.data.message
          ? response.data.message
          : "Training updated",
      );
      setSeverity("success");
      setOpenSnackbar(true);

      // update UI
      setTrainedMap(function (prev) {
        const updated = { ...prev };
        updated[selectedRow.id] = true;
        return updated;
      });

      setOpenPopup(false);

      // refresh
      getAllCAPAData();
    } catch (error) {
      console.log(error);

      setMessage(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message
          ? error.response.data.message
          : "Error updating training",
      );
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoader(false);
    }
  };

  // ================= HANDLERS =================
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTrained = () => {
    updateTrainingStatus(); // ✅ API call
  };

  const handleClickNo = () => {
    setOpenPopup(false);
  };

  // ================= UI =================
  return (
    <>
      <CustomLoader open={loader} />

      <CustomSnackbar
        open={openSnackbar}
        message={message}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4 }}>
          {/* Header */}
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>

              <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Corrective & Preventive Action List
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomAutocomplete
                  fullWidth
                  size="small"
                  options={statusOptions}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => {
                    setCapaStatus(value || "");
                    setCurrentPage(1);
                  }}
                  label="Filter by Status"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Table */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Complaint No.
                  </StyledTableCell>
                  <StyledTableCell align="center">Customer</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {CCFData.map(function (row, i) {
                  var complainNo =
                    row && row.ccf_details && row.ccf_details.complain_no
                      ? row.ccf_details.complain_no
                      : "";

                  var customer =
                    row && row.ccf_details && row.ccf_details.customer
                      ? row.ccf_details.customer
                      : "";

                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">{i + 1}</StyledTableCell>

                      <StyledTableCell align="center">
                        {complainNo}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {customer}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        hidden={row.status === "Closed"}
                      >
                        <Switch
                          checked={row.id && trainedMap[row.id] ? true : false}
                          disabled={row.id && trainedMap[row.id] ? true : false}
                          onChange={function () {
                            setSelectedRow(row);
                            setOpenPopup(true);
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>

      {/* Popup */}
      <Popup
        title="Training Confirmation"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Is training completed?</Typography>

          <Box sx={{ marginTop: 2 }}>
            <Button onClick={handleClickNo}>No</Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleTrained}
              sx={{ marginLeft: 2 }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Popup>
    </>
  );
};

// ================= STYLES =================
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  ["&." + tableCellClasses.head]: {
    backgroundColor: "#006BA1",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default TrainingCapaView;
