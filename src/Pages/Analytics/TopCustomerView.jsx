import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  styled,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  tableCellClasses,
  Button,
} from "@mui/material";
import { CustomLoader } from "../../Components/CustomLoader";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import CustomSnackbar from "../../Components/CustomerSnackbar";
import DashboardService from "../../services/DashboardService";
import { Popup } from "../../Components/Popup";
import { CreateCustomerProformaInvoice } from "../Invoice/ProformaInvoice/CreateCustomerProformaInvoice";
import CustomerServices from "../../services/CustomerService";
import { UpdateAllCompanyDetails } from "../Cutomers/CompanyDetails/UpdateAllCompanyDetails";

const getLastThreeMonths = () => {
  const now = new Date();
  const months = [];
  for (let i = 3; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.toLocaleString("default", { month: "long" }));
  }
  return months;
};

export const TopCustomerView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topCustomerData, setTopCustomerData] = useState([]);
  const [openPopupOfUpdateCustomer, setOpenPopupOfUpdateCustomer] =
    useState(false);
  const [openPopupInvoice, setOpenPopupInvoice] = useState(false);
  const [rowdata, setRowdata] = useState();
  const [recordForEdit, setRecordForEdit] = useState();
  const [selectedCustomers, setSelectedCustomers] = useState();
  const [filterValue, setFilterValue] = useState("25");
  const [alertmsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const handleClose = () => {
    setAlertMsg({ open: false });
  };
  const [months] = useState(getLastThreeMonths());

  const getTopCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await DashboardService.getTopCustomersMonthwise(
        filterValue
      );
      setTopCustomerData(response.data.data);
    } catch (error) {
      setAlertMsg({
        message: "Failed to fetch top customers",
        severity: "error",
        open: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopCustomers();
  }, [filterValue]);

  const handleFilterChange = (event, value) => {
    setFilterValue(value.value);
  };

  // Create a number formatter to add commas to the total values
  const numberFormatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  });

  const calculateTotals = () => {
    let thirdLastMonthTotal = 0;
    let secondLastMonthTotal = 0;
    let lastMonthTotal = 0;
    let thisMonthTotal = 0;
    let overallTotal = 0;

    topCustomerData.forEach((row) => {
      thirdLastMonthTotal += row.third_last_month_total || 0;
      secondLastMonthTotal += row.second_last_month_total || 0;
      lastMonthTotal += row.last_month_total || 0;
      thisMonthTotal += row.this_month_total || 0;
      overallTotal += row.total || 0;
    });

    return {
      thirdLastMonthTotal: numberFormatter.format(thirdLastMonthTotal),
      secondLastMonthTotal: numberFormatter.format(secondLastMonthTotal),
      lastMonthTotal: numberFormatter.format(lastMonthTotal),
      thisMonthTotal: numberFormatter.format(thisMonthTotal),
      overallTotal: numberFormatter.format(overallTotal),
    };
  };

  const totals = useMemo(calculateTotals, [topCustomerData]);
  const openInPopupOfUpdateCustomer = (item) => {
    setRecordForEdit(item.order_book__company);
    setSelectedCustomers(item);
    setOpenPopupOfUpdateCustomer(true);
  };

  const openInPopupInvoice = async (row) => {
    try {
      const response = await CustomerServices.getCompanyDataById(
        row.order_book__company
      );
      const data = response.data;
      setRecordForEdit(data.id);
      setRowdata(data);
      setOpenPopupInvoice(true);
    } catch (err) {
      console.log("company data by id error", err);
    }
  };
  return (
    <>
      <CustomSnackbar
        open={alertmsg.open}
        message={alertmsg.message}
        severity={alertmsg.severity}
        onClose={handleClose}
      />
      <CustomLoader open={isLoading} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box display="flex" gap="2rem">
                  <CustomAutocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-status"
                    options={FilterbyTopCustomer}
                    onChange={handleFilterChange}
                    getOptionLabel={(option) => option.label}
                    label="Filter By Top Customers"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" marginBottom="10px">
            <h3
              style={{
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              Top Customers
            </h3>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 440,
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
                <TableRow>
                  <StyledTableCell align="center">Customer</StyledTableCell>
                  <StyledTableCell align="center">{months[0]}</StyledTableCell>
                  <StyledTableCell align="center">{months[1]}</StyledTableCell>
                  <StyledTableCell align="center">{months[2]}</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                  <StyledTableCell align="center">{months[3]}</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCustomerData.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">
                      {row.order_book__company__name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberFormatter.format(row.third_last_month_total)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberFormatter.format(row.second_last_month_total)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberFormatter.format(row.last_month_total)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberFormatter.format(row.total)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {numberFormatter.format(row.this_month_total)}
                    </StyledTableCell>
                    <StyledTableCell align="center" display="flex" gap={2}>
                      <Button
                        sx={{ color: "#1976d2" }}
                        onClick={() => openInPopupOfUpdateCustomer(row)}
                      >
                        View
                      </Button>

                      <Button
                        sx={{ color: "#28a745" }}
                        onClick={() => openInPopupInvoice(row)}
                      >
                        Create PI
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {/* Add the totals row */}
                <StyledTableRow>
                  <StyledTableCell align="center">
                    <strong>Total</strong>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totals.thirdLastMonthTotal}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totals.secondLastMonthTotal}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totals.lastMonthTotal}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totals.overallTotal}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totals.thisMonthTotal}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Popup
            fullScreen={true}
            title={"Update Customer"}
            openPopup={openPopupOfUpdateCustomer}
            setOpenPopup={setOpenPopupOfUpdateCustomer}
          >
            <UpdateAllCompanyDetails
              setOpenPopup={setOpenPopupOfUpdateCustomer}
              getAllCompanyDetails={getTopCustomers}
              recordForEdit={recordForEdit}
              selectedCustomers={selectedCustomers}
            />
          </Popup>
          <Popup
            fullScreen={true}
            title={"Create Customer Proforma Invoice"}
            openPopup={openPopupInvoice}
            setOpenPopup={setOpenPopupInvoice}
          >
            <CreateCustomerProformaInvoice
              recordForEdit={recordForEdit}
              rowData={rowdata}
              setOpenPopup={setOpenPopupInvoice}
            />
          </Popup>
        </Paper>
      </Grid>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: "#006BA1",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
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

const FilterbyTopCustomer = [
  { label: "Top 25", value: "25" },
  { label: "Top 50", value: "50" },
  { label: "Top 75", value: "75" },
  { label: "Top 100", value: "100" },
];
