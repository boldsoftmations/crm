import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Popup } from "../../../Components/Popup";
import { SafetyStockCreate } from "./SafetyStockCreate";
import { SafetyStockUpdate } from "./SafetyStockUpdate";
import InventoryServices from "../../../services/InventoryService";

export const SafetyStockView = () => {
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [safetyStockData, setSafetyStockData] = useState([]);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    InventoryServices.getAllSafetyStockData()
      .then((response) => {
        setSafetyStockData(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching safety stock data:", error);
      });
  }, []);

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
  const refreshDataAndClosePopup = () => {
    InventoryServices.getAllSafetyStockData()
      .then((response) => {
        setSafetyStockData(response.data.results);
        setOpenPopupCreate(false);
      })
      .catch((error) => {
        console.error("Error fetching safety stock data:", error);
      });
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <h3
                  style={{
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Safety Stock Level
                </h3>
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
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Unit</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safetyStockData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.seller_account}</StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell>{row.product}</StyledTableCell>
                    <StyledTableCell>{row.quantity}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          onCreateSuccess={refreshDataAndClosePopup}
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
          onUpdateSuccess={refreshDataAndClosePopup}
        />
      </Popup>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
