import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "./../../Components/CustomButton";
import InvoiceServices from "../../services/InvoiceService";

export const UpdateDispatch = (props) => {
  const [open, setOpen] = useState(false);
  const { idData, getAllDispatchDetails, setOpenPopup, userData } = props;
  const [lrCopy, setLrCopy] = useState("");
  const [lrCopyImage, setLrCopyImage] = useState("");
  const [podCopy, setPodCopy] = useState("");
  const [podCopyImage, setPodCopyImage] = useState("");
  const [inputValue, setInputValue] = useState([]);

  const handleImageLRCopy = (event) => {
    setLrCopy(event.target.files[0]);
    setLrCopyImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImagePODCopy = (event) => {
    setPodCopy(event.target.files[0]);
    setPodCopyImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log("lrCopy ", lrCopy ? lrCopy : idData.lr_copy);

  const createLeadsData = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = new FormData();
      if (userData.groups.toString() === "Customer Service") {
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
        data.append("lr_copy", lrCopy.name ? lrCopy.name : "");
        data.append("pod_copy", podCopy.name ? podCopy.name : "");
        data.append("dispatched", true);
      } else {
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
        data.append("lr_copy", lrCopy.name ? lrCopy.name : "");
        data.append("dispatched", true);
      }
      console.log("data", data);
      // const data = {
      //   sales_invoice: idData.sales_invoice,
      //   transporter: inputValue.transporter,
      //   lr_number: inputValue.lr_number,
      //   lr_date: inputValue.lr_date,
      // };
      if (lrCopy !== "" && podCopy !== "") {
        await InvoiceServices.updateDispatched(idData.id, data);
      }
      getAllDispatchDetails();
      setOpenPopup(false);
      setOpen(false);
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
              src={lrCopyImage ? lrCopyImage : idData.pod_copy}
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
                src={podCopyImage ? podCopyImage : idData.pod_copy}
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
