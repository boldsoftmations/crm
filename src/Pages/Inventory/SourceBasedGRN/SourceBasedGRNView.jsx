import {
  Box,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableFooter,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CustomLoader } from "../../../Components/CustomLoader";
import { Popup } from "../../../Components/Popup";
import InventoryServices from "../../../services/InventoryService";
import { useSelector } from "react-redux";
import { CustomPagination } from "../../../Components/CustomPagination";
import { SourceBasedGRNCreate } from "./SourceBasedGRNCreate";
import InvoiceServices from "../../../services/InvoiceService";

export const SourceBasedGRNView = () => {
  const userData = useSelector((state) => state.auth.profile);
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [packingListData, setPackingListData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [idForEdit, setIDForEdit] = useState("");
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [sellerOption, setSellerOption] = useState(null);

  useEffect(() => {
    getAllSourceBasedGRNData(currentPage);
  }, [currentPage]);

  const getAllSourceBasedGRNData = async (page) => {
    try {
      setOpen(true);
      const response = await InventoryServices.getAllSourceBasedGRNData(page);
      if (response && response.data.results) {
        setPackingListData(response.data.results);
        setPageCount(Math.ceil(response.data.count / 25));
      }
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
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

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const openInPopup = (item) => {
    setIDForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
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
                <h3
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Source Based GRN
                </h3>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
            </Grid>
          </Box>
          <TableContainer
            sx={{
              maxHeight: 360,
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
              sx={{ minWidth: 700 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">SOURCE</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">GRN Number</StyledTableCell>
                  <StyledTableCell align="center">
                    Seller Account
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {packingListData.map((row, i) => (
                  <Row
                    key={i}
                    row={row}
                    openInPopup={openInPopup}
                    userData={userData}
                  />
                ))}
              </TableBody>{" "}
            </Table>
          </TableContainer>
          <TableFooter
            sx={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
          >
            <CustomPagination
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </TableFooter>
        </Paper>
      </Grid>
      <Popup
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
        maxWidth="xl"
        title={"Create Source Based GRN"}
      >
        <SourceBasedGRNCreate
          idForEdit={idForEdit}
          currentPage={currentPage}
          setOpenCreatePopup={setOpenCreatePopup}
          sellerOption={sellerOption}
          getAllSourceBasedGRNData={getAllSourceBasedGRNData}
        />
      </Popup>
    </>
  );
};

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <CustomLoader open={open} /> */}
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            align="center"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">{row.grn_source}</StyledTableCell>
        <StyledTableCell align="center">{row.created_on}</StyledTableCell>
        <StyledTableCell align="center">{row.grn_number}</StyledTableCell>
        <StyledTableCell align="center">{row.seller_account}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">SR.NO</TableCell>
                    <TableCell align="center">PRODUCT</TableCell>
                    <TableCell align="center">UNIT</TableCell>
                    <TableCell align="center">RATE</TableCell>
                    <TableCell align="center">AMOUNT</TableCell>
                    <TableCell align="center">QUANTITY</TableCell>
                    <TableCell align="center">Source Key</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((historyRow, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">{i + 1}</StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.products}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.unit}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.rate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.order_quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {historyRow.source_key}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
}

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
