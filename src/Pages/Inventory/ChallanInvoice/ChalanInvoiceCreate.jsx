import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import InventoryServices from "../../../services/InventoryService";
import CustomTextField from "../../../Components/CustomTextField";

export const ChalanInvoiceCreate = ({ setOpenPopup, challanNumbers }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    challan: challanNumbers.challan_no,
    job_worker: challanNumbers.job_worker,
    buyer_account: challanNumbers.buyer_account,
    service_charge: "",
    transport_cost: "",
    invoice_no: "",
    products: challanNumbers.products.map((product) => ({
      product: product.product,
      quantity: product.quantity,
      cunsuption_rate: "",
      amount: "", //
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value) || 0;

    setFormData((prev) => {
      const updatedProducts = prev.products.map((product, idx) => {
        if (idx === index) {
          const updatedProduct = { ...product, [name]: parsedValue };
          if (name === "cunsuption_rate" || name === "quantity") {
            updatedProduct.amount =
              updatedProduct.quantity * updatedProduct.cunsuption_rate;
          }
          return updatedProduct;
        }
        return product;
      });

      return { ...prev, products: updatedProducts };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const preparedFormData = {
        challan: formData.challan,
        job_worker: formData.job_worker,
        buyer_account: formData.buyer_account,
        invoice_no: formData.invoice_no,
        service_charge: parseInt(formData.service_charge, 10),
        transport_cost: parseInt(formData.transport_cost, 10),
        products: formData.products.map((product) => ({
          product: product.product,
          quantity: parseInt(product.quantity, 10),
          cunsuption_rate: parseInt(product.cunsuption_rate, 10),
          amount: parseInt(product.amount, 10),
        })),
      };
      const response = await InventoryServices.createChalanInvoice(
        preparedFormData
      );
      console.log("Invoice Created:", response);
      setOpenPopup(false);
    } catch (error) {
      console.error("Failed to create chalan invoice", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            size="small"
            fullWidth
            label="Challan Invoice No"
            value={formData.challan}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            size="small"
            fullWidth
            label="Job Worker"
            value={formData.job_worker}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            size="small"
            fullWidth
            label="Buyer Account"
            value={formData.buyer_account}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            size="small"
            label="Service Charge"
            name="service_charge"
            value={formData.service_charge}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            size="small"
            label="Transport Cost"
            name="transport_cost"
            value={formData.transport_cost}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="Product"
                value={product.product}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                size="small"
                label="Quantity"
                type="number"
                value={product.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                fullWidth
                size="small"
                label="Consumption Rate"
                name="cunsuption_rate"
                value={product.cunsuption_rate}
                onChange={(e) => handleProductChange(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                fullWidth
                size="small"
                label="Amount"
                name="amount"
                value={product.amount}
                onChange={(e) => handleProductChange(e, index)}
              />
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Create Challan Invoice
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
