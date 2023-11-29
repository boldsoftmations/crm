import React, { useState } from "react";
import { Button, TextField, DialogActions, Autocomplete } from "@mui/material";
import Hr from "../../../services/Hr";

export const ShortListedCandidateUpdate = ({ row, closeDialog }) => {
  const [interviewDate, setInterviewDate] = useState(row.interview_date || "");
  const [interviewTime, setInterviewTime] = useState(row.interview_time || "");
  const [interviewerName, setInterviewerName] = useState(
    row.interviewer_name || ""
  );
  const [stage, setStage] = useState(row.stage || "");
  const handleUpdate = async () => {
    const updatedInterviewDetails = {
      date: interviewDate,
      time: interviewTime,
      interviewer_name: interviewerName,
      stage: stage,
    };

    try {
      await Hr.updateInterviewDate(row.id, updatedInterviewDetails);
      closeDialog();
    } catch (error) {
      console.error("Error updating interview details:", error);
    }
  };

  const stageOptions = [
    "Selected",
    "Scheduled",
    "On Hold",
    "Rejected",
    "Not Interested",
    "Postponed",
  ];
  return (
    <>
      <Autocomplete
        value={stage}
        onChange={(event, newValue) => {
          setStage(newValue);
        }}
        options={stageOptions}
        renderInput={(params) => (
          <TextField {...params} label="Stage" margin="dense" fullWidth />
        )}
      />
      <TextField
        margin="dense"
        label="Interview Date"
        type="date"
        fullWidth
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Interview Time"
        type="time"
        fullWidth
        value={interviewTime}
        onChange={(e) => setInterviewTime(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Interviewer Name"
        type="text"
        fullWidth
        value={interviewerName}
        onChange={(e) => setInterviewerName(e.target.value)}
      />
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </>
  );
};
