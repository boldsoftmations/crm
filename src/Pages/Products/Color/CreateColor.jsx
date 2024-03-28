import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import ProductService from "../../../services/ProductService";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

export const CreateColor = (props) => {
  const { setOpenPopup, getColours } = props;
  const [colour, setColour] = useState("");
  const [open, setOpen] = useState(false);
  const {
    handleSuccess,
    handleError,
    openSnackbar,
    errorMessages,
    currentErrorIndex,
    handleCloseSnackbar,
  } = useNotificationHandling();

  const createColours = async (e) => {
    try {
      e.preventDefault();
      const req = {
        name: colour,
      };

      setOpen(true);
      await ProductService.createColour(req);

      setOpenPopup(false);
      handleSuccess();
      getColours();
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
      <Box component="form" noValidate onSubmit={(e) => createColours(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="colour"
              size="small"
              label="Colour"
              variant="outlined"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
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
          Submit
        </Button>
      </Box>
    </>
  );
};
