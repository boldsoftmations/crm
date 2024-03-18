import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import CustomTextField from "../../../Components/CustomTextField";
import { useSelector } from "react-redux";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const SourceBasedGRNCreate = (props) => {
  const { setOpenCreatePopup, sellerOption, getAllSourceBasedGRNData } = props;
  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [error, setError] = useState(null);
  const data = useSelector((state) => state.auth);
  const users = data.profile;
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      unit: "",
    },
  ]);
  const [sourceBasedGrnData, setSourceBasedGrnData] = useState({
    product: "",
    unit: "",
    quantity: "",
    source_type: "",
    transport_cost: "",
    grn_source: "",
    challan_no: "",
  });
  const [chalanOption, setChalanOption] = useState([]);

  const addFields = () => {
    let newfield = {
      product: "",
      quantity: "",
      unit: "",
    };
    setProducts([...products, newfield]);
  };

  const removeFields = (index) => {
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  const handleProductChange = (index, fieldName, value) => {
    setProducts((currentProducts) => {
      const newProducts = [...currentProducts];
      if (fieldName === "product") {
        const selectedProduct = productOption.find(
          (product) => product.product__name === value
        );
        newProducts[index] = {
          ...newProducts[index],
          [fieldName]: value,
          unit: selectedProduct ? selectedProduct.product__unit : "",
        };
      } else {
        newProducts[index] = {
          ...newProducts[index],
          [fieldName]: value,
        };
      }
      return newProducts;
    });
  };

  const handleSelectChange = (name, value) => {
    let updates = { [name]: value };

    if (name === "source") {
      updates.source_type = value;
      // Reset fields when source type changes
      setSourceBasedGrnData({ source_type: value });
    } else if (name === "product") {
      const selectedProduct = productOption.find(
        (item) => item.product__name === value
      );
      if (selectedProduct) {
        updates.product__unit = selectedProduct.product__unit;
      }
    }

    setSourceBasedGrnData((prevDetails) => ({
      ...prevDetails,
      ...updates,
    }));
  };
  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setSourceBasedGrnData({
      ...sourceBasedGrnData,
      [name]: value,
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (sourceBasedGrnData.source_type === "Job Worker") {
      getChalanDetails();
    }
  }, [sourceBasedGrnData.source_type]);

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

  const createSourceBasedGrnData = async (e) => {
    e.preventDefault();
    setOpen(true);

    const isUnitTransfer = sourceBasedGrnData.source_type === "Unit Transfer";
    const isJobWorker = sourceBasedGrnData.source_type === "Job Worker";
    // const ManuFacturing = sourceBasedGrnData.source_type === "Manufacturing";

    let requestPayload = {
      grn_source: sourceBasedGrnData.grn_source,
      user: users.email,
    };

    if (isUnitTransfer) {
      requestPayload = {
        ...requestPayload,
        grn_source: "Unit Transfer",
        from_unit: sourceBasedGrnData.from_unit,
        to_unit: sourceBasedGrnData.to_unit,
        transport_cost: sourceBasedGrnData.transport_cost,
        products: products.map((product) => ({
          products: product.product,
          unit: product.unit,
          order_quantity: parseInt(product.quantity, 10),
          rate: parseFloat(product.rate),
          amount: parseInt(product.amount),
          qa_accepted: parseInt(product.quantity, 10),
          qa_rejected: 0,
        })),
      };
    } else if (isJobWorker) {
      requestPayload = {
        ...requestPayload,
        grn_source: "Job Worker",
        challan_no: sourceBasedGrnData.challan_no,
        source_key: sourceBasedGrnData.source_key,
        seller_account: sourceBasedGrnData.seller_account,
        products: products.map((product) => ({
          products: product.product,
          unit: product.unit,
          order_quantity: parseInt(product.quantity, 10),
          rate: parseFloat(product.rate),
          amount: parseInt(product.amount),
          qa_accepted: parseInt(product.quantity, 10),
          qa_rejected: 0,
        })),
      };
    }
    // else if (ManuFacturing) {
    //   requestPayload = {
    //     ...requestPayload,
    //     seller_account: sourceBasedGrnData.seller_account,
    //     product: sourceBasedGrnData.product,
    //   };
    // }

    try {
      await InventoryServices.createSourceBasedGRN(requestPayload);
      setOpenCreatePopup(false);
      getAllSourceBasedGRNData();
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
        onSubmit={(e) => createSourceBasedGrnData(e)}
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
          <Grid item xs={12}>
            <CustomAutocomplete
              size="small"
              id="source-type-combo-box"
              onChange={(event, value) => handleSelectChange("source", value)}
              options={SourceOption}
              getOptionLabel={(option) => option}
              label="Source Type"
              value={sourceBasedGrnData.source_type}
            />
          </Grid>
          {sourceBasedGrnData.source_type === "Job Worker" && (
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

          {sourceBasedGrnData.source_type === "Unit Transfer" ? (
            <>
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
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  name="transport_cost"
                  size="small"
                  label="Transport Cost"
                  variant="outlined"
                  value={sourceBasedGrnData.transport_cost}
                  onChange={(e) => handleInputChnage(e)}
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

          {products.map((product, index) => (
            <>
              <Grid item xs={12} sm={4}>
                <CustomAutocomplete
                  size="small"
                  id={`product-name-${index}`}
                  value={product.product}
                  onChange={(event, value) =>
                    handleProductChange(index, "product", value)
                  }
                  options={productOption.map((option) => option.product__name)}
                  getOptionLabel={(option) => option}
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
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  name="unit"
                  size="small"
                  label="Unit"
                  variant="outlined"
                  value={product.unit}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={() => removeFields(index)} variant="contained">
                  Remove
                </Button>
              </Grid>
            </>
          ))}
          <Grid item xs={12}>
            <Button onClick={addFields} variant="contained">
              Add Product
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

const SourceOption = ["Job Worker", "Unit Transfer"];
