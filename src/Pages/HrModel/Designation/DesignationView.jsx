import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { Popup } from "../../../Components/Popup";
import { DesignationCreate } from "./DesignationCreate";
import { DesignationUpdate } from "./DesignationUpdate";
import { CustomTable } from "../../../Components/CustomTable";
import Hr from "./../../../services/Hr";
export const DesignationView = () => {
  const [designations, setDesignations] = useState([]);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(false);

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await Hr.getDesignations();
      setDesignations(response.data);
    } catch (error) {
      console.error("Failed to fetch designations", error);
    }
  };

  // Add new designation
  const addNewDesignation = async (newDesignationName) => {
    try {
      await Hr.addDesignation(newDesignationName);
      fetchDesignations(); // Refetch the designations
      setOpenCreatePopup(false);
    } catch (error) {
      console.error("Failed to add designation", error);
    }
  };

  const handleAddDesignationClick = () => setOpenCreatePopup(true);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenUpdatePopup(true);
  };

  const TableHeader = ["ID", "Designation", "Action"];
  const TableData = designations.map((designation) => ({
    id: designation.id,
    name: designation.designation,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Designations
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDesignationClick}
          >
            Add Designation
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
        title="Add New Designation"
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <DesignationCreate addNewDesignation={addNewDesignation} />
      </Popup>
      <Popup
        title="Edit Designation"
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
      >
        <DesignationUpdate
          designationId={recordForEdit}
          setOpenUpdatePopup={setOpenUpdatePopup}
          fetchDesignations={fetchDesignations}
        />
      </Popup>
    </Box>
  );
};
