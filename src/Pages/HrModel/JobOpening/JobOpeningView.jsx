import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Popup } from "../../../Components/Popup";
import { JobOpeningCreate } from "./JobOpeningCreate";
import { JobOpeningUpdate } from "./JobOpeningUpdate";

export const JobOpeningView = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);

  const updateJobOpening = (updatedRecord) => {
    setJobOpenings((prevJobOpenings) =>
      prevJobOpenings.map((job) =>
        job.id === updatedRecord.id ? updatedRecord : job
      )
    );
    closeUpdatePopup();
  };
  const handleEditClick = (item) => {
    setRecordForEdit(item);
    setOpenUpdatePopup(true); // Open the update popup
  };
  const closeUpdatePopup = () => {
    setOpenUpdatePopup(false);
  };

  const handleAddJobOpeningClick = () => {
    setRecordForEdit(null); // Clear any previous records for editing
    setOpenCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setOpenCreatePopup(false);
  };

  const addNewJobOpening = (newJobOpening) => {
    setJobOpenings((prevJobOpenings) => [
      ...prevJobOpenings,
      { ...newJobOpening, id: Date.now() }, // Use Date.now() to generate a unique id
    ]);
    closeCreatePopup();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Openings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField size="small" label="Search" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJobOpeningClick} // Open popup on click
          >
            Add Job Opening
          </Button>
        </Grid>
      </Grid>

      {jobOpenings.map((job, index) => (
        <Accordion key={job.id} sx={{ mt: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>
              {index + 1}) {job.designation} - {job.department}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Location: {job.location}</Typography>
            <Typography>Position: {job.position}</Typography>
            <Typography>Salary Range: {job.salaryRange}</Typography>
            <Typography>Notes: {job.notes}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditClick(job)}
              sx={{ mt: 2 }}
            >
              Edit
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Popup
        title="Edit Job Opening"
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
      >
        <JobOpeningUpdate
          recordForEdit={recordForEdit}
          updateJobOpening={updateJobOpening}
          closePopup={closeUpdatePopup}
        />
      </Popup>
      <Popup
        title="Add New Job Opening"
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <JobOpeningCreate
          addNewJobOpening={addNewJobOpening}
          closePopup={closeCreatePopup}
        />
      </Popup>
    </Box>
  );
};
