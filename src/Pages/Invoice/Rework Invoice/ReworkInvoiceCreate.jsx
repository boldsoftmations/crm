import React, { useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "./../../../Components/CustomAutocomplete";
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const ReworkInvoiceCreate = ({
  getSalesReturnInventoryDetails,
  setOpenPopup,
  selectedRow,
}) => {
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();
  const [productOption, setProductOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState(selectedRow.products);
  const [consumables, setConsumables] = useState([]);
  const [consumableOptions, setConsumableOptions] = useState([]);
  const [quantityError, setQuantityError] = useState(
    Array(products.length).fill(false)
  );

  const getconsumables = async () => {
    try {
      setOpen(true);
      const response = await ProductService.getAllConsumable("all");
      console.log("consumable", response.data);
      var arr = response.data.map((ProductData) => ({
        product: ProductData.name,
        unit: ProductData.unit,
      }));
      setConsumableOptions(arr);
      setOpen(false);
    } catch (err) {
      handleError(err);
      setOpen(false);
      console.log("err", err);
    }
  };

  const getProduct = async () => {
    try {
      const res = await ProductService.getAllValidPriceList("all");
      setProductOption(res.data);
    } catch (err) {
      console.error("error potential", err);
    }
  };

  useEffect(() => {
    getconsumables();
    getProduct();
  }, []);

  const handleInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleQuantityChange = (index, event) => {
    const newQuantity = Number(event.target.value); // Convert the input value to a number
    if (newQuantity >= 0 && newQuantity <= products[index].initialQuantity) {
      // Update is valid
      setProducts((currentProducts) =>
        currentProducts.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        )
      );
      // Reset error state if previously set
      const newErrors = [...quantityError];
      newErrors[index] = false;
      setQuantityError(newErrors);
    } else {
      // Set error for this index
      const newErrors = [...quantityError];
      newErrors[index] = true;
      setQuantityError(newErrors);
    }
  };

  const removeFields = (index) => {
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  const addConsumable = () => {
    setConsumables((prev) => [...prev, { product: "", quantity: 0 }]);
  };

  const removeConsumable = (index) => {
    setConsumables((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConsumableChange = (index, event) => {
    const { name, value } = event.target;
    setConsumables((current) =>
      current.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const createSupplierInvoiceDetails = async (e) => {
    e.preventDefault();

    const payload = {
      seller_account: selectedRow.unit,
      batch_no: selectedRow.batch_no.join(", "),
      products,
      consumables,
    };

    try {
      setOpen(true);
      const response = await InventoryServices.createReworkinvoiceData(payload);
      handleSuccess(
        response.data.message || "Rework Entry created successfully!"
      );
      setOpenPopup(false);
      getSalesReturnInventoryDetails();
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
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

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createSupplierInvoiceDetails(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              multiline
              size="small"
              label="Invoice No"
              variant="outlined"
              value={selectedRow.batch_no.join(", ")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Seller Unit"
              variant="outlined"
              value={selectedRow.unit}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              name="product"
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => handleInputChange("product", value)}
              options={productOption.map((option) => option.product)}
              getOptionLabel={(option) => option}
              fullWidth
              label="Product"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="quantity"
              size="small"
              label="Quantity"
              variant="outlined"
              value={inputValue.quantity}
              onChange={(event, value) =>
                handleInputChange("quantity", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PRODUCT" />
              </Divider>
            </Root>
          </Grid>
          {products.map((product, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={5}>
                <CustomTextField
                  fullWidth
                  name="product"
                  size="small"
                  label="Product"
                  variant="outlined"
                  value={product.product}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  name="quantity"
                  size="small"
                  label="Quantity"
                  variant="outlined"
                  value={product.quantity.toString()}
                  onChange={(event) => handleQuantityChange(index, event)}
                  inputProps={{
                    type: "number",
                    min: "0",
                    max: product.initialQuantity.toString(),
                  }}
                  error={quantityError[index]}
                  helperText={
                    quantityError[index]
                      ? `Max available: ${product.initialQuantity}`
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button onClick={() => removeFields(index)} variant="contained">
                  Remove
                </Button>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="CONSUMABLES" />
              </Divider>
            </Root>
          </Grid>
          {consumables.map((consumable, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={5}>
                <CustomAutocomplete
                  options={consumableOptions}
                  getOptionLabel={(option) => option.product || ""}
                  value={
                    consumableOptions.find(
                      (opt) => opt.product === consumable.product
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    handleConsumableChange(index, {
                      target: {
                        name: "product",
                        value: newValue ? newValue.product : "",
                      },
                    });
                    handleConsumableChange(index, {
                      target: {
                        name: "unit",
                        value: newValue ? newValue.unit : "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label="Consumable Product"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  name="unit"
                  size="small"
                  label="Unit"
                  variant="outlined"
                  value={consumable.unit || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  name="quantity"
                  size="small"
                  label="Quantity"
                  variant="outlined"
                  value={consumable.quantity}
                  onChange={(event) => handleConsumableChange(index, event)}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  onClick={() => removeConsumable(index)}
                  variant="contained"
                >
                  Remove
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button onClick={addConsumable} variant="contained">
              Add Consumable
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
    </>
  );
};
