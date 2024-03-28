import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import ProductService from "../../../services/ProductService";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

export const UpdateColor = (props) => {
  const { recordForEdit, setOpenPopup, getColours } = props;
  const [open, setOpen] = useState(false);
  const [colour, setColour] = useState(recordForEdit);
  const {
    handleSuccess,
    handleError,
    openSnackbar,
    errorMessages,
    currentErrorIndex,
    handleCloseSnackbar,
  } = useNotificationHandling();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setColour({ ...colour, [name]: value });
  };

  const updateColour = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = {
        name: colour.name,
      };
      if (recordForEdit) {
        await ProductService.updateColour(colour.id, data);
        setOpenPopup(false);
        handleSuccess();
        getColours();
      }
    } catch (error) {
      handleError(error); // Handle errors from the API call
    } finally {
      setOpen(false); // Always close the loader
    }
  };

  return (
    <>
      <MessageAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity="error"
        message={errorMessages[currentErrorIndex]}
      />
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={(e) => updateColour(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              label="Id"
              variant="outlined"
              value={recordForEdit.id || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="name"
              size="small"
              label="Colour"
              variant="outlined"
              value={colour.name || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </>
  );
};
