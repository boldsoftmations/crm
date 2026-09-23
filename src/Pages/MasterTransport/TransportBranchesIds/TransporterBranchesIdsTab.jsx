import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import MasterService from "../../../services/MasterService";
import { Popup } from "../../../Components/Popup";
import { CustomLoader } from "../../../Components/CustomLoader";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

import TransportBranchCreate from "./TransportBranchCreate";
import TransportBranchUpdate from "./TransportBranchUpdate";
import TransportIdentifierCreate from "./TransportIdentifierCreate";
import TransportIdentifierUpdate from "./TransportIdentifierUpdate";

// V3 handover, Section 6: branches and identifiers are shown together for
// usability but are separate backend child tables. An identifier can apply
// to more than one branch (API confirms via "branches": [id, id] on the
// identifier), so this view fetches both lists independently and, for each
// branch, derives "IDs applicable to this branch" by filtering identifiers
// whose branches array includes that branch's id - it does not assume a
// 1:1 branch->identifier relationship.

const TransporterBranchesIdsTab = ({ transporter }) => {
  const [branches, setBranches] = useState([]);
  const [identifiers, setIdentifiers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openBranchCreate, setOpenBranchCreate] = useState(false);
  const [openBranchUpdate, setOpenBranchUpdate] = useState(false);
  const [openIdentifierCreate, setOpenIdentifierCreate] = useState(false);
  const [openIdentifierUpdate, setOpenIdentifierUpdate] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const getBranchData = useCallback(async (transporterId) => {
    if (!transporterId) return;
    try {
      const response = await MasterService.getAllTransportBranch(
        transporterId,
      );
      const results =
        response && response.data && response.data.results
          ? response.data.results
          : response && response.data
            ? response.data
            : [];
      setBranches(Array.isArray(results) ? results : []);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIdentifierData = useCallback(async (transporterId) => {
    if (!transporterId) return;
    try {
      const response = await MasterService.getAllTransportIdentifier(
        transporterId,
      );
      const results =
        response && response.data && response.data.results
          ? response.data.results
          : response && response.data
            ? response.data
            : [];
      setIdentifiers(Array.isArray(results) ? results : []);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!transporter || !transporter.id) return;
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        getBranchData(transporter.id),
        getIdentifierData(transporter.id),
      ]);
      setLoading(false);
    };
    loadAll();
  }, [transporter, getBranchData, getIdentifierData]);

  const identifiersForBranch = (branchId) =>
    identifiers.filter(
      (identifier) =>
        Array.isArray(identifier.branches) &&
        identifier.branches.includes(branchId),
    );

  const openBranchEdit = (branch) => {
    setRecordForEdit(branch);
    setOpenBranchUpdate(true);
  };

  const openIdentifierEdit = (identifier) => {
    setRecordForEdit(identifier);
    setOpenIdentifierUpdate(true);
  };

  if (!transporter) {
    return null;
  }

  return (
    <Box sx={{ p: 2 }}>
      <CustomLoader open={loading} />
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenBranchCreate(true)}>
          + Add Branch
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOpenIdentifierCreate(true)}
          disabled={branches.length === 0}
        >
          + Add Identifier
        </Button>
      </Stack>
      {branches.length === 0 && (
        <Typography variant="caption" sx={{ color: "#999" }}>
          Add at least one branch before adding an identifier.
        </Typography>
      )}

      {branches.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center", color: "#999" }}>
          No branches recorded yet for this transporter.
        </Paper>
      ) : (
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {branches.map((branch) => (
            <Grid item xs={12} key={branch.id}>
              <Paper sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {branch.branch_name}
                      </Typography>
                      <Chip
                        label={branch.is_active ? "ACTIVE" : "INACTIVE"}
                        color={branch.is_active ? "success" : "default"}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Address: {branch.address || "-"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      City: {branch.city} | Pincode: {branch.pincode}
                    </Typography>
                  </Box>
                  <IconButton size="small" onClick={() => openBranchEdit(branch)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    IDs applicable to this branch:
                  </Typography>
                  {identifiersForBranch(branch.id).length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "#999", ml: 1, display: "block" }}
                    >
                      - None recorded
                    </Typography>
                  ) : (
                    identifiersForBranch(branch.id).map((identifier) => (
                      <Stack
                        key={identifier.id}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ ml: 1 }}
                      >
                        <Typography variant="body2">
                          - {identifier.identifier_type}{" "}
                          {identifier.identifier_value}
                          {identifier.is_primary ? " (Primary)" : ""}
                          {!identifier.is_active ? " (Inactive)" : ""}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => openIdentifierEdit(identifier)}
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Stack>
                    ))
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Branch */}
      <Popup
        maxWidth="sm"
        title="Add Branch"
        openPopup={openBranchCreate}
        setOpenPopup={setOpenBranchCreate}
      >
        <TransportBranchCreate
          transporterId={transporter.id}
          transporterName={transporter.transporter_name}
          getBranchData={getBranchData}
          setOpenPopup={setOpenBranchCreate}
        />
      </Popup>

      {/* Update Branch */}
      <Popup
        maxWidth="sm"
        title="Update Branch"
        openPopup={openBranchUpdate}
        setOpenPopup={setOpenBranchUpdate}
      >
        <TransportBranchUpdate
          recordForEdit={recordForEdit}
          transporterId={transporter.id}
          getBranchData={getBranchData}
          setOpenPopup={setOpenBranchUpdate}
        />
      </Popup>

      {/* Add Identifier */}
      <Popup
        maxWidth="sm"
        title="Add Identifier"
        openPopup={openIdentifierCreate}
        setOpenPopup={setOpenIdentifierCreate}
      >
        <TransportIdentifierCreate
          transporterId={transporter.id}
          transporterName={transporter.transporter_name}
          branchOptions={branches}
          getIdentifierData={getIdentifierData}
          setOpenPopup={setOpenIdentifierCreate}
        />
      </Popup>

      {/* Update Identifier */}
      <Popup
        maxWidth="sm"
        title="Update Identifier"
        openPopup={openIdentifierUpdate}
        setOpenPopup={setOpenIdentifierUpdate}
      >
        <TransportIdentifierUpdate
          recordForEdit={recordForEdit}
          transporterId={transporter.id}
          branchOptions={branches}
          getIdentifierData={getIdentifierData}
          setOpenPopup={setOpenIdentifierUpdate}
        />
      </Popup>
    </Box>
  );
};

export default TransporterBranchesIdsTab;
