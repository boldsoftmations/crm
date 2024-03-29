import React, { useEffect, useRef, useState } from "react";

import ProductService from "../../../services/ProductService";

import { useSelector } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import CustomTextField from "../../../Components/CustomTextField";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";
export const UpdateRawMaterials = (props) => {
  const { recordForEdit, setOpenPopup, getrawMaterials } = props;
  const [shelfLife, setShelfLife] = useState("");
  const [rawMaterial, setRawMaterial] = useState([]);
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);
  const [productCode, setProductCode] = useState([]);
  const [unit, setUnit] = useState([]);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const brandData = user.brandAllData;
  const colorData = user.colourAllData;
  const productCodeData = user.productCodeAllData;
  const unitData = user.unitAllData;

  const productCodeValue = productCode.productcode
    ? productCode.productcode
    : productCode;
  const brandValue = brand.brand ? brand.brand : brand;
  const colorValue = color.color ? color.color : color;
  const unitValue = unit.unit ? unit.unit : unit;

  function searchBrand(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i].short_name;
      }
    }
  }

  var shortName = searchBrand(brand, brandData);
  const productName = `${productCodeValue ? productCodeValue : ""}-${
    colorValue ? colorValue : ""
  }-${shortName ? shortName : ""}-${rawMaterial.size ? rawMaterial.size : ""}`;

  function getDescription(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].code === nameKey) {
        return myArray[i].description;
      }
    }
  }

  var description = getDescription(productCodeValue, productCodeData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === "shelf_life" ? Number(value) : value;
    setRawMaterial({ ...rawMaterial, [name]: updatedValue });
  };

  const getRawMaterialData = async (recordForEdit) => {
    try {
      setOpen(true);
      const res = await ProductService.getRawMaterialsById(recordForEdit);
      setRawMaterial(res.data);
      setProductCode(res.data);
      setBrand(res.data);
      setColor(res.data);
      setUnit(res.data);
      setShelfLife(res.data.shelf_life);
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const updateRawMaterial = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = {
        name: productName,
        unit: unitValue,
        size: rawMaterial.size,
        color: colorValue,
        brand: brandValue,
        productcode: productCodeValue,
        description: description,
        shelf_life: shelfLife,
        hsn_code: rawMaterial.hsn_code,
        gst: rawMaterial.gst,
        cgst: GST,
        sgst: GST,
        type: "raw-materials",
      };
      if (recordForEdit) {
        await ProductService.updateRawMaterials(rawMaterial.id, data);

        setOpenPopup(false);
        setOpen(false);
        getrawMaterials();
      }
    } catch (err) {
      console.log("error update color :>> ", err);
      setOpen(false);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg(
          err.response.data.errors.name
            ? err.response.data.errors.name
            : err.response.data.errors.non_field_errors
        );
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.errors.code);
      } else {
        setErrMsg("Server Error");
      }
      errRef.current.focus();
    }
  };

  const GST = JSON.stringify(rawMaterial.gst / 2);

  useEffect(() => {
    if (recordForEdit) getRawMaterialData(recordForEdit);
  }, [recordForEdit]);

  return (
    <>
      <CustomLoader open={open} />

      <Box component="form" noValidate onSubmit={(e) => updateRawMaterial(e)}>
        <Grid container spacing={2}>
          <p
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 4,
              backgroundColor: errMsg ? "red" : "offscreen",
              textAlign: "center",
              color: "white",
              textTransform: "capitalize",
            }}
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              label="Raw Material"
              variant="outlined"
              value={rawMaterial.name ? rawMaterial.name : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="name"
              size="small"
              label="Update Raw Material"
              variant="outlined"
              value={productName ? productName : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="size"
              size="small"
              label="Size"
              variant="outlined"
              value={rawMaterial.size ? rawMaterial.size : ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={unitValue ? unitValue : ""}
              onChange={(e, value) => setUnit(value)}
              options={unitData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label={"Unit"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={colorValue ? colorValue : ""}
              onChange={(event, value) => setColor(value)}
              options={colorData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label={"Colour"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={brandValue ? brandValue : ""}
              onChange={(event, value) => setBrand(value)}
              options={brandData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Brand"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={productCodeValue ? productCodeValue : ""}
              onChange={(event, value) => setProductCode(value)}
              options={productCodeData.map((option) => option.code)}
              getOptionLabel={(option) => `${option}`}
              label={"Product Code"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              label="Description"
              variant="outlined"
              value={description ? description : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              type="number"
              name="shelfLife"
              label="Shelf Life (Months)"
              variant="outlined"
              value={shelfLife}
              onChange={(e) => setShelfLife(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="hsn_code"
              size="small"
              label="Hsn Code"
              variant="outlined"
              value={rawMaterial.hsn_code ? rawMaterial.hsn_code : ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              name="gst"
              type={"number"}
              size="small"
              label="IGST %"
              variant="outlined"
              value={rawMaterial.gst ? rawMaterial.gst : ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              size="small"
              label="CGST"
              variant="outlined"
              value={GST ? `${GST}%` : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              size="small"
              label="SGST"
              variant="outlined"
              value={GST ? `${GST}%` : ""}
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
};
