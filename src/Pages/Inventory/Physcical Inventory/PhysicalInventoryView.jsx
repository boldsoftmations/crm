import React, { useCallback, useEffect, useState } from "react";
import InventoryServices from "../../../services/InventoryService";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { CustomTable } from "../../../Components/CustomTable";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";
import { Box, Button, Grid, Paper } from "@mui/material";
import SearchComponent from "../../../Components/SearchComponent ";
import { CustomPagination } from "../../../Components/CustomPagination";
import { Popup } from "../../../Components/Popup";
import { PhysicalInventoryCreate } from "./PhysicalInventoryCreate";
import { PhysicalInventoryUpdate } from "./PhysicalInventoryUpdate";

export const PhysicalInventoryView = () => {
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  useEffect(() => {
    getPhysicalInventoryData(pageCount, searchQuery);
  }, [pageCount, searchQuery]);

  const getPhysicalInventoryData = useCallback(async (page, query) => {
    try {
      setOpen(true);
      const response = await InventoryServices.getPhysical(page, query);
      setData(response.data.results);
      setPageCount(Math.ceil(response.data.count / 25));
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageCount(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setPageCount(1);
  };

  const handlePageClick = (event, value) => {
    setPageCount(value);
  };

  const Tableheaders = [
    "ID",
    "TYPE",
    "PRODUCT",
    "UNIT",
    "SELLER UNIT",
    "PENDING QUANTITY",
    "PHYSICAL QUANTITY",
    "GNL",
    "ADD/REMOVE QUANTITY",
    "REASON",
    "ACTIONS",
  ];

  const Tabledata = data.map((row, i) => ({
    id: row.id,
    type: row.type,
    product: row.product,
    unit: row.unit,
    seller_unit: row.seller_unit,
    pending_quantity: row.pending_quantity,
    physical_quantity: row.physical_quantity,
    gnl: row.gnl,
    add_or_remove_qty: row.add_or_remove_qty,
    reason: row.reason,
  }));

  const openInPopup = (item) => {
    setSelectedRowData(item);
    setOpenUpdateModal(true);
  };

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />
      <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            p: 2,
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            {/* Search Component */}
            <Grid item xs={12} sm={4} md={5} lg={5}>
              <SearchComponent onSearch={handleSearch} onReset={handleReset} />
            </Grid>

            {/* Title */}
            <Grid
              item
              xs={12}
              sm={4}
              md={5}
              lg={5}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Physical Inventory
              </h3>
            </Grid>

            {/* Add Button */}
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              lg={2}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Button
                onClick={() => setOpenCreateModal(true)}
                variant="contained"
                color="success"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>

        <CustomTable
          headers={Tableheaders}
          data={Tabledata}
          openInPopup={openInPopup}
          openInPopup2={null}
        />

        <CustomPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </Paper>
      <Popup
        maxWidth="xl"
        title={"Create Physical Inventory"}
        openPopup={openCreateModal}
        setOpenPopup={setOpenCreateModal}
      >
        <PhysicalInventoryCreate
          pageCount={pageCount}
          searchQuery={searchQuery}
          setOpenPopup={setOpenCreateModal}
          getPhysicalInventoryData={getPhysicalInventoryData}
        />
      </Popup>
      <Popup
        maxWidth="xl"
        title={"Update Physical Inventory"}
        openPopup={openUpdateModal}
        setOpenPopup={setOpenUpdateModal}
      >
        <PhysicalInventoryUpdate
          selectedRowData={selectedRowData}
          pageCount={pageCount}
          searchQuery={searchQuery}
          setOpenPopup={setOpenUpdateModal}
          getPhysicalInventoryData={getPhysicalInventoryData}
        />
      </Popup>
    </>
  );
};
