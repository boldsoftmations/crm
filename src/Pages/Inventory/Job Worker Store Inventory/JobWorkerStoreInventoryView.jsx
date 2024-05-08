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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import React, { useCallback, useEffect, useState } from "react";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

export const JobWorkerStoreInventoryView = () => {
  const [open, setOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const getJobWorkerData = useCallback(async () => {
    try {
      setOpen(true);
      const response = await InventoryServices.getJobWorkerInventoryData();
      setInventoryData(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    getJobWorkerData();
  }, []);

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box sx={{ marginBottom: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={12} md={3}></Grid>

              <Grid item xs={12} md={3}></Grid>
              <Grid item xs={12} sm={4}>
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Job Worker Store Inventory
                </h3>
              </Grid>
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
                  <StyledTableCell align="center">PRODUCT</StyledTableCell>
                  <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
                  <StyledTableCell align="center">QUANTITY</StyledTableCell>
                  <StyledTableCell align="center">
                    PENDING QUANTITY
                  </StyledTableCell>
                  <StyledTableCell align="center">RATE</StyledTableCell>
                  <StyledTableCell align="center">TOTAL AMOUNT</StyledTableCell>
                  <StyledTableCell align="center">UNIT</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {inventoryData.map((row, i) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {row.product}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pending_quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.rate}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.total_amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.unit}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>{" "}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
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
