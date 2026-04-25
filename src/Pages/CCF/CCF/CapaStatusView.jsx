import React from "react";
import moment from "moment";

// ── Modern color palette ─────────────────────────────────────────────────────
const C = {
  // Primary - Modern Blue
  primary: "#0066cc",
  primaryLight: "#e6f2ff",
  primaryBorder: "#4d94ff",
  primaryDark: "#003d99",
  primaryGradient: "linear-gradient(135deg, #0066cc 0%, #0052a3 100%)",

  // Success - Modern Green
  success: "#16a34a",
  successLight: "#dcfce7",
  successBorder: "#86efac",
  successDark: "#15803d",
  successGradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",

  // Error - Modern Red
  error: "#dc2626",
  errorLight: "#fee2e2",
  errorBorder: "#fca5a5",
  errorDark: "#991b1b",
  errorGradient: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",

  // Warning - Modern Orange
  warning: "#ea580c",
  warningLight: "#fed7aa",
  warningBorder: "#fdba74",
  warningDark: "#b45309",
  warningGradient: "linear-gradient(135deg, #ea580c 0%, #b45309 100%)",

  // Info - Modern Indigo
  info: "#4f46e5",
  infoLight: "#e0e7ff",
  infoBorder: "#a5b4fc",
  infoDark: "#312e81",

  // Neutral colors
  divider: "#e5e7eb",
  bgPage: "#f8fafc",
  bgCard: "#ffffff",
  bgHover: "#f3f4f6",

  // Text colors
  text1: "#1f2937",
  text2: "#6b7280",
  text3: "#9ca3af",
  textLight: "#d1d5db",

  // Shadows
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  shadowXl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
};

// ── Status → color mapping ───────────────────────────────────────────────────
const STATUS_CFG = {
  "Under Review": {
    dot: C.info,
    bg: C.infoLight,
    color: C.infoDark,
    border: C.infoBorder,
    icon: "🔍",
    label: "Under Review",
  },
  "Pending Evidence": {
    dot: C.warning,
    bg: C.warningLight,
    color: C.warningDark,
    border: C.warningBorder,
    icon: "📋",
    label: "Evidence Needed",
  },
  "Pending Verifier Approval": {
    dot: C.primary,
    bg: C.primaryLight,
    color: C.primaryDark,
    border: C.primaryBorder,
    icon: "⏳",
    label: "Awaiting Approval",
  },
  "Rejected for Rework": {
    dot: C.error,
    bg: C.errorLight,
    color: C.errorDark,
    border: C.errorBorder,
    icon: "🔄",
    label: "Rework Required",
  },
  Approved: {
    dot: C.success,
    bg: C.successLight,
    color: C.successDark,
    border: C.successBorder,
    icon: "✓",
    label: "Approved",
  },
  "Pending Note": {
    dot: C.info,
    bg: C.infoLight,
    color: C.infoDark,
    border: C.infoBorder,
    icon: "📝",
    label: "Note Pending",
  },
  Closed: {
    dot: C.success,
    bg: C.successLight,
    color: C.successDark,
    border: C.successBorder,
    icon: "✓",
    label: "Closed",
  },
  Rejected: {
    dot: C.error,
    bg: C.errorLight,
    color: C.errorDark,
    border: C.errorBorder,
    icon: "✕",
    label: "Rejected",
  },
};

// Main flow order (Rejected* are off-flow branches, not steps)
const FLOW_STEPS = [
  "Under Review",
  "Pending Evidence",
  "Pending Verifier Approval",
  "Approved",
  "Pending Note",
  "Closed",
];

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ── Helper components ────────────────────────────────────────────────────────

const Pill = ({ label, bg, color, border, small, icon }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: small ? 4 : 6,
      fontSize: small ? 11 : 12,
      fontWeight: 600,
      padding: small ? "4px 10px" : "6px 14px",
      borderRadius: 20,
      whiteSpace: "nowrap",
      background: bg,
      color,
      border: `1.5px solid ${border}`,
      transition: "all 0.2s ease",
      boxShadow: C.shadowSm,
      cursor: "default",
    }}
  >
    {icon && <span style={{ fontSize: small ? 10 : 11 }}>{icon}</span>}
    {label}
  </span>
);

