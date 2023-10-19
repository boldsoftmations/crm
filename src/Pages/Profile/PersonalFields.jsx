import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import CustomTextField from "../../Components/CustomTextField";

const fieldData = [
  { type: "text", label: "First Name", name: "first_name" },
  { type: "text", label: "Middle Name", name: "middle_name" },
  { type: "text", label: "Last Name", name: "last_name" },
  { type: "email", label: "Personal Email", name: "personal_email" },
  { type: "tel", label: "Phone Number", name: "phone_number" },
  {
    type: "autocomplete",
    label: "Gender",
    name: "gender",
    options: ["Male", "Female", "Others"],
  },
  { type: "date", label: "Date of Birth", name: "date_of_birth" },
  { type: "text", label: "Place of Birth", name: "place_of_birth" },
  {
    type: "autocomplete",
    label: "Nationality",
    name: "nationality",
    options: [
      "Indian",
      "Canadian",
      "British",
      "Chineese",
      "Japaneese",
      "Pakistani",
      "Arabic",
      "Others",
    ],
  },
  {
    type: "autocomplete",
    label: "Religion",
    name: "religion",
    options: [
      "Christianity",
      "Islam",
      "Hinduism",
      "Buddhism",
      "Sikhism",
      "Judaism",
      "No religion",
      "Others",
    ],
  },
  {
    type: "autocomplete",
    label: "Marital Status",
    name: "marital_status",
    options: ["Married", "Unmarried"],
  },
  {
    type: "conditionalDate",
    label: "Marriage Date",
    name: "marriage_date",
    condition: "Married",
  },
  { type: "date", label: "Date of Joining", name: "date_of_joining" },
  {
    type: "autocomplete",
    label: "Blood Group",
    name: "blood_group",
    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  { type: "text", label: "PAN Card No", name: "pan_card_number" },
  { type: "text", label: "Aadhar Card No", name: "aadhar_card_number" },
  { type: "text", label: "Passport Number", name: "passport_number" },
  { type: "text", label: "Driving License Number", name: "dl_number" },
];

export const PersonalFields = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");
    const nestedKey = keys[1];

    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [nestedKey]: value,
      },
    }));
  };
  console.log("formData >>", formData);
  return (
    <>
      {fieldData.map((field, index) => {
        const value = formData.personal[field.name] || "";

        if (field.type === "autocomplete") {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Autocomplete
                options={field.options}
                fullWidth
                size="small"
                value={value}
                onChange={(event, newValue) => {
                  handleChange({
                    target: {
                      name: `personal.${field.name}`,
                      value: newValue || "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <CustomTextField {...params} label={field.label} />
                )}
              />
            </Grid>
          );
        } else if (
          field.type === "conditionalDate" &&
          formData.personal.marital_status === field.condition
        ) {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <CustomTextField
                fullWidth
                type={field.type.replace("conditional", "")}
                size="small"
                label={field.label}
                name={`personal.${field.name}`}
                value={value}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          );
        } else if (field.type !== "conditionalDate") {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <CustomTextField
                fullWidth
                type={field.type}
                size="small"
                label={field.label}
                name={`personal.${field.name}`}
                value={value}
                onChange={handleChange}
                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
              />
            </Grid>
          );
        }
        return null;
      })}
    </>
  );
};
