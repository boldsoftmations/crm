import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export const JobOpeningCreate = ({ addNewJobOpening }) => {
  const [newJobOpening, setNewJobOpening] = useState({
    designation: "",
    department: "",
    location: "",
    position: "",
    salary_ranges: "",
    notes: "",
  });

  const locations = [
    "Andheri Head Office",
    "Andheri Sales Office",
    "Bhiwandi Factory",
    "Delhi Factory",
  ];

  const salaryRange = [
    "60,000.00 - 1,20,000.00",
    "1,20,000.00 - 1,80,000.00",
    "1,80,000.00 - 2,40,000.00",
    "2,40,000.00 - 3,00,000.00",
    "3,00,000.00 - 3,60,000.00",
    "3,60,000.00 - 4,80,000.00",
    "4,80,000.00 - 6,00,000.00",
    "7,20,000.00 - 9,60,000.00",
    "9,60,000.00 - 12,00,000.00",
    "12,00,000.00 - 15,00,000.00",
    "15,00,000.00 - 18,00,000.00",
    "18,00,000.00 - 21,00,000.00",
    "21,00,000.00 - 24,00,000.00",
    "24,00,000.00 - Above",
  ];

  const handleInputChange = (event, newValue) => {
    const value = newValue || event.target.value; // Use logical OR instead of nullish coalescing
    const name = event.target.name || event.target.id.split("-")[0];
    setNewJobOpening({ ...newJobOpening, [name]: value });
  };

  const handleSubmit = () => {
    addNewJobOpening(newJobOpening);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Add New Job Opening
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Designation"
            name="designation"
            fullWidth
            value={newJobOpening.designation}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Department"
            name="department"
            fullWidth
            value={newJobOpening.department}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="location"
            options={locations}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Location" />}
            value={newJobOpening.location}
            onChange={(event, newValue) => {
              handleInputChange(event, newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Position"
            name="position"
            fullWidth
            value={newJobOpening.position}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            id="salary_ranges"
            options={salaryRange}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Salary Range" />
            )}
            value={newJobOpening.salary_ranges}
            onChange={(event, newValue) => {
              handleInputChange(event, newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            name="notes"
            fullWidth
            multiline
            rows={4}
            value={newJobOpening.notes}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Job Opening
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
