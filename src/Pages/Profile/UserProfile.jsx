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

          {/* Bank Details */}
          <Grid item xs={12}>
            <Root>
              <Divider>
                <Chip label="Bank Details" />
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
