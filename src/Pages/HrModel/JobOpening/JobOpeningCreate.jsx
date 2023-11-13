import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export const JobOpeningCreate = ({ addNewJobOpening, closePopup }) => {
  const [newJobOpening, setNewJobOpening] = useState({
    designation: "",
    department: "",
    location: "",
    position: "",
    salaryRange: "",
    notes: "",
  });

  const locations = [
    "Andheri Head Office",
    "Andheri Sales Office",
    "Bhivandi Factory",
    "Delhi Factory",
  ];

  const salaryRanges = [
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
    closePopup();
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
            id="salaryRange"
            options={salaryRanges}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Salary Range" />
            )}
            value={newJobOpening.salaryRange}
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
          <Button variant="text" onClick={closePopup} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
