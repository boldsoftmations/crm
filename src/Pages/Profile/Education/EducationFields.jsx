import React from "react";
import { Grid } from "@mui/material";
import CustomTextField from "../../../Components/CustomTextField";

const educationFieldData = [
  { section: "school", type: "text", label: "10th School Name", name: "name" },
  { section: "school", type: "text", label: "Board", name: "board" },
  { section: "school", type: "number", label: "Passout Year", name: "passout" },
  // ... other fields ...
];

export const EducationFields = ({ formData, setFormData }) => {
  const getFieldData = (field) => {
    if (!formData || !formData.education) return ""; // Handle undefined data

    if (field.section === "education") {
      return formData.education[field.name] || "";
    } else if (formData.education[field.section]) {
      return formData.education[field.section][field.name] || "";
    }

    return "";
  };

  const handleChange = (event, section) => {
    const { name, value } = event.target;
    let updatedData = { ...formData.education };

    if (section === "education") {
      updatedData[name] = value;
    } else {
      updatedData[section] = { ...updatedData[section], [name]: value };
    }

    setFormData((prev) => ({
      ...prev,
      education: updatedData,
    }));
  };

  return (
    <>
      {educationFieldData.map((field, index) => {
        const value = getFieldData(field);

        return (
          <Grid item xs={12} sm={4} key={index}>
            <CustomTextField
              fullWidth
              type={field.type}
              size="small"
              label={field.label}
              name={field.name}
              value={value}
              onChange={(e) => handleChange(e, field.section)}
              InputLabelProps={field.type === "date" ? { shrink: true } : {}}
            />
          </Grid>
        );
      })}
    </>
  );
};