const SectionLabel = ({ children }) => (
  <div
    style={{
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: C.text3,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <div
      style={{
        width: 3,
        height: 16,
        background: C.primary,
        borderRadius: 2,
      }}
    />
    {children}
  </div>
);

const Card = ({ children, style, highlightBorder }) => (
  <div
    style={{
      background: C.bgCard,
      borderRadius: 12,
      border: highlightBorder
        ? `2px solid ${C.primary}`
        : `1px solid ${C.divider}`,
      padding: "24px",
      boxShadow: highlightBorder ? C.shadowMd : C.shadowSm,
      transition: "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </div>
);

const DetailRow = ({ label, value, color, last, icon }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: last ? "none" : `1px solid ${C.divider}`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
      <span style={{ fontSize: 13, color: C.text2, fontWeight: 500 }}>
        {label}
      </span>
    </div>
    <span style={{ fontSize: 14, fontWeight: 600, color: color || C.text1 }}>
      {value}
    </span>
  </div>
);

const StatTile = ({ label, value, color, bg, last, trend }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 16px",
      borderRadius: 10,
      background: bg,
      marginBottom: last ? 0 : 10,
      border: `1px solid ${C.divider}`,
      transition: "all 0.2s ease",
      cursor: "pointer",
      boxShadow: C.shadowSm,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = C.shadowMd;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = C.shadowSm;
    }}
  >
    <span style={{ fontSize: 13, color: C.text2, fontWeight: 500 }}>
      {label}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 16, fontWeight: 700, color }}>{value}</span>
      {trend && (
        <span style={{ fontSize: 12, color: C.text3, fontWeight: 500 }}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────

export const CapaStatusView = ({
  capaId = "CAPA-2026-0042",
  capaTitle = "Invoice Dispute — Sales",
  priority = "High",
  assignedTo = "Finance Team",
  createdDate = "2026-04-10",

  // Current status must be one of the 8 API statuses
  currentStatus = "Pending Verifier Approval",

  timelineData = [
    {
      id: 1,
      status: "Under Review",
      title: "Complaint submitted",
      description:
        "Initial CAPA complaint logged by sales team regarding invoice discrepancy in order #ORD-9821.",
      user: "Abhishek",
      role: "Sales Executive",
      date: "2026-04-10 10:30",
    },
    {
      id: 2,
      status: "Pending Evidence",
      title: "Evidence requested",
      description:
        "Reviewer requested supporting documents — original PO, delivery challan, and invoice copy.",
      user: "Ramesh Kumar",
      role: "QA Manager",
      date: "2026-04-11 09:15",
    },
    {
      id: 3,
      status: "Rejected for Rework",
      title: "Sent back for rework",
      description:
        "Submitted evidence was incomplete. Missing delivery challan. Returned to originator for correction.",
      user: "Priya Nair",
      role: "Verifier",
      date: "2026-04-11 14:40",
    },
    {
      id: 4,
      status: "Pending Verifier Approval",
      title: "Awaiting verifier approval",
      description:
        "Revised evidence submitted with all required documents. Pending sign-off from assigned verifier.",
      user: "Finance Team",
      role: "Accounts",
      date: "2026-04-12 11:00",
    },
  ],
}) => {
  const cfg = STATUS_CFG[currentStatus] || STATUS_CFG["Under Review"];
  const activeStep = FLOW_STEPS.indexOf(currentStatus);
  const isRejected =
    currentStatus === "Rejected" || currentStatus === "Rejected for Rework";
  const daysOpen = moment().diff(moment(createdDate), "days");

  const priorityCfg =
    priority === "High"
      ? { bg: C.errorLight, color: C.errorDark, border: C.errorBorder }
      : priority === "Medium"
        ? { bg: C.warningLight, color: C.warningDark, border: C.warningBorder }
        : { bg: C.successLight, color: C.successDark, border: C.successBorder };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: C.bgPage,
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 56,
          background: C.bgCard,
          borderBottom: `1px solid ${C.divider}`,
          position: "sticky",
          top: -16,
          zIndex: 100,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>
            {capaId}
          </span>
          <span style={{ width: 1, height: 18, background: C.divider }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: C.text1 }}>
            {capaTitle}
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Pill
            label={currentStatus}
            bg={cfg.bg}
            color={cfg.color}
            border={cfg.border}
          />
        </div>
      </div>

      {/* ── Body grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 24,
          padding: "24px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* ── LEFT column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Stepper */}
          <Card>
            <SectionLabel>Process flow</SectionLabel>

            {/* Rejected banner — shown when current status is a rejection */}
            {isRejected && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: C.errorLight,
                  border: `1px solid ${C.errorBorder}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 18 }}>✕</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.errorDark,
                    }}
                  >
                    {currentStatus}
                  </div>
                  <div
                    style={{ fontSize: 12, color: C.errorDark, opacity: 0.8 }}
                  >
                    This CAPA has been rejected. Action required before it can
                    proceed.
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              {FLOW_STEPS.map((label, i) => {
                const done = activeStep !== -1 && i < activeStep;
                const active = i === activeStep;
                const last = i === FLOW_STEPS.length - 1;
                const scfg = STATUS_CFG[label];
                return (
                  <React.Fragment key={label}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: done ? 14 : 12,
                          fontWeight: 700,
                          zIndex: 1,
                          background: done
                            ? C.success
                            : active
                              ? isRejected
                                ? C.error
                                : C.primary
                              : C.bgPage,
                          border: done
                            ? "none"
                            : active
                              ? `2px solid ${isRejected ? C.error : C.primary}`
                              : `1px solid ${C.divider}`,
                          color: done
                            ? "#fff"
                            : active
                              ? isRejected
                                ? C.error
                                : C.primary
                              : C.text3,
                        }}
                      >
                        {done ? "✓" : active && isRejected ? "✕" : scfg.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          marginTop: 6,
                          textAlign: "center",
                          maxWidth: 72,
                          lineHeight: 1.3,
                          color: done
                            ? C.success
                            : active
                              ? isRejected
                                ? C.error
                                : C.primary
                              : C.text3,
                          fontWeight: active || done ? 600 : 400,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                    {!last && (
                      <div
                        style={{
                          flex: 1,
                          height: 2,
                          margin: "0 -1px",
                          position: "relative",
                          top: -10,
                          background: done ? C.success : C.divider,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Off-flow rejected states legend */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 18,
                paddingTop: 14,
                borderTop: `1px solid ${C.divider}`,
              }}
            >
              <span
                style={{ fontSize: 11, color: C.text3, alignSelf: "center" }}
              >
                Off-flow states:
              </span>
              {["Rejected for Rework", "Rejected"].map((s) => {
                const sc = STATUS_CFG[s];
                return (
                  <Pill
                    key={s}
                    label={s}
                    bg={sc.bg}
                    color={sc.color}
                    border={sc.border}
                    small
                  />
                );
              })}
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <SectionLabel>Activity log</SectionLabel>
            {timelineData.map((item, index) => {
              const isLast = index === timelineData.length - 1;
              const sc = STATUS_CFG[item.status] || STATUS_CFG["Under Review"];
              return (
                <div key={item.id} style={{ display: "flex", gap: 16 }}>
                  {/* Dot + line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 20,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: sc.dot,
                        marginTop: 6,
                        flexShrink: 0,
                      }}
                    />
                    {!isLast && (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          background: C.divider,
                          margin: "4px 0",
                          minHeight: 28,
                        }}
                      />
                    )}
                  </div>

                  {/* Entry card */}
                  <div
                    style={{
                      flex: 1,
                      background: C.bgPage,
                      border: `1px solid ${C.divider}`,
                      borderRadius: 8,
                      padding: "14px 16px",
                      marginBottom: isLast ? 0 : 14,
                      borderLeft: `3px solid ${sc.dot}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.text1,
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: C.text3,
                          fontFamily: "monospace",
                          whiteSpace: "nowrap",
                          marginLeft: 12,
                        }}
                      >
                        {moment(item.date).format("DD MMM YYYY · h:mm A")}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: C.text2,
                        lineHeight: 1.6,
                        margin: "0 0 12px",
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 10,
                        borderTop: `1px solid ${C.divider}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            background: sc.bg,
                            color: sc.color,
                            border: `1px solid ${sc.border}`,
                          }}
                        >
                          {initials(item.user)}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: C.text1,
                            }}
                          >
                            {item.user}
                          </div>
                          <div style={{ fontSize: 11, color: C.text3 }}>
                            {item.role}
                          </div>
                        </div>
                      </div>
                      <Pill
                        label={item.status}
                        bg={sc.bg}
                        color={sc.color}
                        border={sc.border}
                        small
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* ── RIGHT column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Case details */}
          <Card>
            <SectionLabel>Case details</SectionLabel>
            <DetailRow label="CAPA ID" value={capaId} />
            <DetailRow label="Assigned to" value={assignedTo} />
            <DetailRow
              label="Created"
              value={moment(createdDate).format("DD MMM YYYY")}
            />
            <DetailRow
              label="Priority"
              value={priority}
              color={priorityCfg.color}
              last
            />
          </Card>

          {/* All 8 statuses reference */}
          <Card>
            <SectionLabel>All statuses</SectionLabel>
            {[
              "Under Review",
              "Pending Evidence",
              "Pending Verifier Approval",
              "Rejected for Rework",
              "Approved",
              "Pending Note",
              "Closed",
              "Rejected",
            ].map((s) => {
              const sc = STATUS_CFG[s];
              const isCurr = s === currentStatus;
              return (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 6,
                    marginBottom: 4,
                    background: isCurr ? sc.bg : "transparent",
                    border: isCurr
                      ? `1px solid ${sc.border}`
                      : "1px solid transparent",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: isCurr ? sc.dot : C.divider,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: isCurr ? sc.color : C.text3,
                        fontWeight: isCurr ? 600 : 400,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                  {isCurr && (
                    <span
                      style={{ fontSize: 10, fontWeight: 700, color: sc.color }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
              );
            })}
          </Card>

          {/* Stats */}
          <Card>
            <SectionLabel>Summary</SectionLabel>
            <StatTile
              label="Current stage"
              value={
                activeStep !== -1
                  ? `${activeStep + 1} of ${FLOW_STEPS.length}`
                  : "—"
              }
              color={isRejected ? C.error : C.primary}
              bg={isRejected ? C.errorLight : C.primaryLight}
            />
            <StatTile
              label="Steps remaining"
              value={
                activeStep !== -1 ? FLOW_STEPS.length - activeStep - 1 : "—"
              }
              color={C.warning}
              bg={C.warningLight}
            />
            <StatTile
              label="Days open"
              value={`${daysOpen}d`}
              color={daysOpen > 7 ? C.error : C.success}
              bg={daysOpen > 7 ? C.errorLight : C.successLight}
              last
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
