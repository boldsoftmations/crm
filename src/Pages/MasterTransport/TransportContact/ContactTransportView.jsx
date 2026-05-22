import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Paper,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useSelector } from "react-redux";

import { Popup } from "../../../Components/Popup";
import { CustomLoader } from "../../../Components/CustomLoader";
import { CustomPagination } from "../../../Components/CustomPagination";
import { CustomTable } from "../../../Components/CustomTable";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import SearchComponent from "../../../Components/SearchComponent ";
import { MessageAlert } from "../../../Components/MessageAlert";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

import MasterService from "../../../services/MasterService";
import ContactTransportCreate from "./ContactTransportCreate";
// import ContactTransportUpdate from "./ContactTransportUpdate";

const ContactTransportView = () => {
  const [transportContactData, setTransportContactData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // false = Active, true = Inactive
  const [isInactiveFilter, setIsInactiveFilter] = useState(false);

  // Transporter filter — filtered by transporter_id
  const [transporterOptions, setTransporterOptions] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState(null);

  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const userData = useSelector((state) => state.auth.profile);

  const isInGroups = (...groups) => {
    if (!userData || !userData.groups || !Array.isArray(userData.groups)) {
      return false;
    }
    return groups.some((group) => userData.groups.includes(group));
  };

  const tableHeader = ["ID", "TRANSPORTER", "UNIT", "CITY", "ACTION"];

  // Fetch transporter options for the filter dropdown
  const getTransporterOptions = async () => {
    try {
      const response = await MasterService.getAllTransportMaster();
      if (response && response.data && response.data.results) {
        setTransporterOptions(response.data.results);
      } else {
        setTransporterOptions([]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getTransportContactData = useCallback(async () => {
    try {
      setLoading(true);

      const transporterId = selectedTransporter ? selectedTransporter.id : "";

      const response = await MasterService.getTransportContact(
        transporterId,
        currentPage,
        searchQuery,
        isInactiveFilter,
      );
      console.log("Data is:", response);

      if (response && response.data && response.data) {
        setTransportContactData(response.data);
      } else if (Array.isArray(response.data)) {
        // API returns plain array (no pagination) when filtered by transporter_id
        setTransportContactData(response.data);
      } else {
        setTransportContactData([]);
      }

      if (response && response.data && response.data.count) {
        setTotalPages(Math.ceil(response.data.count / 25));
        setTotalCount(response.data.count);
      } else {
        setTotalPages(0);
        setTotalCount(0);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [
    selectedTransporter,
    currentPage,
    searchQuery,
    isInactiveFilter,
    handleError,
  ]);

  useEffect(() => {
    getTransporterOptions();
  }, []);

  useEffect(() => {
    getTransportContactData();
  }, [getTransportContactData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event, newValue) => {
    if (newValue !== null) {
      setIsInactiveFilter(newValue);
      setCurrentPage(1);
    }
  };

  const openInPopup = (item) => {
    const selectedData = transportContactData.find(
      (data) =>
        data.transporter_id === item.transporter_id &&
        data.unit_id === item.unit_id,
    );
    setRecordForEdit(selectedData || null);
    setOpenUpdatePopup(true);
  };

  const tableData = transportContactData.map((value) => ({
    transporter_id: value.transporter_id,
    transporter: value.transporter,

    unit: value.unit,

    city: value.city,
  }));

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

      <CustomLoader open={loading} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          {/* ── Top bar ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              p: 2,
              gap: 2,
            }}
          >
            {/* Search */}
            <Box sx={{ flexGrow: 1, flexBasis: "20%", minWidth: "300px" }}>
              <SearchComponent onSearch={handleSearch} onReset={handleReset} />
            </Box>

            {/* Title */}
            <Box sx={{ flexGrow: 2, textAlign: "center", minWidth: "150px" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Contact Transport
              </h3>
            </Box>

            {/* Add Button */}
            <Box
              sx={{
                flexGrow: 1,
                flexBasis: "20%",
                display: "flex",
                justifyContent: "flex-end",
                minWidth: "300px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenCreatePopup(true)}
                disabled={isInGroups("Stores")}
              >
                Add
              </Button>
            </Box>
          </Box>

          {/* ── Filters row ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              px: 2,
              pb: 2,
              gap: 2,
            }}
          >
            {/* Transporter filter */}
            <Box sx={{ minWidth: "300px", flexGrow: 1, maxWidth: "400px" }}>
              <CustomAutocomplete
                fullWidth
                size="small"
                options={transporterOptions}
                value={selectedTransporter}
                getOptionLabel={(option) =>
                  option.transporter_name ? option.transporter_name : option
                }
                onChange={(e, value) => {
                  setSelectedTransporter(value || null);
                  setCurrentPage(1);
                }}
                label="Filter by Transporter"
              />
            </Box>

            {/* Active / Inactive toggle */}
            <ToggleButtonGroup
              value={isInactiveFilter}
              exclusive
              onChange={handleFilterChange}
              size="small"
              color="primary"
            >
              <ToggleButton value={false}>Active</ToggleButton>
              <ToggleButton value={true}>Inactive</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <CustomTable
            headers={tableHeader}
            data={tableData}
            openInPopup={openInPopup}
          />

          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>

      {/* Create Popup */}
      <Popup
        maxWidth="xl"
        title="Create Contact Transport"
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <ContactTransportCreate
          getTransportContactData={getTransportContactData}
          setOpenPopup={setOpenCreatePopup}
        />
      </Popup>

      {/* Update Popup */}
      {/* <Popup
        maxWidth="xl"
        title="Update Contact Transport"
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
      >
        <ContactTransportUpdate
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenUpdatePopup}
          getTransportContactData={getTransportContactData}
        />
      </Popup> */}
    </>
  );
};

export default ContactTransportView;
