import React, { useState } from "react";
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
import { ApplicantListCreate } from "./ApplicantListCreate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const ApplicantListView = () => {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);

  const handleCandidateCreated = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
    setIsCreatePopupOpen(false);
  };
  const fullPagePopupStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // Ensure it's above other items
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const popupContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "80%",
    maxWidth: "500px",
    height: "auto",
    zIndex: 1001,
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="10px"
        >
          <Box flexGrow={1} display="flex" justifyContent="center">
            <h3
              style={{
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
              }}
            >
              Applicant List
            </h3>
          </Box>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            Add Candidate
          </button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Name Of Candidate
                </StyledTableCell>
                <StyledTableCell align="center">Email Address</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* The candidates mapping will be removed since we're not using static data */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {isCreatePopupOpen && (
        <div style={fullPagePopupStyle}>
          <div style={popupContentStyle}>
            <button onClick={() => setIsCreatePopupOpen(false)}>X</button>
            {/* Pass the callback function to the ApplicantListCreate component */}
            <ApplicantListCreate onCandidateCreated={handleCandidateCreated} />
          </div>
        </div>
      )}
    </Grid>
  );
};
