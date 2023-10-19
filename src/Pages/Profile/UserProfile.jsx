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
import { AddressFields } from "./AddressFields ";
import { BankFields } from "./BankFields";
import { EmergencyContactFields } from "./EmergencyContactFields";
import { PFAndESIFields } from "./PFAndESIFields";
import { MedicalFields } from "./MedicalFields";
import { DocterFields } from "./DocterFields";
import { AddictionFields } from "./AddictionFields";

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
      date_of_joining: "",
      blood_group: "",
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
    pf_esi_details: {
      has_pf_esi_account: "", // Yes or No
      uan_number: "", // UAN No.
      pf_number: "", // PF No.
      esi_number: "", // ESI No.
    },
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
      surgery_type: "",
      pregnancy: "",
      previous_surgeries: "",
      known_allergies: "",
      diabetic: "",
      hyper_tension: "",
      heart_issues: "",
      cancer: "",
      high_blood_pressure: "",
      low_blood_pressure: "",
      asthama_respiratory: "",
      vision: "",
      hearing: "",
    },
    addiction: {
      tobacco: "",
      cigarettes: "",
      alcohol: "",
    },
    doctor: {
      name: "",
      phone_number: "",
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
          <AddressFields
            type="current"
            formData={formData}
            setFormData={setFormData}
          />
          <AddressFields
            type="permanent"
            formData={formData}
            setFormData={setFormData}
          />

          {/* Bank Details */}
          <BankFields formData={formData} setFormData={setFormData} />
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Emergency Contact Details" />
              </Divider>
            </Root>
          </Grid>
          {/* Emergency Contact Details */}
          <EmergencyContactFields
            formData={formData}
            setFormData={setFormData}
          />
          {/* PF & ESI Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="PF & ESI Details" />
              </Divider>
            </Root>
          </Grid>
          <PFAndESIFields formData={formData} setFormData={setFormData} />
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

          {/*Known Health Issues Details  */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Known Health Issues" />
              </Divider>
            </Root>
          </Grid>
          <MedicalFields formData={formData} setFormData={setFormData} />

          {/*Addiction  */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Addiction Details" />
              </Divider>
            </Root>
          </Grid>
          <AddictionFields formData={formData} setFormData={setFormData} />

          {/*Family Doctor Details  */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Family Doctor Details" />
              </Divider>
            </Root>
          </Grid>
          <DocterFields formData={formData} setFormData={setFormData} />

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
