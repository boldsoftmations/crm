import { Box, Button, Grid } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "../../../services/InventoryService";
import CustomTextField from "../../../Components/CustomTextField";
import { useSelector } from "react-redux";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

export const SourceBasedGRNCreate = memo((props) => {
  const {
    setOpenCreatePopup,
    sellerOption,
    getAllSourceBasedGRNData,
    currentPage,
  } = props;
  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const data = useSelector((state) => state.auth);
  const users = data.profile;
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      unit: "",
    },
  ]);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const [sourceBasedGrnData, setSourceBasedGrnData] = useState({
    product: "",
    unit: "",
    quantity: "",
    source_type: "",
    transport_cost: "",
    grn_source: "",
    challan_no: "",
    seller_account: "",
  });
  const [chalanOption, setChalanOption] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [pageCount, setPageCount] = useState(0);

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
      setSourceBasedGrnData({
        source_type: value,
        product: "",
        unit: "",
        quantity: "",
        transport_cost: "",
        grn_source: "",
        challan_no: "",
        seller_account: "",
      });
      setProducts([
        {
          product: "",
          quantity: "",
          unit: "",
        },
      ]);
      setSelectedInvoice(null);
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
    getInvoiceDetails();
  }, []);

  const getInvoiceDetails = async (page = 1) => {
    try {
      const response = await InventoryServices.getChallanInvoice(page);
      if (response && response.data.results) {
        setInvoiceData((prevInvoices) => [
          ...prevInvoices,
          ...response.data.results,
        ]);

        const total = response.data.count;
        const totalPages = Math.ceil(total / 25);
        setPageCount(totalPages);
        if (page < totalPages) {
          getInvoiceDetails(page + 1);
        }
      }
    } catch (err) {
      handleError(err);
      console.error("Error fetching invoice data", err);
    }
  };

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
      handleError(err);
      console.error("Error fetching Chalan data", err);
    } finally {
      setOpen(false);
    }
  };

  const getProduct = async () => {
    setOpen(true);
    try {
      const response = await InventoryServices.getAllConsStoresInventoryData();
      if (response && response.data) {
        setProductOption(response.data);
      }
    } catch (err) {
      handleError(err);
      console.error("error potential", err);
    } finally {
      setOpen(false);
    }
  };

  const handleInvoiceChange = (value) => {
    const selectedInvoice = invoiceData.find(
      (invoice) => invoice.invoice_no === value
    );
    setSelectedInvoice(selectedInvoice);
    console.log("Selected Invoice:", selectedInvoice);
    if (selectedInvoice) {
      setSourceBasedGrnData((prev) => ({
        ...prev,
        transport_cost: selectedInvoice.transport_cost,
        grn_source: selectedInvoice.buyer_account,
        invoice_no: selectedInvoice.invoice_no,
        total_amount: selectedInvoice.total_amount,
        seller_account: selectedInvoice.buyer_account,
        challan_no: selectedInvoice.challan,
      }));
      const transformedProducts = selectedInvoice.products.map((product) => ({
        product: product.product,
        quantity: product.quantity,
        unit: product.unit,
        total_amount: product.total_amount,
      }));
      setProducts(transformedProducts);
    } else {
      setSourceBasedGrnData((prev) => ({
        ...prev,
        transport_cost: "",
        seller_account: "",
      }));
      setProducts([{ product: "", quantity: "", unit: "" }]);
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
        transport_cost: parseFloat(sourceBasedGrnData.transport_cost),
        products: products.map((product) => ({
          products: product.product,
          unit: product.unit,
          order_quantity: parseInt(product.quantity, 10),
          // rate: parseFloat(product.rate),
          // amount: parseInt(product.amount),
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
        invoice_no: sourceBasedGrnData.invoice_no,
        transport_cost: parseFloat(sourceBasedGrnData.transport_cost),
        total_amount: parseFloat(sourceBasedGrnData.total_amount),
        products: products.map((product) => ({
          products: product.product,
          unit: product.unit,
          order_quantity: parseInt(product.quantity, 10),
          rate: parseFloat(product.rate),
          amount: parseInt(product.amount),
          total_amount: parseFloat(product.total_amount),
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
      handleSuccess("Source Based GRN Created Successfully");
      setTimeout(() => {
        setOpenCreatePopup(false);
      }, 300);
      getAllSourceBasedGRNData(currentPage);
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
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
        onSubmit={(e) => createSourceBasedGrnData(e)}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={sourceBasedGrnData.source_type === "Job Worker" ? 4 : 3}
          >
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
            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                size="small"
                disablePortal
                id="invoice-number-combo-box"
                onChange={(event, value) => handleInvoiceChange(value)}
                options={invoiceData.map((option) => option.invoice_no)}
                getOptionLabel={(option) => option}
                sx={{ minWidth: 120 }}
                label="Invoice Number"
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
              <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                size="small"
                disablePortal
                id="seller-account-combo-box"
                value={sourceBasedGrnData.grn_source}
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
              {index !== 0 &&
                sourceBasedGrnData.source_type !== "Job Worker" && (
                  <Grid item xs={12} sm={2}>
                    <Button
                      onClick={() => removeFields(index)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
            </>
          ))}
          {sourceBasedGrnData.source_type !== "Job Worker" && (
            <Grid item xs={12}>
              <Button onClick={addFields} variant="contained">
                Add Product
              </Button>
            </Grid>
          )}
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
});

const SourceOption = ["Job Worker", "Unit Transfer"];
