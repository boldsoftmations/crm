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
import { Person } from "@mui/icons-material";
import { PersonalFields } from "./PersonalFields";
import { AddressField } from "./AddressFields ";

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
    personal: {
      first_name: "",
      middle_name: "",
      last_name: "",
      personal_email: "",
      phone_number: "",
      date_of_birth: "",
      place_of_birth: "",
      nationality: "",
      marital_status: "",
      marriage_date: "",
      pan_card_number: "",
      aadhar_card_number: "",
      passport_number: "",
      dl_number: "",
    },
    address: {
      current: {
        address: "",
        city: "",
        state: "",
        pin: "",
        is_permanent_same_as_current: false,
      },
      permanent: {
        address: "",
        city: "",
        state: "",
        pin: "",
      },
    },
    bank: {
      name: "",
      account_number: "",
      ifsc_code: "",
      branch: "",
      city: "",
      state: "",
      address: "",
    },
    emergency_contacts: [
      {
        name: "",
        relationship: "",
        number: "",
      },
    ],
    employment_history: [
      {
        company_name: "",
        post_held: "",
        worked_from_month: "",
        worked_from_year: "",
        worked_till_month: "",
        worked_till_year: "",
      },
    ],
    education: {
      school: {
        name: "",
        board: "",
        passout: "",
      },
      college: {
        name: "",
        board: "",
        passout: "",
      },
      diploma: {
        type: "",
        uni_name: "",
        passout: "",
      },
      graduation: {
        type: "",
        university: "",
        passout: "",
      },
      pg: {
        masters: "",
        passout: "",
      },
      additional_qualifiction: "",
    },
    medical: {
      surgery: {
        type: "",
        date: "",
      },
      pregnancy: "",
      previous_surgeries: "",
      known_allergies: "",
      conditions: {
        diabetic: "",
        hyper_tension: "",
        heart_issues: "",
        cancer: "",
        high_blood_pressure: "",
        low_blood_pressure: "",
        asthama_respiratory: "",
      },
      impairments: {
        vision: "",
        hearing: "",
      },
      habits: {
        tobacco: "",
        cigarettes: "",
        alcohol: "",
      },
      doctor: {
        name: "",
        phone_number: "",
      },
    },
    family_details: [
      {
        name: "",
        relationship: "",
        blood_group: "",
        contact_number: "",
      },
    ],
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

    // Set the updated form data to the state
    setFormData(updatedFormData);
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

  // Utility functions
  const formatDateForInput = (monthYear) => {
    if (!monthYear) return "";
    const [month, year] = monthYear.split("/");
    return `${year}-${month.padStart(2, "0")}-01`;
  };

  const handleEmploymentChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEmployments = [...formData.employment_history];
    if (name === "workedFrom" || name === "workedTill") {
      const date = new Date(value);
      const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
      updatedEmployments[index][name] = formattedDate;
    } else {
      updatedEmployments[index][name] = value;
    }

    setFormData({
      ...formData,
      employment_history: updatedEmployments,
    });
  };

  const removeEmploymentRecord = (index) => {
    const updatedEmployments = [...formData.employment_history];
    updatedEmployments.splice(index, 1);
    setFormData({
      ...formData,
      employment_history: updatedEmployments,
    });
  };

  const addEmploymentRecord = () => {
    const employers = formData.employment_history.map((emp) =>
      emp.company_name.toLowerCase()
    );

    const hasDuplicates = new Set(employers).size !== employers.length;
    if (hasDuplicates) {
      alert("Please ensure that the employer names are unique.");
      return;
    }

    const newRecord = {
      company_name: "",
      designation: "",
      workedFrom: "",
      workedTill: "",
    };

    const updatedEmployments = [...formData.employment_history, newRecord];
    setFormData({
      ...formData,
      employment_history: updatedEmployments,
    });
  };
  // Handle the change in family details
  const handleFamilyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFamilyDetails = [...formData.family_details];
    updatedFamilyDetails[index][name] = value;
    setFormData({
      ...formData,
      family_details: updatedFamilyDetails,
    });
  };

  // Add a new family member
  const addFamilyMember = () => {
    const updatedFamilyDetails = [...formData.family_details];
    updatedFamilyDetails.push({
      name: "",
      marital_status: "",
      blood_group: "",
      contact_number: "",
    });
    setFormData({
      ...formData,
      family_details: updatedFamilyDetails,
    });
  };

  // Remove a family member
  const removeFamilyMember = (index) => {
    const updatedFamilyDetails = [...formData.family_details];
    updatedFamilyDetails.splice(index, 1);
    setFormData({
      ...formData,
      family_details: updatedFamilyDetails,
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
  const YesorNoorNotapplicableOptions = ["Yes", "No", "Not Applicable"];
  const handleEmergencyContactChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEmergencyContacts = [...formData.emergency_contacts];
    updatedEmergencyContacts[index][name] = value;
    setFormData({
      ...formData,
      emergency_contacts: updatedEmergencyContacts,
    });
  };

  const addEmergencyContact = () => {
    const updatedEmergencyContacts = [...formData.emergency_contacts];
    updatedEmergencyContacts.push({
      emergency_contact_name: "",
      emergency_contact_relationship: "", // Use the default relationship
      emergency_contact_number: "",
    });
    setFormData({
      ...formData,
      emergency_contacts: updatedEmergencyContacts,
    });
  };

  const removeEmergencyContact = (index) => {
    const updatedEmergencyContacts = [...formData.emergency_contacts];
    updatedEmergencyContacts.splice(index, 1); // This will remove the contact at the given index
    setFormData({
      ...formData,
      emergency_contacts: updatedEmergencyContacts,
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
          {/* Personal Details */}
          <PersonalFields formData={formData} setFormData={setFormData} />
          {/* Current And Permanent Address Details */}
          <AddressField
            type="current"
            formData={formData}
            setFormData={setFormData}
          />
          <AddressField
            type="permanent"
            formData={formData}
            setFormData={setFormData}
          />

          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="KYC Details" />
              </Divider>
            </Root>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="PAN Card No"
              name="pan_card_number"
              value={formData.pan_card_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Aadhar Card No"
              name="aadhar_card_number"
              value={formData.aadhar_card_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Passport Number"
              name="passport_number"
              value={formData.passport_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Driving License Number"
              name="dl_number"
              value={formData.dl_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Account No"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="IFSC Code"
              name="ifsc_code"
              value={formData.ifsc_code}
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
          {formData.emergency_contacts.map((emergencyContact, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Emergency Contact Person Name"
                  name="emergency_contact_name"
                  value={emergencyContact.emergency_contact_name}
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
                  value={emergencyContact.emergency_contact_relationship || ""}
                  onChange={(event, newValue) => {
                    handleEmergencyContactChange(
                      {
                        target: {
                          name: "emergency_contact_relationship",
                          value: newValue || "",
                        },
                      },
                      index
                    );
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
                  name="emergency_contact_number"
                  value={emergencyContact.emergency_contact_number}
                  onChange={(event) =>
                    handleEmergencyContactChange(event, index)
                  }
                />
              </Grid>
              {formData.emergency_contacts.length > 1 && ( // Check if there's more than one emergency contact
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
              value={formData.has_pf_esi_account || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "has_pf_esi_account",
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
          {formData.has_pf_esi_account === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="UAN No."
                name="uan_number"
                value={formData.uan_number}
                onChange={handleChange}
              />
            </Grid>
          )}
          {formData.has_pf_esi_account === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="PF No."
                name="pf_number"
                value={formData.pf_number}
                onChange={handleChange}
              />
            </Grid>
          )}
          {formData.has_pf_esi_account === "Yes" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                size="small"
                label="ESI No."
                name="esi_number"
                value={formData.esi_number}
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
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Board"
              name="school_board"
              value={formData.school_board}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="passout_school"
              value={formData.passout_school}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="12th School/College Name"
              name="college_name"
              value={formData.college_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Board"
              name="college_board"
              value={formData.college_board}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="passout_college"
              value={formData.passout_college}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Diploma Type"
              name="diploma_type"
              value={formData.diploma_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Diploma University Name"
              name="diploma_uni_name"
              value={formData.diploma_uni_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="passout_diploma"
              value={formData.passout_diploma}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Graduation Type"
              name="graduation_type"
              value={formData.graduation_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Graduation University Name"
              name="graduation_university"
              value={formData.graduation_university}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="passout_graduation"
              value={formData.passout_graduation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Post Graduation / Masters"
              name="pgd_masters"
              value={formData.pgd_masters}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Passout Year"
              name="passout_pg"
              value={formData.passout_pg}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              type="text"
              size="small"
              label="Additional Educational Qualifications"
              name="additional_qualifiction"
              value={formData.additional_qualifiction}
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
          {formData.employment_history.map((employment, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Company Name"
                  name="company_name"
                  value={employment.company_name}
                  onChange={(event) => handleEmploymentChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Designation"
                  name="designation"
                  value={employment.designation}
                  onChange={(event) => handleEmploymentChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Worked From"
                  type="date"
                  name="workedFrom"
                  value={formatDateForInput(employment.workedFrom)}
                  onChange={(event) => handleEmploymentChange(event, index)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Worked Till"
                  type="date"
                  name="workedTill"
                  value={formatDateForInput(employment.workedTill)}
                  onChange={(event) => handleEmploymentChange(event, index)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                {formData.employment_history.length > 1 && (
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
          {formData.family_details.map((familyMember, index) => (
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
                  options={relationshipOptions}
                  fullWidth
                  size="small"
                  value={familyMember.contact_relationship || ""}
                  onChange={(event, newValue) => {
                    handleFamilyDetailsChange(
                      {
                        target: {
                          name: "contact_relationship",
                          value: newValue || "",
                        },
                      },
                      index
                    );
                  }}
                  renderInput={(params) => (
                    <CustomTextField label="Contact Relationship" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Blood Group"
                  name="blood_group"
                  value={familyMember.blood_group}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  fullWidth
                  size="small"
                  label="Contact Number"
                  name="contact_number"
                  value={familyMember.contact_number}
                  onChange={(event) => handleFamilyDetailsChange(event, index)}
                />
              </Grid>
              {/* Remove Family Member Button */}
              {formData.family_details.length > 1 && (
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
              name="known_allergies"
              value={formData.known_allergies}
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
              value={formData.asthama_respiratory || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "asthama_respiratory",
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
              value={formData.vision_impairments || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "vision_impairments",
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
              value={formData.hearing_impairments || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "hearing_impairments",
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
              value={formData.hyper_tension || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "hyper_tension",
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
              value={formData.heart_issues || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "heart_issues",
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
              value={formData.high_blood_pressure || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "high_blood_pressure",
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
              value={formData.low_blood_pressure || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "low_blood_pressure",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Low Blood Pressure" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Previous Surgeries"
              name="previous_surgeries"
              value={formData.previous_surgeries}
              onChange={handleChange}
            />
          </Grid>

          {/* Surgery Type */}
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Surgery Type"
              name="surgery_type"
              value={formData.surgery_type}
              onChange={handleChange}
            />
          </Grid>

          {/* Surgery Date */}
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Surgery Date"
              type="date" // You can use the 'date' type for a date input field
              name="surgery_date"
              value={formData.surgery_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={YesorNoorNotapplicableOptions}
              fullWidth
              size="small"
              value={formData.pregnancy || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: "pregnancy", value: newValue || "" },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Pregnancy" {...params} />
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
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type="number"
              size="small"
              label="Doctor Phone Number"
              name="doctor_phone_number"
              value={formData.doctor_phone_number}
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
