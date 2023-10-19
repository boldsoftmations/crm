import React, { useState } from "react";
import { Grid, Divider, Chip } from "@mui/material";
import CustomTextField from "../../Components/CustomTextField";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { CustomLoader } from "../../Components/CustomLoader";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const BankFields = ({ formData, setFormData }) => {
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      bank: { ...prev.bank, [name]: value },
    }));

    if (name === "ifsc_code" && value.length === 11) {
      validateIFSC(value);
    }
  };

  const validateIFSC = async (ifsc) => {
    try {
      setOpen(true);
      const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
      const { BANK, BRANCH, CITY, STATE, ADDRESS } = response.data;

      setFormData((prev) => ({
        ...prev,
        bank: {
          ...prev.bank,
          name: BANK,
          branch: BRANCH,
          city: CITY,
          state: STATE,
          address: ADDRESS,
        },
      }));
      setErrMsg("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrMsg("Please enter a valid IFSC code.");
      } else {
        setErrMsg("Error fetching bank details. Please try again later.");
      }
    } finally {
      setOpen(false);
    }
  };

  const bankFields = [
    { label: "Account No", name: "account_number" },
    {
      label: "IFSC Code",
      name: "ifsc_code",
      error: errMsg,
      helperText: errMsg,
    },
    { label: "Bank Name", name: "name", disabled: true },
    { label: "Branch", name: "branch", disabled: true },
    { label: "Bank City", name: "city", disabled: true },
    { label: "Bank State", name: "state", disabled: true },
    { label: "Bank Address", name: "address", disabled: true },
  ];

  return (
    <>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <Root>
          <Divider>
            <Chip label="Bank Details" />
          </Divider>
        </Root>
      </Grid>
      {bankFields.map((field, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <CustomTextField
            fullWidth
            size="small"
            onChange={handleChange}
            value={formData.bank[field.name]}
            {...field}
          />
        </Grid>
      ))}
    </>
  );
};
