const DIRECT_MODE_MAP = {
  BUS: "Bus",
  TRAIN: "Train",
  AIR: "Air",
  SELF_PICKUP: "Self Pickup",
};

export function buildTransportPayload(selection) {
  const mode = selection && selection.mode ? selection.mode : "";

  if (!mode) {
    return {};
  }

  // Backend-confirmed direct modes: no transporter dropdown and no
  // transporter assignment. Send the exact mode value expected by backend.
  if (DIRECT_MODE_MAP[mode]) {
    return {
      selected_transport_mode: DIRECT_MODE_MAP[mode],
      transporter: null,
      transporter_mapping: null,
    };
  }

  if (mode === "SURFACE") {
    const isUnassigned =
      selection &&
      selection.transporterName === "To Be Assigned" &&
      selection.assignmentStatus === "Unassigned";

    return {
      selected_transport_mode: "SURFACE",
      verified_pincode:
        selection && selection.verifiedPincodeId
          ? selection.verifiedPincodeId
          : null,
      transporter_mapping:
        selection && selection.mappingId ? selection.mappingId : null,
      transporter:
        selection && selection.transporterId ? selection.transporterId : null,
      transporter_name: isUnassigned
        ? "To Be Assigned"
        : selection && selection.transporterName
          ? selection.transporterName
          : null,
      transporter_assignment_status: isUnassigned
        ? "Unassigned"
        : selection && selection.transporterId
          ? "Assigned"
          : undefined,
    };
  }

  if (mode === "COURIER" || mode === "LOCAL_AGGREGATOR") {
    return {
      selected_transport_mode: mode,
      transporter:
        selection && selection.transporterId ? selection.transporterId : null,
      transporter_name:
        selection && selection.transporterName
          ? selection.transporterName
          : null,
      transporter_mapping: null,
      transporter_assignment_status:
        selection && selection.transporterId ? "Assigned" : undefined,
    };
  }

  return {
    selected_transport_mode: mode,
  };
}
