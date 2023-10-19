import React, { useState } from "react";
import Option from "../../Options/Options";
import { Button, Container, Grid, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PersonalFields } from "./PersonalFields";
import { AddressFields } from "./AddressFields ";
import { BankFields } from "./BankFields";
import { EmergencyContactFields } from "./EmergencyContactFields";
import { PFAndESIFields } from "./PFAndESIFields";
import { MedicalFields } from "./MedicalFields";
import { DocterFields } from "./DocterFields";
import { AddictionFields } from "./AddictionFields";
import { EducationFields } from "./EducationFields";
import EmploymentFields from "./EmploymentFields";
import { FamilyFields } from "./FamilyDetails";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      first_name: null,
      middle_name: null,
      last_name: null,
      personal_email: null,
      phone_number: null,
      date_of_birth: null,
      place_of_birth: null,
      nationality: null,
      marital_status: null,
      marriage_date: null,
      date_of_joining: null,
      blood_group: null,
    },
    address: {
      current: {
        address: null,
        city: null,
        state: null,
        pin: null,
        is_permanent_same_as_current: false,
      },
      permanent: {
        address: null,
        city: null,
        state: null,
        pin: null,
      },
    },
    kyc: {
      name: null,
      account_number: null,
      ifsc_code: null,
      branch: null,
      city: null,
      state: null,
      address: null,
      pan_card_number: null,
      aadhar_card_number: null,
      passport_number: null,
      dl_number: null,
    },
    emergency_contacts: [
      {
        name: null,
        relationship: null,
        number: null,
      },
    ],
    pf_esi_details: {
      has_pf_esi_account: null,
      uan_number: null,
      pf_number: null,
      esi_number: null,
    },
    employment_history: [
      {
        company_name: null,
        post_held: null,
        worked_from_month: null,
        worked_from_year: null,
        worked_till_month: null,
        worked_till_year: null,
      },
    ],
    education: {
      school: {
        name: null,
        board: null,
        passout: null,
      },
      college: {
        name: null,
        board: null,
        passout: null,
      },
      diploma: {
        type: null,
        uni_name: null,
        passout: null,
      },
      graduation: {
        type: null,
        university: null,
        passout: null,
      },
      pg: {
        masters: null,
        passout: null,
      },
      additional_qualifiction: null,
    },
    medical: {
      surgery_type: null,
      pregnancy: null,
      previous_surgeries: null,
      known_allergies: null,
      diabetic: null,
      hyper_tension: null,
      heart_issues: null,
      cancer: null,
      high_blood_pressure: null,
      low_blood_pressure: null,
      asthama_respiratory: null,
      vision: null,
      hearing: null,
    },
    addiction: {
      tobacco: null,
      cigarettes: null,
      alcohol: null,
    },
    doctor: {
      name: null,
      phone_number: null,
    },
    family_details: [
      {
        name: null,
        relationship: null,
        blood_group: null,
        contact_number: null,
      },
    ],
  });

  console.log("formData", formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Personal Details */}
          <Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Root>
              <Divider>
                <Chip label="Personal Details" />
              </Divider>
            </Root>
          </Grid>
          <PersonalFields formData={formData} setFormData={setFormData} />
          {/* Current And Permanent Address Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Address Details" />
              </Divider>
            </Root>
          </Grid>
          <AddressFields
            type="current"
            formData={formData}
            setFormData={setFormData}
          />
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Permanent Details" />
              </Divider>
            </Root>
          </Grid>
          <AddressFields
            type="permanent"
            formData={formData}
            setFormData={setFormData}
          />

          {/* KYC Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="KYC Details" />
              </Divider>
            </Root>
          </Grid>
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
          {/* Educational Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Educational Details" />
              </Divider>
            </Root>
          </Grid>
          <EducationFields formData={formData} setFormData={setFormData} />
          {/* Employment Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Employment Details" />
              </Divider>
            </Root>
          </Grid>
          <EmploymentFields formData={formData} setFormData={setFormData} />
          {/* Family Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Family Details" />
              </Divider>
            </Root>
          </Grid>
          <FamilyFields formData={formData} setFormData={setFormData} />
          {/*Known Health Issues Details  */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Known Health Issues" />
              </Divider>
            </Root>
          </Grid>
          <MedicalFields formData={formData} setFormData={setFormData} />

          {/*Addiction Details  */}
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
