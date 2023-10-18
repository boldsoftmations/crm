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
    first_name: "",
    middle_name: "",
    last_name: "",
    personal_email: "",
    phone_number: "",
    date_of_birth: "",
    place_of_birth: "",
    nationality: "",
    pan_card_number: "",
    aadhar_card_number: "",
    marital_status: "",
    marriage_date: "",
    current_address: "",
    current_city: "",
    current_state: "",
    current_pin: "",
    permanent_address: "",
    permanent_city: "",
    permanent_state: "",
    permanent_pin: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    branch: "",
    bank_city: "",
    bank_state: "",
    bank_address: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_number: "",
    has_pf_esi_account: "",
    uan_number: "",
    pf_number: "",
    esi_number: "",
    school_name: "",
    school_board: "",
    passout_school: "",
    college_name: "",
    college_board: "",
    passout_college: "",
    diploma_type: "",
    diploma_uni_name: "",
    passout_diploma: "",
    graduation_type: "",
    graduation_university: "",
    passout_graduation: "",
    pgd_masters: "",
    passport_number: "",
    dl_number: "",
    passout_pg: "",
    additional_qualifiction: "",
    surgery_type: "",
    surgery_date: "",
    pregnancy: "",
    previous_surgeries: "",
    is_permanent_same_as_current: false,
    emergency_contacts: [
      {
        emergency_contact_name: "",
        emergency_contact_relationship: "",
        emergency_contact_number: "",
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
    family_details: [
      {
        name: "",
        relationship: "",
        blood_group: "",
        contact_number: "",
      },
    ],

    known_allergies: "",
    diabetic: "",
    hyper_tension: "",
    heart_issues: "",
    cancer: "",
    high_blood_pressure: "",
    low_blood_pressure: "",
    asthama_respiratory: "",
    vision_impairments: "",
    hearing_impairments: "",
    tobacco: "",
    cigarettes: "",
    alcohol: "",
    doctor_name: "",
    doctor_phone_number: "",
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
    if (formData.is_permanent_same_as_current) {
      switch (name) {
        // If the current address pin is changed
        case "current_pin":
          // Update the permanent address pin as well
          updatedFormData.permanent_pin = value;

          // Validate the new pin code for permanent address
          validatePinCode("permanent", value);
          break;

        // If the current city is changed
        case "current_city":
          // Update the permanent city as well
          updatedFormData.permanent_city = value;
          break;

        // If the current state is changed
        case "current_state":
          // Update the permanent state as well
          updatedFormData.permanent_state = value;
          break;

        // If the current address is changed
        case "current_address":
          // Update the permanent address as well
          updatedFormData.permanent_address = value;
          break;

        // Default case, if any other field is changed which we don't need to mirror
        default:
          break;
      }
    }

    // If the current pin code field is changed, validate it
    if (name === "current_pin") {
      validatePinCode("current", value);
    }
    // If the permanent pin code field is changed, validate it
    else if (name === "permanent_pin") {
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
            current_city: newCity,
            current_state: newState,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            permanent_city: newCity,
            permanent_state: newState,
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
        is_permanent_same_as_current: true,
        permanent_address: formData.current_address,
        permanent_city: formData.current_city,
        permanent_state: formData.current_state,
        permanent_pin: formData.current_pin,
      });
    } else {
      // If unchecked, clear the permanent address
      setFormData({
        ...formData,
        is_permanent_same_as_current: false,
        permanent_address: "",
        permanent_city: "",
        permanent_state: "",
        permanent_pin: "",
      });
    }
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
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Middle Name"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Personal Email"
              type="email"
              name="personal_email"
              value={formData.personal_email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Phone Number"
              type="tel"
              name="phone_number"
              value={formData.phone_number}
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
              name="date_of_birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.date_of_birth || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Place of Birth"
              name="place_of_birth"
              value={formData.place_of_birth}
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
            <Autocomplete
              options={["Married", "Unmarried"]}
              fullWidth
              size="small"
              value={formData.marital_status || ""}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "marital_status",
                    value: newValue || "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextField label="Marital Status" {...params} />
              )}
            />
          </Grid>
          {formData.marital_status === "Married" && (
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                type="date"
                size="small"
                label="Marriage Date"
                name="marriage_date"
                value={formData.marriage_date}
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
              name="current_address"
              value={formData.current_address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Current Pin"
              name="current_pin"
              value={formData.current_pin}
              onChange={handleChange}
              onBlur={() => validatePinCode("current", formData.current_pin)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Current City"
              name="current_city"
              value={formData.current_city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Current State"
              name="current_state"
              value={formData.current_state}
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
                  checked={formData.is_permanent_same_as_current}
                  onChange={handlePermanentSameAsCurrentChange}
                  name="is_permanent_same_as_current"
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
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              size="small"
              label="Permanant Pin"
              name="permanent_pin"
              value={formData.permanent_pin}
              onChange={handleChange}
              onBlur={() =>
                validatePinCode("permanent", formData.permanent_pin)
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Permanant City"
              name="permanent_city"
              value={formData.permanent_city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              disabled
              fullWidth
              size="small"
              label="Permanant State"
              name="permanent_state"
              value={formData.permanent_state}
            />
          </Grid>

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
