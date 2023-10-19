import React from "react";
import { Grid } from "@mui/material";

export const PersonalDetails = ({ personal }) => (
  <>
    <Grid item xs={12} sm={3}>
      First Name: {personal.first_name || "N/A"}
    </Grid>
    <Grid item xs={12} sm={3}>
      Middle Name: {personal.middle_name || "N/A"}
    </Grid>
    <Grid item xs={12} sm={3}>
      Last Name: {personal.last_name || "N/A"}
    </Grid>
    {/* ... Add more personal details fields as needed */}
  </>
);
