import React, { useCallback, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Switch,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { CSVLink } from "react-csv";
import { pdf } from "@react-pdf/renderer";
import { CustomLoader } from "../../../Components/CustomLoader";
import { Popup } from "../../../Components/Popup";
import InventoryServices from "../../../services/InventoryService";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { MaterialTransferNoteCreate } from "./MaterialTransferNoteCreate";
import InvoiceServices from "../../../services/InvoiceService";
import { CustomPagination } from "../../../Components/CustomPagination";
import CustomTextField from "../../../Components/CustomTextField";
import { MaterialTransferNotePDF } from "./MaterialTransferNotePDF";
import { MaterialTransferAccept } from "./MaterialTransferAccept";

export const MaterialTransferNoteView = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openAcceptPopup, setOpenAcceptPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [materialTransferNote, setMaterialTransferNote] = useState([]);
  const [materialTransferNoteByID, setMaterialTransferNoteByID] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptedFilter, setAcceptedFilter] = useState("");
  const [sellerOption, setSellerOption] = useState(null);
  const userData = useSelector((state) => state.auth.profile);
  const [exportData, setExportData] = useState([]);
  const csvLinkRef = useRef(null);

  const handleDownload = async () => {
    try {
      const data = await handleExport();
      setExportData(data);
      setTimeout(() => {
        csvLinkRef.current.link.click();
      });
    } catch (error) {
      console.log("CSVLink Download error", error);
    }
  };

  const headers = [
    { label: "USER", key: "user" },
    { label: "SELLER UNIT", key: "seller_account" },
    { label: "DATE", key: "date" },
    { label: "PRODUCT", key: "product" },
    { label: "UNIT", key: "unit" },
    { label: "QUANTITY", key: "quantity" },
    { label: "ACCEPTED", key: "accepted" },
  ];

  const handleExport = async () => {
    try {
      setOpen(true);
      const response = await InventoryServices.getAllMaterialTransferNoteData(
        "all",
        acceptedFilter,
        searchQuery
      );

      const data = response.data.map((row) => {
        return {
          user: row.user,
          seller_account: row.seller_account,
          date: row.created_on,
          product: row.product,
          unit: row.unit,
          quantity: row.quantity,
          accepted: row.accepted,
        };
      });
      setOpen(false);
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setOpen(false);
    }
  };

  const handlePrint = async (data) => {
    try {
      setOpen(true);

      // create a new jsPDF instance
      const pdfDoc = new jsPDF();

      // generate the PDF document
      const pdfData = await pdf(
        <MaterialTransferNotePDF materialTransferNoteByID={data} />,
        pdfDoc,
        {
          // set options here if needed
        }
      ).toBlob();

      // create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfData);
      link.download = `ID Number ${data.id}.pdf`;
      document.body.appendChild(link);

      // trigger the download
      link.click();

      // clean up the temporary link element
      document.body.removeChild(link);

      setOpen(false);
    } catch (error) {
      console.log("error exporting pdf", error);
    } finally {
      setOpen(false);
    }
  };

  const handleDownloadPdf = (item) => {
    handlePrint(item);
    setMaterialTransferNoteByID(item);
  };

  const handleAccept = (item) => {
    setOpenAcceptPopup(true);
    setMaterialTransferNoteByID(item);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setAcceptedFilter(value);
    getAllMaterialTransferNoteDetails(currentPage, value, searchQuery);
  };

  useEffect(() => {
    getAllSellerAccountsDetails();
  }, []);

  const getAllSellerAccountsDetails = async () => {
    try {
      setOpen(true);
      const data = userData.groups.includes("Production Delhi")
        ? "Delhi"
        : "Maharashtra";
      const response = await InvoiceServices.getfilterSellerAccountData(data);
      setSellerOption(response.data.results);
      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("err", err);
    }
  };

  useEffect(() => {
    getAllMaterialTransferNoteDetails(currentPage);
  }, [currentPage, getAllMaterialTransferNoteDetails]);

  const getAllMaterialTransferNoteDetails = useCallback(
    async (page, filter = acceptedFilter, search = searchQuery) => {
      try {
        setOpen(true);

        const response = await InventoryServices.getAllMaterialTransferNoteData(
          page,
          filter,
          search
        );

        setMaterialTransferNote(response.data.results);
        setPageCount(Math.ceil(response.data.count / 25));
        setOpen(false);
      } catch (error) {
        setOpen(false);
        console.log("error", error);
      }
    },
    [acceptedFilter, searchQuery]
  );

  // Usage
  const isAcceptedEdit =
    userData.groups.includes("Accounts") ||
    userData.groups.includes("Production") ||
    userData.groups.includes("Production Delhi");

  const isAcceptedView =
    userData.groups.includes("Stores") ||
    userData.groups.includes("Stores Delhi");

  const filteredMaterialTransferNote = Object.keys(materialTransferNote)
    .filter((key) => !materialTransferNote[key].accepted)
    .reduce((obj, key) => {
      obj[key] = materialTransferNote[key];
      return obj;
    }, {});

  return (
    <>
      <CustomLoader open={open} />
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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <FormControl sx={{ minWidth: "100px" }} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Filter By Accepted
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  label="Filter By Accepted"
                  value={acceptedFilter}
                  onChange={handleFilterChange}
                >
                  {AcceptedOption.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {acceptedFilter && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setAcceptedFilter("");
                      getAllMaterialTransferNoteDetails(1, "", searchQuery);
                    }}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                size="small"
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  getAllMaterialTransferNoteDetails(
                    currentPage,
                    acceptedFilter,
                    searchQuery
                  )
                } // Call `handleSearch` when the button is clicked
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setSearchQuery("");
                  getAllMaterialTransferNoteDetails(1, acceptedFilter, "");
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              {/* Add Button */}
              {(userData.groups.includes("Production") ||
                userData.groups.includes("Director") ||
                userData.groups.includes("Production Delhi")) && (
                <Button
                  variant="contained"
                  onClick={() => setOpenCreatePopup(true)}
                >
                  Add
                </Button>
              )}
            </Grid>

            <Grid item xs={12} sm={3}>
              {/* Customer Header */}
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Material Transfer Note
              </h3>
            </Grid>
            <Grid item xs={12} sm={3}>
              {/* Download CSV Button */}
              <Button variant="contained" onClick={handleDownload}>
                Download CSV
              </Button>
              {exportData.length > 0 && (
                <CSVLink
                  data={exportData}
                  headers={headers}
                  ref={csvLinkRef}
                  filename="Material Transfer Note.csv"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    outline: "none",
                    height: "5vh",
                  }}
                />
              )}
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
          <Table sx={{ minWidth: 1200 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">User</StyledTableCell>
                <StyledTableCell align="center">Seller Account</StyledTableCell>
                <StyledTableCell align="center">Product</StyledTableCell>
                <StyledTableCell align="center">Unit</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Accepted</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {materialTransferNote.map((mtnData) => (
                <React.Fragment key={mtnData.id}>
                  <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <StyledTableCell align="center">
                      {mtnData.user}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mtnData.seller_account}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mtnData.product}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mtnData.unit}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mtnData.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mtnData.created_on}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Switch
                        checked={mtnData.accepted}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {isAcceptedView && mtnData.accepted === false && (
                        <Button
                          color="success"
                          onClick={() => handleAccept(mtnData)}
                        >
                          Accept
                        </Button>
                      )}
                      <Button
                        color="primary"
                        onClick={() => handleDownloadPdf(mtnData)}
                      >
                        Downlaod
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </div>

      <Popup
        maxWidth="xl"
        title={"Create Material Transfer Note"}
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <MaterialTransferNoteCreate
          getAllMaterialTransferNoteDetails={getAllMaterialTransferNoteDetails}
          setOpenCreatePopup={setOpenCreatePopup}
          sellerOption={sellerOption}
        />
      </Popup>

      <Popup
        maxWidth="xl"
        title={"View Material Transfer Note"}
        openPopup={openAcceptPopup}
        setOpenPopup={setOpenAcceptPopup}
      >
        <MaterialTransferAccept
          materialTransferNoteByID={materialTransferNoteByID}
          setOpenAcceptPopup={setOpenAcceptPopup}
          getAllMaterialTransferNoteDetails={getAllMaterialTransferNoteDetails}
        />
      </Popup>
    </>
  );
};

const AcceptedOption = [
  { label: "Accepted", value: "true" },
  { label: "Not Accepted", value: "false" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: 0, // Remove padding from header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0, // Remove padding from body cells
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
