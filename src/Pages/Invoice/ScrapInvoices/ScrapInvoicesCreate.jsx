import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import InvoiceServices from "../../../services/InvoiceService";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomTextField from "../../../Components/CustomTextField";
import InventoryServices from "../../../services/InventoryService";
// import InventoryServices from "../../../services/InventoryService";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const values = {
  someDate: new Date().toISOString().substring(0, 10),
};

const ScrapInvoicesCreate = ({ getSalesInvoiceDetails, setOpenPopup }) => {
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      rate: "",
      amount: "",
    },
  ]);
  const [inputValue, setInputValue] = useState({
    invoice_type: "",
    generation_date: values.someDate,
    vendor: "",
    transporter_name: "",
  });
  const [sellerData, setSellerData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleAutocompleteChangeForUnits = (name, value) => {
    setInputValue({ ...inputValue, [name]: value ? value.unit : "" });
  };

  const handleAutocompleteChange = (index, event, value) => {
    let data = [...products];
    data[index].product = value;
    setProducts(data);
  };
  const handleFormChange = (index, event) => {
    const { name, value } = event.target;
    let data = [...products];
    data[index] = {
      ...data[index],
      [name]: value,
    };

    // Calculate the amount if either 'rate' or 'quantity' changes
    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(data[index].rate) || 0;
      const quantity = parseFloat(data[index].quantity) || 0;
      data[index].amount = (rate * quantity).toFixed(2); // Ensure amount is calculated as a string to two decimal places
    }

    setProducts(data);
  };

  const removeFields = (index) => {
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  const addFields = () => {
    setProducts([
      ...products,
      { product: "", quantity: 0, rate: "", amount: "" },
    ]);
  };

  const getProduct = useCallback(async () => {
    try {
      const response = await InventoryServices.getAllConsStoresInventoryData();
      console.log("response product", response.data);
      setProductOption(response.data);
    } catch (err) {
      console.error("error potential", err);
    }
  }, []);

  const getAllSellerAccountsDetails = async () => {
    try {
      const response = await InvoiceServices.getAllPaginateSellerAccountData(
        "all"
      );
      setSellerData(response.data);
    } catch (error) {
      console.log("Error fetching seller account data:", error);
    }
  };

  useEffect(() => {
    getAllSellerAccountsDetails();
    getProduct();
  }, []);

  const createScrapInvoiceDetails = async (e) => {
    e.preventDefault();

    const payload = {
      invoice_type: "Scrap",
      generation_date: inputValue.generation_date,
      transporter_name: inputValue.transporter_name,
      vendor: inputValue.vendor,
      seller_unit: inputValue.seller_unit,
      products: products,
    };

    try {
      setOpen(true);
      const response = await InvoiceServices.createSalesnvoiceData(payload);
      const successMessage =
        response.data.message || "Scrap Invoice created successfully!";
      handleSuccess(successMessage);
      setOpenPopup(false);
      getSalesInvoiceDetails();
    } catch (error) {
      handleError(error); // Using the custom hook's method to handle errors
      console.error("Creating BI error", error);
    } finally {
      setOpen(false); // Close the loading indicator
    }
  };

  return (
    <div>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createScrapInvoiceDetails(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              name="seller_unit"
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) =>
                handleAutocompleteChangeForUnits("seller_unit", value)
              }
              options={sellerData}
              getOptionLabel={(option) => option.unit}
              fullWidth
              label="Seller Unit"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type={"date"}
              name="generation_date"
              size="small"
              label="Generation Date"
              variant="outlined"
              value={inputValue.generation_date || values.someDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="vendor"
              size="small"
              label="Vendor"
              variant="outlined"
              value={inputValue.vendor}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="transporter_name"
              size="small"
              label="Transporter Name"
              variant="outlined"
              value={inputValue.transporter_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PRODUCT" />
              </Divider>
            </Root>
          </Grid>

          {products.map((input, index) => {
            const amount =
              (Number(input.quantity) || 0) * (Number(input.rate) || 0);

            return (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={3}>
                  <CustomAutocomplete
                    name="product"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, value) =>
                      handleAutocompleteChange(index, event, value)
                    }
                    options={productOption.map(
                      (option) => option.product__name
                    )}
                    getOptionLabel={(option) => option}
                    sx={{ minWidth: 300 }}
                    label="Product Name"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    name="quantity"
                    size="small"
                    label="Quantity"
                    variant="outlined"
                    value={input.quantity}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    name="rate"
                    size="small"
                    label="Rate"
                    variant="outlined"
                    value={input.rate}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    value={amount.toFixed(2)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                {index !== 0 && (
                  <Grid item xs={12} sm={1}>
                    <Button
                      onClick={() => removeFields(index)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
          <Grid item xs={12} sm={2}>
            <Button onClick={addFields} variant="contained">
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

export default ScrapInvoicesCreate;