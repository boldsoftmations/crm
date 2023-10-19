import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserProfileService from "../../services/UserProfileService";
import { useSelector } from "react-redux";
import { PersonalDetails } from "./Personal/PersonalDetails";

export const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  const Users = useSelector((state) => state.auth.allProfile);

  return (
    <Grid container spacing={2}>
      {/* Personal Details */}
      <PersonalDetails personal={Users ? Users.personal : null} />
    </Grid>
  );
};
