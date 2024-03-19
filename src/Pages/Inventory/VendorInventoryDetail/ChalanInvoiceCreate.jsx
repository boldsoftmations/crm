import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InventoryServices from "./../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomTextField from "../../../Components/CustomTextField";

export const ChalanInvoiceCreate = (setOpenPopup) => {
  const [formData, setFormData] = useState({
    challan: "",
    job_worker: "",
    buyer_account: "",
    service_charge: "",
    transport_cost: "",
    invoice_no: "",
    products: [{ product: "", quantity: "", cunsuption_rate: "", amount: "" }],
  });
  const [challanNumbers, setChallanNumbers] = useState([]);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    const fetchAllChallanNumbers = async (page = 1, allChallans = []) => {
      try {
        const response = await InventoryServices.getChalan(page);
        const newChallans = response.data.results.filter(
          (challan) => !challan.is_accepted
        );
        const combinedChallans = [...allChallans, ...newChallans];

        if (response.data.next) {
          fetchAllChallanNumbers(page + 1, combinedChallans);
        } else {
          setChallanNumbers(combinedChallans);
        }
      } catch (error) {
        console.error("Failed to fetch challan numbers", error);
      }
    };

    fetchAllChallanNumbers();
  }, []);

  useEffect(() => {
    createChalanInvoice();
  }, []);

  const createChalanInvoice = async (formData) => {
    try {
      const response = await InventoryServices.createChalanInvoice(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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

  const handleChallanChange = async (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      challan: newValue,
    }));
    const selectedChallan = challanNumbers.find(
      (challan) => challan.challan_no === newValue
    );

    if (selectedChallan) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        job_worker: selectedChallan.job_worker,
        buyer_account: selectedChallan.buyer_account,
      }));
    }
  };

  const handleProductChange = (index, event) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][event.target.name] = event.target.value;
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
      setOpenPopup(false);
    } catch (error) {
      console.error("Failed to create chalan invoice", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            fullWidth
            options={challanNumbers.map((option) => option.challan_no)}
            renderInput={(params) => (
              <CustomTextField {...params} label="Challan Number" />
            )}
            onChange={(event, newValue) => handleChallanChange(newValue)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Job Worker"
            name="jobWorker"
            value={formData.job_worker}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            size="small"
            disablePortal
            id="buyer-account-combo-box"
            value={formData.buyer_account}
            onChange={() => {}}
            options={challanNumbers.map((option) => option.buyer_account)}
            getOptionLabel={(option) => option || ""}
            sx={{ minWidth: 300 }}
            label="Buyer Account"
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Buyer Account"
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Service Charge"
            name="service_charge"
            type="number"
            value={formData.service_charge}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Transport Cost"
            name="transport_cost"
            type="number"
            value={formData.transport_cost}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Invoice No"
            name="invoice_no"
            value={formData.invoice_no}
            onChange={handleChange}
          />
        </Grid>
        {formData.products.map((product, index) => (
          <React.Fragment key={index}>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={1}>
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
