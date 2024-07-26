import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import CustomSnackbar from "../../../Components/CustomerSnackbar";
import CustomerServices from "../../../services/CustomerService";
import { CustomLoader } from "../../../Components/CustomLoader";

const CreateCapa = ({ recordForEdit, setOpenCapa }) => {
  const [formData, setFormData] = useState({
    ccf: recordForEdit && recordForEdit.id,
    complaint: "",
    root_cause: "",
    cap: "",
    pap: "",
    ev: "",
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.complaint) tempErrors.complaint = "Complaint is required.";
    if (!formData.root_cause) tempErrors.root_cause = "Root Cause is required.";
    if (!formData.cap) tempErrors.cap = "Corrective Action Plan is required.";
    if (!formData.pap) tempErrors.pap = "Preventive Action Plan is required.";
    if (!formData.ev) tempErrors.ev = "Effectiveness Verified is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      setLoader(true);
      const response = await CustomerServices.CreateCapa(formData);
      setMessage(response.data.message);
      setSeverity("success");
      setOpen(true);
      setLoader(false);
      setOpenCapa(false); // Close the form dialog if submission is successful
    } catch (error) {
      console.log(error);
      setMessage(error.message || "Error creating CPA");
      setSeverity("error");
      setOpen(true);
    } finally {
      setLoader(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <CustomSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
      <CustomLoader open={loader} />
      <Card elevation={3} sx={{ marginTop: 1 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Complaint No."
                  name="ccf"
                  value={formData.ccf}
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                  error={!!errors.ccf}
                  helperText={errors.ccf}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  label="Complaint"
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  error={!!errors.complaint}
                  helperText={errors.complaint}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  label="Root Cause"
                  name="root_cause"
                  value={formData.root_cause}
                  onChange={handleChange}
                  error={!!errors.root_cause}
                  helperText={errors.root_cause}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  label="Corrective Action Plan"
                  name="cap"
                  value={formData.cap}
                  onChange={handleChange}
                  error={!!errors.cap}
                  helperText={errors.cap}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  label="Preventive Action Plan"
                  name="pap"
                  value={formData.pap}
                  onChange={handleChange}
                  error={!!errors.pap}
                  helperText={errors.pap}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  label="Effectiveness Verified"
                  name="ev"
                  value={formData.ev}
                  onChange={handleChange}
                  error={!!errors.ev}
                  helperText={errors.ev}
                />
              </Grid>
            </Grid>
            <Grid sx={12} style={{ marginTop: "2rem" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateCapa;
