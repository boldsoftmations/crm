import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomTextField from "../../../Components/CustomTextField";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

export const ChalanInvoiceCreate = ({
  setOpenPopup,
  challanNumbers,
  getChalanDetails,
}) => {
  const [formData, setFormData] = useState({
    challan: challanNumbers.challan_no,
    job_worker: challanNumbers.job_worker,
    buyer_account: challanNumbers.buyer_account,
    service_charge: "",
    transport_cost: "",
    invoice_no: "",
    products: [{ product: "", quantity: "", bom_id: "" }],
  });
  const [productOptions, setProductOptions] = useState([]);
  const [bomIdOptions, setBomIdOptions] = useState([]);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch product data
        const productResponse = await ProductService.getAllProduct();
        setProductOptions(productResponse.data);

        // Fetch BOM data
        const bomResponse = await InventoryServices.getAllBillofMaterialsData(
          "all"
        );
        setBomIdOptions(bomResponse.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Generic input handler for other form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handles changes to product-specific data
  const handleProductChange = (index, name, value) => {
    const updatedProducts = formData.products.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: updatedProducts,
    }));
  };

  // Add a new product entry field
  const addProductField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: [
        ...prevFormData.products,
        { product: "", quantity: "", bom_id: "" },
      ],
    }));
  };

  // Remove a product entry field
  const removeProductField = (index) => {
    const filteredProducts = formData.products.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: filteredProducts,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const preparedFormData = {
        ...formData,
        service_charge: parseInt(formData.service_charge, 10),
        transport_cost: parseInt(formData.transport_cost, 10),
        products: formData.products.map((product) => ({
          ...product,
          quantity: parseInt(product.quantity, 10),
        })),
      };
      const response = await InventoryServices.createChalanInvoice(
        preparedFormData
      );
      console.log("Invoice Created:", response);
      getChalanDetails();
      handleSuccess("Chalan Invoice Created Successfully");
      setOpenPopup(false);
    } catch (error) {
      handleError(error);
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Main Inputs */}
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Challan"
              name="challan"
              value={formData.challan}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Job Worker"
              name="job_worker"
              value={formData.job_worker}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              size="small"
              fullWidth
              label="Buyer Account"
              name="buyer_account"
              value={formData.buyer_account}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Service Charge"
              name="service_charge"
              type="number"
              value={formData.service_charge}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Transport Cost"
              name="transport_cost"
              type="number"
              value={formData.transport_cost}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Invoice No"
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
            />
          </Grid>

          {/* Product Inputs */}
          {formData.products.map((product, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <CustomAutocomplete
                  name="product"
                  size="small"
                  disablePortal
                  id={`combo-box-demo-${index}`}
                  value={product.product}
                  onChange={(event, value) =>
                    handleProductChange(index, "product", value)
                  }
                  options={productOptions.map((option) => option.name)}
                  getOptionLabel={(option) => option}
                  label="Product"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomAutocomplete
                  name="bom_id"
                  size="small"
                  disablePortal
                  id={`bom-box-${index}`}
                  value={product.bom_id}
                  onChange={(event, value) =>
                    handleProductChange(index, "bom_id", value)
                  }
                  options={bomIdOptions.map((option) => option.bom_id)}
                  getOptionLabel={(option) => option}
                  label="BOM ID"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton onClick={addProductField}>
                  <AddCircleOutlineIcon />
                </IconButton>
                {index > 0 && (
                  <IconButton onClick={() => removeProductField(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Invoice
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
