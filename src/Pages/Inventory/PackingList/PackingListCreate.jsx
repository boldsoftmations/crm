import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

export const PackingListCreate = (props) => {
  const { setOpenPopup, getAllPackingListDetails, selectedRow } = props;
  const [inputValue, setInputValue] = useState({
    po_no: selectedRow && selectedRow.po_no ? selectedRow.po_no : "",
    seller_account:
      selectedRow && selectedRow.seller_account
        ? selectedRow.seller_account
        : "",
  });

  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [selectedSellerData, setSelectedSellerData] = useState("");
  const data = useSelector((state) => state.auth);
  const sellerData = data.sellerAccount;
  const today = new Date().toISOString().slice(0, 10);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      unit: "",
    },
  ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAutocompleteChange = (index, event, value) => {
    let data = [...products];
    const productObj = productOption.find((item) => item.name === value);
    console.log("productObj", productObj);
    data[index]["product"] = value;
    data[index]["unit"] = productObj ? productObj.unit : "";
    setProducts(data);
  };

  const handleFormChange = (index, event) => {
    const selectedValue = event.target.value
      ? event.target.value
      : event.target.textContent;
    const data = [...products];
    data[index][event.target.name ? event.target.name : "product"] =
      selectedValue;

    const isValueDuplicate = data.some(
      (item, i) => item.product === selectedValue && i !== index
    );

    if (isValueDuplicate) {
      setError(`Selected ${selectedValue} already exists!`);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      setOpen(true);
      const res = await ProductService.getAllProduct();
      setProductOption(res.data);
      setOpen(false);
    } catch (err) {
      console.error("error potential", err);
      setOpen(false);
    }
  };

  const createPackingListDetails = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const req = {
        purchase_order: inputValue.po_no,
        invoice_date: inputValue.invoice_date ? inputValue.invoice_date : today,
        seller_account: selectedSellerData,
        products: products,
      };
      await InventoryServices.createPackingListData(req);
      setOpenPopup(false);
      getAllPackingListDetails();
      setOpen(false);
    } catch (error) {
      console.log("createing Packing list error", error);
      setOpen(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  useEffect(() => {
    if (selectedRow && selectedRow.products) {
      setProducts(
        selectedRow.products.map((product) => ({
          ...product,
          product: product.product,
          quantity: product.quantity,
          unit: product.unit,
          isEditable: false,
        }))
      );
    }
  }, [selectedRow]);

  useEffect(() => {
    setInputValue({
      po_no: selectedRow && selectedRow.po_no ? selectedRow.po_no : "",
      seller_account:
        selectedRow && selectedRow.seller_account
          ? selectedRow.seller_account
          : "",
    });
  }, [selectedRow]);

  return (
    <div>
      <CustomLoader open={open} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createPackingListDetails(e)}
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
              name="po_no"
              label="Purchase Order Number"
              variant="outlined"
              value={inputValue.po_no}
              onChange={handleInputChange}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              name="seller_account"
              size="small"
              disablePortal
              id="combo-box-demo"
              value={inputValue.seller_account}
              onChange={(event, value) => {
                setInputValue({ ...inputValue, seller_account: value });
              }}
              options={sellerData.map((option) => option.unit)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Seller Account"
              disabled={true} // Seller Account field is non-editable
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              type="date"
              name="invoice_date"
              size="small"
              label="Invoice Date"
              variant="outlined"
              value={inputValue.invoice_date ? inputValue.invoice_date : today}
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
            return (
              <>
                <Grid key={index} item xs={12} sm={4}>
                  <CustomAutocomplete
                    name="product"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    value={input.product ? input.product : ""}
                    onChange={(event, value) =>
                      handleAutocompleteChange(index, event, value)
                    }
                    options={productOption.map((option) => option.name)}
                    getOptionLabel={(option) => option}
                    sx={{ minWidth: 300 }}
                    label="Product Name"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    name="unit"
                    size="small"
                    label="Unit"
                    variant="outlined"
                    value={input.unit ? input.unit : ""}
                    disabled={true}
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
              </>
            );
          })}
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
