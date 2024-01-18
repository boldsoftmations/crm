import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import CustomTextField from "../../Components/CustomTextField";
import { CustomLoader } from "../../Components/CustomLoader";
import CustomerServices from "../../services/CustomerService";

export const WhatsappGroupCreate = ({ setOpenPopup }) => {
  const [whatsappGroup, setWhatsappGroup] = useState([]);
  const [open, setOpen] = useState(false);
  const [allWhatsappGroupMenu, setAllWhatsappGroupMenu] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [isPdf, setIsPdf] = useState(false); // New state to track if the uploaded file is a PDF

  const handleGroupChange = (event, newValue) => {
    // Find and store the group IDs corresponding to the selected group names
    const newGroupIds = newValue
      .map((groupName) => {
        const group = allWhatsappGroupMenu.find(
          (g) => g.group_name === groupName
        );
        return group ? group.group_id : null;
      })
      .filter((id) => id !== null); // Filter out any null values

    setSelectedGroupIds(newGroupIds);
    setWhatsappGroup({
      ...whatsappGroup,
      groups: newValue,
    });
  };

  useEffect(() => {
    getAllWhatsappGroup();
  }, []);

  const getAllWhatsappGroup = async () => {
    try {
      const res = await CustomerServices.getAllWhatsappGroupData();
      setAllWhatsappGroupMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("allWhatsappGroupMenu", allWhatsappGroupMenu);

  // Updated handleFileChange function
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    setIsPdf(file.type === "application/pdf"); // Set isPdf based on file type

    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      try {
        setUploadedFile(file);
        const fileURL = URL.createObjectURL(file);
        setFilePreview(fileURL);
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    } else {
      setFilePreview(null);
    }
  };

  // Effect for cleanup
  useEffect(() => {
    // Cleanup the object URL on unmount or when file changes
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const createWhatsappGroup = async (e) => {
    e.preventDefault();
    setOpen(true);

    try {
      const formData = new FormData();

      // Append each group ID as an individual entry to formData
      formData.append("groups", JSON.stringify(selectedGroupIds.join(", ")));

      // Handle the file upload and associated data
      if (uploadedFile) {
        const fileKey = isPdf ? "file" : "image";
        formData.append(fileKey, uploadedFile);
        formData.append("caption", whatsappGroup.caption || "");
      } else {
        // For text-only messages
        formData.append("message", whatsappGroup.message || "");
      }

      // Select the appropriate API call
      let apiCall;
      if (uploadedFile) {
        apiCall = isPdf
          ? CustomerServices.createWhatsappPdfData
          : CustomerServices.createWhatsappImageData;
      } else {
        apiCall = CustomerServices.createWhatsappData;
      }

      // Make the API call
      await apiCall(formData);
    } catch (error) {
      console.error("Error creating WhatsApp group", error);
    } finally {
      setOpen(false);
      setOpenPopup(false);
    }
  };

  return (
    <>
      <CustomLoader open={open} />
      <Box component="form" noValidate onSubmit={(e) => createWhatsappGroup(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomAutocomplete
              fullWidth
              multiple
              size="small"
              variant="outlined"
              options={allWhatsappGroupMenu.map((option) => option.group_name)}
              getOptionLabel={(option) => option}
              value={whatsappGroup.groups || []}
              onChange={handleGroupChange}
              renderInput={(params) => (
                <CustomTextField {...params} label="Whatsapp Group" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              size="small"
              sx={{ mt: 1, mb: 2 }}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {uploadedFile && (
              <Box sx={{ mt: 2 }}>
                {isPdf ? (
                  // Display file name for PDF
                  <Typography variant="subtitle1">
                    {uploadedFile.name}
                  </Typography>
                ) : (
                  // Display image preview for images
                  filePreview && (
                    <img
                      src={filePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              name={uploadedFile ? "caption" : "message"}
              size="small"
              label={uploadedFile ? "Caption" : "Message"}
              variant="outlined"
              value={whatsappGroup[uploadedFile ? "caption" : "message"] || ""}
              onChange={(event) =>
                setWhatsappGroup({
                  ...whatsappGroup,
                  [event.target.name]: event.target.value,
                })
              }
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
