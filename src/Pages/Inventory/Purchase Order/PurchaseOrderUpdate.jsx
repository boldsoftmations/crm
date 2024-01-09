import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Switch,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CustomLoader } from "../../../Components/CustomLoader";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "../../../Components/CustomTextField";
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const PurchaseOrderUpdate = ({
  selectedRow,
  getAllPurchaseOrderDetails,
  setOpenPopup,
  contactNameOption,
}) => {
  console.log("contactNameOption", JSON.stringify(contactNameOption));
  console.log("selectedRow", selectedRow);
  const { sellerData, userData } = useSelector((state) => ({
    sellerData: state.auth.sellerAccount,
    userData: state.auth.profile,
  }));

  const [inputValues, setInputValues] = useState(selectedRow);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productOption, setProductOption] = useState([]);
  const [currencyOption, setCurrencyOption] = useState([]);

  // Before your component's return statement, after you've defined inputValues
  const vendorObject = contactNameOption.find(
    (vendor) => vendor.name === inputValues.vendor
  );
  const selectedVendorContacts = vendorObject ? vendorObject.contacts : [];

  // Then, when you're using the CustomAutocomplete component for vendor contacts, use the selectedVendorContacts array

  const currencyObject = currencyOption.find(
    (option) => option.name === inputValues.currency
  );
  useEffect(() => {
    if (selectedRow) {
      setInputValues(selectedRow);
    }
  }, [selectedRow]);

  console.log("inputsvalue contacts", inputValues.vendor_contact_person);
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleAutocompleteChange = useCallback(
    (fieldName, newValue) => {
      setInputValues((prevValues) => {
        const newValues = { ...prevValues };

        if (fieldName === "vendor_contact_person") {
          newValues[fieldName] = newValue ? newValue.name : "";
          newValues.vendor_contact = newValue ? newValue.contact : "";
          newValues.vendor_email = newValue ? newValue.email : "";
        } else {
          newValues[fieldName] = newValue;
        }

        return newValues;
      });
    },
    [setInputValues]
  );

  const handleProductChange = (index, field, value) => {
    setInputValues((prevValues) => {
      const updatedProducts = [...prevValues.products];
      const productToUpdate = { ...updatedProducts[index] };

      // Update the field with the new value
      productToUpdate[field] = value;

      // Calculate amount if quantity or rate is changed
      if (field === "quantity" || field === "rate") {
        const quantity = productToUpdate.quantity
          ? parseFloat(productToUpdate.quantity)
          : 0;
        const rate = productToUpdate.rate
          ? parseFloat(productToUpdate.rate)
          : 0;
        productToUpdate.amount = (quantity * rate).toFixed(2); // Use toFixed(2) to format it as a decimal
      }

      updatedProducts[index] = productToUpdate;
      return { ...prevValues, products: updatedProducts };
    });
  };

  const handleProductAutocompleteChange = (index, value) => {
    // Find the product object based on the selected value
    const productObj = productOption.find((item) => item.name === value);

    // Check if the new value is already included in the selected products list
    const isDuplicate = inputValues.products.some(
      (product, idx) => product.product === value && idx !== index
    );

    if (isDuplicate) {
      // If the product is already selected, show an error message
      setError(`Product ${value} is already selected in another field.`);
    } else {
      // Update the product entry with the new value and reset any error messages
      setError(null);
      setInputValues((prevValues) => {
        const newProducts = prevValues.products.map((product, idx) =>
          idx === index
            ? { ...product, product: value, unit: productObj.unit }
            : product
        );
        return { ...prevValues, products: newProducts };
      });
    }
  };

  const addProductField = useCallback(() => {
    handleProductChange(inputValues.products.length, "", "");
    setSelectedProducts([...selectedProducts, ""]);
  }, [inputValues.products.length, handleProductChange]);

  const removeProductField = (index) => {
    setInputValues((prevValues) => {
      const products = prevValues.products.filter((_, i) => i !== index);
      const removedProduct = prevValues.products[index].product;

      // Update the selected products list: remove the product that is being deleted
      setSelectedProducts(
        selectedProducts.filter((item) => item !== removedProduct)
      );

      return { ...prevValues, products };
    });
  };

  useEffect(() => {
    getProduct();
    getCurrencyDetails();
  }, []);

  const getCurrencyDetails = async () => {
    setLoading(true);
    try {
      const response = await InventoryServices.getCurrencyData();

      if (response && response.data) {
        setCurrencyOption(response.data);
      }
    } catch (err) {
      console.error("Error fetching daily sales review data", err);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await ProductService.getAllProduct();
      setProductOption(res.data);
      setLoading(false);
    } catch (err) {
      console.error("error potential", err);
      setLoading(false);
    }
  };

  const createPurchaseOrderDetails = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const req = {
        created_by: inputValues.created_by,
        vendor: inputValues.vendor,
        vendor_type: inputValues.vendor_type,
        vendor_email: inputValues.vendor_email,
        vendor_contact_person: inputValues.vendor_contact_person,
        vendor_contact: inputValues.vendor_contact,
        seller_account: inputValues.seller_account,
        payment_terms: inputValues.payment_terms,
        delivery_terms: inputValues.delivery_terms,
        schedule_date: inputValues.schedule_date,
        currency: inputValues.currency,
        po_no: inputValues.po_no,
        po_date: inputValues.po_date,
        seller_account: inputValues.seller_account || null,
        close_short: inputValues.close_short,
        products: inputValues.products || [],
      };

      const response = await InventoryServices.updatePurchaseOrderData(
        inputValues.id,
        req
      );
      if (response.status === 200) {
        setOpenPopup(false);
        getAllPurchaseOrderDetails();
      }
      setLoading(false);
    } catch (error) {
      console.log("createing Packing list error", error);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <CustomLoader open={loading} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createPurchaseOrderDetails(e)}
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
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              label="Vendor"
              variant="outlined"
              value={inputValues.vendor || ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="vendor-contact-person-autocomplete"
              options={selectedVendorContacts}
              getOptionLabel={(option) => option.name}
              value={
                selectedVendorContacts.find(
                  (option) => option.name === inputValues.vendor_contact_person
                ) || null
              }
              onChange={(event, newValue) => {
                handleAutocompleteChange("vendor_contact_person", newValue);
              }}
              renderInput={(params) => (
                <CustomTextField {...params} label="Vendor Contact Person" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              value={inputValues.seller_account || ""}
              onChange={(event, value) =>
                handleAutocompleteChange("seller_account", value)
              }
              options={sellerData.map((option) => option.unit)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Seller Account"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              value={inputValues.payment_terms || ""}
              onChange={(event, value) =>
                setInputValues({ ...inputValues, payment_terms: value })
              }
              options={paymentTerms.map((option) => option)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Payment Terms"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              value={inputValues.delivery_terms || ""}
              onChange={(event, value) =>
                setInputValues({ ...inputValues, delivery_terms: value })
              }
              options={deliveryTerms.map((option) => option)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Delivery Terms"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              name="po_no"
              label="Purchase Order No."
              variant="outlined"
              value={inputValues.po_no || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              name="po_date"
              size="small"
              label="Purchase Order Date"
              variant="outlined"
              value={inputValues.po_date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              value={currencyObject || null} // The value must be null or an option object
              onChange={(event, value) =>
                setInputValues({ ...inputValues, currency: value.name })
              }
              options={currencyOption}
              getOptionLabel={(option) => `${option.name} (${option.symbol})`}
              sx={{ minWidth: 300 }}
              label="Currency"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              name="schedule_date"
              size="small"
              label="Schedule Date"
              variant="outlined"
              value={inputValues.schedule_date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              label="Issued By"
              variant="outlined"
              value={inputValues.created_by || ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Switch
              checked={inputValues.close_short}
              onChange={(event) =>
                setInputValues({
                  ...inputValues,
                  close_short: event.target.checked,
                })
              }
              name="close_short"
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>Close Short</span>
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PRODUCT" />
              </Divider>
            </Root>
          </Grid>
          {inputValues.products.map((input, index) => {
            return (
              <>
                <Grid key={index} item xs={12} sm={3}>
                  <CustomAutocomplete
                    name="product"
                    size="small"
                    disablePortal
                    id={`combo-box-demo-${index}`}
                    value={input.product ? input.product : ""}
                    onChange={(event, value) =>
                      handleProductAutocompleteChange(index, value)
                    }
                    options={productOption.map((option) => option.name)}
                    getOptionLabel={(option) => option}
                    sx={{ minWidth: 300 }}
                    label="Product"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="unit"
                    size="small"
                    label="Unit"
                    variant="outlined"
                    value={input.unit ? input.unit : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <CustomTextField
                    fullWidth
                    name="quantity"
                    size="small"
                    label="Quantity"
                    variant="outlined"
                    value={input.quantity || ""}
                    onChange={(event) =>
                      handleProductChange(index, "quantity", event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <CustomTextField
                    fullWidth
                    size="small"
                    label="Pending Quantity"
                    variant="outlined"
                    value={input.pending_quantity || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="rate"
                    size="small"
                    label="Rate"
                    variant="outlined"
                    value={input.rate || ""}
                    onChange={(event) =>
                      handleProductChange(index, "rate", event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    value={input.amount || ""}
                    onChange={(event) =>
                      handleProductChange(index, "amount", event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={1} alignContent="right">
                  {index !== 0 && (
                    <Button
                      disabled={index === 0}
                      onClick={() => removeProductField(index)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  )}
                </Grid>
              </>
            );
          })}

          <Grid item xs={12} sm={2} alignContent="right">
            <Button
              onClick={addProductField}
              variant="contained"
              sx={{ marginRight: "1em" }}
            >
              Add More...
            </Button>
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

// Data structure for Payment Terms
const paymentTerms = [
  "100% Advance against PI",
  "50% Advance, Balance Before Dispatch",
  "30% Advance, Balance Before Dispatch",
  "15 days with PDC (Post-Dated Check)",
  "30 days with PDC",
  "45 days with PDC",
  "60 days with PDC",
  "15 days credit",
  "30 days credit",
  "45 days credit",
  "60 days credit",
  "90 days credit",
  "120 days credit",
  "TT in 100% advance against PI",
  "10% Advance, balance against bill of lading",
  "15% Advance, balance against bill of lading",
  "20% Advance, balance against bill of lading",
  "30% Advance, balance against bill of lading",
  "50% Advance, balance against bill of lading",
  "60 days against documents",
  "90 days against documents",
  "120 days against documents",
  "LC at Sight",
  "LC 45 days",
  "LC 60 days",
];

// Data structure for Delivery Terms
const deliveryTerms = [
  "Ex-Work",
  "FOB (Free On Board)",
  "CIF (Cost, Insurance, and Freight)",
  "C & F (Cost and Freight)",
  "Door Delivery (Prepaid)",
  "Door Delivery to pay",
  "Transporter Warehouse (Prepaid)",
  "Transporter Warehouse to pay",
  "Add actual freight in invoice",
  "Ex - warehouse",
];
