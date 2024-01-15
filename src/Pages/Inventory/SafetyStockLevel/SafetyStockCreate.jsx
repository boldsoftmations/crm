import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Grid, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import { CustomLoader } from "../../../Components/CustomLoader";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const SafetyStockCreate = ({ setOpenPopup, onCreateSuccess }) => {
  const { sellerData } = useSelector((state) => ({
    sellerData: state.auth.sellerAccount,
  }));
  console.log(sellerData);

  const [inputValues, setInputValues] = useState({
    seller_account: "",
    product: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productOption, setProductOption] = useState([]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleAutocompleteChange = useCallback((fieldName, value) => {
    setInputValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getAllProduct();
        setProductOption(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createSafetyStock = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await InventoryServices.createSafetyStockData(inputValues);
      onCreateSuccess();
    } catch (error) {
      console.error("Error creating safety stock", error);
      setError("Failed to create safety stock");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <CustomLoader open={loading} />
      <Box component="form" noValidate onSubmit={createSafetyStock}>
        <Snackbar
          open={Boolean(error)}
          onClose={handleCloseSnackbar}
          message={error}
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
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              size="small"
              disablePortal
              options={sellerData.map((option) => option.unit)}
              getOptionLabel={(option) => option}
              onChange={(event, value) =>
                handleAutocompleteChange("seller_account", value)
              }
              label="Seller Account"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              size="small"
              disablePortal
              options={productOption.map((option) => option.name)}
              getOptionLabel={(option) => option}
              onChange={(event, value) =>
                handleAutocompleteChange("product", value)
              }
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
              value={inputValues.quantity}
              onChange={handleInputChange}
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
