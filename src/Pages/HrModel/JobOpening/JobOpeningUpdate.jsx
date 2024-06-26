import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import CustomAxios from "../../../services/api";
import CustomAutocomplete from "../../../Components/CustomAutocomplete";

export const JobOpeningUpdate = ({
  recordForEdit,
  updateJobOpening,
  setOpenUpdatePopup,
}) => {
  const [values, setValues] = useState(recordForEdit || {});
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await CustomAxios.get(
          `/api/user/users/?is_active=True`
        );
        if (Array.isArray(response.data.users)) {
          setEmails(response.data.users.map((user) => user.email));
        }
      } catch (error) {
        console.error("Error fetching Emails:", error);
      }
    };

    if (recordForEdit != null) {
      setValues(recordForEdit);
    }
    fetchEmails();
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values && values.id) {
        if (values.closing_date === "") {
          values.closing_date = null;
        }
        await updateJobOpening(values.id, values);
        setOpenUpdatePopup(false);
      }
    } catch (error) {
      console.error("Error updating job opening:", error);
    }
  };

  const salaryRange = [
    "0.6 LPA - 1.2 LPA",
    "1.2 LPA - 1.8 LPA",
    "1.8 LPA - 2.4 LPA",
    "2.4 LPA - 3.0 LPA",
    "3.0 LPA - 3.6 LPA",
    "3.6 LPA - 4.2 LPA",
    "4.8 LPA - 6.0 LPA",
    "7.2 LPA - 9.6 LPA",
    "9.6 LPA - 12 LPA",
    "12 LPA - 15 LPA",
    "15 LPA - 18 LPA",
    "18 LPA - 21 LPA",
    "21 LPA - 24 LPA",
    "24 LPA - Above",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            label="Date Of Closing"
            name="closing_date"
            fullWidth
            type="date"
            value={values.closing_date || null}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            name="no_of_openings"
            label="No Of Vacancies"
            value={values.no_of_openings || ""}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomAutocomplete
            size="small"
            id="salary_ranges"
            options={salaryRange}
            fullWidth
            label="Salary Range"
            value={values.salary_ranges || ""}
            onChange={(event, newValue) => {
              setValues({
                ...values,
                salary_ranges: newValue,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomAutocomplete
            size="small"
            value={values.position}
            onChange={(event, newValue) => {
              handleInputChange({
                target: { name: "position", value: newValue },
              });
            }}
            options={["New", "Replacement", "Backup"]}
            label="Position"
          />
        </Grid>
        {values.position === "Replacement" && (
          <CustomAutocomplete
            size="small"
            id="replacement_user"
            options={emails}
            fullWidth
            label="Replacement Email"
            value={values.replacement_user}
            onChange={(event, newValue) => {
              setValues({
                ...values,
                replacement_user: newValue,
              });
            }}
          />
        )}

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Update Job Opening
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
