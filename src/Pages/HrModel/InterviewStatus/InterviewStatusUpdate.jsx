import React, { useState } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import Hr from "../../../services/Hr";

export const InterviewStatusUpdate = ({ closeDialog, id }) => {
  const [interviewDetails, setInterviewDetails] = useState({
    id: id,
    date: "",
    time: "",
    interviewer: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedInterviewDate = {
      date: interviewDetails.date,
      time: interviewDetails.time,
      interviewer: interviewDetails.interviewer,
    };

    try {
      await Hr.updateInterviewDate(id, updatedInterviewDate);
      console.log("Interview details updated successfully");
    } catch (error) {
      console.error("Error updating interview details:", error);
    }

    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Interview Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              name="date"
              value={interviewDetails.date}
              onChange={(e) =>
                setInterviewDetails({
                  ...interviewDetails,
                  date: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Interview Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              name="time"
              value={interviewDetails.time}
              onChange={(e) =>
                setInterviewDetails({
                  ...interviewDetails,
                  time: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Interviewer's Name"
              name="interviewer"
              value={interviewDetails.interviewer}
              onChange={(e) =>
                setInterviewDetails({
                  ...interviewDetails,
                  interviewer: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Interview Status
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
