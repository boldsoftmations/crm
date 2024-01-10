import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import { CustomPagination } from "../../../Components/CustomPagination";
import { CustomTable } from "../../../Components/CustomTable";
import { CSVLink } from "react-csv";
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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import CustomTextField from "../../../Components/CustomTextField";

export const GRNRegisterView = () => {
  const [open, setOpen] = useState(false);
  const [grnRegisterData, setGRNRegisterData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportData, setExportData] = useState([]);
  const csvLinkRef = useRef(null);
  const data = useSelector((state) => state.auth);
  const userData = data.profile;
  const currentYearMonth = `${new Date().getFullYear()}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  const [selectedYearMonth, setSelectedYearMonth] = useState(currentYearMonth);

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
    { label: "PRODUCT", key: "product" },
    { label: "SELLER STATE", key: "seller_account" },
    { label: "DESCRIPTION", key: "description" },
    { label: "DATE", key: "created_on" },
    { label: "UNIT", key: "unit" },
    { label: "QUANTITY", key: "quantity" },
    { label: "PENDING QUANTITY", key: "pending_quantity" },
    { label: "RATE", key: "rate" },
    { label: "AMOUNT", key: "amount" },
  ];

  const handleExport = async () => {
    try {
      setOpen(true);
      let response;
      if (searchQuery) {
        response = await InventoryServices.getAllStoresInventoryDetails(
          "all",
          searchQuery
        );
      } else {
        response = await InventoryServices.getAllStoresInventoryDetails("all");
      }
      const data = response.data.map((row) => {
        return {
          product: row.product,
          seller_account: row.seller_account,
          description: row.description,
          created_on: row.created_on,
          unit: row.unit,
          quantity: row.quantity,
          pending_quantity: row.pending_quantity,
          rate: row.rate,
          amount: row.amount,
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

  useEffect(() => {
    getAllGRNRegisterDetails();
  }, []);

  useEffect(() => {
    getAllGRNRegisterDetails(currentPage);
  }, [currentPage, selectedYearMonth, getAllGRNRegisterDetails]);

  const getAllGRNRegisterDetails = useCallback(
    async (page, filter = selectedYearMonth) => {
      try {
        setOpen(true);
        const response = await InventoryServices.getAllGRNRegisterDetails(
          page,
          filter
        );
        setGRNRegisterData(response.data.results);
        setPageCount(Math.ceil(response.data.count / 25));
        setOpen(false);
      } catch (error) {
        setOpen(false);
        console.error("error", error);
      } finally {
        setOpen(false);
      }
    },
    [selectedYearMonth]
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const Tableheaders = [
    "Date",
    "Vendor",
    "Invoce No",
    "Description",
    "Product",
    "Order Quantity",
    "QA Rejected Quantity",
    "Received Quantity",
  ];

  return (
    <>
      <CustomLoader open={open} />
      <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
        <Box display="flex" marginBottom="10px">
          <CustomTextField
            size="small"
            type="month"
            label="Filter By Month and Year"
            value={selectedYearMonth}
            onChange={(e) => setSelectedYearMonth(e.target.value)}
            sx={{ width: 200, marginRight: "15rem" }}
          />

          <h3
            style={{
              marginBottom: "1em",
              fontSize: "24px",
              color: "rgb(34, 34, 34)",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            GRN Registers
          </h3>
        </Box>
        <TableContainer
          sx={{
            maxHeight: 440,
          }}
        >
          <Table sx={{ minWidth: 1200 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {Tableheaders.map((header) => (
                  <StyledTableCell key={header} align="center">
                    {header}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {grnRegisterData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.invoice_date}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.vendor}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.invoice_no}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.products}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.invoice_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.qa_rejected}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.qa_recieved}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </Paper>
    </>
  );
};

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
