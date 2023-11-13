import React from "react";
import {
  Grid,
  Paper,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const OfferStatusView = () => {
  // Static data for the table
  const rows = [
    {
      candidateName: "John Doe",
      offerStatus: "Accepted",
      joiningDate: "2023-12-01",
    },
    {
      candidateName: "Jane Smith",
      offerStatus: "Not Accepted",
      joiningDate: null, // No joining date for not accepted status
    },
    // Add more rows as needed
  ];

  return (
    <Grid item xs={12}>
      <Box flexGrow={1} display="flex" justifyContent="center">
        <h3
          style={{
            marginBottom: "1em",
            fontSize: "24px",
            color: "rgb(34, 34, 34)",
            fontWeight: 800,
          }}
        >
          Offer Status
        </h3>
      </Box>
      <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="offer status table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Candidate Name</StyledTableCell>
                <StyledTableCell align="center">Offer Status</StyledTableCell>
                <StyledTableCell align="center">Joining Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.candidateName}>
                  <TableCell align="center">{row.candidateName}</TableCell>
                  <TableCell align="center">{row.offerStatus}</TableCell>
                  <TableCell align="center">
                    {row.offerStatus === "Accepted" ? row.joiningDate : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
