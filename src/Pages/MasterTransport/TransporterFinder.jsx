import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { CustomLoader } from "../../Components/CustomLoader";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import CustomTextField from "../../Components/CustomTextField";
import CustomerServices from "../../services/CustomerService";
import InvoiceServices from "../../services/InvoiceService";
import MasterService from "../../services/MasterService";

const getArrayData = (response) => {
  if (!response || !response.data) {
    return [];
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.results)) {
    return response.data.results;
  }

  return [];
};

const getIndiaOption = (countries) => {
  if (!Array.isArray(countries)) {
    return null;
  }

  return (
    countries.find(
      (item) =>
        item && item.name && String(item.name).toLowerCase() === "india",
    ) || null
  );
};

export const TransporterFinder = () => {
  const [loading, setLoading] = useState(false);

  const [countryOptions, setCountryOptions] = useState([]);
  const [sellerOptions, setSellerOptions] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [pincode, setPincode] = useState("");

  const [searched, setSearched] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [verifiedPincode, setVerifiedPincode] = useState("");
  const [message, setMessage] = useState({
    severity: "",
    text: "",
  });

  const clearSearchResult = () => {
    setSearched(false);
    setResultData([]);
    setVerifiedPincode("");
    setMessage({
      severity: "",
      text: "",
    });
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const responses = await Promise.all([
        MasterService.getAllMasterCountries("all"),
        InvoiceServices.getAllPaginateSellerAccountData("all"),
      ]);

      const countries = getArrayData(responses[0]);
      const sellers = getArrayData(responses[1]);

      setCountryOptions(countries);
      setSellerOptions(sellers);

      const india = getIndiaOption(countries);
      if (india) {
        setSelectedCountry(india);
      }
    } catch (error) {
      setMessage({
        severity: "error",
        text: "Unable to load Country or Seller Unit data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCountryChange = (event, value) => {
    setSelectedCountry(value);
    clearSearchResult();
  };

  const handleSellerChange = (event, value) => {
    setSelectedSeller(value);
    clearSearchResult();
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
    clearSearchResult();
  };

  const handleReset = () => {
    setSelectedCountry(getIndiaOption(countryOptions));
    setSelectedSeller(null);
    setPincode("");
    clearSearchResult();
  };

  const handleFindTransporter = async () => {
    if (!selectedCountry || !selectedCountry.id) {
      setMessage({
        severity: "warning",
        text: "Please select Country.",
      });
      return;
    }

    if (!pincode || !String(pincode).trim()) {
      setMessage({
        severity: "warning",
        text: "Please enter Destination Pincode / Postal Code.",
      });
      return;
    }

    if (!selectedSeller || !selectedSeller.id || !selectedSeller.unit) {
      setMessage({
        severity: "warning",
        text: "Please select Seller Unit.",
      });
      return;
    }

    try {
      setLoading(true);
      setSearched(false);
      setResultData([]);
      setVerifiedPincode("");
      setMessage({
        severity: "",
        text: "",
      });

      const response = await CustomerServices.getPincodeTransporter({
        countryId: selectedCountry.id,
        pincode: String(pincode).trim(),
        unitId: selectedSeller.id,
        unitCode: selectedSeller.unit,
      });

      const data = response && response.data ? response.data : {};
      const options = Array.isArray(data.options) ? data.options : [];

      setSearched(true);
      setVerifiedPincode(
        data.verified_pincode
          ? String(data.verified_pincode)
          : String(pincode).trim(),
      );

      if (!data.mapping_found || options.length === 0) {
        setResultData([]);
        setMessage({
          severity: "warning",
          text:
            "No Surface transporter mapping found for " +
            selectedSeller.unit +
            " and destination " +
            String(pincode).trim() +
            ".",
        });
        return;
      }

      setResultData(options);
      setMessage({
        severity: "success",
        text:
          options.length +
          " Surface transporter" +
          (options.length > 1 ? "s" : "") +
          " found for this Unit + Pincode.",
      });
    } catch (error) {
      const backendData =
        error && error.response && error.response.data
          ? error.response.data
          : null;

      const backendMessage =
        backendData && (backendData.message || backendData.detail)
          ? backendData.message || backendData.detail
          : "Unable to find transporter for the selected Unit + Pincode.";

      setSearched(true);
      setResultData([]);
      setVerifiedPincode("");
      setMessage({
        severity: "error",
        text: backendMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <CustomLoader open={loading} />

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Transporter Finder
        </Typography>

        <Typography variant="body2" sx={{ color: "#666", mt: 0.5, mb: 2 }}>
          Check which Surface transporters are available for a Seller Unit and
          destination Pincode.
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              fullWidth
              size="small"
              label="Country"
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              getOptionLabel={(option) =>
                option && option.name ? option.name : ""
              }
              isOptionEqualToValue={(option, value) =>
                option && value ? option.id === value.id : false
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomTextField
              fullWidth
              size="small"
              name="pincode"
              label="Destination Pincode / Postal Code"
              value={pincode}
              onChange={handlePincodeChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              fullWidth
              size="small"
              label="Seller Unit"
              options={sellerOptions}
              value={selectedSeller}
              onChange={handleSellerChange}
              getOptionLabel={(option) =>
                option && option.unit ? option.unit : ""
              }
              isOptionEqualToValue={(option, value) =>
                option && value ? option.id === value.id : false
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                onClick={handleFindTransporter}
                disabled={loading}
              >
                Find Transporters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {message.text ? (
        <Alert severity={message.severity || "info"} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      ) : null}

      {searched && resultData.length > 0 ? (
        <Paper sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Available Surface Transporters
              </Typography>
              <Typography variant="caption" sx={{ color: "#666" }}>
                {selectedSeller && selectedSeller.unit
                  ? selectedSeller.unit
                  : ""}
                {verifiedPincode ? "  |  " + verifiedPincode : ""}
              </Typography>
            </Box>

            <Chip
              size="small"
              label={resultData.length + " Found"}
              color="success"
              variant="outlined"
            />
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Transporter Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Transport Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Default</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {resultData.map((item, index) => (
                  <TableRow
                    hover
                    key={
                      item && item.mapping_id
                        ? String(item.mapping_id)
                        : String(index)
                    }
                  >
                    <TableCell>
                      {item && item.transporter_name
                        ? item.transporter_name
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item && item.transporter_type
                        ? item.transporter_type
                        : "Surface Transport"}
                    </TableCell>
                    <TableCell>
                      {item && item.priority ? item.priority : "-"}
                    </TableCell>
                    <TableCell>
                      {item && item.is_system_default ? (
                        <Chip size="small" label="Default" color="primary" />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}

      {searched && resultData.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            No mapped Surface transporter found
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
            Try another Seller Unit or destination Pincode.
          </Typography>
        </Paper>
      ) : null}
    </Box>
  );
};

export default TransporterFinder;
