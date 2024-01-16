import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import WhatsappGroupService from "../../services/WhatsappGroupService";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import CustomTextField from "../../Components/CustomTextField";
import { CustomLoader } from "../../Components/CustomLoader";

export const WhatsappGroupCreate = ({
  getsetWhatsappGroupDetails,
  setOpenPopup,
}) => {
  const [whatsappGroup, setWhatsappGroup] = useState([]);
  const [open, setOpen] = useState(false);
  const [allWhatsappGroupMenu, setAllWhatsappGroupMenu] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

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
    console.log("newGroupIds", newGroupIds);
    setSelectedGroupIds(newGroupIds);
    setWhatsappGroup({
      ...whatsappGroup,
      groups: newValue,
    });
  };
  console.log("uploadedFile", uploadedFile);
  useEffect(() => {
    getAllWhatsappGroup();
  }, []);

  const getAllWhatsappGroup = async () => {
    try {
      const res = await WhatsappGroupService.getAllWhatsappGroupData();
      setAllWhatsappGroupMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("allWhatsappGroupMenu", allWhatsappGroupMenu);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setUploadedFile(file); // Corrected line
    // Check if file is an image or a PDF
    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      try {
        const base64 = await convertToBase64(file);
        setFilePreview(base64); // Set preview for images, for PDF this could be a generic PDF icon
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    } else {
      setFilePreview(null); // Reset preview if file type is not supported
    }
  };

  const createWhatsappGroup = async (e) => {
    try {
      e.preventDefault();

      let data = {
        groups: selectedGroupIds,
        message: whatsappGroup.message || "",
      };

      // Only add caption and file to data if filePreview is present
      if (filePreview) {
        data.caption = whatsappGroup.caption || "";
        data.file = filePreview; // Assuming filePreview is a base64 string
      }

      console.log("Data to be sent:", data);
      setOpen(true);

      // Send the FormData
      await WhatsappGroupService.createWhatsappData(data);

      setOpenPopup(false);
      setOpen(false);
      getsetWhatsappGroupDetails();
    } catch (error) {
      setOpen(false);
      console.log("error create Objection", error);
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
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  <Typography variant="subtitle1">
                    {uploadedFile.name}
                  </Typography>
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
