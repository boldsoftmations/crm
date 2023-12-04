import React, { useState, useEffect } from "react";
import {
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import Hr from "../../../services/Hr";

export const OfferStatusUpdate = ({ row, closeDialog, onUpdateComplete }) => {
  const [status, setStatus] = useState(row ? row.status : "");
  const [joiningDate, setJoiningDate] = useState(
    row && row.joining_date ? row.joining_date : null
  );

  const offerStatusOptions = ["Accepted", "Rejected", "Sent"];

  useEffect(() => {
    if (status === "Rejected") {
      setJoiningDate("");
    }
  }, [status]);

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
  };

  const handleDateChange = (event) => {
    setJoiningDate(event.target.value);
  };

  const handleUpdate = async () => {
    const updatedOfferStatus = {
      offer_status: status,
      joining_date: joiningDate || null,
    };
    try {
      await Hr.updateOfferStatus(row.id, updatedOfferStatus);
      onUpdateComplete();
      closeDialog();
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          value={status}
          onChange={handleStatusChange}
          options={offerStatusOptions}
          renderInput={(params) => (
            <TextField {...params} label="Offer Status" />
          )}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Joining Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={joiningDate}
          onChange={handleDateChange}
          disabled={status === "Rejected"} // Disable date input if status is "Rejected"
        />
      </Grid>
      <Grid item xs={12}>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Grid>
    </Grid>
  );
};