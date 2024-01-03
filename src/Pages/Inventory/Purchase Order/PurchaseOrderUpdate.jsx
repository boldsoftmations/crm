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
import InventoryServices from "../../../services/InventoryService";
import ProductService from "../../../services/ProductService";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const PurchaseOrderUpdate = (props) => {
  const { setOpenPopup, getAllPackingListDetails, idForEdit } = props;
  console.log("ID for Edit: ", idForEdit);
  const [PackingListDataByID, setPackingListDataByID] = useState([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const [selectedSellerData, setSelectedSellerData] = useState(null);
  const [vendor, setVendor] = useState("");
  const data = useSelector((state) => state.auth);
  const sellerData = data.sellerAccount;
  const today = new Date().toISOString().slice(0, 10);
  const [error, setError] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState({ name: "" });
  const [currencyOption, setCurrencyOption] = useState([]);
  const { userData } = useSelector((state) => ({
    sellerData: state.auth.sellerAccount,
    userData: state.auth.profile,
  }));
  const [inputValues, setInputValues] = useState({
    created_by: userData.email,
    purchase_order_no: "",
    purchase_order_date: "",
    purchase_invoice_date: "",
    schedule_date: "",
    vendor: "",
    vendor_address: "",
    vendor_email: "",
    vendor_contact_person: "",
    vendor_contact: "",
    seller_account: "",
    seller_address: "",
    seller_gst_no: "",
    payment_terms: "",
    delivery_terms: "",
    currency: "",
    products: [
      { product: "", quantity: "", unit: "", pending_quantity: "", amount: "" },
    ],
  });
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      unit: "",
    },
  ]);

  const getCurrencyDetails = async () => {
    setLoading(true);
    try {
      const response = await InventoryServices.getCurrencyData();

      if (response && response.data) {
        setCurrencyOption(response.data);
      }
    } catch (err) {
      console.error("Error fetching daily sales review data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutocompleteChange = (index, event, value) => {
    let data = [...products];
    const productObj = productOption.find((item) => item.name === value);

    if (data[index]) {
      data[index]["product"] = value;
      data[index]["unit"] = productObj ? productObj.unit : "";
      setProducts(data);
    } else {
      console.error("Invalid index or data not initialized correctly");
    }
  };

  const handleProductChange = (index, field, value) => {
    let newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackingListDataByID({ ...PackingListDataByID, [name]: value });
  };

  useEffect(() => {
    getProduct();
    getCurrencyDetails();
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

  useEffect(() => {
    console.log("Props: ", props);
    if (props.idForEdit) {
      fetchPurchaseOrderData(props.idForEdit);
    }
  }, [props.idForEdit]);

  const fetchPurchaseOrderData = async (id) => {
    try {
      setLoading(true);
      const response = await InventoryServices.getPurchaseOrderDataById(id);
      // Assuming the response has the data in a format that matches your state
      setInputValues(response.data);
      setProducts(response.data.products);
      // ... set other pieces of state as needed ...
      setLoading(false);
    } catch (err) {
      console.error("Error fetching purchase order data", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (idForEdit) getAllPackingListDetailsByID();
  }, [idForEdit]);

  const getAllPackingListDetailsByID = async () => {
    try {
      setOpen(true);
      const response = await InventoryServices.getPackingListDataById(
        idForEdit
      );

      setPackingListDataByID(response.data);
      setSelectedSellerData(response.data.seller_account);
      var arr = response.data.products.map((fruit) => ({
        product: fruit.product,
        quantity: fruit.quantity,
        unit: fruit.unit,
      }));
      setProducts(arr);

      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("company data by id error", err);
    }
  };

  const updateLeadProformaInvoiceDetails = async (e) => {
    try {
      e.preventDefault();
      if (!idForEdit) {
        console.error("ID for Edit is undefined");
        return;
      }
      setOpen(true);
      const req = {
        packing_list_no: PackingListDataByID.packing_list_no, //Normal text field
        invoice_date: PackingListDataByID.invoice_date
          ? PackingListDataByID.invoice_date
          : today,
        vendor: vendor.name ? vendor.name : PackingListDataByID.vendor,
        seller_account: selectedSellerData ? selectedSellerData : "",
        products: products,
      };
      await InventoryServices.updatePackingListData(idForEdit, req);

      setOpenPopup(false);
      getAllPackingListDetails();
      setOpen(false);
    } catch (err) {
      console.log("err", err);
      setOpen(false);
    }
  };

  const updatePurchaseOrderDetails = async (e) => {
    e.preventDefault();

    // Construct your update payload here
    const updatePayload = {
      purchase_order_no: inputValues.purchase_order_no,
      purchase_order_date: inputValues.purchase_order_date,
      purchase_invoice_date: inputValues.purchase_invoice_date,
      schedule_date: inputValues.schedule_date,
      vendor: inputValues.vendor,
      vendor_address: inputValues.vendor_address,
      vendor_email: inputValues.vendor_email,
      vendor_contact_person: inputValues.vendor_contact_person,
      vendor_contact: inputValues.vendor_contact,
      seller_account: inputValues.seller_account,
      seller_address: inputValues.seller_address,
      seller_gst_no: inputValues.seller_gst_no,
      payment_terms: inputValues.payment_terms,
      delivery_terms: inputValues.delivery_terms,
      currency: inputValues.currency,
      products: products.map((product) => ({
        product: product.product,
        quantity: product.quantity,
        unit: product.unit,
        pending_quantity: product.pending_quantity,
        amount: product.amount,
      })),
    };

    try {
      // Assuming you have a function to update purchase order data in your InventoryServices
      const response = await InventoryServices.updatePurchaseOrderData(
        props.idForEdit,
        updatePayload
      );

      // Handle success
      console.log("Purchase Order Updated Successfully", response);
      // You can also update UI here, like closing the form or showing a success message
    } catch (error) {
      // Handle error
      console.error("Error updating purchase order", error);
      // Update the UI to show the error message
    }
  };

  const handleVendorChange = (event) => {
    setRecordForEdit({
      ...recordForEdit,
      name: event.target.value,
    });
  };

  const paymentTerms = [
    "100% Advance against PI",
    "50% Advance, Balance Before Dispatch",
    "30% Advance, Balance Before Dispatch",
    "15 days with PDC (Post-Dated Check)",
    "30 days with PDC",
    "45 days with PDC",
    "60 days with PDC",
    "15 days credit",
    "30 days credit",
    "45 days credit",
    "60 days credit",
    "90 days credit",
    "120 days credit",
    "TT in 100% advance against PI",
    "10% Advance, balance against bill of lading",
    "15% Advance, balance against bill of lading",
    "20% Advance, balance against bill of lading",
    "30% Advance, balance against bill of lading",
    "50% Advance, balance against bill of lading",
    "60 days against documents",
    "90 days against documents",
    "120 days against documents",
    "LC at Sight",
    "LC 45 days",
    "LC 60 days",
  ];

  const deliveryTerms = [
    "Ex-Work",
    "FOB (Free On Board)",
    "CIF (Cost, Insurance, and Freight)",
    "C & F (Cost and Freight)",
    "Door Delivery (Prepaid)",
    "Door Delivery to pay",
    "Transporter Warehouse (Prepaid)",
    "Transporter Warehouse to pay",
    "Add actual freight in invoice",
    "Ex - warehouse",
  ];
  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <CustomLoader open={open} />

      <Box
        component="form"
        noValidate
        onSubmit={(e) => updatePurchaseOrderDetails(e)}
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
          {/* <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              label="Vendor"
              variant="outlined"
              value={recordForEdit.name || ""}
              onChange={handleVendorChange}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) =>
                handleAutocompleteChange("seller_account", value)
              }
              options={sellerData.map((option) => option.unit)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Seller Account"
            />
          </Grid> */}

          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              id="combo-box-demo"
              onChange={(event, value) =>
                setInputValues({ ...inputValues, payment_terms: value })
              }
              options={paymentTerms.map((option) => option)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Payment Terms"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              id="combo-box-demo"
              onChange={(event, value) =>
                setInputValues({ ...inputValues, delivery_terms: value })
              }
              options={deliveryTerms.map((option) => option)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              label="Delivery Terms"
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              name="Purchase_order_no"
              label="Purchase Order No."
              variant="outlined"
              value={inputValues.purchase_order_no || ""}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  purchase_order_no: e.target.value,
                })
              }
            />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              type="date"
              name="Purchase_order_date"
              size="small"
              label="Purchase Order Date"
              variant="outlined"
              value={inputValues.purchase_order_date || today}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              type="date"
              name="Purchase_invoice_date"
              size="small"
              label="Purchase Invoice Date"
              variant="outlined"
              value={inputValues.purchase_invoice_date || today}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) =>
                setInputValues({ ...inputValues, currency: value.symbol })
              }
              options={currencyOption.map((option) => option)}
              getOptionLabel={(option) => `${option.name} (${option.symbol})`}
              sx={{ minWidth: 300 }}
              label="Currency"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              type="date"
              name="schedule_date"
              size="small"
              label="Schedule Date"
              variant="outlined"
              value={inputValues.schedule_date || today}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: today } }} // Restrict past dates
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              size="small"
              label="Issued By"
              variant="outlined"
              value={inputValues.created_by || ""}
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
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    name="quantity"
                    size="small"
                    label="Quantity"
                    variant="outlined"
                    value={input.quantity || ""}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="pending_quantity"
                    size="small"
                    label="Pending Quantity"
                    variant="outlined"
                    value={input.pending_quantity || ""}
                    onChange={(event) =>
                      handleProductChange(
                        index,
                        "pending_quantity",
                        event.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    fullWidth
                    name="amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    value={input.amount || ""}
                    onChange={(event) =>
                      handleProductChange(index, "amount", event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2} alignContent="right">
                  {index !== 0 && (
                    <Button
                      disabled={index === 0}
                      onClick={() => removeFields(index)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  )}
                </Grid>
              </>
            );
          })}

          <Grid item xs={12} sm={2} alignContent="right">
            <Button
              onClick={addFields}
              variant="contained"
              sx={{ marginRight: "1em" }}
            >
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
