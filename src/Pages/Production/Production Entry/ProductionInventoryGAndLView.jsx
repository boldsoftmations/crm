import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import { CustomPagination } from "../../../Components/CustomPagination";
import { CustomTable } from "../../../Components/CustomTable";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
import SearchComponent from "../../../Components/SearchComponent ";

export const ProductionInventoryGAndLView = () => {
  const [open, setOpen] = useState(false);
  const [productionInventoryData, setProductionInventoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportData, setExportData] = useState([]);
  const csvLinkRef = useRef(null);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleDownload = async () => {
    try {
      const data = await handleExport();
      setExportData(data);
      setTimeout(() => {
        csvLinkRef.current.link.click();
      });
      handleSuccess("CSV Downloaded Successfully");
    } catch (error) {
      handleError(error);
      console.log("CSVLink Download error", error);
    }
  };

  const headers = [
    { label: "SELLER ACCOUNT", key: "seller_account" },
    { label: "PRODUCTION ENTRY", key: "production_entry" },
    { label: "PRODUCT", key: "product" },
    { label: "GAIN/LOSS", key: "gnl" },
    { label: "DATE", key: "date" },
    { label: "UNIT", key: "unit" },
    { label: "EXPECTED QUANTITY", key: "expected_quantity" },
    { label: "ACTUAL QUANTITY", key: "actual_quantity" },
  ];

  const handleExport = async () => {
    try {
      setOpen(true);
      let response;
      if (searchQuery) {
        response =
          await InventoryServices.getProductionGAndLInventoryPaginateData(
            "all",
            searchQuery
          );
      } else {
        response =
          await InventoryServices.getProductionGAndLInventoryPaginateData(
            "all"
          );
      }
      const data = response.data.map((row) => {
        return {
          seller_account: row.seller_account,
          production_entry: row.production_entry,
          product: row.product,
          gnl: row.gnl,
          date: row.created_on,
          unit: row.unit,
          expected_quantity: row.expected_quantity,
          actual_quantity: row.actual_quantity,
        };
      });
      setOpen(false);
      return data;
    } catch (err) {
      handleError(err);
    } finally {
      setOpen(false);
    }
  };

  const getAllProductionInventoryGAndLDetails = useCallback(
    async (page, search = searchQuery) => {
      try {
        setOpen(true);
        const response =
          await InventoryServices.getAllProductionGAndLInventoryData(
            page,
            search
          );
        setProductionInventoryData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 25));
        setOpen(false);
      } catch (error) {
        handleError(error);
        setOpen(false);
        console.error("error", error);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    getAllProductionInventoryGAndLDetails(currentPage);
  }, [currentPage, searchQuery, getAllProductionInventoryGAndLDetails]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const Tableheaders = [
    "SELLER ACCOUNT",
    "PRODUCTION ENTRY",
    "PRODUCT",
    "GAIN/LOSS",
    "DATE",
    "UNIT",
    "EXPECTED QUANTITY",
    "ACTUAL QUANTITY",
  ];

  const Tabledata = productionInventoryData.map((row, i) => ({
    seller_account: row.seller_account,
    production_entry: row.production_entry,
    product: row.product,
    gnl: row.gnl,
    date: row.created_on,
    unit: row.unit,
    expected_quantity: row.expected_quantity,
    actual_quantity: row.actual_quantity,
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
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={handleDownload}>
                  Download CSV
                </Button>
                {exportData.length > 0 && (
                  <CSVLink
                    data={exportData}
                    headers={headers}
                    ref={csvLinkRef}
                    filename="Production Gain And Loss.csv"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      outline: "none",
                      height: "5vh",
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}></Grid>

              <Grid item xs={12} sm={3}>
                <h3
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Production Gain And Loss
                </h3>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
            </Grid>
          </Box>
          <CustomTable
            headers={Tableheaders}
            data={Tabledata}
            openInPopup={null}
            openInPopup2={null}
          />

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>
    </>
  );
};
