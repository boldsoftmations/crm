import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Grid } from "@mui/material";
import CustomerServices from "../../../services/CustomerService";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import MasterService from "../../../services/MasterService";
import CustomSnackbar from "../../../Components/CustomerSnackbar";

export const UpdateWareHouseDetails = (props) => {
  const { IDForEdit, getAllCompanyDetailsByID, setOpenPopup, contactData } =
    props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const data = useSelector((state) => state.auth);
  const [alertmsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const [selectedcontact, setSelectedContact] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    getWareHouseDataByID();
  }, []);

  const handleClose = () => {
    setAlertMsg({ open: false });
  };

  const getWareHouseDataByID = async () => {
    try {
      setOpen(true);
      const response = await CustomerServices.getWareHouseDataById(IDForEdit);
      setInputValue(response.data);
      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("company data by id error", err);
    }
  };

  const validatePinCode = async () => {
    try {
      setOpen(true);
      const PINCODE = inputValue.pincode;
      const response = await MasterService.getCountryDataByPincode(
        "India",
        PINCODE
      );
      if (response.data.length === 0) {
        setAlertMsg({
          message:
            "This Pin Code does not exist ! First Create the Pin code in the master country",
          severity: "warning",
          open: true,
        });
        setInputValue({
          ...inputValue,
          state: "",
          city: "",
        });
      } else {
        setAlertMsg({
          message: "Pin code is valid",
          severity: "success",
          open: true,
        });
        setInputValue({
          ...inputValue,
          state: response.data[0].state,
          city: response.data[0].city_name,
        });
      }
    } catch (error) {
      console.log("error", error);
      setAlertMsg({
        message: "Error fetching country data by pincode",
        severity: "error",
        open: true,
      });
    } finally {
      setOpen(false);
    }
  };

  const UpdateWareHouseDetails = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const req = {
        company: data ? data.companyName : "",
        contact: selectedcontact.id ? selectedcontact.id : inputValue.contact,
        address: inputValue.address,
        pincode: inputValue.pincode,
        state: inputValue.state || "",
        city: inputValue.city || "",
      };
      await CustomerServices.updatetWareHouseData(IDForEdit, req);
      setOpenPopup(false);
      setOpen(false);
      getAllCompanyDetailsByID();
    } catch (error) {
      console.log("createing company detail error", error);
      setOpen(false);
    }
  };

  return (
    <div>
      <CustomLoader open={open} />
      <CustomSnackbar
        open={alertmsg.open}
        message={alertmsg.message}
        severity={alertmsg.severity}
        onClose={handleClose}
      />
      <Box
        component="form"
        noValidate
        onSubmit={(e) => UpdateWareHouseDetails(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              name="contact"
              label="Contact"
              variant="outlined"
              value={
                inputValue.contact_name
                  ? `${inputValue.contact_name} ${inputValue.contact_number}`
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              fullWidth
              size="small"
              id="grouped-demo"
              onChange={(event, value) => setSelectedContact(value)}
              options={contactData.map((option) => option)}
              groupBy={(option) => option.designation}
              getOptionLabel={(option) => `${option.name} ${option.contact}`}
              label="Update Contact"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              onChange={handleInputChange}
              size="small"
              name="address"
              label="Address"
              variant="outlined"
              value={inputValue.address ? inputValue.address : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              onChange={handleInputChange}
              size="small"
              name="pincode"
              label="Pin Code"
              variant="outlined"
              value={inputValue.pincode || ""}
            />

            {/* <Button
              onClick={() => validatePinCode()}
              variant="contained"
              sx={{ marginLeft: "1rem" }}
            >
              Validate
            </Button> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={validatePinCode}
              variant="contained"
              sx={{ marginLeft: "1rem" }}
            >
              Validate
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              name="state"
              label="State"
              variant="outlined"
              value={inputValue.state || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              name="city"
              label="City"
              variant="outlined"
              value={inputValue.city || ""}
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
