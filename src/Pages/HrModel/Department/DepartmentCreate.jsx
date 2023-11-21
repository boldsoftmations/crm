import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const DepartmentCreate = ({ addNewDepartment }) => {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewDepartment(departmentName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Department Name"
          variant="outlined"
          required
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Department
        </Button>
      </Box>
    </form>
  );
};
