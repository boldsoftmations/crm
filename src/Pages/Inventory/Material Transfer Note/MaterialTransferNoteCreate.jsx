import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import CustomTextField from "../../../Components/CustomTextField";
import { useSelector } from "react-redux";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const MaterialTransferNoteCreate = (props) => {
  const {
    setOpenCreatePopup,
    sellerOption,
    getAllMaterialTransferNoteDetails,
  } = props;
  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [error, setError] = useState(null);
  const data = useSelector((state) => state.auth);
  const users = data.profile;
  const [materialTransferNoteDetails, setMaterialTransferNoteDetails] =
    useState([]);
  const [chalanOption, setChalanOption] = useState([]);

  const handleSelectChange = (name, value) => {
    let updates = { [name]: value };

    if (name === "product") {
      const selectedProduct = productOption.find(
        (item) => item.product__name === value
      );
      if (selectedProduct) {
        updates.product__unit = selectedProduct.product__unit;
      }
    }

    setMaterialTransferNoteDetails((prevDetails) => ({
      ...prevDetails,
      ...updates,
    }));
  };

  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setMaterialTransferNoteDetails({
      ...materialTransferNoteDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (materialTransferNoteDetails.source_type === "Job Worker") {
      getChalanDetails();
    }
  }, [materialTransferNoteDetails.source_type]);

  const getChalanDetails = async () => {
    setOpen(true);
    try {
      const response = await InventoryServices.getChalan();
      console.log("response", response);
      if (response && response.data.results) {
        setChalanOption(response.data.results);
      }
    } catch (err) {
      console.error("Error fetching Chalan data", err);
    } finally {
      setOpen(false);
    }
  };

  const getProduct = async () => {
    setOpen(true);
    try {
      const response =
        await InventoryServices.getAllConsProductionInventoryData();
      if (response && response.data) {
        setProductOption(response.data);
      }
    } catch (err) {
      console.error("error potential", err);
    } finally {
      setOpen(false);
    }
  };

  const createMaterialTransferNoteDetails = async (e) => {
    e.preventDefault();
    setOpen(true);

    const isUnitTransfer =
      materialTransferNoteDetails.source_type === "Unit Transfer";
    const isJobWorker =
      materialTransferNoteDetails.source_type === "Job Worker";
    const ManuFacturing =
      materialTransferNoteDetails.source_type === "Manufacturing";

    const requestPayload = {
      source: materialTransferNoteDetails.source,
      user: users.email,
      product: materialTransferNoteDetails.product,
      quantity: materialTransferNoteDetails.quantity,
    };

    if (isUnitTransfer) {
      requestPayload.from_unit = materialTransferNoteDetails.from_unit;
      requestPayload.to_unit = materialTransferNoteDetails.to_unit;
    } else if (isJobWorker) {
      requestPayload.source_key = materialTransferNoteDetails.source_key;
      requestPayload.seller_account =
        materialTransferNoteDetails.seller_account;
    } else if (ManuFacturing) {
      requestPayload.seller_account =
        materialTransferNoteDetails.seller_account;
    }

    try {
      await InventoryServices.createMaterialTransferNoteData(requestPayload);
      setOpenCreatePopup(false);
      getAllMaterialTransferNoteDetails();
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.non_field_errors
      ) {
        errorMessage = error.response.data.errors.non_field_errors;
      }
      setError(errorMessage);
    } finally {
      setOpen(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <CustomLoader open={open} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createMaterialTransferNoteDetails(e)}
      >
        <Snackbar
          open={Boolean(error)}
          onClose={handleCloseSnackbar}
          message={error}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <Grid container spacing={2}>
          {/* Source Type - Always full width on XS for better touch targets */}
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="source-type-combo-box"
              onChange={(event, value) => handleSelectChange("source", value)}
              options={SourceOption}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 120 }} // Adjust minWidth for smaller screens
              label="Source Type"
            />
          </Grid>

          {/* Conditionally rendered based on source_type */}
          {materialTransferNoteDetails.source_type === "Job Worker" && (
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                size="small"
                disablePortal
                id="challan-no-combo-box"
                onChange={(event, value) =>
                  handleSelectChange("source_key", value)
                }
                options={chalanOption}
                getOptionLabel={(option) =>
                  `${option.job_worker} ${option.challan_no}`
                }
                sx={{ minWidth: 120 }}
                label="Challan Number"
              />
            </Grid>
          )}

          {materialTransferNoteDetails.source_type === "Unit Transfer" ? (
            <>
              {/* From Seller Account */}
              <Grid item xs={12} sm={6} md={3}>
                <CustomAutocomplete
                  size="small"
                  disablePortal
                  id="from-seller-account-combo-box"
                  onChange={(event, value) =>
                    handleSelectChange("from_unit", value)
                  }
                  options={sellerOption.map((option) => option.unit)}
                  getOptionLabel={(option) => option}
                  sx={{ minWidth: 120 }}
                  label="From Unit"
                />
              </Grid>
              {/* To Seller Account */}
              <Grid item xs={12} sm={6} md={3}>
                <CustomAutocomplete
                  size="small"
                  disablePortal
                  id="to-seller-account-combo-box"
                  onChange={(event, value) =>
                    handleSelectChange("to_unit", value)
                  }
                  options={sellerOption.map((option) => option.unit)}
                  getOptionLabel={(option) => option}
                  sx={{ minWidth: 120 }}
                  label="To Unit"
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                size="small"
                disablePortal
                id="seller-account-combo-box"
                onChange={(event, value) =>
                  handleSelectChange("seller_account", value)
                }
                options={sellerOption.map((option) => option.unit)}
                getOptionLabel={(option) => option}
                sx={{ minWidth: 120 }}
                label="Seller Account"
              />
            </Grid>
          )}

          {/* Product Name */}
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="product-name-combo-box"
              onChange={(event, value) => handleSelectChange("product", value)}
              options={productOption.map((option) => option.product__name)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 120 }}
              label="Product Name"
            />
          </Grid>

          {/* Unit and Quantity always take up half width on sm and above */}
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextField
              fullWidth
              name="unit"
              size="small"
              label="Unit"
              variant="outlined"
              value={materialTransferNoteDetails.product__unit || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextField
              fullWidth
              name="quantity"
              size="small"
              label="Quantity"
              variant="outlined"
              value={materialTransferNoteDetails.quantity || ""}
              onChange={handleInputChnage}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

const SourceOption = ["Manufacturing", "Job Worker", "Unit Transfer"];
