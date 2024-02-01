import React from "react";
import { Button } from "@mui/material";
import CustomerServices from "../../services/CustomerService";

export const DeleteWhatsappGroup = ({ id, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (id) {
      try {
        await CustomerServices.deleteWhatsappData(id);
        onDeleteSuccess(id);
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Error deleting group");
      } finally {
        onClose();
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        style={{ marginTop: "10px" }}
      >
        Delete Group
      </Button>
    </div>
  );
};
