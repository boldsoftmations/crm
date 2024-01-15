import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Popup } from "../../../Components/Popup";
import { SafetyStockCreate } from "./SafetyStockCreate";
import { SafetyStockUpdate } from "./SafetyStockUpdate";
import InventoryServices from "../../../services/InventoryService";
import { CustomPagination } from "../../../Components/CustomPagination";

export const SafetyStockView = () => {
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [safetyStockData, setSafetyStockData] = useState([]);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleEdit = async (item) => {
    try {
      setOpen(true);
      setSelectedRow(item);
      setOpenPopupUpdate(true);
    } catch (err) {
      console.log(err);
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    getAllSafetyStockDetails(currentPage);
  }, [currentPage, getAllSafetyStockDetails]);

  const getAllSafetyStockDetails = useCallback(async (page) => {
    setOpen(true); // Set loading state before making the API call
    try {
      const response = await InventoryServices.getAllSafetyStockData(page);
      setSafetyStockData(response.data.results);
      setPageCount(Math.ceil(response.data.count / 25));
    } catch (error) {
      console.error("error", error);
    } finally {
      setOpen(false); // Close loading state in the finally block
    }
  }, []);

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box display="flex" marginBottom="10px">
            <Grid
              container
              alignItems="center"
              spacing={2}
              sx={{ mb: 2, mx: 3 }}
            >
              <Grid item xs={12} sm={4} md={4}></Grid>

              {/* Typography in the Center */}
              <Grid item xs={12} sm={4} md={4}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "rgb(34, 34, 34)",
                    textAlign: "center",
                  }}
                >
                  Safety Stock Level
                </Typography>
              </Grid>

              {/* Download CSV Button on the Right */}
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenPopupCreate(true)}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="center">Unit</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Product</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safetyStockData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.seller_account}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.product}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
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
      </Grid>

      <Popup
        fullScreen={true}
        title="Create Safety Stock"
        openPopup={openPopupCreate}
        setOpenPopup={setOpenPopupCreate}
      >
        <SafetyStockCreate
          setOpenPopup={setOpenPopupCreate}
          onCreateSuccess={getAllSafetyStockDetails}
        />
      </Popup>
      <Popup
        title={"Safety Stock Update"}
        openPopup={openPopupUpdate}
        setOpenPopup={setOpenPopupUpdate}
      >
        <SafetyStockUpdate
          setOpenPopup={setOpenPopupUpdate}
          selectedRow={selectedRow}
          onUpdateSuccess={getAllSafetyStockDetails}
        />
      </Popup>
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
