import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect } from "react";

import { Popup } from "./../../../Components/Popup";
import { UpdateLeads } from "./../../Leads/UpdateLeads";
import InvoiceServices from "../../../services/InvoiceService";
import LeadServices from "../../../services/LeadService";
import ProductService from "../../../services/ProductService";
import { useSelector } from "react-redux";
import { ErrorMessage } from "./../../../Components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const tfStyle = {
  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
    color: "blue",
    visibility: "visible",
  },
};

const values = {
  someDate: new Date().toISOString().substring(0, 10),
};

export const CreateLeadsProformaInvoice = (props) => {
  const { setOpenPopup, leads } = props;
  const navigate = useNavigate();
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [selectedSellerData, setSelectedSellerData] = useState("");
  const [product, setProduct] = useState([]);
  // const [leadIDData, setLeadIDData] = useState([]);
  const [paymentTermData, setPaymentTermData] = useState([]);
  const [deliveryTermData, setDeliveryTermData] = useState([]);
  // const [leadsOptions, setLeadsOptions] = useState([]);
  const [idForEdit, setIDForEdit] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [validationPrice, setValidationPrice] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [productData, setProductData] = useState("");
  const [unit, setUnit] = useState("");
  const [products, setProducts] = useState([
    {
      product: "",
      quantity: "",
      rate: "",
      requested_date: values.someDate,
      special_instructions: "",
    },
  ]);
  const data = useSelector((state) => state.auth);
  const users = data.profile;
  const sellerData = data.sellerAccount;

  const handleFormChange = (index, event) => {
    setProductData(event.target.textContent);
    let data = [...products];
    data[index][event.target.name ? event.target.name : "product"] = event
      .target.value
      ? event.target.value
      : event.target.textContent;
    setProducts(data);
  };

  function searchUnit(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].product === nameKey) {
        return myArray[i].id;
      }
    }
  }

  const ID = searchUnit(productData, product);
  const addFields = () => {
    let newfield = {
      product: "",
      quantity: "",
      rate: "",
      requested_date: values.someDate,
      special_instructions: "",
    };
    setProducts([...products, newfield]);
  };

  const removeFields = (index) => {
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  // useEffect(() => {
  //   getAllleadsData();
  // }, [openPopup3]);

  // const getAllleadsData = async () => {
  //   try {
  //     setOpen(true);
  //     let response = await LeadServices.getAllPaginatesLeads("all");
  //     setLeadsOptions(response.data);
  //     setOpen(false);
  //   } catch (err) {
  //     setOpen(false);
  //   }
  // };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      setOpen(true);
      const res = await ProductService.getAllValidPriceList("all");
      setProduct(res.data);
      setOpen(false);
    } catch (err) {
      console.error("error potential", err);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (ID) getPriceListData(ID);
  }, [ID]);

  const getPriceListData = async () => {
    try {
      const response = await ProductService.getPriceListById(ID);
      setUnit(response.data.unit);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const createLeadProformaInvoiceDetails = async (e) => {
    try {
      e.preventDefault();
      const req = {
        type: "Lead",
        raised_by: users.email,
        seller_account: selectedSellerData.gst_number,
        lead: leads.lead_id,
        contact: leads.contact,
        alternate_contact: leads.alternate_contact,
        address: leads.shipping_address,
        pincode: leads.shipping_pincode,
        state: leads.shipping_state,
        city: leads.shipping_city,
        place_of_supply: inputValue.place_of_supply,
        transporter_name: inputValue.transporter_name,
        buyer_order_no: checked === true ? "verbal" : inputValue.buyer_order_no,
        buyer_order_date: inputValue.buyer_order_date
          ? inputValue.buyer_order_date
          : values.someDate,
        payment_terms: paymentTermData,
        delivery_terms: deliveryTermData,
        status: "Pending Approval",
        products: products,
      };
      setOpen(true);
      if (
        leads.contact !== null &&
        leads.address !== null &&
        leads.state !== null &&
        leads.city !== null &&
        leads.pincode !== null &&
        leads.shipping_address !== null &&
        leads.shipping_state !== null &&
        leads.shipping_city !== null &&
        leads.shipping_pincode !== null &&
        (leads.pan_number !== null || leads.gst_number !== null) &&
        leads.company != null
      ) {
        await InvoiceServices.createLeadsProformaInvoiceData(req);
        setOpenPopup(false);
        navigate("/invoice/leads-performa-invoice");
      } else {
        setIDForEdit(leads.lead_id);
        setOpenPopup2(true);
      }
      setOpen(false);
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errors.buyer_order_no);
        setValidationPrice(
          err.response.data.errors.non_field_errors
            ? err.response.data.errors.non_field_errors
            : err.response.data.errors
        );
      }
      setIDForEdit(leads.lead_id);
      setOpenPopup2(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <Box
        component="form"
        noValidate
        onSubmit={(e) => createLeadProformaInvoiceDetails(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              name="seller_account"
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => setSelectedSellerData(value)}
              options={sellerData}
              getOptionLabel={(option) => option.state}
              sx={{ minWidth: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Seller Account" sx={tfStyle} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              name="payment_terms"
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => setPaymentTermData(value)}
              options={paymentTermsOptions.map((option) => option.label)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Payment Terms" sx={tfStyle} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              name="delivery_terms"
              size="small"
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => setDeliveryTermData(value)}
              options={deliveryTermsOptions.map((option) => option.label)}
              getOptionLabel={(option) => option}
              sx={{ minWidth: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Delivery Terms" sx={tfStyle} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="LEAD" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="Lead ID"
              size="small"
              label="Lead ID"
              variant="outlined"
              value={leads.lead_id}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="contact"
              size="small"
              label="Contact"
              variant="outlined"
              value={leads.contact}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="alternate_contact"
              size="small"
              label="Alt. Contact"
              variant="outlined"
              value={leads.alternate_contact}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              multiline
              required
              name="address"
              size="small"
              label="Address"
              variant="outlined"
              value={leads.address}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="city"
              size="small"
              label="City"
              variant="outlined"
              value={leads.city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="state"
              size="small"
              label="State"
              variant="outlined"
              value={leads.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="pincode"
              size="small"
              type={"number"}
              label="Pin Code"
              variant="outlined"
              value={leads.pincode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="shipping_address"
              size="small"
              label="Shipping Address"
              variant="outlined"
              value={leads.shipping_address}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="shipping_pincode"
              size="small"
              type={"number"}
              label="Pin Code"
              variant="outlined"
              value={leads.shipping_pincode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="shipping_city"
              size="small"
              label="Shipping City"
              variant="outlined"
              value={leads.shipping_city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              name="shipping_state"
              size="small"
              label="Shipping State"
              variant="outlined"
              value={leads.shipping_state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              label="Verbal"
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                />
              }
            />

            <TextField
              required
              name="buyer_order_no"
              size="small"
              label="Buyer Order No"
              variant="outlined"
              disabled={checked === true}
              value={
                checked === true
                  ? "Verbal"
                  : inputValue.buyer_order_no
                  ? inputValue.buyer_order_no
                  : ""
              }
              onChange={handleInputChange}
              error={errorMessage}
              helperText={errorMessage}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type={"date"}
              name="buyer_order_date"
              size="small"
              label="Buyer Order Date"
              variant="outlined"
              value={
                inputValue.buyer_order_date
                  ? inputValue.buyer_order_date
                  : values.someDate
              }
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="place_of_supply"
              size="small"
              label="Place of Supply"
              variant="outlined"
              value={inputValue.place_of_supply}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="transporter_name"
              size="small"
              label="Transporter Name"
              variant="outlined"
              value={inputValue.transporter_name}
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
          <ErrorMessage errMsg={validationPrice} />
          {products.map((input, index) => {
            return (
              <>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    name="product"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, value) => handleFormChange(index, event)}
                    options={product.map((option) => option.product)}
                    getOptionLabel={(option) => option}
                    sx={{ minWidth: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product Name"
                        sx={tfStyle}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    name="quantity"
                    size="small"
                    label="Quantity"
                    variant="outlined"
                    value={input.quantity}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Unit"
                    variant="outlined"
                    value={unit ? unit : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type={"number"}
                    fullWidth
                    name="rate"
                    size="small"
                    label="Rate"
                    variant="outlined"
                    // error={validationPrice}
                    // helperText={validationPrice}
                    // value={input.rate}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type={"number"}
                    name="amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    value={(input.quantity * input.rate).toFixed(2)}
                    // onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    type={"date"}
                    name="requested_date"
                    size="small"
                    label="Request Date"
                    variant="outlined"
                    value={
                      input.requested_date
                        ? input.requested_date
                        : values.someDate
                    }
                    onChange={(event) => handleFormChange(index, event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    name="special_instructions"
                    size="small"
                    label="Special Instructions"
                    variant="outlined"
                    value={
                      input.special_instructions
                        ? input.special_instructions
                        : ""
                    }
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={4} alignContent="right">
                  <Button
                    onClick={addFields}
                    variant="contained"
                    sx={{ marginRight: "1em" }}
                  >
                    Add More...
                  </Button>
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
      <Popup
        maxWidth={"xl"}
        title={"Update Lead Details"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Typography>
          {validationPrice
            ? validationPrice
            : "Kindly update all Shipping Details & Laeds Details in required field"}
        </Typography>
        <Button variant="contained" onClick={() => setOpenPopup(false)}>
          Update Leads
        </Button>
      </Popup>
      <Popup
        maxWidth={"xl"}
        title={"Update Leads"}
        openPopup={openPopup3}
        setOpenPopup={setOpenPopup3}
      >
        <UpdateLeads
          // getAllleadsData={getAllleadsData}
          recordForEdit={idForEdit}
          setOpenPopup={setOpenPopup3}
        />
      </Popup>
    </div>
  );
};

const paymentTermsOptions = [
  { label: "100% Advance", value: "100%_advance" },
  {
    label: "50% Advance, Balance Before Dispatch",
    value: "50%_advance_balance_before_dispatch",
  },
  {
    label: "30% Advance, Balance Before Dispatch",
    value: "30%_advance_balance_before_dispatch",
  },
  { label: "15 days along with PDC", value: "15_days_with_pdc" },
  { label: "30 days along with PDC", value: "30_days_with_pdc" },
  { label: "45 days along with PDC", value: "45_days_with_pdc" },
  { label: "60 days along with PDC", value: "60_days_with_pdc" },
  { label: "7 days", value: "7_days" },
  { label: "15 days", value: "15_days" },
  { label: "30 days", value: "30_days" },
  {
    label: "10% Advance, balance against shipping document (export)",
    value: "10%_advance_balance_against_shipping_document_(export)",
  },
  {
    label: "20% Advance, balance against shipping document (export)",
    value: "20%_advance_balance_against_shipping_document_(export)",
  },
  {
    label: "30% Advance, balance against shipping document (export)",
    value: "30%_advance_balance_against_shipping_document_(export)",
  },
  {
    label: "40% Advance, balance against shipping document (export)",
    value: "40%_advance_balance_against_shipping_document_(export)",
  },
  {
    label: "50% Advance, balance against shipping document (export)",
    value: "50%_advance_balance_against_shipping_document_(export)",
  },
  { label: "LC at Sight (Export)", value: "lc_at_sight_(export)" },
  { label: "LC 45 days (Export)", value: "lc_45_days_(export)" },
  { label: "TT in advance (Export)", value: "tt_in_advance_(export)" },
  { label: "45 days", value: "45_days" },
  { label: "60 days", value: "60_days" },
  { label: "Against Delivery", value: "against_delivery" },
  {
    label: "Transporter Warehouse (Prepaid)",
    value: "transporter_warehouse_(prepaid)",
  },
  {
    label: "Customer Door Delivery (Prepaid)",
    value: "customer_door_delivery_(prepaid)",
  },
];

const deliveryTermsOptions = [
  {
    label: "Ex-Work (Freight to pay)",
    value: "ex_work_(freight_to_pay)",
  },
  {
    label: "Transporter Warehouse (Freight to Pay)",
    value: "transporter_warehouse_(freight_to_pay)",
  },
  {
    label: "Customer Door Delivery (Freight to Pay)",
    value: "customer_door_delivery_(freight_to_pay)",
  },
  {
    label: "Customer Door Delivery (Prepaid)",
    value: "customer_door_delivery_(prepaid)",
  },
  {
    label: "Transporter Warehouse (Prepaid)",
    value: "transporter_warehouse_(prepaid)",
  },
  {
    label: "Add actual freight in invoice",
    value: "add_actual_freight_in_invoice",
  },
  {
    label: "Courier (Freight to Pay)",
    value: "courier_(freight_to_pay)",
  },
  {
    label: "Courier (Freight Add in Invoice)",
    value: "courier_(freight_add_in_invoice",
  },
];
