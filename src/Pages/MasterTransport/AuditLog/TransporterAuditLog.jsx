import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import MasterService from "../../../services/MasterService";
import { CustomLoader } from "../../../Components/CustomLoader";

const ENTITY_TYPES = [
  "TRANSPORTER",
  "BRANCH",
  "IDENTIFIER",
  "CONTACT",
  "CONTACT_NUMBER",
  "CAPABILITY",
  "MAPPING",
  "REQUEST",
  "PI_TRANSPORT",
];

const ACTION_TYPES = ["CREATE", "UPDATE", "RESOLVE"];

const getActionColor = (action) => {
  if (action === "CREATE") return "success";
  if (action === "UPDATE") return "warning";
  if (action === "RESOLVE") return "info";
  return "default";
};

const stringifyValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }
  return String(value);
};

const computeChanges = (row) => {
  const oldValue = row && row.old_value ? row.old_value : {};
  const newValue = row && row.new_value ? row.new_value : {};

  if (row && row.action === "CREATE") {
    return Object.keys(newValue).map((key) => ({
      field: key,
      oldValue: "-",
      newValue: stringifyValue(newValue[key]),
    }));
  }

  const keys = Array.from(
    new Set(Object.keys(oldValue).concat(Object.keys(newValue))),
  );

  return keys
    .map((key) => ({
      field: key,
      oldValue: stringifyValue(oldValue[key]),
      newValue: stringifyValue(newValue[key]),
    }))
    .filter((item) => item.oldValue !== item.newValue);
};

const AuditRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const changes = computeChanges(row);

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ width: 44 }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row && row.id ? row.id : "-"}</TableCell>
        <TableCell>{row && row.entity_type ? row.entity_type : "-"}</TableCell>
        <TableCell>{row && row.entity_id ? row.entity_id : "-"}</TableCell>
        <TableCell>
          <Chip
            label={row && row.action ? row.action : "-"}
            color={getActionColor(row && row.action ? row.action : "")}
            size="small"
            variant="outlined"
          />
        </TableCell>
        <TableCell>{row && row.changed_by ? row.changed_by : "-"}</TableCell>
        <TableCell>{row && row.changed_at ? row.changed_at : "-"}</TableCell>
        <TableCell>{row && row.source ? row.source : "-"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={8} sx={{ py: 0, borderBottom: open ? undefined : 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              {row && row.reason ? (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Reason:</strong> {row.reason}
                </Typography>
              ) : null}

              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                Field Changes
              </Typography>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Field</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Old Value</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>New Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {changes.length > 0 ? (
                      changes.map((item) => (
                        <TableRow key={item.field}>
                          <TableCell>{item.field}</TableCell>
                          <TableCell
                            sx={{
                              maxWidth: 320,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              color: "error.main",
                            }}
                          >
                            {item.oldValue}
                          </TableCell>
                          <TableCell
                            sx={{
                              maxWidth: 320,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              color: "success.main",
                            }}
                          >
                            {item.newValue}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: "#888" }}>
                          No field-level changes recorded.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const TransporterAuditLog = ({ defaultEntityType, defaultEntityId }) => {
  const [entityType, setEntityType] = useState(defaultEntityType || "");
  const [entityId, setEntityId] = useState(
    defaultEntityId !== null && defaultEntityId !== undefined
      ? String(defaultEntityId)
      : "",
  );
  const [action, setAction] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEntityType(defaultEntityType || "");
    setEntityId(
      defaultEntityId !== null && defaultEntityId !== undefined
        ? String(defaultEntityId)
        : "",
    );
  }, [defaultEntityType, defaultEntityId]);

  const loadLogs = useCallback(
    async (override) => {
      const filters = override || {
        entityType,
        entityId,
        action,
      };

      try {
        setLoading(true);
        setError("");

        const response = await MasterService.getTransporterAuditLog({
          entityType: filters.entityType,
          entityId: filters.entityId,
          action: filters.action,
          pageAll: true,
        });

        const data = response && response.data ? response.data : [];
        const rows = Array.isArray(data)
          ? data
          : data && Array.isArray(data.results)
            ? data.results
            : [];

        setLogs(rows);
      } catch (apiError) {
        console.error("Error loading transporter audit logs:", apiError);
        setLogs([]);
        setError("Unable to load transporter audit logs.");
      } finally {
        setLoading(false);
      }
    },
    [entityType, entityId, action],
  );

  useEffect(() => {
    const initialFilters = {
      entityType: defaultEntityType || "",
      entityId:
        defaultEntityId !== null && defaultEntityId !== undefined
          ? String(defaultEntityId)
          : "",
      action: "",
    };
    loadLogs(initialFilters);
  }, [defaultEntityType, defaultEntityId]);

  const handleReset = () => {
    const resetFilters = {
      entityType: defaultEntityType || "",
      entityId:
        defaultEntityId !== null && defaultEntityId !== undefined
          ? String(defaultEntityId)
          : "",
      action: "",
    };

    setEntityType(resetFilters.entityType);
    setEntityId(resetFilters.entityId);
    setAction("");
    loadLogs(resetFilters);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CustomLoader open={loading} />

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Transporter Audit Log
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Read-only history generated automatically by backend actions.
            </Typography>
          </Box>
          <Chip label="READ ONLY" size="small" color="info" variant="outlined" />
        </Stack>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Entity Type</InputLabel>
              <Select
                value={entityType}
                label="Entity Type"
                onChange={(event) => setEntityType(event.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {ENTITY_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField
              fullWidth
              size="small"
              label="Entity ID"
              value={entityId}
              onChange={(event) => setEntityId(event.target.value)}
              placeholder="e.g. 12"
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Action</InputLabel>
              <Select
                value={action}
                label="Action"
                onChange={(event) => setAction(event.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {ACTION_TYPES.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Button variant="contained" onClick={() => loadLogs()}>
                Apply Filter
              </Button>
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="text"
                startIcon={<RefreshIcon />}
                onClick={() => loadLogs()}
              >
                Refresh
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {error ? (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      ) : null}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Entity Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Entity ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Changed By</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Changed At</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((row) => <AuditRow key={row.id} row={row} />)
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 5, color: "#888" }}>
                  No audit log entries found for the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransporterAuditLog;
