import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import MasterService from "../../../services/MasterService";
import CustomSnackbar from "../../../Components/CustomerSnackbar";

const STATUS_OPTIONS = ["Open", "In Progress", "Closed", "Rejected"];

const UpdateTransportRef = ({
  dataForEdit,
  setOpenEditPopup,
  getTransportRefData,
}) => {
  const [pincodeText, setPincodeText] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Open");
  const [isSaving, setIsSaving] = useState(false);
  const [alertmsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    if (dataForEdit) {
      setPincodeText(dataForEdit.pincode_text ? dataForEdit.pincode_text : "");
      setRemarks(dataForEdit.remarks ? dataForEdit.remarks : "");
      setStatus(dataForEdit.status ? dataForEdit.status : "Open");
    }
  }, [dataForEdit]);

  const handleClose = () => {
    setAlertMsg({ open: false });
  };

  const handleSubmit = async () => {
    if (!dataForEdit || !dataForEdit.id) {
      setAlertMsg({
        message: "No record selected to update",
        severity: "error",
        open: true,
      });
      return;
    }

    const payload = {
      pincode_text: pincodeText,
      remarks: remarks,
      status: status,
    };

    try {
      setIsSaving(true);
      await MasterService.UpdateMasterRefRequest(dataForEdit.id, payload);
      setAlertMsg({
        message: "Transport reference updated successfully",
        severity: "success",
        open: true,
      });
      if (getTransportRefData) {
        getTransportRefData();
      }
      if (setOpenEditPopup) {
        setOpenEditPopup(false);
      }
    } catch (e) {
      setAlertMsg({
        message:
          e.response && e.response.data && e.response.data.message
            ? e.response.data.message
            : "Error updating transport reference",
        severity: "error",
        open: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <CustomSnackbar
        open={alertmsg.open}
        message={alertmsg.message}
        severity={alertmsg.severity}
        onClose={handleClose}
      />
      <Box sx={{ p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Company"
              value={
                dataForEdit && dataForEdit.company ? dataForEdit.company : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Unit"
              value={dataForEdit && dataForEdit.unit ? dataForEdit.unit : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="PI Number"
              value={
                dataForEdit && dataForEdit.pi_number
                  ? dataForEdit.pi_number
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Canonical Pincode"
              value={
                dataForEdit && dataForEdit.canonical_pincode
                  ? dataForEdit.canonical_pincode
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Pincode (Text)"
              value={pincodeText}
              onChange={(e) => setPincodeText(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Remarks"
              multiline
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                disabled={isSaving}
                onClick={() => {
                  if (setOpenEditPopup) {
                    setOpenEditPopup(false);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={isSaving}
                onClick={handleSubmit}
              >
                {isSaving ? <CircularProgress size={20} /> : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UpdateTransportRef;
