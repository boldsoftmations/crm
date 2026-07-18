import { Box, Grid, TextField, Button } from "@mui/material";
// import { Button } from "bootstrap";
import React from "react";

const MergePincodeCreate = () => {
  const [inputValue, setInputValue] = React.useState({
    postal_code: "",
    merge_code: "",
  });

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log("Data is:", inputValue);
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={onSubmitHandle} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pin Code"
              name="postal_code"
              size="small"
              value={inputValue.postal_code}
              onChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Merge Code"
              name="merge_code"
              size="small"
              value={inputValue.merge_code}
              onChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  merge_code: e.target.value,
                }))
              }
              //   onChange={(e) =>
              //     setInputValue((prev) => ({
              //       ...prev,
              //       postal_code: e.target.value,
              //     }))
              //   }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MergePincodeCreate;
