import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useNotificationHandling } from "../../Components/useNotificationHandling ";
import InventoryServices from "../../services/InventoryService";
import { MessageAlert } from "../../Components/MessageAlert";
import { CustomLoader } from "../../Components/CustomLoader";
import SearchComponent from "../../Components/SearchComponent ";
import { CustomTable } from "../../Components/CustomTable";
import { CustomPagination } from "../../Components/CustomPagination";
import { Popup } from "../../Components/Popup";
import { PhysicalInventoryCreate } from "./PhysicalInventoryCreate";
import { batch } from "react-redux";

export const PhysicalInventoryView = () => {
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const getPhysicalInventoryData = useCallback(async () => {
    setOpen(true);
    try {
      const response = await InventoryServices.getPhysical(
        currentPage,
        searchQuery
      );
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    getPhysicalInventoryData();
  }, [currentPage, searchQuery, getPhysicalInventoryData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const Tableheaders = [
    "DATE",
    "USER",
    "TYPE",
    "PRODUCT",
    "UNIT",
    "BATCH NO",
    "SELLER UNIT",
    "PENDING QUANTITY",
    "PHYSICAL QUANTITY",
    "GNL",
    "CHANGED QUANTITY",
    "REASON",
  ];

  const Tabledata = data.map((row, i) => ({
    creation_date: row.creation_date,
    created_by: row.created_by,
    type: row.type,
    product: row.product,
    unit: row.unit,
    batch_no: row.batch_no,
    seller_unit: row.seller_unit,
    pending_quantity: row.pending_quantity,
    physical_quantity: row.physical_quantity,
    gnl: row.gnl,
    change_qty: row.change_qty,

    reason: row.reason,
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
          openInPopup={null}
          openInPopup2={null}
        />

        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Paper>
      <Popup
        maxWidth="xl"
        title={"Create Physical Inventory"}
        openPopup={openCreateModal}
        setOpenPopup={setOpenCreateModal}
      >
        <PhysicalInventoryCreate
          currentPage={currentPage}
          searchQuery={searchQuery}
          setOpenPopup={setOpenCreateModal}
          getPhysicalInventoryData={getPhysicalInventoryData}
        />
      </Popup>
    </>
  );
};
