import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid,
  TextField,
  Stack,
} from "@mui/material";
import { CustomTabs } from "../../Components/CustomTabs";
import { CustomLoader } from "../../Components/CustomLoader";
import MasterService from "../../services/MasterService";

import TransPortMapping from "./TransPortMapping/TransPortMapping";
import ContactTransportView from "./TransportContact/ContactTransportView";
import TransporterBranchesIdsTab from "./TransportBranchesIds/TransporterBranchesIdsTab";
import TransporterAuditLog from "./AuditLog/TransporterAuditLog";

// =============================================================================
// DATA SOURCE NOTICE - updated after Branch/Identifier/Contact APIs went live.
//
// REAL, wired to actual APIs:
//   - Transporter Name / Active-Inactive / Type            -> transporter-master
//   - Branches count                                        -> transporter-branch
//   - Primary Tax Identifier (type + value)                 -> transporter-identifier (is_primary=true)
//   - Active Contacts count                                 -> transporter-contact
//   - Primary Address                                       -> DERIVED (see note below - not a
//                                                               real backend field, read this)
//
// STILL NOT POSSIBLE - no API/field exists anywhere for these, so they are
// left as an honest "Not available" message rather than invented data:
//   - Company Contact Numbers (a single company-level number - only
//     per-person contact numbers exist, see Contacts tab)
//   - Default Payment Terms
//   - Account Manager
//   - General Notes
// If any of these get a real API later, search "STILL MOCK" below.
// =============================================================================

