import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import CustomTextField from "../../../Components/CustomTextField";

const YesNoOptions = ["Yes", "No"];
const YesNoNAOptions = [...YesNoOptions, "Not Applicable"];

const fieldsConfig = [
  { label: "Known Allergies", name: "medical.known_allergies", options: null },
  {
    label: "Previous Surgeries",
    name: "medical.previous_surgeries",
    options: null,
  },
  { label: "Surgery Type", name: "medical.surgery_type", options: null },
  { label: "Diabetic", name: "medical.diabetic", options: YesNoOptions },
  {
    label: "Asthma or Respiratory Issues",
    name: "medical.asthama_respiratory",
    options: YesNoOptions,
  },
  {
    label: "Vision Impairments",
    name: "medical.vision",
    options: YesNoOptions,
  },
  {
    label: "Hearing Impairments",
    name: "medical.hearing",
    options: YesNoOptions,
  },
  {
    label: "Hyper Tension",
    name: "medical.hyper_tension",
    options: YesNoOptions,
  },
  {
    label: "Heart Issues",
    name: "medical.heart_issues",
    options: YesNoOptions,
  },
  { label: "Cancer", name: "medical.cancer", options: YesNoOptions },
  {
    label: "High Blood Pressure",
    name: "medical.high_blood_pressure",
    options: YesNoOptions,
  },
  {
    label: "Low Blood Pressure",
    name: "medical.low_blood_pressure",
    options: YesNoOptions,
  },
  { label: "Pregnancy", name: "medical.pregnancy", options: YesNoNAOptions },
];

const AutoCompleteField = ({ label, name, value, options, handleChange }) => (
  <Autocomplete
    options={options}
    fullWidth
    size="small"
    value={value}
    onChange={(_, newValue) => handleChange(name, newValue)}
    renderInput={(params) => <CustomTextField label={label} {...params} />}
  />
);

export const MedicalFields = ({ formData, setFormData }) => {
  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev };
      const keys = name.split(".");
      let currentLevel = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        currentLevel = currentLevel[keys[i]];
      }
      currentLevel[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  const generateField = ({ label, name, options }) => (
    <Grid item xs={12} sm={4} key={name}>
      <AutoCompleteField
        label={label}
        name={name}
        value={formData[name]}
        options={Array.isArray(options) ? options : []}
        handleChange={handleChange}
      />
    </Grid>
  );

  return (
    <>
      {fieldsConfig.map((fieldConfig) => {
        if (
          fieldConfig.name === "medical.known_allergies" ||
          fieldConfig.name === "medical.surgery_type" ||
          fieldConfig.name === "medical.previous_surgeries"
        ) {
          return (
            <Grid item xs={12} sm={4} key={fieldConfig.name}>
              <CustomTextField
                fullWidth
                size="small"
                label={fieldConfig.label}
                name={fieldConfig.name}
                value={formData[fieldConfig.name]}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          );
        } else {
          return generateField(fieldConfig);
        }
      })}
    </>
  );
};
