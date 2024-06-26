import { Autocomplete, Box, Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { MessageAlert } from "../../../Components/MessageAlert";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import CustomerServices from "../../../services/CustomerService";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const CreateEDC = (props) => {
  const { getCompanyDetailsByID, setOpenEDC, editforEdc } = props;
  console.log("editforEdc", editforEdc);
  const [open, setOpen] = useState(false);
  const [edcData, setEdcData] = useState([]);

  const [inputValue, setInputValue] = useState({
    type: "Customer",
    id: editforEdc.id,
    edc_customer: "",
  });

  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const GetEdcData = useCallback(async () => {
    try {
      setOpen(true);
      const res = await CustomerServices.getAllEdc();
      setEdcData(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    GetEdcData();
  }, []);

  const handleInvoiceSelection = (event, value) => {
    setInputValue((prev) => ({
      ...prev,
      edc_customer: value,
    }));
  };

  const createEDC_Customer = async (e) => {
    try {
      e.preventDefault();
      const payload = { ...inputValue };
      setOpen(true);
      const response = await CustomerServices.CreateEDC_Customer(payload);
      const successMessage = response.data.message || "Assign EDC successfully";
      handleSuccess(successMessage);

      setTimeout(() => {
        setOpenEDC(false);
        getCompanyDetailsByID();
      }, 300);
    } catch (error) {
      handleError(error); // Handle errors from the API call
    } finally {
      setOpen(false); // Always close the loader
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
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={createEDC_Customer}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CustomAutocomplete
              name="edc"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={edcData.map((option) => option.name)}
              getOptionLabel={(option) => option}
              onChange={handleInvoiceSelection}
              fullWidth
              label="EDC"
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
    </>
  );
};
