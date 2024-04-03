import React, { useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import InventoryServices from "../../../services/InventoryService";
import CustomTextField from "../../../Components/CustomTextField";

export const SafetyStockUpdate = ({
  setOpenPopup,
  selectedRow,
  onUpdateSuccess,
  currentPage,
}) => {
  const [quantity, setQuantity] = useState(selectedRow.quantity);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedRow) {
      setQuantity(selectedRow.quantity);
    }
  }, [selectedRow]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await InventoryServices.updateSafetyStockData(selectedRow.id, {
        ...selectedRow,
        quantity,
      });
      onUpdateSuccess(currentPage);
      setOpenPopup(false);
    } catch (error) {
      console.error("Error updating safety stock data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            size="small"
            label="Product"
            variant="outlined"
            value={selectedRow.product}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            size="small"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
