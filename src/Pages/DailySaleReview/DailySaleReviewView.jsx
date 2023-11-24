import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Paper,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import CustomTextField from "../../Components/CustomTextField";
import { CustomLoader } from "../../Components/CustomLoader";
import { Popup } from "./../../Components/Popup";
import { DailySaleReviewUpdate } from "./DailySaleReviewUpdate";
import UserProfileService from "./../../services/UserProfileService";

export const DailySaleReviewView = () => {
  const UsersData = useSelector((state) => state.auth.profile);
  const assignedOption = UsersData.sales_users || [];
  const [isLoading, setIsLoading] = useState(false);
  const [dailySalesReviewData, setDailySalesReviewData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const currentYearMonth = `${new Date().getFullYear()}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  const [selectedYearMonth, setSelectedYearMonth] = useState(currentYearMonth);
  const [salesPersonByFilter, setSalesPersonByFilter] = useState(
    UsersData.groups.includes("Director") ? assignedOption[0].email : null
  );

  const formatDate = (dateString) => {
    return dateString
      ? new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(dateString))
      : "-";
  };

  const handleFilterChange = (value) => {
    setSalesPersonByFilter(value);
    getDailySaleReviewData(selectedYearMonth, value, searchQuery);
  };

  useEffect(() => {
    getDailySaleReviewData(selectedYearMonth);
  }, [selectedYearMonth, getDailySaleReviewData]);

  const getDailySaleReviewData = useCallback(
    async (
      filterByMonthAndYear,
      filterBySalesPerson = salesPersonByFilter,
      query = searchQuery
    ) => {
      setIsLoading(true);
      try {
        console.log("selectedYearMonth in api", selectedYearMonth);
        const response = await UserProfileService.getDailySaleReviewData(
          filterByMonthAndYear,
          filterBySalesPerson,
          query
        );
        console.log("response", response);
        if (response && response.data) {
          setDailySalesReviewData(response.data);
        }
      } catch (err) {
        console.error("Error fetching daily sales review data", err);
      } finally {
        setIsLoading(false);
      }
    },
    [salesPersonByFilter, searchQuery]
  );

  const openInPopup = (item) => {
    console.log("item", item);
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const Tableheaders = [
    // "Sales Person",
    "Reviewd By",
    "Reporting Manager",
    "Date",
    "Action",
  ];

  return (
    <>
      <CustomLoader open={isLoading} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box display="flex" marginBottom="10px">
            {!UsersData.groups.includes("Sales Executive") && (
              <CustomTextField
                size="small"
                type="month"
                label="Filter By Month and Year"
                value={selectedYearMonth}
                onChange={(e) => setSelectedYearMonth(e.target.value)}
                sx={{ width: 300, marginRight: "10px" }}
              />
            )}
            {!UsersData.groups.includes("Sales Executive") && (
              <Autocomplete
                size="small"
                sx={{ width: 300, marginRight: "10px" }}
                onChange={(event, value) => handleFilterChange(value)}
                value={salesPersonByFilter}
                options={assignedOption.map((option) => option.email)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <CustomTextField {...params} label="Filter By Sales Person" />
                )}
              />
            )}
            <CustomTextField
              size="small"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              sx={{ marginRight: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                getDailySaleReviewData(
                  selectedYearMonth,
                  salesPersonByFilter,
                  searchQuery
                )
              }
              sx={{ marginRight: "10px" }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setSearchQuery("");
                getDailySaleReviewData(
                  selectedYearMonth,
                  salesPersonByFilter,
                  ""
                );
              }}
            >
              Reset
            </Button>
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
              Sales Review
            </h3>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {Tableheaders.map((header) => (
                    <StyledTableCell align="center" key={header}>
                      {header}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dailySalesReviewData.map((data, index) => (
                  <StyledTableRow key={data.id || index}>
                    <StyledTableCell align="center">
                      {data.reviewed_by}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.reporting_manager}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => openInPopup(data)}>View</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Popup
            fullScreen={true}
            title="View Sale Review"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <DailySaleReviewUpdate
              setOpenPopup={setOpenPopup}
              recordForEdit={recordForEdit}
            />
          </Popup>
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
