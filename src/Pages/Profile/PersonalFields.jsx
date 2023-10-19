import React, { useCallback } from "react";
import { Grid, Autocomplete, Avatar, Button } from "@mui/material";
import CustomTextField from "../../Components/CustomTextField";

const fieldData = [
  {
    type: "upload",
    label: "Upload Profile Picture",
    name: "uploaded_picture",
  },
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
];

export const PersonalFields = ({ formData, setFormData }) => {
  const [openCameraDialog, setOpenCameraDialog] = React.useState(false);
  const [stream, setStream] = React.useState(null);

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          personal: {
            ...prev.personal,
            [fieldName]: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <>
      {fieldData.map((field, index) => {
        const value = formData.personal[field.name] || "";
        switch (field.type) {
          case "upload":
            return (
              <Grid item xs={12} key={index}>
                {value && (
                  <Avatar
                    src={value}
                    alt="Uploaded Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-picture-upload"
                  onChange={(event) => handleFileUpload(event, field.name)}
                />
                <label htmlFor="profile-picture-upload">
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>
            );

          case "autocomplete":
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
          case "conditionalDate":
            if (formData.personal.marital_status === field.condition) {
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <CustomTextField
                    fullWidth
                    type="date"
                    size="small"
                    label={field.label}
                    name={`personal.${field.name}`}
                    value={value}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              );
            }
            break;
          default:
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
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : {}
                  }
                />
              </Grid>
            );
        }
        return null;
      })}
    </>
  );
};
