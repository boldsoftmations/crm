import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { CustomLoader } from "../../Components/CustomLoader";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomSnackbar from "../../../Components/CustomerSnackbar";
// import CustomSnackbar from "../../Components/CustomerSnackbar";
// import MasterService from "../../services/MasterService";
import InvoiceServices from "../../../services/InvoiceService";
import ProductService from "../../../services/ProductService";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const DispatchPackaginigCreate = ({
  setOpenPopup,
  getAllMasterCountries,
}) => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const handleClose = () => {
    setAlertMsg({ open: false });
  };

  const [inputValue, setInputValue] = useState({
    product: "",
    quantity: "",
    unit: "",
    unit_cost: "",
    seller_account_input: "",
  });
  const [consumable, setConsumable] = useState([]);
  const [sellerAccount, setSellerAccount] = useState([]);

  const getConsumableData = async () => {
    try {
      setOpen(true);
      const res = await ProductService.getAllConsumable("all", "");
      console.log(res.data);
      setConsumable(res.data);
    } catch (error) {
      setAlertMsg({
        message: error.response.data.message || "An unexpected error occurred",
        severity: "error",
        open: true,
      });
    } finally {
      setOpen(false);
    }
  };
  const getSellerAccountData = async () => {
    try {
      setOpen(true);
      const res = await InvoiceServices.getAllSellerAccountData();
      setSellerAccount(res.data.results);
    } catch (error) {
      setAlertMsg({
        message: error.response.data.message || "An unexpected error occurred",
        severity: "error",
        open: true,
      });
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    getConsumableData();
    getSellerAccountData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (!newValue) return;

    setInputValue((prevData) => ({
      ...prevData,
      product: newValue.name, // ✅ store name
      unit: newValue.unit, // ✅ auto set unit
      // Set seller account when product changes
    }));
  };
  const handleSellerAccountChange = (event, newValue) => {
    setInputValue((prevData) => ({
      ...prevData,
      seller_account_input: newValue ? newValue.unit : "",
    }));
  };
  const createCountry = async (e) => {
    e.preventDefault();

    try {
      setOpen(true);
      const response =
        await InvoiceServices.createDispatchPackagingData(inputValue);
      if (response.status === 201) {
        setAlertMsg({
          message:
            response.message || "Dispatch packaging created successfully",
          severity: "success",
          open: true,
        });
        setTimeout(() => {
          setOpenPopup(false);
          getAllMasterCountries();
        }, 500);
      } else {
        setAlertMsg({
          message: response.message || "Failed to create country",
          severity: "error",
          open: true,
        });
      }
    } catch (error) {
      setAlertMsg({
        message: error.response.data.message || "An unexpected error occurred",
        severity: "error",
        open: true,
      });
    } finally {
      setOpen(false);
      // Reset input value after submission
      setInputValue({
        product: "",
        quantity: "",
        unit: "",
        unit_cost: "",
        seller_account_input: "",
      });
    }
  };

  return (
    <>
      <CustomSnackbar
        open={alertmsg.open}
        message={alertmsg.message}
        severity={alertmsg.severity}
        onClose={handleClose}
      />
      <CustomLoader open={open} />
      <Box
        component="form"
        noValidate
        onSubmit={createCountry} // Moved onSubmit to the Box component
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomAutocomplete
              fullWidth
              label="Product Name"
              name="product"
              size="small"
              value={
                consumable.find((item) => item.name === inputValue.product) ||
                null
              }
              options={consumable.map((item) => item)}
              getOptionLabel={(option) => option.name || ""}
              onChange={handleAutocompleteChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              size="small"
              value={inputValue.unit || ""}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              fullWidth
              label="Seller Account"
              name="seller_account_input"
              size="small"
              value={
                sellerAccount.find(
                  (item) => item.unit === inputValue.seller_account_input,
                ) || null
              }
              options={sellerAccount}
              getOptionLabel={(option) => option.unit || ""}
              onChange={handleSellerAccountChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              size="small"
              value={inputValue.quantity}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unit Cost"
              name="unit_cost"
              size="small"
              value={inputValue.unit_cost}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit" // Keep type submit for the button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
