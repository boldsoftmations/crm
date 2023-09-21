import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Autocomplete,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import { CustomChart } from "../Components/CustomChart";
import { useSelector } from "react-redux";
import { Popup } from "../Components/Popup";

export const SalesDashboard = (props) => {
  const {
    barChartData,
    pieChartData,
    newCustomerData,
    pendingTask,
    pendingFollowup,
    pendingDescription,
    monthlyStatus,
    weeklyStatus,
    dailyStatus,
    handleSegmentHover,
    total,
    piData,
    funnelData,
    hoveredSegment,
    handleRowClick,
    descriptionQuantity,
    callPerformance,
    dailyInvoiceQuantity,
    dailyOrderBookQuantity,
    handleChange,
    handleStartDateChange,
    handleEndDateChange,
    startDate,
    endDate,
    maxDate,
    minDate,
    openPopup3,
    setOpenPopup3,
    getResetDate,
    // assigned,
    getResetData,
    handleAutocompleteChange,
    assign,
  } = props;
  const userData = useSelector((state) => state.auth.profile);
  const [privacy] = useState(!userData.groups.includes("Sales"));
  const [dIQdata, setDIQData] = useState();
  const [dOBQdata, setDOBQData] = useState();
  const [activeButton, setActiveButton] = useState("monthly");
  const assigned = userData.sales_users || [];

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const descriptionOptionsForInvoice = dailyInvoiceQuantity.flatMap((entry) =>
    Object.keys(entry)
  );

  const descriptionOptionsForOrderBook = dailyOrderBookQuantity.flatMap(
    (entry) => Object.keys(entry)
  );

  const handleDataForInvoice = (value) => {
    // Filter the dailyInvoiceQuantity data based on the selected option
    const filteredData = dailyInvoiceQuantity
      .filter((entry) => entry.hasOwnProperty(value))
      .map((entry) => entry[value]);

    // Store the filtered data in the dIQdata state variable
    setDIQData(filteredData[0]);
  };

  const handleDataForOrderBook = (value) => {
    // Filter the dailyInvoiceQuantity data based on the selected option
    const filteredData = dailyOrderBookQuantity
      .filter((entry) => entry.hasOwnProperty(value))
      .map((entry) => entry[value]);
    // Store the filtered data in the dIQdata state variable
    setDOBQData(filteredData[0]);
  };

  const paletteColors = [
    "#f14c14",
    "#f39c35",
    "#68BC00",
    "#1d7b63",
    "#4e97a8",
    "#4466a3",
  ];

  const COLORS = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#ffbb00",
    "#ff7f50",
    "#ff69b4",
    "#ba55d3",
    "#cd5c5c",
    "#ffa500",
    "#adff2f",
    "#008080",
  ];

  const chartContainerStyle = {
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    paddingTop: "20px",
    width: "100%",
    minHeight: "300px",
  };

  const textStyle = {
    color: "#fff",
    fontWeight: "bold",
  };

  const funnelStyle = {
    width: "100%",
    minHeight: "1px",
    fontSize: "12px",
    padding: "10px 0",
    margin: "2px 0",
    color: "black",
    clipPath: "polygon(0 0, 100% 0, 60% 78%, 60% 90%, 40% 100%, 40% 78%)",
    WebkitClipPath: "polygon(0 0, 100% 0, 60% 78%, 60% 90%, 40% 100%, 40% 78%)",
    textAlign: "center",
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} sx={{ marginTop: "20px" }}>
          <FormControlLabel
            control={<Switch checked={privacy} disabled />}
            label="Privacy"
          />
        </Grid>
      </Grid>
      {privacy ? (
        <div style={{ filter: "blur(4px)" }}>
          {/* Customer Stats */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ margin: "20px" }}
          >
            {pieChartData.map((data, index) => {
              let percentage = 0;
              if (total !== 0) {
                percentage = (data.value / total) * 100;
              }

              return (
                <Grid
                  item
                  xs={1}
                  sm={2}
                  md={3}
                  lg={3}
                  key={index}
                  sx={{ marginTop: "20px" }}
                >
                  <Box
                    sx={{
                      backgroundColor: COLORS[index % COLORS.length],
                      textAlign: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-around"
                    >
                      <Box sx={{ marginTop: "10px" }}>
                        <CircularProgressWithLabel
                          variant="determinate"
                          value={percentage}
                          // sx={{ backgroundColor: "#ccc" }}
                        />
                      </Box>
                      <Box sx={{ marginTop: "10px" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {data.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {data.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Combination", "Actual", "Forecast"],
                  ...barChartData.map((item) => [
                    item.combination,
                    item.actual,
                    item.forecast,
                  ]),
                ]}
                options={{
                  title: "Actual vs Forecast(Quantity)",
                  width: "100%",
                  height: "300px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Combination", "Count"],
                  ...newCustomerData.map((item) => [
                    item.combination,
                    item.count,
                  ]),
                ]}
                options={{
                  title: "New Customer Data",
                  width: "100%",
                  height: "300px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="PieChart"
                data={[
                  ["Label", "Value"],
                  ...pendingTask.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "Pending Task Data",
                  width: "100%",
                  height: "300px",
                  pieHole: 0.4,
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="BarChart"
                data={[
                  ["Label", "Value"],
                  ...pendingFollowup.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "Pending Follow-Up Data",
                  width: "100%",
                  height: "300px",
                  legend: { position: "none" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType={"PieChart"}
                data={[
                  ["Label", "Value"],
                  ...piData.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "PI Data",
                  width: "100%",
                  height: "300px",
                  pieHole: 0.4,
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ margin: "2rem 2rem 0 4rem", backgroundColor: "#ffffff" }}
            >
              <div className="funnelChart" style={funnelStyle}>
                <h2 style={{ textAlign: "center", color: "#333" }}>
                  Sales Funnel
                </h2>
                {funnelData.map((data, index) => (
                  <div
                    key={index}
                    className="chartSegment"
                    style={{
                      backgroundColor:
                        paletteColors[index % paletteColors.length],
                      opacity: hoveredSegment === data ? 0.7 : 1,
                    }}
                    onMouseEnter={() => handleSegmentHover(data)}
                    // onMouseLeave={handleSegmentLeave}
                    onClick={() => handleRowClick(data)}
                  >
                    <div
                    // className="segmentTitle"
                    >
                      <span style={textStyle}>{data.label}</span>&nbsp;
                      <span style={textStyle}>{data.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
            <Button
              variant={activeButton === "monthly" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("monthly")}
            >
              Monthly Call Status
            </Button>
            <Button
              variant={activeButton === "weekly" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("weekly")}
            >
              Weekly Call Status
            </Button>
            <Button
              variant={activeButton === "daily" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("daily")}
            >
              Daily Call Status
            </Button>
            {activeButton === "monthly" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Month", "Existing Lead", "New Lead", "Customer"],
                  ...monthlyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Monthly Call Status",
                  width: "100%",
                  height: "400px",
                  isStacked: true,
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
            {activeButton === "weekly" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Week", "Existing Lead", "New Lead", "Customer"],
                  ...weeklyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Weekly Call Status",
                  width: "100%",
                  height: "400px",
                  curveType: "function",
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
            {activeButton === "daily" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Day", "Existing Lead", "New Lead", "Customer"],
                  ...dailyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Daily Call Status",
                  width: "100%",
                  height: "400px",
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="BarChart"
                data={[
                  ["Product Description", "Pending Quantity"],
                  ...pendingDescription.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Pending Orderbook by Description",
                  width: "100%",
                  height: "400px",
                  legend: { position: "none" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="PieChart"
                data={[
                  ["Product Description", "Quantity"],
                  ...descriptionQuantity.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Description Wise Sales Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
              <FormControl
                sx={{ width: "300px", marginBottom: "10px" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Date</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Date"
                  onChange={(event) => handleChange(event)}
                >
                  {DateOptions.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CustomChart
                chartType="BarChart"
                data={[
                  ["Call Category", "Value"],
                  ...callPerformance.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Call Performance",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <Autocomplete
                sx={{}}
                size="small"
                defaultValue={dailyInvoiceQuantity[0]}
                onChange={(event, value) => handleDataForInvoice(value)}
                options={descriptionOptionsForInvoice.map((option) => option)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Filter By Description" />
                )}
              />
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Date", "Total"],
                  ...((dIQdata &&
                    dIQdata.map((entry) => [
                      entry.sales_invoice__generation_date,
                      entry.total,
                    ])) ||
                    []),
                ]}
                options={{
                  title: "Daily Sales Invoice Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <Autocomplete
                sx={{}}
                size="small"
                defaultValue={dailyOrderBookQuantity[0]}
                onChange={(event, value) => handleDataForOrderBook(value)}
                options={descriptionOptionsForOrderBook.map((option) => option)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Filter By Description" />
                )}
              />
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Date", "Total"],
                  ...((dOBQdata &&
                    dOBQdata.map((entry) => [
                      entry.orderbook__proforma_invoice__generation_date,
                      entry.total,
                    ])) ||
                    []),
                ]}
                options={{
                  title: "Daily Sales OrderBook Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          {/* Customer Stats */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ margin: "20px" }}
          >
            {pieChartData.map((data, index) => {
              let percentage = 0;
              if (total !== 0) {
                percentage = (data.value / total) * 100;
              }

              return (
                <Grid
                  item
                  xs={1}
                  sm={2}
                  md={3}
                  lg={3}
                  key={index}
                  sx={{ marginTop: "20px" }}
                >
                  <Box
                    sx={{
                      backgroundColor: COLORS[index % COLORS.length],
                      textAlign: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-around"
                    >
                      <Box sx={{ marginTop: "10px" }}>
                        <CircularProgressWithLabel
                          variant="determinate"
                          value={percentage}
                          // sx={{ backgroundColor: "#ccc" }}
                        />
                      </Box>
                      <Box sx={{ marginTop: "10px" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {data.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {data.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          {assigned.length > 0 && (
            <Grid container spacing={1} sx={{ my: "20px" }}>
              <Paper sx={{ width: "100%", padding: "20px" }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <Autocomplete
                      size="small"
                      onChange={(event, value) =>
                        handleAutocompleteChange(value)
                      }
                      value={assign}
                      options={assigned.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField {...params} label="Filter By Sales Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={getResetData}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Combination", "Actual", "Forecast"],
                  ...barChartData.map((item) => [
                    item.combination,
                    item.actual,
                    item.forecast,
                  ]),
                ]}
                options={{
                  title: "Actual vs Forecast(Quantity)",
                  width: "100%",
                  height: "300px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Combination", "Count"],
                  ...newCustomerData.map((item) => [
                    item.combination,
                    item.count,
                  ]),
                ]}
                options={{
                  title: "New Customer Data",
                  width: "100%",
                  height: "300px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="PieChart"
                data={[
                  ["Label", "Value"],
                  ...pendingTask.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "Pending Task Data",
                  width: "100%",
                  height: "300px",
                  pieHole: 0.4,
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="BarChart"
                data={[
                  ["Label", "Value"],
                  ...pendingFollowup.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "Pending Follow-Up Data",
                  width: "100%",
                  height: "300px",
                  legend: { position: "none" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType={"PieChart"}
                data={[
                  ["Label", "Value"],
                  ...piData.map((item) => [item.label, item.value]),
                ]}
                options={{
                  title: "PI Data",
                  width: "100%",
                  height: "300px",
                  pieHole: 0.4,
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ margin: "2rem 2rem 0 4rem", backgroundColor: "#ffffff" }}
            >
              <div className="funnelChart" style={funnelStyle}>
                <h2 style={{ textAlign: "center", color: "#333" }}>
                  Sales Funnel
                </h2>
                {funnelData.map((data, index) => (
                  <div
                    key={index}
                    className="chartSegment"
                    style={{
                      backgroundColor:
                        paletteColors[index % paletteColors.length],
                      opacity: hoveredSegment === data ? 0.7 : 1,
                    }}
                    onMouseEnter={() => handleSegmentHover(data)}
                    // onMouseLeave={handleSegmentLeave}
                    onClick={() => handleRowClick(data)}
                  >
                    <div
                    // className="segmentTitle"
                    >
                      <span style={textStyle}>{data.label}</span>&nbsp;
                      <span style={textStyle}>{data.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
            <Button
              variant={activeButton === "monthly" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("monthly")}
            >
              Monthly Call Status
            </Button>
            <Button
              variant={activeButton === "weekly" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("weekly")}
            >
              Weekly Call Status
            </Button>
            <Button
              variant={activeButton === "daily" ? "contained" : "outlined"} // Set variant to 'contained' for the active button
              sx={{ margin: "0 10px 10px 0" }}
              color="primary"
              onClick={() => handleButtonClick("daily")}
            >
              Daily Call Status
            </Button>
            {activeButton === "monthly" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Month", "Existing Lead", "New Lead", "Customer"],
                  ...monthlyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Monthly Call Status",
                  width: "100%",
                  height: "400px",
                  isStacked: true,
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
            {activeButton === "weekly" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Week", "Existing Lead", "New Lead", "Customer"],
                  ...weeklyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Weekly Call Status",
                  width: "100%",
                  height: "400px",
                  curveType: "function",
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
            {activeButton === "daily" && (
              <CustomChart
                chartType="ColumnChart"
                data={[
                  ["Day", "Existing Lead", "New Lead", "Customer"],
                  ...dailyStatus.map((item) => [
                    item.combination,
                    item.existing_lead,
                    item.new_lead,
                    item.customer,
                  ]),
                ]}
                options={{
                  title: "Daily Call Status",
                  width: "100%",
                  height: "400px",
                  legend: { position: "top" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="BarChart"
                data={[
                  ["Product Description", "Pending Quantity"],
                  ...pendingDescription.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Pending Quantity by Description",
                  width: "100%",
                  height: "400px",
                  legend: { position: "none" },
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <CustomChart
                chartType="PieChart"
                data={[
                  ["Product Description", "Quantity"],
                  ...descriptionQuantity.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Description Wise Sales Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
              <FormControl
                sx={{ width: "300px", marginBottom: "10px" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Date</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Date"
                  onChange={(event) => handleChange(event)}
                >
                  {DateOptions.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <CustomChart
                chartType="BarChart"
                data={[
                  ["Call Category", "Value"],
                  ...callPerformance.map((item) => [item.name, item.value]),
                ]}
                options={{
                  title: "Call Performance",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <Autocomplete
                sx={{}}
                size="small"
                defaultValue={dailyInvoiceQuantity[0]}
                onChange={(event, value) => handleDataForInvoice(value)}
                options={descriptionOptionsForInvoice.map((option) => option)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Filter By Description" />
                )}
              />
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Date", "Total"],
                  ...((dIQdata &&
                    dIQdata.map((entry) => [
                      entry.sales_invoice__generation_date,
                      entry.total,
                    ])) ||
                    []),
                ]}
                options={{
                  title: "Daily Sales Invoice Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <Autocomplete
                sx={{}}
                size="small"
                defaultValue={dailyOrderBookQuantity[0]}
                onChange={(event, value) => handleDataForOrderBook(value)}
                options={descriptionOptionsForOrderBook.map((option) => option)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Filter By Description" />
                )}
              />
              <CustomChart
                chartType="LineChart"
                data={[
                  ["Date", "Total"],
                  ...((dOBQdata &&
                    dOBQdata.map((entry) => [
                      entry.orderbook__proforma_invoice__generation_date,
                      entry.total,
                    ])) ||
                    []),
                ]}
                options={{
                  title: "Daily Sales OrderBook Quantity",
                  width: "100%",
                  height: "400px",
                }}
                widthStyle={"100%"}
                heightStyle={"300px"}
              />
            </Grid>
          </Grid>
        </div>
      )}
      <Popup
        openPopup={openPopup3}
        setOpenPopup={setOpenPopup3}
        title="Date Filter"
        maxWidth="md"
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            margin: "10px",
            padding: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <TextField
                fullWidth
                label="Start Date"
                variant="outlined"
                size="small"
                type="date"
                id="start-date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                min={minDate}
                max={maxDate}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <TextField
                fullWidth
                label="End Date"
                variant="outlined"
                size="small"
                type="date"
                id="end-date"
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                min={
                  startDate ? startDate.toISOString().split("T")[0] : minDate
                }
                max={maxDate}
                onChange={handleEndDateChange}
                disabled={!startDate}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={getResetDate}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Popup>
    </Box>
  );
};

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="indeterminate" {...props} size={60} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="#ffffff">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const DateOptions = [
  {
    value: "Today",
  },
  {
    value: "Yesterday",
  },
  {
    value: "Last 7 Days",
  },
  {
    value: "Last 30 Days",
  },
  {
    value: "This Month",
  },
  {
    value: "Last Month",
  },
  {
    value: "Custom Date",
  },
];
