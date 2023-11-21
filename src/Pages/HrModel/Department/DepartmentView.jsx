import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { Popup } from "../../../Components/Popup";
import { DepartmentCreate } from "./DepartmentCreate";
import { DepartmentUpdate } from "./DepartmentUpdate";
import { CustomTable } from "../../../Components/CustomTable";
import Hr from "../../../services/Hr";

export const DepartmentView = () => {
  const [departments, setDepartments] = useState([]);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await Hr.getDepartment();
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const addNewDepartment = async (newDepartmentName) => {
    try {
      await Hr.addDepartment(newDepartmentName);
      fetchDepartments();

      setOpenCreatePopup(false);
    } catch (error) {
      console.error("Failed to add department", error);
    }
  };

  const handleAddDepartmentClick = () => setOpenCreatePopup(true);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenUpdatePopup(true);
  };
  const TableHeader = ["ID", "Department", "Action"];
  const TableData = departments.map((department) => ({
    id: department.id,
    name: department.department,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDepartmentClick}
          >
            Add Department
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ p: 2, m: 3 }}>
        <CustomTable
          headers={TableHeader}
          data={TableData}
          openInPopup={openInPopup}
        />
      </Paper>
      <Popup
        title="Add New Department"
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <DepartmentCreate addNewDepartment={addNewDepartment} />
      </Popup>
      <Popup
        title="Edit Department"
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
      >
        <DepartmentUpdate
          departmentId={recordForEdit}
          setOpenUpdatePopup={setOpenUpdatePopup}
          fetchDepartments={fetchDepartments}
        />
      </Popup>
    </Box>
  );
};
