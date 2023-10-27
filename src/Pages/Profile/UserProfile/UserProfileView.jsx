import React, { useEffect, useState } from "react";
import UserProfileService from "../../../services/UserProfileService";
import { CustomLoader } from "../../../Components/CustomLoader";
import { CustomTable } from "../../../Components/CustomTable";
import { CustomSearch } from "../../../Components/CustomSearch";
import { Popup } from "../../../Components/Popup";
import { UserProfileUpdate } from "./UserProfileUpdate";
import { CSVLink } from "react-csv";

export const UserProfileView = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [IDForEdit, setIDForEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllUserProfileData();
  }, []);

  const getAllUserProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await UserProfileService.getAllUserProfileData();
      if (response.data) {
        setUserProfiles(response.data);
      }
    } catch (err) {
      console.error("error profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const Tableheaders = [
    "ID",
    "FIRST NAME",
    "LAST NAME",
    "PERSONAL CONTACT",
    "PERSONAL EMAIL",
    "DATE OF BIRTH",
    "DATE OF JOINING",
    "ACTION",
  ];

  const filteredUserProfiles = userProfiles.filter((user) =>
    Object.values(user.personal || {}).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatDate = (dateString) => {
    return dateString
      ? new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(dateString))
      : "-";
  };

  const getCsvData = () => {
    return filteredUserProfiles.map((user) => {
      const personal = user.personal || {};
      const addressCurrent = user.address.current || {};
      const addressPermanent = user.address.permanent || {};
      const kyc = user.kyc || {};
      const pfEsiDetails = user.pf_esi_details || {};
      const employmentHistory = user.employment_history || [{}];
      const education = user.education || {};
      const emergencyContacts = user.emergency_contacts || [{}];
      const familyDetails = user.family_details || [{}];
      const medical = user.medical || {};
      const addiction = user.addiction || {};
      const doctor = user.docter || {};
      // Check if education.diploma exists before accessing its properties
      const school = education.school || {};
      const college = education.college || {};
      const diploma = education.diploma || {};
      const graduation = education.graduation || {};
      const pg = education.pg || {};
      const additional_qualification = education.additional_qualifiction || {};

      return {
        user: personal.user || "-",
        first_name: personal.first_name || "-",
        middle_name: personal.middle_name || "-",
        last_name: personal.last_name || "-",
        email: personal.email || "-",
        contact: personal.contact || "-",
        date_of_birth: personal.date_of_birth || "-",
        place_of_birth: personal.place_of_birth || "-",
        nationality: personal.nationality || "-",
        marital_status: personal.marital_status || "-",
        marriage_date: personal.marriage_date || "-",
        date_of_joining: personal.date_of_joining || "-",
        blood_group: personal.blood_group || "-",

        // Current Address
        current_address: addressCurrent.address || "-",
        current_city: addressCurrent.city || "-",
        current_state: addressCurrent.state || "-",
        current_pin: addressCurrent.pin || "-",

        // Permanent Address
        permanent_address: addressPermanent.address || "-",
        permanent_city: addressPermanent.city || "-",
        permanent_state: addressPermanent.state || "-",
        permanent_pin: addressPermanent.pin || "-",

        // KYC
        kyc_name: kyc.name || "-",
        account_number: kyc.account_number || "-",
        ifsc_code: kyc.ifsc_code || "-",
        branch: kyc.branch || "-",
        kyc_city: kyc.city || "-",
        kyc_state: kyc.state || "-",
        kyc_address: kyc.address || "-",
        pan_card_number: kyc.pan_card_number || "-",
        aadhar_card_number: kyc.aadhar_card_number || "-",
        passport_number: kyc.passport_number || "-",
        dl_number: kyc.dl_number || "-",

        // Emergency Contacts
        emergency_contact_name: emergencyContacts[0].name || "-",
        emergency_contact_relationship:
          emergencyContacts[0].relationship || "-",
        emergency_contact_number: emergencyContacts[0].number || "-",

        // PF/ESI Details
        has_pf_esi_account: pfEsiDetails.has_pf_esi_account || "-",
        uan_number: pfEsiDetails.uan_number || "-",
        pf_number: pfEsiDetails.pf_number || "-",
        esi_number: pfEsiDetails.esi_number || "-",

        // Employment History
        employment_company_name: employmentHistory[0].company_name || "-",
        employment_post_held: employmentHistory[0].post_held || "-",
        employment_workedFrom: employmentHistory[0].workedFrom || "-",
        employment_workedTill: employmentHistory[0].workedTill || "-",

        // Education
        school_name: school.name || "-",
        school_board: school.board || "-",
        school_passout: school.passout || "-",
        college_name: college.name || "-",
        college_board: college.board || "-",
        college_passout: college.passout || "-",
        diploma_type: diploma.type || "-",
        diploma_uni_name: diploma.uni_name || "-",
        diploma_passout: diploma.passout || "-",
        graduation_type: graduation.type || "-",
        graduation_university: graduation.university || "-",
        graduation_passout: graduation.passout || "-",
        pg_masters: pg.masters || "-",
        pg_passout: pg.passout || "-",
        additional_qualification: additional_qualification || "-",

        // Medical
        surgery_type: medical.surgery_type || "-",
        pregnancy: medical.pregnancy || "-",
        previous_surgeries: medical.previous_surgeries || "-",
        known_allergies: medical.known_allergies || "-",
        diabetic: medical.diabetic || "-",
        hyper_tension: medical.hyper_tension || "-",
        heart_issues: medical.heart_issues || "-",
        cancer: medical.cancer || "-",
        high_blood_pressure: medical.high_blood_pressure || "-",
        low_blood_pressure: medical.low_blood_pressure || "-",
        asthama_respiratory: medical.asthama_respiratory || "-",
        vision: medical.vision || "-",
        hearing: medical.hearing || "-",

        // Addiction
        tobacco: addiction.tobacco || "-",
        cigarettes: addiction.cigarettes || "-",
        alcohol: addiction.alcohol || "-",

        // Doctor
        doctor_name: doctor.name || "-",
        doctor_phone_number: doctor.phone_number || "-",

        // Family Details
        family_member_name: familyDetails[0].name || "-",
        family_member_relationship: familyDetails[0].relationship || "-",
        family_member_blood_group: familyDetails[0].blood_group || "-",
        family_member_contact_number: familyDetails[0].contact_number || "-",
      };
    });
  };

  const getCsvHeaders = () => {
    const user = filteredUserProfiles[0]; // Assuming there's at least one user in the array
    const headers = [];

    if (user) {
      for (const key in user) {
        if (user.hasOwnProperty(key) && typeof user[key] !== "object") {
          // Exclude nested objects (e.g., personal, address, etc.)
          headers.push(key);
        }
      }

      // Add headers for education properties
      const educationKeys = [
        "school_name",
        "school_board",
        "school_passout",
        "college_name",
        "college_board",
        "college_passout",
        "diploma_type",
        "diploma_uni_name",
        "diploma_passout",
        "graduation_type",
        "graduation_university",
        "graduation_passout",
        "pg_masters",
        "pg_passout",
        "additional_qualification",
      ];

      headers.push(...educationKeys);

      // Add headers for medical properties
      const medicalKeys = [
        "surgery_type",
        "pregnancy",
        "previous_surgeries",
        "known_allergies",
        "diabetic",
        "hyper_tension",
        "heart_issues",
        "cancer",
        "high_blood_pressure",
        "low_blood_pressure",
        "asthama_respiratory",
        "vision",
        "hearing",
      ];

      headers.push(...medicalKeys);
    }

    return headers;
  };

  const csvHeaders = getCsvHeaders();

  const csvData = getCsvData();
  const data = filteredUserProfiles.map((user) => ({
    id: user.id,
    first_name: user.personal.first_name || "-",
    last_name: user.personal.last_name || "-",
    phone_number: user.personal.contact || "-",
    personal_email: user.personal.email || "-",
    date_of_birth: user.personal.date_of_birth
      ? formatDate(user.personal.date_of_birth)
      : "-",
    date_of_joining: user.personal.date_of_joining
      ? formatDate(user.personal.date_of_joining)
      : "-",
  }));

  const openInPopup = (item) => {
    console.log("item", item);
    setIDForEdit(item.id);
    setOpenPopup(true);
  };

  return (
    <>
      <CustomLoader open={isLoading} />
      <div style={styles.container}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 0.9 }}>
            <CustomSearch
              filterSelectedQuery={searchQuery}
              handleInputChange={handleInputChange}
              getResetData={() => setSearchQuery("")}
            />
          </div>
          <div style={{ flexGrow: 2 }}>
            <h3 style={styles.header}>User Profile</h3>
          </div>
          <div style={{ flexGrow: 1 }}>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={"user_profiles.csv"}
            >
              Download CSV
            </CSVLink>
          </div>
        </div>
        {filteredUserProfiles.length > 0 ? (
          <CustomTable
            headers={Tableheaders}
            data={data}
            openInPopup={openInPopup}
          />
        ) : (
          <p>No results found for the search query.</p>
        )}
      </div>
      <Popup
        fullScreen={true}
        title={"Update User Profile"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserProfileUpdate
          setOpenPopup={setOpenPopup}
          IDForEdit={IDForEdit}
          getAllUserProfileData={getAllUserProfileData}
        />
      </Popup>
    </>
  );
};

const styles = {
  container: {
    padding: "16px",
    margin: "16px",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255)",
  },
  header: {
    textAlign: "left",
    marginBottom: "1em",
    fontSize: "24px",
    color: "rgb(34, 34, 34)",
    fontWeight: 800,
  },
};
