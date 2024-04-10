import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Paper, Button } from "@mui/material";
import { Popup } from "../../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { getSellerAccountData } from "../../../Redux/Action/Action";
import InvoiceServices from "../../../services/InvoiceService";
import { CustomLoader } from "../../../Components/CustomLoader";
import { CreateVendorDetails } from "./CreateVendorDetails";
import { UpdateAllVendorDetails } from "./UpdateAllVendorDetails";
import InventoryServices from "../../../services/InventoryService";
import { CustomTable } from "../../../Components/CustomTable";
import { CustomPagination } from "../../../Components/CustomPagination";
import { PurchaseOrderCreate } from "../Purchase Order/PurchaseOrderCreate";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import { CreateChalan } from "../Challan/CreateChalan";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
import SearchComponent from "../../../Components/SearchComponent ";

export const VendorView = () => {
  const dispatch = useDispatch();
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupPurchaseOrder, setOpenPopupPurchaseOrder] = useState(false);
  const [openPopupChalan, setOpenPopupChalan] = useState(false);
  const [open, setOpen] = useState(false);
  const [vendorData, setVendorData] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const userData = useSelector((state) => state.auth.profile);
  const [sourceFilter, setSourceFilter] = useState();
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const openInPopupUpdate = (item) => {
    const matchedVendor = vendorData.find((lead) => lead.id === item.id);
    setRecordForEdit(matchedVendor);
    setOpenPopupUpdate(true);
  };

  const openInPopupPurchaseOrder = (item) => {
    const matchedVendor = vendorData.find((lead) => lead.id === item.id);
    setRecordForEdit(matchedVendor);
    setOpenPopupPurchaseOrder(true);
  };

  const openInPopupChalan = (item) => {
    const matchedVendor = vendorData.find((lead) => lead.id === item.id);
    setRecordForEdit(matchedVendor);
    setOpenPopupChalan(true);
  };

  useEffect(() => {
    getAllSellerAccountsDetails();
  }, []);

  const getAllSellerAccountsDetails = async () => {
    try {
      setOpen(true);
      const response = await InvoiceServices.getAllPaginateSellerAccountData(
        "all"
      );
      dispatch(getSellerAccountData(response.data));
      setOpen(false);
    } catch (err) {
      handleError(err);
      setOpen(false);
    }
  };

  useEffect(() => {
    getAllVendorDetails(currentPage);
  }, [currentPage, sourceFilter, searchQuery, getAllVendorDetails]);

  const getAllVendorDetails = useCallback(
    async (page, search = searchQuery) => {
      try {
        setOpen(true);
        const response = await InventoryServices.getAllVendorData(
          page,
          search,
          sourceFilter
        );
        setVendorData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 25));
        setOpen(false);
      } catch (error) {
        handleError(error);
        setOpen(false);
        console.error("error", error);
      }
    },
    [searchQuery, sourceFilter]
  );

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

  const sourceFilterOptions = [
    { label: "Vendor", value: "Vendor" },
    { label: "Job Worker", value: "Job Worker" },
    { label: "Vendor/ Job Worker", value: "Vendor/Job Worker" },
  ];

  const Tabledata = vendorData.map((row) => ({
    id: row.id,
    name: row.name,
    vendor_source: row.vendor_source,
    type: row.type,
    pan_number: row.pan_number,
    gst_number: row.gst_number,
    city: row.city,
    state: row.state,
  }));

  const Tableheaders = [
    "ID",
    "Vendor",
    "Source",
    "Type",
    "Pan No.",
    "Gst No.",
    "City",
    "State",
    "Action",
  ];
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
              <Grid item xs={12} sm={3}>
                <CustomAutocomplete
                  value={
                    sourceFilterOptions.find(
                      (option) => option.value === sourceFilter
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSourceFilter(newValue ? newValue.value : "");
                  }}
                  options={sourceFilterOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label="Source Filter"
                      fullWidth
                    />
                  )}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}></Grid>

              <Grid item xs={12} sm={3}>
                {/* Customer Header */}
                <h3
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Vendor
                </h3>
              </Grid>
              <Grid item xs={12} sm={3}>
                {(userData.groups.includes("Accounts") ||
                  userData.groups.includes("Director") ||
                  userData.groups.includes("Accounts Executive")) && (
                  <Button
                    onClick={() => setOpenPopupCreate(true)}
                    variant="contained"
                    color="success"
                    // startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
          <CustomTable
            headers={Tableheaders}
            data={Tabledata}
            openInPopup={
              !userData.groups.includes("Purchase") ? openInPopupUpdate : null
            }
            openInPopup2={openInPopupPurchaseOrder}
            openInPopup3={openInPopupChalan}
            openInPopup4={null}
            ButtonText={
              (!userData.groups.includes("Accounts Executive") ||
                !userData.groups.includes("Accounts")) &&
              "Create PO"
            }
            ButtonText1={
              (!userData.groups.includes("Accounts Executive") ||
                !userData.groups.includes("Accounts")) &&
              "Chalan"
            }
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>
      <Popup
        fullScreen={true}
        title={"Create Vendor Details"}
        openPopup={openPopupCreate}
        setOpenPopup={setOpenPopupCreate}
      >
        <CreateVendorDetails
          setOpenPopup={setOpenPopupCreate}
          getAllVendorDetails={getAllVendorDetails}
        />
      </Popup>
      <Popup
        fullScreen={true}
        title={"Update Vendor Details"}
        openPopup={openPopupUpdate}
        setOpenPopup={setOpenPopupUpdate}
      >
        <UpdateAllVendorDetails
          setOpenPopup={setOpenPopupUpdate}
          getAllVendorDetails={getAllVendorDetails}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <Popup
        fullScreen={true}
        title={"Purchase Order"}
        openPopup={openPopupPurchaseOrder}
        setOpenPopup={setOpenPopupPurchaseOrder}
      >
        <PurchaseOrderCreate
          setOpenPopup={setOpenPopupPurchaseOrder}
          recordForEdit={recordForEdit}
          getAllVendorDetails={getAllVendorDetails}
        />
      </Popup>
      <Popup
        fullScreen={true}
        title={"Create Chalan"}
        openPopup={openPopupChalan}
        setOpenPopup={setOpenPopupChalan}
      >
        <CreateChalan
          setOpenPopup={setOpenPopupChalan}
          getAllVendorDetails={getAllVendorDetails}
          recordForEdit={recordForEdit}
        />
      </Popup>
    </>
  );
};
