import React, { useState } from "react";
import CustomSnackbar from "../../../Components/CustomerSnackbar";
import { CustomLoader } from "../../../Components/CustomLoader";
import { Button, Container, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomerServices from "../../../services/CustomerService";

const UpdateSRFStatus = ({ setOpenPopup, getCustomerSRF, recordData }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const handleCloseSnackbar = () =>
    setAlertMsg((prev) => ({ ...prev, open: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      setAlertMsg({
        open: true,
        message: "Please select a status",
        severity: "warning",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await CustomerServices.updateCustomerSRfStatus(
        recordData.id,
        { status }
      );

      if (res.status === 200) {
        setAlertMsg({
          open: true,
          message: res.data.message || "SRF status updated successfully!",
          severity: "success",
        });
        setTimeout(() => {
          setOpenPopup(false);
          getCustomerSRF();
        }, 500);
      }
    } catch (error) {
      console.error("Error updating SRF status:", error);
      setAlertMsg({
        open: true,
        message: "Failed to update SRF status.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="form" onSubmit={handleSubmit} noValidate>
      <CustomSnackbar
        open={alertMsg.open}
        message={alertMsg.message}
        severity={alertMsg.severity}
        onClose={handleCloseSnackbar}
      />
      <CustomLoader open={isLoading} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            value={recordData.srf_no || ""}
            label="SRF No"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            label="Customer"
            value={recordData.customer || ""}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <CustomAutocomplete
            name="status"
            size="small"
            disablePortal
            value={status}
            id="combo-box-description"
            onChange={(_, value) => setStatus(value)}
            options={["Dispatched", "Not Available"]}
            getOptionLabel={(option) => option}
            label="Status"
          />
        </Grid>

        <Grid item xs={12}>
          <Button color="success" variant="contained" type="submit" fullWidth>
            Update Status
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateSRFStatus;
