import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export const InterviewStatusUpdate = () => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = () => {};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Interview Status Update
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name of Candidate"
              value="Candidate Name"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              value="123-456-7890"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              value="candidate@example.com"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Highest Education Qualification"
              value="Qualification Details"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Candidate Source"
              value="Source Details"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Current Location"
              value="Location Details"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Current Salary"
              value="Current Salary"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary Negotiable"
              value="Yes/No"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Salary Type</InputLabel>
              <Select defaultValue="in_hand">
                <MenuItem value="in_hand">In Hand</MenuItem>
                <MenuItem value="ctc">CTC</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Notice Period Negotiable" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Final Offer (CTC)" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Rejection Reason</InputLabel>
              <Select defaultValue="">
                <MenuItem value="not_interested">
                  Candidate is not interested in the offer, wants a higher offer
                </MenuItem>
                <MenuItem value="negative_reference">
                  Candidate had a negative reference
                </MenuItem>
                <MenuItem value="incorrect_salary">
                  Candidate didn’t give correct last salary
                </MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <Typography variant="subtitle1">References</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reference Check"
                helperText="HR Recruiter must call the reference for checking"
                fullWidth
                // Add state management for value if needed
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Reference Response</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="unknown_person">
                    I don’t know this person so well or remember him/her
                  </MenuItem>
                  <MenuItem value="good_candidate">Good Candidate</MenuItem>
                  <MenuItem value="bad_candidate">Bad Candidate</MenuItem>
                  <MenuItem value="cannot_connect">
                    Cannot connect to reference person
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Salary Verification"
                helperText="HR Recruiter must verify the salary slip / bank statement / old offer letter"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Final Offer (CTC)" fullWidth />
            </Grid>
            <Grid item xs={14}>
              <Grid>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Updated Rejection Reasons Dropdown */}
            {status === "Rejected" && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Rejection Reason</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="not_interested">
                      Candidate is not interested in the offer, wants a higher
                      offer
                    </MenuItem>
                    <MenuItem value="negative_reference">
                      Candidate had a negative reference
                    </MenuItem>
                    <MenuItem value="incorrect_salary">
                      Candidate didn’t give correct last salary
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