// ---------------------------------------------------------------------------
// Overview tab
// ---------------------------------------------------------------------------
const TransporterOverviewTab = ({ transporter, headerStats }) => {
  if (!transporter) return null;

  const { primaryIdentifier, primaryBranch } = headerStats || {};

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Primary Address
          </Typography>
          {/* REAL, but DERIVED: there is no "primary branch" flag on the
              Branch model. This shows the branch linked to the primary
              identifier's "branches" array (first one, if it has several).
              If no identifier is marked primary yet, falls back to "Not set". */}
          {primaryBranch ? (
            <Typography variant="body2" sx={{ color: "#555" }}>
              {primaryBranch.address}, {primaryBranch.city} -{" "}
              {primaryBranch.pincode}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "#999" }}>
              Not set - mark an identifier as Primary in Branches & IDs
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Company Contact Numbers
          </Typography>
          {/* STILL MOCK - no company-level number field exists; only
              per-person contact numbers exist (Contacts tab). Not
              fabricating a "company number" from a person's number. */}
          <Typography variant="body2" sx={{ color: "#555" }}>
            See Contacts tab
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Primary Tax Identifier
          </Typography>
          {/* REAL - from transporter-identifier, is_primary=true */}
          {primaryIdentifier ? (
            <Typography variant="body2" sx={{ color: "#555" }}>
              {primaryIdentifier.identifier_type}:{" "}
              {primaryIdentifier.identifier_value}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "#999" }}>
              Not set - no identifier marked Primary yet
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Default Payment Terms
          </Typography>
          {/* STILL MOCK - no such field on Transporter model yet */}
          <Typography variant="body2" sx={{ color: "#555" }}>
            Not available yet (needs backend field)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Account Manager
          </Typography>
          {/* STILL MOCK - no such field on Transporter model yet */}
          <Typography variant="body2" sx={{ color: "#555" }}>
            Not available yet (needs backend field)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            General Notes
          </Typography>
          {/* STILL MOCK - no such field on Transporter model yet */}
          <TextField
            fullWidth
            multiline
            minRows={3}
            disabled
            placeholder="Not available yet (needs backend field)"
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const TransporterHeader = ({ transporter, headerStats, statsLoading }) => {
  if (!transporter) return null;

  const isActive = !transporter.is_inactive;
  const { branchCount, contactCount, primaryIdentifier } = headerStats || {};

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {transporter.transporter_name}
        </Typography>
        <Chip
          label={isActive ? "ACTIVE" : "INACTIVE"}
          color={isActive ? "success" : "default"}
          size="small"
        />
      </Stack>

      <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
        {transporter.transporter_type}
      </Typography>

      <Stack direction="row" spacing={4} sx={{ mt: 2 }} flexWrap="wrap">
        <Box>
          <Typography variant="caption" sx={{ color: "#888" }}>
            Primary ID
          </Typography>
          {/* REAL - from transporter-identifier, is_primary=true */}
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {statsLoading
              ? "..."
              : primaryIdentifier
                ? `${primaryIdentifier.identifier_type} ${primaryIdentifier.identifier_value}`
                : "—"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: "#888" }}>
            Branches
          </Typography>
          {/* REAL - from transporter-branch, response.count */}
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {statsLoading ? "..." : branchCount ? branchCount : "—"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: "#888" }}>
            Active Contacts
          </Typography>
          {/* REAL - from transporter-contact, is_inactive=false, response.count */}
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {statsLoading ? "..." : contactCount ? contactCount : "—"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export const TransporterWorkspace = ({ transporterId }) => {
  const userData = useSelector((state) => state.auth.profile);

  const isInGroups = (...groups) => {
    if (!userData || !userData.groups || !Array.isArray(userData.groups)) {
      return false;
    }
    return groups.some((group) => userData.groups.includes(group));
  };

  const commonMasterRoles = [
    "Director",
    "Sales Manager",
    "Sales Manager(Retailer)",
    "Business Development Manager",
    "Customer Relationship Manager",
    "Sales Deputy Manager",
    "Sales Assistant Deputy Manager",
    "Operations & Supply Chain Manager",
    "Sales Manager without Leads",
    "Sales Manager with Lead",
  ];

  const contactRoles = [
    "Director",
    "Sales Manager",
    "Sales Manager(Retailer)",
    "Business Development Manager",
    "Customer Relationship Executive",
    "Customer Relationship Manager",
    "Sales Deputy Manager",
    "Sales Assistant Deputy Manager",
    "Sales Executive",
    "Operations & Supply Chain Manager",
    "Sales Manager without Leads",
    "Sales Manager with Lead",
  ];

  const auditLogRoles = ["Director"];

  // ---------------------------------------------------------------------
  // GAP FIX (1/3): transporterId now comes from a real "Open" click in
  // TransporterList.jsx (via TransportersHome.jsx), not a typed-in text
  // box. There is still no getTransportMasterById API - only the
  // paginated list endpoint exists - so this still finds the record by
  // searching pages client-side. That part is an acceptable stopgap now
  // (the id is always a real, valid id since it came from clicking an
  // actual row, unlike before when it could be any typed number), but a
  // real by-id endpoint would still be more efficient than this loop.
  // ---------------------------------------------------------------------
  const [transporter, setTransporter] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTransporter = useCallback(async (id) => {
    if (!id) {
      setTransporter(null);
      return;
    }
    try {
      setLoading(true);
      let match = null;
      const inactiveFlagsToTry = [false, true];
      const maxPagesToTry = 5;

      outer: for (const inactiveFlag of inactiveFlagsToTry) {
        for (let page = 1; page <= maxPagesToTry; page += 1) {
          try {
            const response = await MasterService.getAllTransportMaster(
              page,
              inactiveFlag,
              "",
            );
            const results =
              response && response.data && response.data.results
                ? response.data.results
                : [];
            match = results.find((item) => String(item.id) === String(id));
            if (match) break outer;
            if (results.length === 0) break; // no more pages for this flag
          } catch (pageError) {
            break;
          }
        }
      }

      setTransporter(match || null);
    } catch (error) {
      console.error("Error loading transporter record:", error);
      setTransporter(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransporter(transporterId);
  }, [transporterId, loadTransporter]);

  // ---------------------------------------------------------------------
  // Header / Overview stats - real data pulled from the branch, identifier
  // and contact APIs. This is a SEPARATE fetch from the one inside
  // TransporterBranchesIdsTab (that one drives the tab's own CRUD list).
  // Duplicate network calls when you open both, but keeps the two features
  // decoupled for now rather than a bigger refactor to share state between
  // the workspace shell and the tab. Worth consolidating later via a
  // shared hook (e.g. useTransporterBranchesAndIdentifiers) if this
  // becomes a real cost.
  // ---------------------------------------------------------------------
  const [headerStats, setHeaderStats] = useState({
    branchCount: null,
    contactCount: null,
    primaryIdentifier: null,
    primaryBranch: null,
  });
  const [statsLoading, setStatsLoading] = useState(false);

  const loadHeaderStats = useCallback(async (currentTransporter) => {
    if (!currentTransporter || !currentTransporter.id) {
      setHeaderStats({
        branchCount: null,
        contactCount: null,
        primaryIdentifier: null,
        primaryBranch: null,
      });
      return;
    }

    try {
      setStatsLoading(true);

      const [branchRes, identifierRes, contactRes] = await Promise.all([
        MasterService.getAllTransportBranch(currentTransporter.id),
        MasterService.getAllTransportIdentifier(currentTransporter.id),
        // getAllTransportConstact filters by transporter NAME (not id) -
        // same as every other place in this app that calls it.
        MasterService.getAllTransportConstact(
          currentTransporter.transporter_name,
          1,
          false, // is_inactive=false -> only ACTIVE contacts, matching the
          // "Active Contacts" label in the header
          "",
        ),
      ]);

      const branches =
        branchRes && branchRes.data && Array.isArray(branchRes.data.results)
          ? branchRes.data.results
          : [];
      const branchCount =
        branchRes && branchRes.data && typeof branchRes.data.count === "number"
          ? branchRes.data.count
          : branches.length;

      const identifiers =
        identifierRes &&
        identifierRes.data &&
        Array.isArray(identifierRes.data.results)
          ? identifierRes.data.results
          : [];
      const primaryIdentifier =
        identifiers.find((identifier) => identifier.is_primary) || null;

      const primaryBranch =
        primaryIdentifier &&
        Array.isArray(primaryIdentifier.branches) &&
        primaryIdentifier.branches.length > 0
          ? branches.find(
              (branch) => branch.id === primaryIdentifier.branches[0],
            ) || null
          : null;

      const contactCount =
        contactRes &&
        contactRes.data &&
        typeof contactRes.data.count === "number"
          ? contactRes.data.count
          : null;

      setHeaderStats({
        branchCount,
        contactCount,
        primaryIdentifier,
        primaryBranch,
      });
    } catch (error) {
      console.error("Error loading header stats:", error);
      setHeaderStats({
        branchCount: null,
        contactCount: null,
        primaryIdentifier: null,
        primaryBranch: null,
      });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHeaderStats(transporter);
  }, [transporter, loadHeaderStats]);

  const subTabs = [
    {
      label: "Overview",
      roles: commonMasterRoles,
      component: (
        <TransporterOverviewTab
          transporter={transporter}
          headerStats={headerStats}
        />
      ),
    },
    {
      label: "Branches & IDs",
      roles: commonMasterRoles,
      component: <TransporterBranchesIdsTab transporter={transporter} />,
    },
    {
      label: "Contacts",
      roles: contactRoles,
      component: <ContactTransportView lockedTransporter={transporter} />,
    },
    {
      label: "Serviceability",
      roles: commonMasterRoles,
      component: <TransPortMapping lockedTransporter={transporter} />,
    },
    {
      label: "Audit Log",
      roles: auditLogRoles,
      component: (
        <TransporterAuditLog
          defaultEntityType="TRANSPORTER"
          defaultEntityId={transporter && transporter.id ? transporter.id : ""}
        />
      ),
    },
  ];

  const visibleSubTabs = subTabs.filter((tab) => isInGroups(...tab.roles));

  const [activeSubTab, setActiveSubTab] = useState(0);

  const onSubTabChange = (newIndex) => {
    setActiveSubTab(newIndex);
  };

  return (
    <Box>
      <CustomLoader open={loading} />

      {transporter ? (
        <TransporterHeader
          transporter={transporter}
          headerStats={headerStats}
          statsLoading={statsLoading}
        />
      ) : (
        !loading && (
          <Paper sx={{ p: 3, m: 2, textAlign: "center", color: "#999" }}>
            Could not load this transporter's record (checked the first 5 pages
            of both active and inactive lists). It may have been deactivated or
            removed since you opened it - go back and try again.
          </Paper>
        )
      )}

      <CustomTabs
        tabs={visibleSubTabs.map((tab) => ({ label: tab.label }))}
        activeTab={activeSubTab}
        onTabChange={onSubTabChange}
      />
      {visibleSubTabs.length > 0 && visibleSubTabs[activeSubTab] ? (
        <div>{visibleSubTabs[activeSubTab].component}</div>
      ) : null}
    </Box>
  );
};

export default TransporterWorkspace;
