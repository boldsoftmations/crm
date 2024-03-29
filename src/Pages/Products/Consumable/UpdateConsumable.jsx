import { Box, Button, Grid } from "@mui/material";
import { useRef, useState } from "react";
import React, { useEffect } from "react";
import ProductService from "../../../services/ProductService";
import "../../CommonStyle.css";
import { useSelector } from "react-redux";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const UpdateConsumable = (props) => {
  const { recordForEdit, setOpenPopup, getconsumables } = props;
  const [open, setOpen] = useState(false);
  const [consumable, setConsumable] = useState([]);
  const [unit, setUnit] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState([]);
  const [description, setDescription] = useState([]);
  const [brand, setBrand] = useState([]);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const user = useSelector((state) => state.auth);
  const brandData = user.brandAllData;
  const unitData = user.unitAllData;
  const unitval = unit.unit ? unit.unit : unit;
  const [shelfLife, setShelfLife] = useState("");
  function searchBrand(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i].short_name;
      }
    }
  }
  const brandval = brand.brand ? brand.brand : brand;

  const shortName = searchBrand(brandval, brandData);
  console.log("shortName", shortName);

  // function searchAutoNumber(nameKey, myArray) {
  //   for (let i = 0; i < myArray.length; i++) {
  //     if (myArray[i].name === nameKey) {
  //       return myArray[i].auto_number;
  //     }
  //   }
  // }
  const descriptionval = selectedDescription.description
    ? selectedDescription.description
    : selectedDescription;
  // const autoNumber = searchAutoNumber(descriptionval, description);

  const autoNo = consumable ? consumable.name : "";
  const name = autoNo ? autoNo : "";
  let first = name.indexOf("-");
  let second = name.indexOf("-", first + 1);
  const auto = name.slice(first + 1, second);
  const productName = `${descriptionval}-${auto ? auto : "-"}-${
    shortName ? shortName : "-"
  }`;

  useEffect(() => {
    getYesDescriptionData();
  }, []);

  const getYesDescriptionData = async () => {
    try {
      const res = await ProductService.getYesDescription();
      setDescription(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getconsumable = async (recordForEdit) => {
    try {
      setOpen(true);
      const res = await ProductService.getConsumableById(recordForEdit);
      setConsumable(res.data);
      setSelectedDescription(res.data);
      setUnit(res.data);
      setShelfLife(res.data.shelf_life);
      setBrand(res.data);
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === "shelf_life" ? Number(value) : value;
    setConsumable({ ...consumable, [name]: updatedValue });
  };

  const updatesconsumable = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = {
        name: productName,
        size: consumable.size,
        unit: unitval,
        description: descriptionval,
        additional_description: consumable.addDsc,
        shelf_life: shelfLife,
        brand: brandval,
        hsn_code: consumable.hsn_code,
        gst: consumable.gst,
        cgst: GST,
        sgst: GST,
        type: "consumables",
      };
      if (recordForEdit) {
        const res = await ProductService.updateConsumable(consumable.id, data);
        console.log("res", res);
        setOpenPopup(false);
        setOpen(false);
        getconsumables();
      }
    } catch (err) {
      console.log("error update color :>> ", err);
      setOpen(false);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg(
          err.response.data.errors
            ? err.response.data.errors.unit ||
                err.response.data.errors.description ||
                err.response.data.errors.brand
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

  useEffect(() => {
    if (recordForEdit) getconsumable(recordForEdit);
  }, [recordForEdit]);

  const GST = JSON.stringify(consumable.gst / 2);

  return (
    <>
      <CustomLoader open={open} />

      <Box component="form" noValidate onSubmit={(e) => updatesconsumable(e)}>
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
              label="Name"
              variant="outlined"
              value={consumable.name ? consumable.name : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="name"
              size="small"
              label="Product Code"
              variant="outlined"
              value={productName ? productName : productName}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="size"
              size="small"
              label="size"
              variant="outlined"
              value={consumable.size ? consumable.size : ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={unitval}
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
              value={descriptionval ? descriptionval : ""}
              onChange={(event, value) => setSelectedDescription(value)}
              options={description.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Description"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              value={brandval}
              onChange={(event, value) => setBrand(value)}
              options={brandData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="additional_description"
              size="small"
              label="Additional Descriptionj"
              variant="outlined"
              value={
                consumable.additional_description
                  ? consumable.additional_description
                  : ""
              }
              onChange={handleInputChange}
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
              value={consumable.hsn_code ? consumable.hsn_code : ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="gst"
              type={"number"}
              size="small"
              label="IGST %"
              variant="outlined"
              value={consumable.gst ? consumable.gst : ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              label="CGST"
              variant="outlined"
              value={GST ? `${GST}%` : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
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
