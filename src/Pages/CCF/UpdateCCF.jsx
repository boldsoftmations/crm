import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import logo from "../../Images/glutape logo.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotificationHandling } from "../../Components/useNotificationHandling ";
import { MessageAlert } from "../../Components/MessageAlert";
import { CustomLoader } from "../../Components/CustomLoader";
import CustomerServices from "../../services/CustomerService";
import CustomTextField from "../../Components/CustomTextField";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const UpdateCCF = ({ getAllCCFData, setOpenCCF, ViewData }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [documentId, setDocumentId] = useState([]);
  const [products, setProducts] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [inputValue, setInputValue] = useState({
    department: "",
    complain_for: "",
    complain_type: "",
    customer: "",
    unit: "",
    invoices: [],
    batch_nos: [],
    complaint: "",
    application: "",
    problem: "",
    document: documentId ? documentId : [],
    products: products,
  });

  const { handleSuccess, handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const existingFiles = files.map((file) => file.name);
    const uniqueFiles = newFiles.filter(
      (file) => !existingFiles.includes(file.name),
    );
    setFiles([...files, ...uniqueFiles]);
    e.target.value = null;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeFields = (index) => {
    let data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  const SubmitComplaint = async (e) => {
    e.preventDefault();

    try {
      let modifyproducts = products.map((product) => {
        return {
          product: product.product,
          quantity: product.quantity,
        };
      });
      const payload = { ...inputValue, products: modifyproducts };
      const response = await CustomerServices.createCCFComplaintForm(payload);
      handleSuccess(response.message || "Complaint submitted successfully");
      getAllCCFData();
      setOpenCCF(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleUploadDocuments = async () => {
    try {
      if (files.length === 0) {
        alert("No files selected for upload.");
        return;
      }

      setOpen(true);
      const formData = new FormData();

      // Append each file to the FormData object
      files.forEach((file) => {
        formData.append("file", file);

        // Determine media type based on the file MIME type or extension
        const fileType = file.type.split("/")[0]; // This gives either "image" or "video"
        const mediaType =
          fileType === "image"
            ? "Photo"
            : fileType === "video"
              ? "Video"
              : "Other";

        // Append media type for each file
        formData.append("media_type", mediaType);
      });

      const response = await CustomerServices.uploadCCFdocument(formData);
      console.log("response", response.data.data);
      if (response.status === 200) {
        handleSuccess("Documents uploaded successfully");
        setDocuments(response.data.data);
        // Extract IDs from the response and update state
        const documentIds = response.data.data.map((doc) => doc.id);
        setDocumentId(documentIds);

        // Update the inputValue state with the document IDs
        setInputValue((prev) => ({
          ...prev,
          document: documentIds ? documentIds : [],
        }));

        setFiles([]); // Clear files after successful upload
      } else {
        handleError("Failed to upload documents");
      }
    } catch (error) {
      console.log(error);
      handleError("An error occurred during the upload");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />
      <Grid container spacing={2} style={{ width: "100%", margin: 0 }}>
        <Box component="form" noValidate onSubmit={SubmitComplaint}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box>
              <Grid container spacing={2} alignItems="center">
                {/* Title Text centered */}
                <Grid item xs={12} sm={4}>
                  <img src={logo} alt="logo" width={170} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ textAlign: { xs: "center", md: "center" } }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      color: "rgb(34, 34, 34)",
                      fontWeight: 800,
                    }}
                  >
                    COMPLAINT FORM
                  </h3>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            {/* Form Fields */}
            <Grid container spacing={2} style={{ marginTop: "12px" }}>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  fullWidth
                  size="small"
                  label="Complain To"
                  disablePortal
                  id="combo-box-demo"
                  value={ViewData.department}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  size="small"
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  label="Complain for"
                  value={ViewData.complain_for}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  size="small"
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  label="Complain"
                  value={ViewData.complain_type}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  size="small"
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  label="Customer"
                  value={ViewData.customer}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  size="small"
                  fullWidth
                  disablePortal
                  id="Seller Unit"
                  label="Seller Unit"
                  value={ViewData.unit}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  name="complain_for"
                  size="small"
                  disablePortal
                  fullWidth
                  label="Branch no"
                  id="combo-box-demo"
                  value={ViewData.batch_nos.join(",")}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nature of Complaint : (Describe in detail)"
                  variant="outlined"
                  margin="normal"
                  name="complaint"
                  multiline
                  rows={4}
                  value={ViewData.complaint}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Application : (Describe in detail)"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  value={ViewData.application}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      accept="image/*,video/*"
                      ref={fileInputRef}
                    />
                    <span
                      style={{
                        fontSize: "16px",
                        opacity: "0.9",
                        fontWeight: "bold",
                      }}
                    >
                      Attach Document :{" "}
                    </span>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      onClick={handleClick}
                    >
                      Select Document
                    </Button>
                  </div>
                  <div>
                    {files.length > 0 && (
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                          opacity: ".9",
                          fontSize: "16px",
                        }}
                      >
                        Selected Files:
                      </Typography>
                    )}
                    {files.length > 0 ? (
                      <List style={{ display: "flex", flexWrap: "wrap" }}>
                        {files.map((file, index) => (
                          <ListItem
                            key={index}
                            divider
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "150px",
                              margin: "10px",
                              backgroundColor: "#e4f1fe",
                              borderRadius: "3px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <ListItemText
                                primary={file.name}
                                primaryTypographyProps={{
                                  style: { fontSize: "12px" },
                                }}
                              />
                              <IconButton
                                edge="end"
                                onClick={() => removeFile(index)}
                                style={{ marginTop: "10px" }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginTop: "10px",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Grid>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "20px",
                          }}
                        >
                          {documents &&
                            documents.map((doc, index) => (
                              <div
                                key={index}
                                style={{
                                  width: "200px", // Set a fixed width for each media item
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src={doc.file}
                                  alt={`Media ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </Grid>
                    )}
                  </div>
                </div>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={handleUploadDocuments}
                >
                  Submit Document
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Root>
                  <Divider>
                    <Chip label="PRODUCT" />
                  </Divider>
                </Root>
              </Grid>
              {products &&
                products.length > 0 &&
                products.map((input, index) => {
                  return (
                    <React.Fragment key={index}>
                      {" "}
                      {/* Use React.Fragment with a key for each item */}
                      <Grid item xs={12} sm={4}>
                        <CustomTextField
                          fullWidth
                          name="product"
                          size="small"
                          label="Product"
                          variant="outlined"
                          value={input.product}
                          onChange={(event) =>
                            setProducts((prevProducts) =>
                              prevProducts.map((p, i) =>
                                i === index
                                  ? { ...p, product: event.target.value }
                                  : p,
                              ),
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomTextField
                          fullWidth
                          name="quantity"
                          size="small"
                          label="Quantity"
                          variant="outlined"
                          value={input.quantity}
                          onChange={(event) =>
                            setProducts((prevProducts) =>
                              prevProducts.map((p, i) =>
                                i === index
                                  ? { ...p, quantity: event.target.value }
                                  : p,
                              ),
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          onClick={() => removeFields(index)}
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              {/* Buttons */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Submit Complaint
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </>
  );
};

export default UpdateCCF;
