import { Box, Button, Grid } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

import ProductService from "../../../services/ProductService";

import "../../CommonStyle.css";
import { useSelector } from "react-redux";
import { CustomLoader } from "../../../Components/CustomLoader";
import CustomTextField from "../../../Components/CustomTextField";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const CreateConsumable = (props) => {
  const { setOpenPopup, getconsumables } = props;
  const [description, setDescription] = useState([]);
  const [allDescription, seAllDescription] = useState([]);
  const [brand, setBrand] = useState([]);
  const [unit, setUnit] = useState([]);
  const [consumable, setConsumable] = useState([]);
  const [open, setOpen] = useState(false);
  const [shelfLife, setShelfLife] = useState([]);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const user = useSelector((state) => state.auth);
  const brandData = user.brandAllData;
  const unitData = user.unitAllData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "shelfLife") {
      setShelfLife(value);
    } else {
      setConsumable({ ...consumable, [name]: value });
    }
  };
  function searchBrand(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i].short_name;
      }
    }
  }

  var shortName = searchBrand(brand, brandData);

  function searchAutoNumber(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i].auto_number;
      }
    }
  }

  var autoNumber = searchAutoNumber(description, allDescription);
  const productName = `${description ? description : ""}-${
    autoNumber ? autoNumber : ""
  }-${shortName ? shortName : ""}`;

  useEffect(() => {
    getYesDescriptionData();
  }, []);

  const getYesDescriptionData = async () => {
    try {
      const res = await ProductService.getYesDescription();
      seAllDescription(res.data);
    } catch (error) {
      console.log("error in Description Api", error);
    }
  };

  const createconsumable = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = {
        name: productName,
        description: description,
        unit: unit,
        brand: brand,
        size: consumable.size,
        additional_description: consumable.addDsc,
        shelf_life: shelfLife,
        hsn_code: consumable.hsn_code,
        gst: consumable.gst,
        cgst: GST,
        sgst: GST,
        type: "consumables",
      };
      await ProductService.createConsumable(data);

      setOpenPopup(false);
      setOpen(false);
      getconsumables();
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
  const GST = consumable.gst / 2;

  return (
    <>
      <CustomLoader open={open} />

      <Box component="form" noValidate onSubmit={(e) => createconsumable(e)}>
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

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="code"
              size="small"
              label="Name"
              variant="outlined"
              value={productName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              onChange={(event, value) => setDescription(value)}
              name="description"
              options={allDescription.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="description"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="addDsc"
              size="small"
              label="Additional Description"
              variant="outlined"
              value={consumable.addDsc}
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
              value={shelfLife ? shelfLife : ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              onChange={(event, value) => setUnit(value)}
              options={unitData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Unit"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              sx={{
                minWidth: 220,
              }}
              size="small"
              onChange={(event, value) => setBrand(value)}
              options={brandData.map((option) => option.name)}
              getOptionLabel={(option) => `${option}`}
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="size"
              size="small"
              label="size"
              variant="outlined"
              value={consumable.size}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              name="hsn_code"
              size="small"
              label="Hsn Code"
              variant="outlined"
              value={consumable.hsn_code}
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
              value={consumable.gst}
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
          Submit
        </Button>
      </Box>
    </>
  );
};
