import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../Components/CustomButton";
import { CustomLoader } from "../../Components/CustomLoader";
import ProductForecastService from "../../services/ProductForecastService";
import LeadServices from "../../services/LeadService";

export const ProductForecastAssignTo = (props) => {
  const { getAllCompanyDetailsByID, setOpenPopup2, forecastDataByID } = props;
  const [open, setOpen] = useState(false);
  const [assignTo, setAssignTo] = useState(null);
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    getAssignedData();
  }, []);

  const getAssignedData = async (id) => {
    try {
      setOpen(true);
      const res = await LeadServices.getAllAssignedUser();

      setAssigned(res.data);
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const AssignToProduct = async (e) => {
    try {
      setOpen(true);
      e.preventDefault();
      const req = {
        company: forecastDataByID.company,
        product: forecastDataByID.product,
        sales_person: assignTo ? assignTo : forecastDataByID.sales_person,
      };
      await ProductForecastService.updateProductForecast(
        forecastDataByID.id,
        req
      );
      setOpenPopup2(false);
      getAllCompanyDetailsByID();
      setOpen(false);
    } catch (err) {
      console.error(err);
      setOpen(false);
    }
  };

  return (
    <>
      <CustomLoader open={open} />

      <Box component="form" noValidate onSubmit={AssignToProduct}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Assign From"
              variant="outlined"
              value={
                forecastDataByID.sales_person
                  ? forecastDataByID.sales_person
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              size="small"
              id="grouped-demo"
              onChange={(event, value) => setAssignTo(value)}
              options={assigned.map((option) => option.email)}
              getOptionLabel={(option) => option}
              // sx={{ minWidth: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Assign To" />
              )}
            />
          </Grid>
        </Grid>
        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          text={"Assign"}
        />
      </Box>
    </>
  );
};