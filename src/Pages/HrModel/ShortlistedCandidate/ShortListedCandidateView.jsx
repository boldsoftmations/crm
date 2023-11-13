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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { ShortListedCandidateUpdate } from "./ShortListedCandidateUpdate"; // Make sure to create this component

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const ShortListedCandidateView = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Static data for the table
  const rows = [
    {
      candidateName: "John Doe",
      designation: "Software Engineer",
      location: "New York",
      status: "Offer Sent",
    },
    {
      candidateName: "Jane Smith",
      designation: "Product Manager",
      location: "San Francisco",
      status: "Offer Not Sent",
    },
    {
      candidateName: "Anna",
      designation: "Python Developer",
      location: "Texas",
      status: "Offer Sent",
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
          Shortlisted Candidates
        </h3>
      </Box>
      <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="shortlisted candidates table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Candidate Name</StyledTableCell>
                <StyledTableCell align="center">Designation</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.candidateName}>
                  <TableCell align="center">{row.candidateName}</TableCell>
                  <TableCell align="center">{row.designation}</TableCell>
                  <TableCell align="center">{row.location}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(row)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Candidate Status Update
        </DialogTitle>
        <DialogContent>
          <ShortListedCandidateUpdate
            row={selectedRow}
            closeDialog={handleClose}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
