import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";

export const ApplicantListCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    highestEducation: "",
    candidateSource: "",
    interested: "",
    noReason: "",
    interestedDesignation: "",
    noticePeriod: "",
    currentLocation: "",
    willingToRelocate: false,
    currentSalary: "",
    expectedSalary: "",
    latestCompany: "",
    spokenEnglish: "",
    stage: "",
    rejectionComment: "",
  });

  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target || {};

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue !== undefined ? newValue : value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const reasonsForNoOptions = ["Reason 1", "Reason 2", "Reason 3"];

  const spokenEnglishOptions = ["Bad", "Average", "Good"];
  const stageOptions = ["Shortlisted", "Rejected"];

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
          Create Applicant
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name of Candidate"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="emailAddress"
              fullWidth
              value={formData.emailAddress}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Highest Education Qualification"
              name="highestEducation"
              fullWidth
              value={formData.highestEducation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="candidateSource"
              label="Candidate Source"
              name="candidateSource"
              value={formData.candidateSource}
              onChange={handleInputChange} // Use the updated function here
              margin="normal"
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
              value={formData.interested}
              onChange={(event, newValue) => {
                handleInputChange(event, newValue);
                if (newValue === "No") {
                  setFormData({
                    ...formData,
                    noReason: "", // Clear the "noReason" field when "No" is selected
                  });
                }
              }}
            />
          </Grid>

          {formData.interested === "No" && (
            <Grid item xs={12}>
              <Autocomplete
                id="noReason"
                options={reasonsForNoOptions}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Reason" />
                )}
                value={formData.noReason}
                onChange={(event, newValue) => {
                  handleInputChange(event, newValue);
                }}
              />
            </Grid>
          )}
          {formData.noReason ===
            "Not Looking to work in this profile, can consider for other type of profile" && (
            <Grid item xs={12}>
              <TextField
                id="interestedDesignation"
                label="Interested Designation"
                fullWidth
                value={formData.interestedDesignation}
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.willingToRelocate}
                  onChange={handleCheckboxChange}
                  name="willingToRelocate"
                />
              }
              label="Willing to Relocate"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="spokenEnglish"
              options={spokenEnglishOptions}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Spoken English" />
              )}
              value={formData.spokenEnglish}
              onChange={(event, newValue) => {
                handleInputChange(event, newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="stage"
              options={stageOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Stage" />}
              value={formData.stage}
              onChange={(event, newValue) => {
                handleInputChange(event, newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Applicant
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
