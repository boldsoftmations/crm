import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  InputLabel,
  FormControl,
  Select,
  IconButton,
  MenuItem,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { CSVLink } from "react-csv";
import { CustomPagination } from "../../Components/CustomPagination";
import { ErrorMessage } from "../../Components/ErrorMessage/ErrorMessage";
import { CustomLoader } from "../../Components/CustomLoader";
import ProductForecastService from "../../services/ProductForecastService";
import { CustomSearchWithButton } from "../../Components/CustomSearchWithButton";
import { CustomTable } from "../../Components/CustomTable";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Popup } from "../../Components/Popup";
import CustomTextField from "../../Components/CustomTextField";

export const CurrentMonthForecastView = () => {
  const [open, setOpen] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterQuery, setFilterQuery] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelectedQuery, setFilterSelectedQuery] = useState("");
  const [currentMonthForecast, setCurrentMonthForecast] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [idForEdit, setIdForEdit] = useState("");
  const csvLinkRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const UserData = useSelector((state) => state.auth.profile);
  const assigned = UserData.sales_users || [];

  const filterOption = [
    {
      label: "Company",
      value: "product_forecast__company__name",
    },
    {
      label: "Product",
      value: "product_forecast__product__name",
    },
    ...(!UserData.groups.includes("Sales Executive")
      ? [
          {
            label: "Sales Person",
            value: "product_forecast__sales_person__email",
          },
        ]
      : []),
    { label: "Search", value: "search" },
  ];

  useEffect(() => {
    const beforePrint = () => {
      setIsPrinting(true);
      setCurrentMonthForecast([]);
    };

    const afterPrint = () => {
      setIsPrinting(false);
      // Fetch the data again and update the companyData state
      getAllProductionForecastDetails();
    };

    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);

    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  const openInPopup = (item) => {
    console.log("item", item);
    setIdForEdit(item);
    setOpenPopup(true);
  };

  const getResetData = () => {
    setSearchQuery("");
    setFilterSelectedQuery("");

    getAllProductionForecastDetails();
  };

  const handleInputChange = () => {
    setSearchQuery(searchQuery);
    getSearchData(searchQuery);
  };

  const handleInputChanges = (event) => {
    setFilterSelectedQuery(event.target.value);
    getSearchData(event.target.value);
  };

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

  useEffect(() => {
    getAllProductionForecastDetails();
  }, []);

  const getAllProductionForecastDetails = async () => {
    try {
      setOpen(true);
      if (currentPage) {
        const response =
          await ProductForecastService.getCurrentMonthForecastaginateData(
            currentPage
          );
        setCurrentMonthForecast(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      } else {
        const response = await ProductForecastService.getCurrentMonthForecast();
        setCurrentMonthForecast(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      }
      setOpen(false);
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const handleErrorResponse = (err) => {
    if (!err.response) {
      setErrMsg(
        "“Sorry, You Are Not Allowed to Access This Page” Please contact to admin"
      );
    } else if (err.response.status === 400) {
      setErrMsg(
        err.response.data.errors.name ||
          err.response.data.errors.non_field_errors
      );
    } else if (err.response.status === 401) {
      setErrMsg(err.response.data.errors.code);
    } else if (err.response.status === 404 || !err.response.data) {
      setErrMsg("Data not found or request was null/empty");
    } else {
      setErrMsg("Server Error");
    }
  };

  const getSearchData = async (value) => {
    try {
      setOpen(true);
      const filterSearch = value;
      const response =
        await ProductForecastService.getAllSearchCurrentMonthForecast(
          filterQuery,
          filterSearch
        );
      if (response) {
        setCurrentMonthForecast(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      } else {
        getAllProductionForecastDetails();
        setSearchQuery("");
      }
      setOpen(false);
    } catch (error) {
      console.log("error Search leads", error);
      setOpen(false);
    }
  };

  const handlePageClick = async (event, value) => {
    try {
      const page = value;
      setCurrentPage(page);
      setOpen(true);

      if (searchQuery || filterSelectedQuery) {
        const response =
          await ProductForecastService.getAllCurrentMonthForecastPaginate(
            page,
            filterQuery,
            searchQuery || filterSelectedQuery
          );
        if (response) {
          setCurrentMonthForecast(response.data.results);
          const total = response.data.count;
          setpageCount(Math.ceil(total / 25));
        } else {
          getAllProductionForecastDetails();
          setSearchQuery("");
        }
      } else {
        const response =
          await ProductForecastService.getCurrentMonthForecastPaginateData(
            page
          );
        setCurrentMonthForecast(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      }

      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const headers = [
    { label: "Company", key: "company" },
    { label: "Sales Person", key: "sales_person" },
    { label: "Product", key: "product" },
    { label: "Forecast", key: "forecast" },
    { label: "Actual", key: "actual" },
    { label: "Orderbook Value", key: "orderbook_value" },
    { label: "Shortfall", key: "forecast_achieved" },
  ];

  const handleExport = async () => {
    try {
      setOpen(true);
      let response;
      if (searchQuery || filterSelectedQuery) {
        response =
          await ProductForecastService.getAllPaginateCurrentMonthForecastWithSearch(
            "all",
            filterQuery,
            searchQuery || filterSelectedQuery
          );
      } else {
        response =
          await ProductForecastService.getAllPaginateCurrentMonthForecast(
            "all"
          );
      }
      const data = response.data
        .filter((row) => row.forecast > 0)
        .map((row) => {
          const sumValue = row.orderbook_value + row.actual;
          const forecast_achieved = row.forecast - sumValue;
          return {
            company: row.company,
            sales_person: row.sales_person,
            product: row.product,
            forecast: row.forecast,
            actual: row.actual,
            orderbook_value: row.orderbook_value,
            forecast_achieved: forecast_achieved > 0 ? forecast_achieved : 0,
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

  const Tabledata = currentMonthForecast.map((row) => {
    const sumValue = row.orderbook_value + row.actual;
    const forecast_achieved = row.forecast - sumValue;
    return {
      id: row.id,
      company: row.company,
      sales_person: row.sales_person,
      product: row.product,
      forecast: row.forecast,
      actual: row.actual,
      orderbook_value: row.orderbook_value,
      forecast_achieved: forecast_achieved > 0 ? forecast_achieved : 0,
    };
  });

  const getColorForDate = (anticipatedDate) => {
    // If anticipatedDate is null, return an empty string or a default color
    if (!anticipatedDate) {
      return ""; // No color
    }

    const today = new Date();
    const anticipated = new Date(anticipatedDate);

    // You can also check if anticipated is an Invalid Date
    if (isNaN(anticipated.getTime())) {
      return ""; // No color
    }

    today.setHours(0, 0, 0, 0);
    anticipated.setHours(0, 0, 0, 0);

    if (anticipated.getTime() === today.getTime()) {
      // Date is today
      return "#ffcccc";
    } else if (anticipated < today) {
      // Date is in the past
      return "#ccccff";
    } else {
      // Date is in the future
      return "#ffffcc";
    }
  };

  const Tableheaders = [
    "Company",
    "Sales Person",
    "Product",
    "Forecast",
    "Actual",
    "Orderbook Value",
    "Shortfall",
    "Estimate Date",
    "Action",
  ];

  return (
    <div>
      <Helmet>
        <style>
          {`
            @media print {
              html, body {
                filter: ${isPrinting ? "blur(10px)" : "none"} !important;
              }
            }
          `}
        </style>
      </Helmet>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <ErrorMessage errRef={errRef} errMsg={errMsg} />
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Fliter By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="values"
                  label="Fliter By"
                  value={filterQuery}
                  onChange={(event) => setFilterQuery(event.target.value)}
                >
                  {filterOption.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              {filterQuery === "product_forecast__sales_person__email" ? (
                <FormControl
                  sx={{ minWidth: "200px", marginLeft: "1em" }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-label">
                    Filter By Sales Person
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="values"
                    label="Filter By Sales Person"
                    value={filterSelectedQuery}
                    onChange={(event) => handleInputChanges(event)}
                    sx={{
                      "& .MuiSelect-iconOutlined": {
                        display: filterSelectedQuery ? "none" : "",
                      },
                      "&.Mui-focused .MuiIconButton-root": {
                        color: "primary.main",
                      },
                    }}
                    endAdornment={
                      <IconButton
                        sx={{
                          visibility: filterSelectedQuery
                            ? "visible"
                            : "hidden",
                        }}
                        onClick={getResetData}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                  >
                    {assigned.map((option, i) => (
                      <MenuItem key={i} value={option.email}>
                        {option.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <CustomSearchWithButton
                  filterSelectedQuery={searchQuery}
                  setFilterSelectedQuery={setSearchQuery}
                  handleInputChange={handleInputChange}
                  getResetData={getResetData}
                />
              )}
            </Box>
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
                Current Month Forecast
              </h3>
            </Box>
            <Box flexGrow={0.5}>
              <Button variant="contained" onClick={handleDownload}>
                Download CSV
              </Button>
              {exportData.length > 0 && (
                <CSVLink
                  data={exportData}
                  headers={headers}
                  ref={csvLinkRef}
                  filename="Current Month Forecast.csv"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    outline: "none",
                    height: "5vh",
                  }}
                />
              )}
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
            <Table
              sx={{ minWidth: 1200 }}
              stickyHeader
              aria-label="sticky table"
            >
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
                {currentMonthForecast.map((row, i) => {
                  const rowColor = getColorForDate(row.anticipated_date); // Get the color for the date
                  return (
                    <StyledTableRow
                      key={row.id}
                      sx={{
                        backgroundColor: rowColor,
                      }}
                    >
                      <StyledTableCell align="center">
                        {row.company}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.sales_person}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.product}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.forecast}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.actual}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.orderbook_value}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.forecast_achieved}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.anticipated_date}
                      </StyledTableCell>
                      <Button onClick={() => openInPopup(row)}>View</Button>
                    </StyledTableRow>
                  );
                })}
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
        maxWidth="md"
        title={"Update Current Month Forecast"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AnticipatedDate
          idForEdit={idForEdit}
          setOpenPopup={setOpenPopup}
          getAllProductionForecastDetails={getAllProductionForecastDetails}
          setOpen={setOpen}
        />
      </Popup>
    </div>
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
  // remove space between rows
  "& > td, & > th": {
    padding: 4,
  },
  // Add padding and margin styles
  // padding: 0,
  // paddingLeft: 4,
  // paddingRight: 4,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // remove space between rows
  "& > td, & > th": {
    padding: 4,
  },
  // remove margin on left and right sides
  "& > td:first-child, & > th:first-child": {
    paddingLeft: 4,
  },
  "& > td:last-child, & > th:last-child": {
    paddingRight: 4,
  },
}));

const AnticipatedDate = ({
  idForEdit,
  setOpenPopup,
  getAllProductionForecastDetails,
  setOpen,
}) => {
  // Initialize anticipatedDate with the correct structure
  const [anticipatedDate, setAnticipatedDate] = useState({
    id: idForEdit.id,
    anticipated_date: idForEdit.anticipated_date || "",
    month: idForEdit.month || "",
    product_forecast: idForEdit.product_forecast || "",
    year: idForEdit.year || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnticipatedDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      setOpen(true);
      const data = {
        anticipated_date: anticipatedDate.anticipated_date,
        month: anticipatedDate.month,
        product_forecast: anticipatedDate.product_forecast,
        year: anticipatedDate.year,
      };
      const response = await ProductForecastService.updateAnticipatedDate(
        anticipatedDate.id,
        data
      );

      if (response) {
        setOpenPopup(false);
        getAllProductionForecastDetails();
      }
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.error("Error updating anticipated date:", error);
      // You can set an error message state here and display it to the user
    }
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              size="small"
              type="date"
              label="Estimated Date"
              name="anticipated_date"
              value={anticipatedDate.anticipated_date}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </>
  );
};
