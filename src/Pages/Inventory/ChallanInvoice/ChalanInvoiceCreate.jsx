import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomTextField from "../../../Components/CustomTextField";

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
    products: [{ product: "", quantity: "", cunsuption_rate: "", amount: "" }],
  });

  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    createChalanInvoice();
    getProduct();
  }, []);

  const createChalanInvoice = async (formData) => {
    try {
      const response = await InventoryServices.createChalanInvoice(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getProduct = async () => {
    try {
      const res = await ProductService.getAllProduct();
      setProductOption(res.data);
    } catch (err) {
      console.error("error potential", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...formData.products];

    updatedProducts[index][name] = value;
    if (name === "quantity" || name === "cunsuption_rate") {
      const quantity = parseFloat(updatedProducts[index]["quantity"]) || 0;
      const cunsuptionRate =
        parseFloat(updatedProducts[index]["cunsuption_rate"]) || 0;
      const amount = quantity * cunsuptionRate;
      updatedProducts[index]["amount"] = amount.toString(); // Convert back to string if your form expects string inputs
    }

    // Update the state with the new products array
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProductField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: [
        ...prevFormData.products,
        { product: "", quantity: "", cunsuption_rate: "", amount: "" },
      ],
    }));
  };

  const removeProductField = (index) => {
    const filteredProducts = [...formData.products];
    filteredProducts.splice(index, 1);
    setFormData({ ...formData, products: filteredProducts });
  };

  const handleProductAutocompleteChange = (index, value) => {
    const updatedProducts = formData.products.map((item, idx) => {
      if (idx === index) {
        return { ...item, product: value };
      }
      return item;
    });
    setFormData({ ...formData, products: updatedProducts });
  };

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
          cunsuption_rate: parseInt(product.cunsuption_rate, 10),
          amount: parseInt(product.amount, 10),
        })),
      };
      const response = await createChalanInvoice(preparedFormData);
      console.log("Invoice Created:", response);
      getChalanDetails();
      setOpenPopup(false);
    } catch (error) {
      console.error("Failed to create chalan invoice", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
            value={formData.buyer_account}
            name="buyer_account"
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
        {formData.products.map((product, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={3}>
              <CustomAutocomplete
                name="product"
                size="small"
                disablePortal
                id={`combo-box-demo-${index}`}
                value={product.product}
                onChange={(event, value) =>
                  handleProductAutocompleteChange(index, value)
                }
                options={productOption.map((option) => option.name)}
                getOptionLabel={(option) => option}
                label="Product"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                size="small"
                label="Quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                size="small"
                label="Consumption Rate"
                name="cunsuption_rate"
                type="number"
                value={product.cunsuption_rate}
                onChange={(e) => handleProductChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                fullWidth
                size="small"
                label="Amount"
                name="amount"
                type="number"
                value={product.amount}
                onChange={(e) => handleProductChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton onClick={() => addProductField()}>
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
  );
};
