import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "./../../Components/CustomButton";
import InvoiceServices from "../../services/InvoiceService";

export const UpdateDispatch = (props) => {
  const [open, setOpen] = useState(false);
  const { idData, getAllDispatchDetails, setOpenPopup, userData } = props;
  const [lrCopy, setLrCopy] = useState("");
  const [podCopy, setPodCopy] = useState("");
  const [inputValue, setInputValue] = useState([]);

  const handleImageLRCopy = (event) => {
    setLrCopy(URL.createObjectURL(event.target.files[0]));
  };

  const handleImagePODCopy = (event) => {
    setPodCopy(URL.createObjectURL(event.target.files[0]));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const createLeadsData = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = new FormData();
      data.append("sales_invoice", idData.sales_invoice);
      data.append(
        "transporter",
        inputValue.transporter ? inputValue.transporter : idData.transporter
      );
      data.append(
        "lr_number",
        inputValue.lr_number ? inputValue.lr_number : idData.lr_number
      );
      data.append(
        "lr_date",
        inputValue.lr_date ? inputValue.lr_date : idData.lr_date
      );
      data.append("lr_copy", lrCopy ? lrCopy : idData.lr_copy);
      data.append("pod_copy", podCopy ? podCopy : idData.pod_copy);
      data.append("dispatched", true);
      // const data = {
      //   sales_invoice: idData.sales_invoice,
      //   transporter: inputValue.transporter,
      //   lr_number: inputValue.lr_number,
      //   lr_date: inputValue.lr_date,
      // };
      await InvoiceServices.updateDispatched(idData.id, data);
      getAllDispatchDetails();
      setOpen(false);
      setOpenPopup(false);
    } catch (error) {
      console.log("error :>> ", error);
      setOpen(false);
    }
  };

  return (
    <div>
      {" "}
      <Box component="form" noValidate onSubmit={(e) => createLeadsData(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Sales Invoice"
              variant="outlined"
              value={idData.sales_invoice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Customer"
              variant="outlined"
              value={idData.customer}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="transporter"
              size="small"
              label="Transporter"
              variant="outlined"
              value={
                inputValue.transporter
                  ? inputValue.transporter
                  : idData.transporter
              }
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="lr_number"
              size="small"
              label="LR Number"
              variant="outlined"
              value={
                inputValue.lr_number ? inputValue.lr_number : idData.lr_number
              }
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type={"date"}
              name="lr_date"
              size="small"
              label="LR Date"
              variant="outlined"
              value={inputValue.lr_date ? inputValue.lr_date : idData.lr_date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type={"file"}
              name="file"
              // value={lrCopy ? lrCopy : idData.lr_copy}
              onChange={handleImageLRCopy}
            />
            <img
              src={lrCopy ? lrCopy : idData.lr_copy}
              alt="image"
              height="50px"
              width="50px"
            />
          </Grid>
          {userData.groups.toString() === "Customer Service" && (
            <Grid item xs={12}>
              <input
                type={"file"}
                name="file"
                // value={podCopy ? podCopy : idData.pod_copy}
                onChange={handleImagePODCopy}
              />
              <img
                src={podCopy ? podCopy : idData.pod_copy}
                alt="image"
                height="50px"
                width="50px"
              />
            </Grid>
          )}
        </Grid>
        <CustomButton
          sx={{ marginTop: "1rem" }}
          type="submit"
          fullWidth
          variant="contained"
          text={"Submit"}
        />
      </Box>
    </div>
  );
};
