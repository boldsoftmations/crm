import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import Hr from "../../../services/Hr";

export const DepartmentUpdate = ({
  departmentId,
  setOpenUpdatePopup,
  fetchDepartments,
}) => {
  const [department, setDepartment] = useState(departmentId.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Hr.updateDepartment(departmentId.id, { department });
      fetchDepartments();
      setOpenUpdatePopup(false);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Department Name"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Update Department
          </Button>
        </div>
      </Box>
    </form>
  );
};
