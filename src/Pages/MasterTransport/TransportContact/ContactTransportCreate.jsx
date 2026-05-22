import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

import MasterService from "../../../services/MasterService";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

const initialFormState = {
  transporter: "",
  unit: "",
  city: "",
  contact_person: "",
  designation_role: "",
  mobile_number: "",
};

const TransportContactCreate = ({ getTransportContactData, setOpenPopup }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  // All transport mapping records
  const [mappingData, setMappingData] = useState([]);

  // Derived options filtered by selected transporter
  const [transporterOptions, setTransporterOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const { handleError, handleCloseSnackbar, alertInfo, handleSuccess } =
    useNotificationHandling();

  const getTransportMappingData = async () => {
    try {
      const response = await MasterService.getTransportMapping(false, 1, "");
      if (response && response.data && response.data.results) {
        const results = response.data.results;
        setMappingData(results);

        // Build unique transporter list from mapping data
        const seen = {};
        const uniqueTransporters = [];
        results.forEach((item) => {
          if (!seen[item.transporter]) {
            seen[item.transporter] = true;
            uniqueTransporters.push({
              transporter: item.transporter,
            });
          }
        });
        setTransporterOptions(uniqueTransporters);
      } else {
        setMappingData([]);
        setTransporterOptions([]);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getMasterCities = async () => {
    try {
      setLoading(true);
      const response = await MasterService.getMasterCities();
      setCityOptions(response.data.results);
    } catch (e) {
      //   setAlertMsg({
      //     message: e.response.data.message || "Error fetching countries",
      //     severity: "error",
      //     open: true,
      //   });
      handleError(e.response.data.message || "Error fetching countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTransportMappingData().finally(() => setLoading(false));
    getMasterCities();
  }, []);

  // When transporter changes — filter unit and city from mapping data
  // and auto-fill if only one match exists
  const handleTransporterChange = (value) => {
    const transporterName = value ? value.transporter : "";

    // Reset unit and city whenever transporter changes
    setFormData((prev) => ({
      ...prev,
      transporter: transporterName,
      unit: "",
    }));

    if (!transporterName) {
      setUnitOptions([]);
      setCityOptions([]);
      return;
    }

    // Filter all mapping rows for the selected transporter
    const filtered = mappingData.filter(
      (item) => item.transporter === transporterName,
    );

    // Build unique unit options
    const seenUnits = {};
    const units = [];
    filtered.forEach((item) => {
      if (item.unit && !seenUnits[item.unit]) {
        seenUnits[item.unit] = true;
        units.push({ unit: item.unit });
      }
    });

    // Build unique city options
    const seenCities = {};

    setUnitOptions(units);

    // Auto-fill unit only if single option exists; city is always manually selected
    setFormData((prev) => ({
      ...prev,
      transporter: transporterName,
      unit: units.length === 1 ? units[0].unit : "",
      // always reset — user must select manually
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await MasterService.createTransportContact(formData);

      handleSuccess("Transporter contact created successfully");

      setTimeout(() => {
        setOpenPopup(false);
        getTransportContactData();
      }, 1000);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setUnitOptions([]);
    setCityOptions([]);
  };

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

      <CustomLoader open={loading} />

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 1 }}>
        <Grid container spacing={2}>
          {/* Transporter */}
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              fullWidth
              size="small"
              options={transporterOptions}
              value={
                transporterOptions.find(
                  (opt) => opt.transporter === formData.transporter,
                ) || null
              }
              getOptionLabel={(option) =>
                option.transporter ? option.transporter : option
              }
              onChange={(e, value) => handleTransporterChange(value)}
              label="Transporter"
              required
            />
          </Grid>

          {/* Unit — auto-filled or selectable from filtered options */}
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              fullWidth
              size="small"
              options={unitOptions}
              value={
                unitOptions.find((opt) => opt.unit === formData.unit) || null
              }
              getOptionLabel={(option) => (option.unit ? option.unit : option)}
              onChange={(e, value) =>
                handleAutocompleteChange("unit", value ? value.unit : "")
              }
              label="Unit"
              required
              disabled={!formData.transporter}
            />
          </Grid>

          {/* City — auto-filled or selectable from filtered options */}
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              fullWidth
              size="small"
              options={cityOptions.map((item) => item.state_name)}
              value={formData.city}
              //   onChange={handleChange}
              label="City"
              onChange={(e, value) =>
                handleAutocompleteChange("city", value ? value : "")
              }
              required
              disabled={!formData.transporter}
            />
          </Grid>

          {/* Contact Person */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Contact Person"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              size="small"
            />
          </Grid>

          {/* Designation / Role */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Designation / Role"
              name="designation_role"
              value={formData.designation_role}
              onChange={handleChange}
              size="small"
            />
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Mobile Number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              size="small"
              placeholder="+919087675434"
              inputProps={{ maxLength: 13 }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}
        >
          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TransportContactCreate;
