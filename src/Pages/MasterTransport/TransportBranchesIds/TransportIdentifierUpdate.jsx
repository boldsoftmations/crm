import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import MasterService from "../../../services/MasterService";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";

function TransportIdentifierUpdate({
  recordForEdit,
  transporterId,
  branchOptions,
  getIdentifierData,
  setOpenPopup,
}) {
  const initialBranches =
    recordForEdit && Array.isArray(recordForEdit.branches)
      ? (branchOptions || []).filter((branch) =>
          recordForEdit.branches.includes(branch.id),
        )
      : [];

  const [formData, setFormData] = useState({
    is_primary:
      recordForEdit && typeof recordForEdit.is_primary === "boolean"
        ? recordForEdit.is_primary
        : false,
    is_active:
      recordForEdit && typeof recordForEdit.is_active === "boolean"
        ? recordForEdit.is_active
        : true,
    branches: initialBranches,
  });
  const [loading, setLoading] = useState(false);

  const { handleError, handleCloseSnackbar, alertInfo, handleSuccess } =
    useNotificationHandling();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recordForEdit || !recordForEdit.id) {
      handleError("No identifier selected to update.");
      return;
    }

    // The PATCH contract example only shows { is_active }. identifier_type
    // and identifier_value are intentionally left out of this update
    // payload - a government-issued number shouldn't normally be
    // silently rewritten from an edit form; deactivate and add a new one
    // instead if it was entered wrong. Only is_active/is_primary/branches
    // are sent here.
    const payload = {
      is_primary: formData.is_primary,
      is_active: formData.is_active,
      branches: formData.branches.map((branch) => branch.id),
    };

    try {
      setLoading(true);
      const response = await MasterService.updateTransportIdentifier(
        recordForEdit.id,
        payload,
      );
      const successMessage =
        (response && response.data && response.data.message) ||
        "Identifier updated successfully!";
      handleSuccess(successMessage);
      if (getIdentifierData) {
        getIdentifierData(transporterId);
      }
      setTimeout(() => {
        setOpenPopup(false);
      }, 300);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <CustomLoader open={loading} />
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled
            label="Identifier Type"
            value={recordForEdit ? recordForEdit.identifier_type : ""}
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled
            label="Identifier Value"
            value={recordForEdit ? recordForEdit.identifier_value : ""}
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            size="small"
            options={branchOptions || []}
            value={formData.branches}
            getOptionLabel={(option) => option.branch_name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) =>
              setFormData((prev) => ({ ...prev, branches: value }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Applicable Branches"
                placeholder="Select one or more branches"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            label="Primary"
            control={
              <Switch
                checked={formData.is_primary}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_primary: e.target.checked,
                  }))
                }
              />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            label="Active"
            control={
              <Switch
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
              />
            }
          />
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
        Update Identifier
      </Button>
    </Box>
  );
}

export default TransportIdentifierUpdate;
