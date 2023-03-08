import React, { useState, useEffect } from "react";
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
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ForecastCreate } from "./ForecastCreate";
import { ForecastUpdate } from "./ForecastUpdate";
import { CustomLoader } from "../../../Components/CustomLoader";
import { Popup } from "../../../Components/Popup";
import CustomerServices from "../../../services/CustomerService";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ForecastView = (props) => {
  const { forecastdata, getAllCompanyDetailsByID, open } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [IDForEdit, setIDForEdit] = useState();
  const [forecastDataByID, setForecastDataByID] = useState([]);

  // Get the current date
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the last 2 months
  const lastMonth1 = (currentMonth - 2 + 12) % 12;
  const lastMonth2 = (currentMonth - 1 + 12) % 12;

  // Get the next 2 months
  const nextMonth1 = (currentMonth + 1) % 12;
  const nextMonth2 = (currentMonth + 2) % 12;

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

  // Output the results
  console.log(
    `Last month 1: ${months[lastMonth1]} ${
      lastMonth1 < currentMonth ? currentYear : currentYear - 1
    }`
  );
  console.log(
    `Last month 2: ${months[lastMonth2]} ${
      lastMonth2 < currentMonth ? currentYear : currentYear - 1
    }`
  );
  console.log(`Current month: ${months[currentMonth]} ${currentYear}`);
  console.log(
    `Next month 1: ${months[nextMonth1]} ${
      nextMonth1 > currentMonth ? currentYear : currentYear + 1
    }`
  );
  console.log(
    `Next month 2: ${months[nextMonth2]} ${
      nextMonth2 > currentMonth ? currentYear : currentYear + 1
    }`
  );

  useEffect(() => {
    if (IDForEdit) getAllForecastDetailsByID();
  }, [IDForEdit]);

  const getAllForecastDetailsByID = async () => {
    try {
      // setOpen(true);
      const response = await CustomerServices.getForecastDataById(IDForEdit);
      console.log("response", response.data.product_forecast);
      setForecastDataByID(response.data.product_forecast);
      // setOpen(false);
    } catch (err) {
      // setOpen(false);
      console.log("company data by id error", err);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Box display="flex">
          <Box flexGrow={2}></Box>
          <Box flexGrow={2}>
            <h3
              style={{
                textAlign: "left",
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
              }}
            >
              Forecast Details
            </h3>
          </Box>
          <Box flexGrow={0.5} align="right">
            <Button
              onClick={() => setOpenPopup2(true)}
              variant="contained"
              color="success"
            >
              Add
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
          <Table sx={{ minWidth: 1200 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SALES PERSON</TableCell>
                <TableCell align="center">PRODUCT</TableCell>
                <TableCell align="center">
                  {` ${months[lastMonth1]} - ${
                    lastMonth1 < currentMonth ? currentYear : currentYear - 1
                  }`}
                  <br />
                  ACTUAL - FORECAST
                </TableCell>
                <TableCell align="center">
                  {`${months[currentMonth]} - ${currentYear}`} <br /> ACTUAL -
                  FORECAST
                </TableCell>
                <TableCell align="center">
                  {` ${months[lastMonth2]} - ${
                    lastMonth2 < currentMonth ? currentYear : currentYear - 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </TableCell>
                <TableCell align="center">
                  {` ${months[nextMonth1]} - ${
                    nextMonth1 > currentMonth ? currentYear : currentYear + 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </TableCell>
                <TableCell align="center">
                  {` ${months[nextMonth2]} - ${
                    nextMonth2 > currentMonth ? currentYear : currentYear + 1
                  }`}{" "}
                  <br />
                  ACTUAL - FORECAST
                </TableCell>
                {/* {forecastdata.map((row) => (
                  <>
                    {row.product_forecast.map((column, i) => {
                      return (
                        i <= 1 && (
                          <TableCell align="center">
                            {column.month} - {column.year}
                          </TableCell>
                          // ) : (
                          //   ""
                        )
                      );
                    })}
                  </>
                ))} */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">ACTUAL / FORECAST</TableCell>
                <TableCell align="center">ACTUAL / FORECAST</TableCell>
                <TableCell align="center">ACTUAL / FORECAST</TableCell>
                <TableCell align="center">ACTUAL / FORECAST</TableCell>
                <TableCell align="center">ACTUAL / FORECAST</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>
              {forecastdata.map((row) => (
                <TableRow>
                  <TableCell align="center">{row.sales_person}</TableCell>
                  <TableCell align="center">{row.product}</TableCell>
                  {row.product_forecast.map((rowData) => {
                    return rowData.actual !== null ? (
                      <TableCell align="center">
                        {rowData.actual} - {rowData.forecast}
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        0 - {rowData.forecast}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenPopup(true);
                        setIDForEdit(row.id);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
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
          IDForEdit={IDForEdit}
          getAllCompanyDetailsByID={getAllCompanyDetailsByID}
          forecastDataByID={forecastDataByID}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  );
};

function Row(props) {
  const { row, setOpenPopup, setIDForEdit } = props;
  const [open, setOpen] = useState(false);

  const openInPopup = (item) => {
    setIDForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      {/* <CustomLoader open={open} /> */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            align="center"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">{row.sales_person}</TableCell>
        <TableCell align="center">{row.product}</TableCell>
        <TableCell align="center">
          <Button
            onClick={() => openInPopup(row.id)}
            variant="contained"
            color="success"
          >
            View
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Product Forecast
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">PRODUCT</TableCell>
                    {row.product_forecast.map((historyRow) => (
                      <>
                        <TableCell align="center">
                          {historyRow.month} - {historyRow.year}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    {row.product_forecast.map((historyRow) => (
                      <TableCell align="center">ACTUAL / FORECAST</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{row.product}</TableCell>
                    {row.product_forecast.map((historyRow) => (
                      <TableCell align="center">
                        {historyRow.actual} / {historyRow.forecast}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
