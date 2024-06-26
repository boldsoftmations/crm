import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { CSVLink } from "react-csv";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import { CustomTable } from "../../../Components/CustomTable";
import CustomTextField from "../../../Components/CustomTextField";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
export const ProductionShortFallView = () => {
  const [open, setOpen] = useState(false);
  const [productionShortFallData, setProductionShortFallData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  useEffect(() => {
    getAllProductionShortFallDetails();
  }, []);

  const getAllProductionShortFallDetails = async () => {
    try {
      setOpen(true);
      const response = await InventoryServices.getAllProductionShortFallData();

      setProductionShortFallData(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetClick = () => {
    setSearchQuery("");
  };

  // Filter the productionInventoryData based on the search query
  const filteredData = productionShortFallData.filter((row) =>
    row.product.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // in type fist letter capitalized function
  productionShortFallData.forEach((product) => {
    product.type = product.type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  //   export to excel data
  let data = productionShortFallData.map((item) => {
    return {
      state: item.state,
      type: item.type,
      product: item.product,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
    };
  });

  const TableHeader = [
    "STATE",
    "TYPE",
    "PRODUCT",
    "DESCRIPTION",
    "QUANTITY",
    "UNIT",
  ];

  const TableData = filteredData.map((value) => ({
    seller_account: value.state,
    type: value.type,
    product: value.product,
    description: value.description,
    quantity: value.quantity,
    unit: value.unit,
  }));
  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box display="flex">
            <Box flexGrow={0.9}>
              {" "}
              <CustomTextField
                label="Search By Product"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchQuery && (
                        <IconButton onClick={handleResetClick}>
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box flexGrow={2}>
              <h3
                style={{
                  textAlign: "left",
                  marginBottom: "1em",
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Shortfall Inventory
              </h3>
            </Box>
            <Box flexGrow={0.5} align="right">
              <CSVLink
                data={data}
                headers={headers}
                filename={"my-file.csv"}
                target="_blank"
                style={{
                  textDecoration: "none",
                  outline: "none",
                  height: "5vh",
                }}
              >
                <Button color="success" variant="contained">
                  Export to Excel
                </Button>
              </CSVLink>
            </Box>
          </Box>
          {/* CustomTable */}
          <CustomTable headers={TableHeader} data={TableData} />
        </Paper>
      </Grid>
    </>
  );
};

const headers = [
  { label: "State", key: "state" },
  { label: "Type", key: "type" },
  {
    label: "Product",
    key: "product",
  },

  { label: "Description", key: "description" },
  {
    label: "Quantity",
    key: "quantity",
  },
  {
    label: "Unit",
    key: "unit",
  },
];
