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
      const res = await CustomerServices.getAllWhatsappGroupData();
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
    setUploadedFile(file);
    setIsPdf(file.type === "application/pdf"); // Set isPdf based on file type

    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      try {
        const base64 = await convertToBase64(file);
        setFilePreview(base64);
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    } else {
      setFilePreview(null);
    }
  };

  console.log("filePreview", filePreview);
  const createWhatsappGroup = async (e) => {
    try {
      e.preventDefault();

      let data = {
        groups: selectedGroupIds,
        message: whatsappGroup.message || "",
      };

      setOpen(true);

      // Send message only if there is no file uploaded or the file is not an image or PDF
      if (!filePreview && whatsappGroup.message) {
        await CustomerServices.createWhatsappData(data);
      }

      // Check if filePreview exists and is not a PDF
      if (filePreview && !isPdf) {
        let imageData = {
          groups: selectedGroupIds,
          caption: whatsappGroup.caption,
          image: filePreview, // For images
        };

        // Call the API for images
        await CustomerServices.createWhatsappImageData(imageData);
      }

      // Check if the uploaded file is a PDF
      if (isPdf && filePreview) {
        let pdfData = {
          groups: selectedGroupIds,
          caption: whatsappGroup.caption,
          document: filePreview, // Send base64 of PDF
          filename: uploadedFile.name, // Include the file name
        };

        // Call the API for PDF
        await CustomerServices.createWhatsappPdfData(pdfData);
      }
    } catch (error) {
      console.log("error create Objection", error);
    } finally {
      setOpenPopup(false);
      setOpen(false);
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
