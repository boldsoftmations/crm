import React, { useState } from "react";
import {
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

export const ShortListedCandidateUpdate = ({ row, closeDialog }) => {
  const [offerStatus, setOfferStatus] = useState(row.status);

  const handleStatusChange = (event) => {
    setOfferStatus(event.target.value);
  };

  const handleUpdate = () => {
    // Here you can add logic to update the status in your backend or state
    console.log(`Status updated for ${row.candidateName} to ${offerStatus}`);
    closeDialog();
  };

  return (
    <>
      <DialogContentText>
        Update the offer status for {row.candidateName}.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="status"
        label="Offer Status"
        type="text"
        fullWidth
        select
        SelectProps={{
          native: true,
        }}
        value={offerStatus}
        onChange={handleStatusChange}
      >
        <option value="Offer Sent">Offer Sent</option>
        <option value="Offer Not Sent">Offer Not Sent</option>
      </TextField>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </>
  );
};
