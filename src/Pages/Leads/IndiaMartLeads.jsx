import React from "react";
import { useState, useEffect } from "react";
import {
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  Grid,
  Paper,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import CustomAxios from "../../services/api";
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
export const IndiaMartLeads = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const Tableheaders = [
    "Date",
    "Direct Lead",
    "Buy Lead",
    "Call Lead",
    "Total Lead",
  ];
  const getIndiaMartLeads = (data) => {
    return CustomAxios.get("/api/lead/indiamart-leads-list/", data);
  };
  useEffect(() => {
    getIndiaMartLeads()
      .then((response) => {
        if (response.status === 200) return response.data;
        throw new Error("Failed to fetch data");
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = selectedMonth
    ? data.filter(
        (row) => new Date(row.date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : data;
  return (
    <>
      <Helmet>
        <style>
          {`
                @media print {
                  html, body {
                    filter: none !important;
                  }
                `}
        </style>
      </Helmet>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box display="flex" alignItems="center" marginBottom="10px">
            <FormControl
              variant="outlined"
              size="small"
              style={{
                width: "200px", // Adjust the width as needed
              }}
            >
              <InputLabel id="month-filter-label" shrink={selectedMonth !== ""}>
                Filter By Month
              </InputLabel>
              <Select
                labelId="month-filter-label"
                id="month-filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Filter By Month"
              >
                {monthOptions.map((option, i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center">
            <h3
              style={{
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              IndiaMart Leads
            </h3>
          </Box>
          <TableContainer
            sx={{
              maxHeight: 440,
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
                {filteredData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.directLead}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.buyLead}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.callLead}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.totalLead}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
};

export default IndiaMartLeads;
