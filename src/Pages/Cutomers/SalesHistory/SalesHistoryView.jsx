import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import { CustomTable } from "../../../Components/CustomTable";
import { CustomLoader } from "../../../Components/CustomLoader";
import { ErrorMessage } from "../../../Components/ErrorMessage/ErrorMessage";
import CustomerServices from "../../../services/CustomerService";

export const SalesHistoryView = ({ recordForEdit }) => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [noOfPiDropped, setNoOfPiDropped] = useState(69);
  const [totalSales, setTotalSales] = useState(7);
  const [open, setOpen] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const extractErrorMessages = (data) => {
    let messages = [];
    if (data.errors) {
      for (const [key, value] of Object.entries(data.errors)) {
        value.forEach((msg) => {
          messages.push(`${key}: ${msg}`);
        });
      }
    }
    return messages;
  };
  useEffect(() => {
    getSalesHistoryServiceData();
  }, [filterMonth]);

  const handleMonthChange = (event) => {
    setFilterMonth(event.target.value);
  };

  const getSalesHistoryServiceData = async () => {
    try {
      setOpen(true);
      const response = await CustomerServices.getCompanyDataByIdWithType(
        recordForEdit,
        "sales_history"
      );
      setSalesHistory(response.data.sales_history);
    } catch (error) {
      console.log("Getting Sales History API error", error);
      setOpen(false);

      if (error.response && error.response.data) {
        const newErrors = extractErrorMessages(error.response.data);
        setErrorMessages(newErrors);
      } else {
        setErrorMessages([
          "An unexpected error occurred. Please try again later.",
        ]);
      }

      setCurrentErrorIndex(0);
      setOpenSnackbar(true);
    } finally {
      setOpen(false);
    }
  };

  const handleCloseSnackbar = useCallback(() => {
    if (currentErrorIndex < errorMessages.length - 1) {
      setCurrentErrorIndex((prevIndex) => prevIndex + 1);
    } else {
      setOpenSnackbar(false);
      setCurrentErrorIndex(0);
    }
  }, [currentErrorIndex, errorMessages.length]);

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const TableHeader = [
    "Date",
    "Invoice Number",
    "Description",
    "Product",
    "Quantity",
    "Unit",
    "Rate",
    "Amount",
    "Total GST",
    "Total Amount",
  ];

  const TableData = salesHistory.map((value) => ({
    date: value.date,
    invoiceNumber: value.invoice_number,
    description: value.description,
    product: value.product,
    quantity: value.quantity,
    unit: value.unit,
    rate: value.rate,
    amount: value.amount,
    totalGst: value.total_gst,
    totalAmount: value.total_amount,
  }));

  return (
    <>
      <CustomLoader open={open} />
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessages[currentErrorIndex]}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <ErrorMessage errRef={errRef} errMsg={errMsg} />
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box sx={{ marginBottom: "1em" }}>
            <Autocomplete
              options={monthOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by Month"
                  sx={{ width: "160px", marginLeft: "10px", height: "32px" }}
                />
              )}
              onChange={(event, newValue) => {
                setFilterMonth(newValue ? newValue.value : "");
              }}
              value={
                monthOptions.find((month) => month.value === filterMonth) ||
                null
              }
            />
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="1em"
          >
            <Box flexGrow={1}></Box>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
                flexGrow: 0,
              }}
            >
              Sales History
            </Typography>

            <Box flexGrow={1} textAlign="right">
              <Typography variant="subtitle1" gutterBottom>
                No of PI Dropped: {noOfPiDropped}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total Sales for the Month: {totalSales}
              </Typography>
            </Box>
          </Box>

          <CustomTable
            headers={TableHeader}
            data={TableData}
            openInPopup={null}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default SalesHistoryView;
