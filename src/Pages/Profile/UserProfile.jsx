import React, { useState } from "react";
import Option from "../../Options/Options";
import {
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
} from "@mui/material";
import CustomTextField from "../../Components/CustomTextField";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const UserProfile = () => {
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
    permanentPin: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
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
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleEmploymentHistoryChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEmploymentHistory = [...formData.employmentHistory];
    updatedEmploymentHistory[index][name] = value;
    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  const addEmploymentRecord = () => {
    const updatedEmploymentHistory = [...formData.employmentHistory];
    updatedEmploymentHistory.push({
      employerName: "",
      postHeld: "",
      workedFromMonth: "",
      workedFromYear: "",
      workedTillMonth: "",
      workedTillYear: "",
    });
    setFormData({
      ...formData,
      employmentHistory: updatedEmploymentHistory,
    });
  };

  const handleFamilyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails[index][name] = value;
    setFormData({
      ...formData,
      familyDetails: updatedFamilyDetails,
    });
  };

  const addFamilyMember = () => {
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails.push({
      name: "",
      relationship: "",
      bloodGroup: "",
      contactNumber: "",
    });
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
  return (
    <Container>
      <Grid item xs={12}>
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
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "others", label: "Others" },
              ]}
              getOptionLabel={(option) => option.label}
              fullWidth
              size="small"
              name="gender"
              value={formData.gender || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "gender",
                    value: newValue.value || "", // Handle the case when nothing is selected
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
            <FormControl fullWidth size="small">
              <InputLabel>Marital Status</InputLabel>
              <Select
                label="Marital Status"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Unmarried">Unmarried</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.maritalStatus === "Married" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="Marriage Date"
                name="marriageDate"
                value={formData.marriageDate}
                onChange={handleChange}
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
              label="Address"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="City"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="State"
              name="currentState"
              value={formData.currentState}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Pin"
              name="currentPin"
              value={formData.currentPin}
              onChange={handleChange}
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
              label="Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="City"
              name="permanentCity"
              value={formData.permanentCity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="State"
              name="permanentState"
              value={formData.permanentState}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Pin"
              name="permanentPin"
              value={formData.permanentPin}
              onChange={handleChange}
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
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
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
            <Grid
              key={index}
              container
              spacing={2}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={12} sm={4}>
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
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Emergency Contact Relationship"
                      name="emergencyContactRelationship"
                      value={emergencyContact.emergencyContactRelationship}
                      onChange={(event) =>
                        handleEmergencyContactChange(event, index)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={addEmergencyContact}>
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
            <FormControl fullWidth size="small">
              <InputLabel>Do you have PF & ESI Account:</InputLabel>
              <Select
                name="hasPfEsiAccount"
                label="Do you have PF & ESI Account"
                value={formData.hasPfEsiAccount}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
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
          <Grid>
            <Grid item xs={12}>
              <Root>
                <Divider>
                  <Chip label="Employment Details" />
                </Divider>
              </Root>
            </Grid>
            {formData.employmentHistory.map((employment, index) => (
              <Grid key={index}>
                <Grid container spacing={2}>
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
                      label="Worked From (Month/ Year)"
                      name="workedFromMonth"
                      value={employment.workedFromMonth}
                      onChange={(event) =>
                        handleEmploymentHistoryChange(event, index)
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Worked From (Year)"
                      name="workedFromYear"
                      value={employment.workedFromYear}
                      onChange={(event) =>
                        handleEmploymentHistoryChange(event, index)
                      }
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Worked Till (Month / Year)"
                      name="workedTillMonth"
                      value={employment.workedTillMonth}
                      onChange={(event) =>
                        handleEmploymentHistoryChange(event, index)
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <CustomTextField
                      fullWidth
                      size="small"
                      label="Worked Till (Year)"
                      name="workedTillYear"
                      value={employment.workedTillYear}
                      onChange={(event) =>
                        handleEmploymentHistoryChange(event, index)
                      }
                    />
                  </Grid> */}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={addEmploymentRecord}>
                Add More
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Root>
            <Divider>
              <Chip label="Family Details" />
            </Divider>
          </Root>
        </Grid>
        {formData.familyDetails.map((familyMember, index) => (
          <div key={index}>
            <Grid container spacing={2}>
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
                  options={relationshipOptions}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Relationship"
                      name="relationship"
                      value={familyMember.relationship}
                      onChange={(event) =>
                        handleFamilyDetailsChange(event, index)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Blood Group"
                  name="bloodGroup"
                  value={familyMember.bloodGroup}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Contact Number"
                  name="contactNumber"
                  value={familyMember.contactNumber}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
            </Grid>
          </div>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addFamilyMember}>
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
        <Grid container spacing={2}>
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
            <FormControl fullWidth>
              <InputLabel>Diabetic</InputLabel>
              <Select
                name="diabetic"
                value={formData.diabetic}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Asthama or Respiratory Issues</InputLabel>
              <Select
                name="asthamaRespiratory"
                value={formData.asthamaRespiratory}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Vision Impairments</InputLabel>
              <Select
                name="visionImpairments"
                value={formData.visionImpairments}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Hearing Impairments</InputLabel>
              <Select
                name="hearingImpairments"
                value={formData.hearingImpairments}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Hyper Tension</InputLabel>
              <Select
                name="hyperTension"
                value={formData.hyperTension}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Heart Issues</InputLabel>
              <Select
                name="heartIssues"
                value={formData.heartIssues}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Cancer</InputLabel>
              <Select
                name="cancer"
                value={formData.cancer}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>High Blood Pressure</InputLabel>
              <Select
                name="highBloodPressure"
                value={formData.highBloodPressure}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Low Blood Pressure</InputLabel>
              <Select
                name="lowBloodPressure"
                value={formData.lowBloodPressure}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Addictions" />
              </Divider>
            </Root>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Tobacco</InputLabel>
                <Select
                  name="tobacco"
                  value={formData.tobacco}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Cigarettes</InputLabel>
                <Select
                  name="cigarettes"
                  value={formData.cigarettes}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Alcohol</InputLabel>
                <Select
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Family Doctor Details" />
              </Divider>
            </Root>
          </Grid>
          <Grid container spacing={2}>
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
          </Grid>
        </Grid>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UserProfile;
