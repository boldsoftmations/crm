import React, { useState } from "react";
import Option from "../../Options/Options";
import {
  Button,
  Container,
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
} from "@mui/material";
import CustomTextField from "../../Components/CustomTextField";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    personalEmail: "",
    phoneNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    panCardNumber: "",
    aadharCardNumber: "",
    maritalStatus: "",
    marriageDate: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentPin: "",
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentPin: "",
    bank_name: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    bank_city: "",
    bank_state: "",
    bank_address: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactNumber: "",
    hasPfEsiAccount: "",
    uanNumber: "",
    pfNumber: "",
    esiNumber: "",
    currentSchoolName: "",
    currentSchoolBoard: "",
    currentPassoutSchool: "",
    currentCollegeName: "",
    currentCollegeBoard: "",
    currentPassoutYCollege: "",
    currentGraduationType: "",
    currentGraduationUniversity: "",
    currentPassoutGraduation: "",
    currentPgdMasters: "",
    currentAdditionalQualifiction: "",
    isPermanentSameAsCurrent: false,
    emergencyContacts: [
      {
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactNumber: "",
      },
    ],
    employmentHistory: [
      {
        employerName: "",
        postHeld: "",
        workedFromMonth: "",
        workedFromYear: "",
        workedTillMonth: "",
        workedTillYear: "",
      },
    ],
    familyDetails: [
      {
        name: "",
        relationship: "",
        bloodGroup: "",
        contactNumber: "",
      },
    ],

    knownAllergies: "",
    diabetic: "",
    hyperTension: "",
    heartIssues: "",
    cancer: "",
    highBloodPressure: "",
    lowBloodPressure: "",
    asthamaRespiratory: "",
    visionImpairments: "",
    hearingImpairments: "",
    tobacco: "",
    cigarettes: "",
    alcohol: "",
    doctorName: "",
    doctorPhoneNumber: "",
  });
  console.log("formData", formData);

  const handleChange = (event) => {
    // Extracting name and value from the event target (the input fields)
    const { name, value } = event.target;

    // Creating an initial form data update
    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    // If 'Same as Current Address' is checked
    if (formData.isPermanentSameAsCurrent) {
      switch (name) {
        // If the current address pin is changed
        case "currentPin":
          // Update the permanent address pin as well
          updatedFormData.permanentPin = value;

          // Validate the new pin code for permanent address
          validatePinCode("permanent", value);
          break;

        // If the current city is changed
        case "currentCity":
          // Update the permanent city as well
          updatedFormData.permanentCity = value;
          break;

        // If the current state is changed
        case "currentState":
          // Update the permanent state as well
          updatedFormData.permanentState = value;
          break;

        // If the current address is changed
        case "currentAddress":
          // Update the permanent address as well
          updatedFormData.permanentAddress = value;
          break;

        // Default case, if any other field is changed which we don't need to mirror
        default:
          break;
      }
    }

    // If the current pin code field is changed, validate it
    if (name === "currentPin") {
      validatePinCode("current", value);
    }
    // If the permanent pin code field is changed, validate it
    else if (name === "permanentPin") {
      validatePinCode("permanent", value);
    }

    // Set the updated form data to the state
    setFormData(updatedFormData);
  };

  const validatePinCode = async (type, pinCode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );

      if (response.data[0].Status === "Success") {
        const newState = response.data[0].PostOffice[0].State;
        const newCity = response.data[0].PostOffice[0].District;

        if (type === "current") {
          setFormData((prevState) => ({
            ...prevState,
            currentCity: newCity,
            currentState: newState,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            permanentCity: newCity,
            permanentState: newState,
          }));
        }
      } else {
        console.log("Pincode not valid or data not found.");
      }
    } catch (error) {
      console.log("Error validating pincode", error);
    }
  };

  const validateIFSC = async () => {
    try {
      // Start a loading state
      setOpen(true);

      // Make the API request using the IFSC from formData
      const response = await axios.get(
        `https://ifsc.razorpay.com/${formData.ifscCode}`
      );

      // On successful response, update the form data with the bank's information
      setFormData((prevData) => ({
        ...prevData,
        bank_name: response.data.BANK,
        branch: response.data.BRANCH,
        bank_city: response.data.CITY, // Assuming you want to update the current city with bank's city
        bank_state: response.data.STATE, // Assuming you want to update the current state with bank's state
        bank_address: response.data.ADDRESS, // Assuming you want to update the current address with bank's address
      }));

      // Clear any existing error messages
      setErrMsg("");
      setOpen(false);
    } catch (error) {
      console.log("Error fetching bank data: ", error);
      setOpen(false);

      if (error.response && error.response.status === 404) {
        setErrMsg("Please enter a valid IFSC code.");
      } else {
        setErrMsg("Error fetching bank details. Please try again later.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handlePermanentSameAsCurrentChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      // If checked, copy values from current address to permanent address
      setFormData({
        ...formData,
        isPermanentSameAsCurrent: true,
        permanentAddress: formData.currentAddress,
        permanentCity: formData.currentCity,
        permanentState: formData.currentState,
        permanentPin: formData.currentPin,
      });
    } else {
      // If unchecked, clear the permanent address
      setFormData({
        ...formData,
        isPermanentSameAsCurrent: false,
        permanentAddress: "",
        permanentCity: "",
        permanentState: "",
        permanentPin: "",
      });
    }
  };

  const formatDateForInput = (monthYear) => {
    if (!monthYear) return "";
    const [month, year] = monthYear.split("/");
    return `${year}-${month.padStart(2, "0")}-01`;
  };

  const handleEmploymentHistoryChange = (event, index, field) => {
    const date = new Date(event.target.value);
    const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const updatedEmploymentHistory = [...formData.employmentHistory];

    updatedEmploymentHistory[index][field] = formattedDate;

    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  const handleIsCurrentJobChange = (event, index) => {
    const updatedEmploymentHistory = [...formData.employmentHistory];
    updatedEmploymentHistory[index].isCurrentJob = event.target.checked;

    if (event.target.checked) {
      updatedEmploymentHistory[index].workedTill = "";
    }

    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  const removeEmploymentRecord = (index) => {
    const updatedEmploymentHistory = [...formData.employmentHistory];
    updatedEmploymentHistory.splice(index, 1);
    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  const addEmploymentRecord = () => {
    const employers = formData.employmentHistory.map((emp) =>
      emp.employerName.toLowerCase()
    );

    // Check if there are any duplicate employer names
    const hasDuplicates = new Set(employers).size !== employers.length;

    if (hasDuplicates) {
      alert("Please ensure that the employer names are unique.");
      return;
    }

    const updatedEmploymentHistory = [
      ...formData.employmentHistory,
      {
        employerName: "",
        designation: "",
        workedFromMonth: "",
        workedTillMonth: "",
        isCurrentJob: false,
      },
    ];

    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  // Handle the change in family details
  const handleFamilyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails[index][name] = value;
    setFormData({
      ...formData,
      familyDetails: updatedFamilyDetails,
    });
  };

  // Add a new family member
  const addFamilyMember = () => {
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails.push({
      name: "",
      maritalStatus: "",
      bloodGroup: "",
      contactNumber: "",
    });
    setFormData({
      ...formData,
      familyDetails: updatedFamilyDetails,
    });
  };

  // Remove a family member
  const removeFamilyMember = (index) => {
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails.splice(index, 1);
    setFormData({
      ...formData,
      familyDetails: updatedFamilyDetails,
    });
  };
  const relationshipOptions = [
    "Father",
    "Mother",
    "Spouse",
    "Son",
    "Daughter",
    "Uncle",
    "Aunt",
    "Friend",
    "Neighbour",
  ];

  const YesorNoOptions = ["Yes", "No"];
  const handleEmergencyContactChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEmergencyContacts = [...formData.emergencyContacts];
    updatedEmergencyContacts[index][name] = value;
    setFormData({
      ...formData,
      emergencyContacts: updatedEmergencyContacts,
    });
  };

  const addEmergencyContact = () => {
    const updatedEmergencyContacts = [...formData.emergencyContacts];
    updatedEmergencyContacts.push({
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactNumber: "",
    });
    setFormData({
      ...formData,
      emergencyContacts: updatedEmergencyContacts,
    });
  };

  const removeEmergencyContact = (index) => {
    const updatedEmergencyContacts = [...formData.emergencyContacts];
    updatedEmergencyContacts.splice(index, 1); // This will remove the contact at the given index
    setFormData({
      ...formData,
      emergencyContacts: updatedEmergencyContacts,
    });
  };
  return (
    <Container>
      <Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <Root>
          <Divider>
            <Chip label="Personal Details" />
          </Divider>
        </Root>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Personal Email"
              type="email"
              name="email"
              value={formData.personalEmail}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={["Male", "Female", "Others"]}
              getOptionLabel={(option) => option}
              fullWidth
              size="small"
              name="gender"
              value={formData.gender || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "gender",
                    value: newValue || "", // Handle the case when nothing is selected
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField {...params} label="Gender" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Place of Birth"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={[
                "Christianity",
                "Islam",
                "Hinduism",
                "Buddhism",
                "Sikhism",
                "Judaism",
                "No religion",
                "Others",
              ]}
              fullWidth
              size="small"
              value={formData.religion || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "religion",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Religion" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="PAN Card No"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Aadhar Card No"
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={["Married", "Unmarried"]}
              fullWidth
              size="small"
              value={formData.maritalStatus || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "maritalStatus",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Marital Status" {...params} />
              )}
            />
          </Grid>
          {formData.maritalStatus === "Married" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                type="date"
                size="small"
                label="Marriage Date"
                name="marriageDate"
                value={formData.marriageDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          )}
          {/* Current Address */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Current Address" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Current Address"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Current Pin"
              name="currentPin"
              value={formData.currentPin}
              onChange={handleChange}
              onBlur={() => validatePinCode("current", formData.currentPin)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Current City"
              name="currentCity"
              value={formData.currentCity}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Current State"
              name="currentState"
              value={formData.currentState}
            />
          </Grid>

          {/* Permanent Address */}

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Permanent Address" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isPermanentSameAsCurrent}
                  onChange={handlePermanentSameAsCurrentChange}
                  name="isPermanentSameAsCurrent"
                  color="primary"
                />
              }
              label="Same as Current Address"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Permanant Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Permanant Pin"
              name="permanentPin"
              value={formData.permanentPin}
              onChange={handleChange}
              onBlur={() => validatePinCode("permanent", formData.permanentPin)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Permanant City"
              name="permanentCity"
              value={formData.permanentCity}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Permanant State"
              name="permanentState"
              value={formData.permanentState}
            />
          </Grid>

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Bank Details" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Account No"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              onBlur={validateIFSC} // <-- Add this line
              error={errMsg && errMsg}
              helperText={errMsg && errMsg}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Bank Name"
              name="bank_name"
              value={formData.bank_name}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Branch"
              name="branch"
              value={formData.branch}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Bank City"
              name="bank_city"
              value={formData.bank_city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Bank State"
              name="bank_state"
              value={formData.bank_state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Bank Address"
              name="bank_address"
              value={formData.bank_address}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Emergency Contact Details" />
              </Divider>
            </Root>
          </Grid>
          {formData.emergencyContacts.map((emergencyContact, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Emergency Contact Person Name"
                  name="emergencyContactName"
                  value={emergencyContact.emergencyContactName}
                  onChange={(event) =>
                    handleEmergencyContactChange(event, index)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={relationshipOptions}
                  fullWidth
                  size="small"
                  value={formData.emergencyContactRelationship || ""}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "emergencyContactRelationship",
                        value: newValue || "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      label="Emergency Contact Relationship"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Emergency Contact Number"
                  type="tel"
                  name="emergencyContactNumber"
                  value={emergencyContact.emergencyContactNumber}
                  onChange={(event) =>
                    handleEmergencyContactChange(event, index)
                  }
                />
              </Grid>
              {formData.emergencyContacts.length > 1 && ( // Check if there's more than one emergency contact
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeEmergencyContact(index)}
                  >
                    Remove Contact
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={addEmergencyContact}>
              Add Emergency Contact
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PF & ESI Details" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.hasPfEsiAccount || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "hasPfEsiAccount",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField
                  label="Do you have PF & ESI Account"
                  {...params}
                />
              )}
            />
          </Grid>
          {formData.hasPfEsiAccount === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="UAN No."
                name="uanNumber"
                value={formData.uanNumber}
                onChange={handleChange}
              />
            </Grid>
          )}
          {formData.hasPfEsiAccount === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="PF No."
                name="pfNumber"
                value={formData.pfNumber}
                onChange={handleChange}
              />
            </Grid>
          )}
          {formData.hasPfEsiAccount === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="ESI No."
                name="esiNumber"
                value={formData.esiNumber}
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Educational Details" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="10th School Name"
              name="currentSchoolName"
              value={formData.currentSchoolName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Board"
              name="currentSchoolBoard"
              value={formData.currentSchoolBoard}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="currentPassoutYear"
              value={formData.currentPassoutSchool}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="12th School/College Name"
              name="currentCollegeName"
              value={formData.currentCollegeName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Board"
              name="currentCollegeBoard"
              value={formData.currentCollegeBoard}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="currentPassoutYear"
              value={formData.currentPassoutYCollege}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Graduation Type"
              name="currentGraduationType"
              value={formData.currentGraduationType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Graduation University Name"
              name="currentGraduationUniversity"
              value={formData.currentGraduationUniversity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="currentPassoutGraduation"
              value={formData.currentPassoutGraduation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Post Graduation / Masters"
              name="currentPgdMasters"
              value={formData.currentPgdMasters}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Additional Educational Qualifications"
              name="currentAdditionalQualifiction"
              value={formData.currentAdditionalQualifiction}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Employment Details" />
              </Divider>
            </Root>
          </Grid>
          {formData.employmentHistory.map((employment, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Name of the Employer"
                  name="employerName"
                  value={employment.employerName}
                  onChange={(event) =>
                    handleEmploymentHistoryChange(event, index)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Designation"
                  name="designation"
                  value={employment.designation}
                  onChange={(event) =>
                    handleEmploymentHistoryChange(event, index)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Worked From"
                  type="date"
                  name="workedFrom"
                  value={formatDateForInput(employment.workedFrom)}
                  onChange={(event) =>
                    handleEmploymentHistoryChange(event, index, "workedFrom")
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Worked Till"
                  type="date"
                  name="workedTill"
                  value={
                    employment.isCurrentJob
                      ? ""
                      : formatDateForInput(employment.workedTill)
                  }
                  disabled={employment.isCurrentJob}
                  onChange={(event) =>
                    handleEmploymentHistoryChange(event, index, "workedTill")
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={employment.isCurrentJob || false}
                      onChange={(event) =>
                        handleIsCurrentJobChange(event, index)
                      }
                      name="isCurrentJob"
                    />
                  }
                  label="Current"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {formData.employmentHistory.length > 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeEmploymentRecord(index)}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={addEmploymentRecord}>
              Add More
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Family Details" />
              </Divider>
            </Root>
          </Grid>
          {formData.familyDetails.map((familyMember, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Name"
                  name="name"
                  value={familyMember.name}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  options={["Married", "Unmarried"]}
                  fullWidth
                  size="small"
                  value={formData.maritalStatus || ""}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "maritalStatus",
                        value: newValue || "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <CustomTextField label="Marital Status" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Blood Group"
                  name="bloodGroup"
                  value={familyMember.bloodGroup}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Contact Number"
                  name="contactNumber"
                  value={familyMember.contactNumber}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              {/* Remove Family Member Button */}
              {formData.familyDetails.length > 1 && (
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeFamilyMember(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={addFamilyMember}>
              Add Family Member
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Known Health Issues" />
              </Divider>
            </Root>
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Known Allergies"
              name="knownAllergies"
              value={formData.knownAllergies}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.diabetic || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "diabetic",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Diabetic" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.asthamaRespiratory || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "asthamaRespiratory",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField
                  label="Asthama or Respiratory Issues"
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.visionImpairments || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "visionImpairments",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Vision Impairments" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.hearingImpairments || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "hearingImpairments",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Hearing Impairments" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.hyperTension || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "hyperTension",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Hyper Tension" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.heartIssues || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "heartIssues",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Heart Issues" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.cancer || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "cancer",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Cancer" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.highBloodPressure || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "highBloodPressure",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="High Blood Pressure" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.lowBloodPressure || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "lowBloodPressure",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Low Blood Pressure" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Addictions" />
              </Divider>
            </Root>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.tobacco || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "tobacco",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Tobacco" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.cigarettes || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "cigarettes",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Cigarettes" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoOptions}
              fullWidth
              size="small"
              value={formData.alcohol || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "alcohol",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Alcohol" {...params} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Family Doctor Details" />
              </Divider>
            </Root>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              size="small"
              label="Doctor Name"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Doctor Phone Number"
              name="doctorPhoneNumber"
              value={formData.doctorPhoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginBottom: "20px" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;
