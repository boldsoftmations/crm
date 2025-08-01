import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import ProductService from "../../../services/ProductService";
import CustomerServices from "../../../services/CustomerService";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import CustomSnackbar from "../../../Components/CustomerSnackbar";

export const CustomerPotentialCreate = ({
  recordForEdit,
  getCompanyDetailsByID,
  setOpenModal,
}) => {
  const [open, setOpen] = useState(false);
  const [potential, setPotential] = useState({});
  const [product, setProduct] = useState([]);
  const [alertmsg, setAlertMsg] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const handleClose = () => {
    setAlertMsg({ open: false });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setOpen(true);
        const res = await ProductService.getSampleProduct();
        setProduct(res.data);
      } catch (err) {
        console.error("error potential", err);
      } finally {
        setOpen(false);
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPotential({ ...potential, [name]: value });
  };

  const handleAutocompleteChange = (event, value) => {
    setPotential({ ...potential, product: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setOpen(true);
      const data = {
        company: recordForEdit,
        ...potential,
      };
      await CustomerServices.createPotentialCustomer(data);

      // Success message
      setAlertMsg({
        message: "Potential customer created successfully!",
        severity: "success",
        open: true,
      });

      setOpenModal(false);
      await getCompanyDetailsByID();
    } catch (error) {
      setAlertMsg({
        message:
          error.response.data.message || "Error creating potential customer",
        severity: "error",
        open: true,
      });
      console.error("error:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <CustomSnackbar
        open={alertmsg.open}
        message={alertmsg.message}
        severity={alertmsg.severity}
        onClose={handleClose}
      />
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{ minWidth: 180 }}
              size="small"
              onChange={handleAutocompleteChange}
              value={potential.product}
              options={product.map((option) => option.name)}
              getOptionLabel={(option) => `${option ? option : "No Options"}`}
              label="Product"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="current_buying_quantity"
              size="small"
              label="Current Buying Quantity Monthly"
              variant="outlined"
              value={potential.current_buying_quantity || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              sx={{ marginTop: "20px" }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
