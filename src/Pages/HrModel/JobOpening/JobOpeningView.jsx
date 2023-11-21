import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { Popup } from "../../../Components/Popup";
import { JobOpeningCreate } from "./JobOpeningCreate";
import { JobOpeningUpdate } from "./JobOpeningUpdate";
import { CustomTable } from "../../../Components/CustomTable";
import Hr from "./../../../services/Hr";

export const JobOpeningView = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [editJobOpening, setEditJobOpening] = useState({});
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(false);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenUpdatePopup(true);
  };

  const fetchJobOpenings = async () => {
    try {
      const response = await Hr.getJobOpening();
      setJobOpenings(response.data);
    } catch (error) {
      console.error("Error fetching job openings:", error);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const addNewJobOpening = async (newJob) => {
    try {
      await Hr.addJobOpening(newJob);
      fetchJobOpenings();
      setOpenCreatePopup(false);
    } catch (error) {
      console.error("Error adding job opening:", error);
    }
  };

  const updateJobOpening = async (id, updates) => {
    try {
      await Hr.updateJobOpening(id, updates);
      fetchJobOpenings();
      setOpenEditPopup(false);
    } catch (error) {
      console.error("Error updating job opening:", error);
    }
  };

  const handleAddJobOpeningClick = () => setOpenCreatePopup(true);
  const handleEditJobOpeningClick = (job) => {
    setEditJobOpening(job);
    setOpenUpdatePopup(true);
  };

  const TableHeader = [
    "ID",
    "Designation",
    "Department",
    "Location",
    "Salary Range",
    "Action",
  ];
  const TableData = jobOpenings.map((job) => ({
    id: job.id,
    designation: job.designation,
    department: job.department,
    location: job.location,
    salary_ranges: job.salary_ranges,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Openings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJobOpeningClick}
          >
            Add Job Opening
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ p: 2, m: 3 }}>
        <CustomTable
          headers={TableHeader}
          data={TableData}
          openInPopup={openInPopup}
          onEdit={handleEditJobOpeningClick}
        />
      </Paper>
      <Popup
        title="Add New Job Opening"
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <JobOpeningCreate addNewJobOpening={addNewJobOpening} />
      </Popup>
      <Popup
        title="Edit Job Opening"
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
      >
        <JobOpeningUpdate
          recordForEdit={recordForEdit}
          updateJobOpening={updateJobOpening}
          setOpenUpdatePopup={setOpenUpdatePopup}
          fetchJobOpenings={fetchJobOpenings}
        />
      </Popup>
    </Box>
  );
};
