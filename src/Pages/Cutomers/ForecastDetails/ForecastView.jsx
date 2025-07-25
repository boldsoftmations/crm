import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
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
import { ForecastCreate } from "./ForecastCreate";
import { ForecastUpdate } from "./ForecastUpdate";
import { Popup } from "../../../Components/Popup";
import CustomerServices from "../../../services/CustomerService";
import { CustomLoader } from "../../../Components/CustomLoader";
import UploadForecast from "./UploadForecast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: "#006BA1",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: 5,
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

export const ForecastView = ({ recordForEdit }) => {
  const [open, setOpen] = useState(false);
  const [forecastdata, setForecastData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openUploadForecast, setOpenUploadForecast] = useState(false);
  const [forecastDataByID, setForecastDataByID] = useState([]);
  // Get the current date
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the last 2 months
  const lastMonth1 = (currentMonth - 2 + 12) % 12;
  const lastMonth2 = (currentMonth - 1 + 12) % 12;

  // Get the next 3 months
  const nextMonth1 = (currentMonth + 1) % 12;
  const nextMonth2 = (currentMonth + 2) % 12;
  const nextMonth3 = (currentMonth + 3) % 12;
  // Convert month number to month name
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch company details based on the active tab when the component mounts or the active tab changes
  useEffect(() => {
    if (recordForEdit) {
      getAllCompanyDetailsByID();
    }
  }, [recordForEdit]);

  // API call to fetch company details based on type
  const getAllCompanyDetailsByID = async () => {
    try {
      setOpen(true);
      const forecastResponse =
        await CustomerServices.getCompanyDataByIdWithType(
          recordForEdit,
          "forecast"
        );
      setForecastData(forecastResponse.data.forecast);

      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("company data by id error", err);
    }
  };

  // Get the unique index_position values to use as column headers
  const allForecastMonths = [
    ...new Set(
      forecastdata &&
        forecastdata.flatMap((row) =>
          row.product_forecast.map((rowData) => rowData.month)
        )
    ),
  ].sort((a, b) => a - b);

  return (
    <>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <Box display="flex">
          <Box flexGrow={2}>
            <h3
              style={{
                textAlign: "right",
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 700,
              }}
            >
              Forecast Details
            </h3>
          </Box>
          <Box flexGrow={1} align="right">
            <Button
              onClick={() => setOpenPopup2(true)}
              variant="contained"
              color="success"
              style={{ marginRight: "1em" }}
              size="small"
            >
              Add
            </Button>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              style={{ marginRight: "1em" }}
              size="small"
              onClick={() => setOpenUploadForecast(true)}
            >
              Upload Forecast
            </Button>
          </Box>
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
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">
                  LAST UPDATED BY{" "}
                </StyledTableCell>
                <StyledTableCell align="center">PRODUCT</StyledTableCell>
                <StyledTableCell align="center">
                  {` ${months[lastMonth1]} - ${
                    lastMonth1 < currentMonth ? currentYear : currentYear - 1
                  }`}
                  <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">
                  {` ${months[lastMonth2]} - ${
                    lastMonth2 < currentMonth ? currentYear : currentYear - 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${months[currentMonth]} - ${currentYear}`} <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">
                  {` ${months[nextMonth1]} - ${
                    nextMonth1 > currentMonth ? currentYear : currentYear + 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">
                  {` ${months[nextMonth2]} - ${
                    nextMonth2 > currentMonth ? currentYear : currentYear + 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">
                  {` ${months[nextMonth3]} - ${
                    nextMonth3 > currentMonth ? currentYear : currentYear + 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {forecastdata &&
                forecastdata.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {row.sales_person}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.product}
                    </StyledTableCell>
                    {allForecastMonths.map((position) => {
                      const rowData = row.product_forecast.find(
                        (data) => data.month === position
                      );

                      if (rowData) {
                        const actual = rowData.actual;
                        const forecast = rowData.forecast;
                        return (
                          <TableCell key={position} align="center">
                            {actual} - {forecast}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={position} align="center">
                            N/A
                          </TableCell>
                        );
                      }
                    })}

                    {/* <StyledTableCell align="center"></StyledTableCell> */}
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenPopup(true);
                          setForecastDataByID(row);
                        }}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Popup
        title={"Create Forecast Details"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <ForecastCreate
          getAllCompanyDetailsByID={getAllCompanyDetailsByID}
          setOpenPopup={setOpenPopup2}
        />
      </Popup>
      <Popup
        title={"Update Forecast Details"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ForecastUpdate
          getAllCompanyDetailsByID={getAllCompanyDetailsByID}
          setOpenPopup={setOpenPopup}
          forecastDataByID={forecastDataByID}
        />
      </Popup>
      <Popup
        title={"Upload Forecast Details"}
        openPopup={openUploadForecast}
        setOpenPopup={setOpenUploadForecast}
      >
        <UploadForecast
          getAllCompanyDetailsByID={getAllCompanyDetailsByID}
          setOpenUploadForecast={setOpenUploadForecast}
        />
      </Popup>
    </>
  );
};
