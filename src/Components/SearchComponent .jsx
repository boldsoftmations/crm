import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchComponent = ({ onSearch, onReset }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleResetClick = () => {
    setSearchQuery("");
    onReset();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                  {searchQuery && (
                    <IconButton aria-label="reset" onClick={handleResetClick}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchComponent;
