import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Autocomplete,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Hr from "../../../services/Hr";

export const ApplicantListUpdate = ({
  recordForEdit,
  updateApplicant,
  onApplicantUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    qualification: "",
    candidate_source: "",
    current_location: "",
    current_salary: "",
    expected_salary: "",
    spoken_english: "",
    shortlisted: false,
  });
  useEffect(() => {
    if (recordForEdit) {
      setFormData({ ...recordForEdit });
    }
  }, [recordForEdit]);
  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target || {};

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue !== undefined ? newValue : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Hr.updateApplicant(recordForEdit.id, formData);
      console.log("Applicant updated successfully");
      onApplicantUpdated(); // Call the callback function after successful update
    } catch (error) {
      console.error("Error updating applicant:", error);
    }
  };
  const spokenEnglishOptions = ["Bad", "Average", "Good"];

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        height: "70vh",
        overflowY: "auto",
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Update Applicant
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name of Candidate"
              name="name"
              fullWidth
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="contact"
              fullWidth
              value={formData.contact || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Highest Education Qualification"
              name="qualification"
              fullWidth
              value={formData.qualification || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="candidate_source"
              label="Candidate Source"
              name="candidate_source"
              value={formData.candidate_source || ""}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Location"
              name="current_location"
              value={formData.current_location || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Current Salary"
              name="current_salary"
              fullWidth
              value={formData.current_salary || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Expected Salary"
              name="expected_salary"
              fullWidth
              value={formData.expected_salary || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="interested"
              options={["Yes", "No", "CallBackLater"]}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Interested" />
              )}
              value={formData.is_interested || ""}
              onChange={(event, newValue) => {
                handleInputChange(event, newValue);
                if (newValue === "No") {
                  setFormData({
                    ...formData,
                    noReason: "",
                  });
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="spoken_english"
              options={spokenEnglishOptions}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Spoken English" />
              )}
              value={formData.spoken_english || ""}
              onChange={(event, newValue) => {
                handleInputChange(event, newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.shortlisted || ""}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      shortlisted: event.target.checked,
                    });
                  }}
                  name="shortlisted"
                />
              }
              label="Shortlisted"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update Applicant
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
