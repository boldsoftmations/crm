import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const DesignationCreate = ({ addNewDesignation }) => {
  const [newDesignation, setNewDesignation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewDesignation(newDesignation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Designation"
          variant="outlined"
          value={newDesignation}
          onChange={(e) => setNewDesignation(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Designation
        </Button>
      </Box>
    </form>
  );
};
