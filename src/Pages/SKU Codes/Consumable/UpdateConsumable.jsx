import { Box, Button, Grid } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import ProductService from "../../../services/ProductService";
import { useSelector } from "react-redux";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";
import { MessageAlert } from "../../../Components/MessageAlert";

function searchArrayByKey(array, key, searchValue, returnValue) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === searchValue) {
      return array[i][returnValue];
    }
  }
}

export const UpdateConsumable = memo((props) => {
  const {
    recordForEdit,
    setOpenPopup,
    getconsumables,
    currentPage,
    searchQuery,
    descriptionOptions,
  } = props;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(recordForEdit);
  const { brandAllData, unitAllData } = useSelector((state) => state.auth);
  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();
    const userData = useSelector((state) => state.auth.profile);
    const isInGroups = (...groups) =>
      groups.some((group) => userData.groups.includes(group));

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const shortName = searchArrayByKey(
    brandAllData,
    "name",
    formData.brand || "",
    "short_name"
  );

  const productName = useMemo(() => {
    const autoNo = formData.name || "";
    const first = autoNo.indexOf("-");
    const second = autoNo.indexOf("-", first + 1);
    const auto = autoNo.slice(first + 1, second);
    const parts = [formData.description, auto || "-", shortName || "-"];

    return parts.join("-");
  }, [formData, shortName]);

  const GST = JSON.stringify(formData.gst / 2);

  const updatesconsumable = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setOpen(true);
        const GST = formData.gst / 2;
        const data = {
          ...formData,
          name: productName,
          cgst: GST,
          sgst: GST,
          type: "consumables",
        };

        if (recordForEdit) {
          const response = await ProductService.updateConsumable(
            formData.id,
            data
          );
          const successMessage =
            response.data.message || "Consumable updated successfully";
          handleSuccess(successMessage);

          setTimeout(() => {
            setOpenPopup(false);
            getconsumables(currentPage, searchQuery);
          }, 300);
        }
      } catch (error) {
        handleError(error); // Handle errors from the API call
      } finally {
        setOpen(false); // Always close the loader
      }
    },
    [formData, productName, GST, currentPage, searchQuery]
  );

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />

      <Box component="form" noValidate onSubmit={(e) => updatesconsumable(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Name"
              variant="outlined"
              value={formData.name || ""}
              disabled={isInGroups("Stores")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="name"
              size="small"
              label="Product Code"
              variant="outlined"
              value={productName || ""}
               disabled={isInGroups("Stores")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="size"
              size="small"
              label="size"
              variant="outlined"
              value={formData.size || ""}
               disabled={isInGroups("Stores")}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={formData.unit || ""}
              onChange={(event, newValue) => {
                setFormData((prev) => ({ ...prev, unit: newValue }));
              }}
              options={unitAllData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label={"Unit"}
               disabled={isInGroups("Stores")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={formData.description || ""}
              onChange={(event, newValue) => {
                setFormData((prev) => ({ ...prev, description: newValue }));
              }}
              options={descriptionOptions.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Description"
               disabled={isInGroups("Stores")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={formData.brand || ""}
              onChange={(event, newValue) => {
                setFormData((prev) => ({ ...prev, brand: newValue }));
              }}
              options={brandAllData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Brand"
               disabled={isInGroups("Stores")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="additional_description"
              size="small"
              label="Additional Descriptionj"
              variant="outlined"
              value={formData.additional_description || ""}
              onChange={handleInputChange}
               disabled={isInGroups("Stores")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              name="shelf_life"
              label="Shelf Life (Month)"
              variant="outlined"
              value={formData.shelf_life || ""}
              onChange={handleInputChange}
               disabled={isInGroups("Stores")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="hsn_code"
              size="small"
              label="Hsn Codes"
              variant="outlined"
              value={formData.hsn_code || ""}
              onChange={handleInputChange}
               disabled={isInGroups("Stores")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="minimum_stock_limit"
              size="small"
              label="Minimum Stock Limit"
              variant="outlined"
              value={formData.minimum_stock_limit || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              name="gst"
              type={"number"}
              size="small"
              label="IGST %"
              variant="outlined"
              value={formData.gst || ""}
              onChange={handleInputChange}
               disabled={isInGroups("Stores")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="CGST"
              variant="outlined"
              value={GST ? `${GST}%` : ""}
               disabled={isInGroups("Stores")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="SGST"
              variant="outlined"
              value={GST ? `${GST}%` : ""}
               disabled={isInGroups("Stores")}
            />
          </Grid>
        </Grid>

        <Button
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </>
  );
});
