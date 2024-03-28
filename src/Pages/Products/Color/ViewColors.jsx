import React, { useCallback, useEffect, useState } from "react";
import { Grid, Button, Paper, Box } from "@mui/material";
import ProductService from "../../../services/ProductService";
import { CreateColor } from "./CreateColor";
import { UpdateColor } from "./UpdateColor";
import { Popup } from "./../../../Components/Popup";
import { CustomLoader } from "./../../../Components/CustomLoader";
import { CustomPagination } from "./../../../Components/CustomPagination";
import { CustomTable } from "../../../Components/CustomTable";
import { MessageAlert } from "../../../Components/MessageAlert";
import SearchComponent from "../../../Components/SearchComponent ";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";

export const ViewColors = () => {
  const [allColor, setAllColor] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const {
    handleError,
    openSnackbar,
    errorMessages,
    currentErrorIndex,
    handleCloseSnackbar,
  } = useNotificationHandling();

  useEffect(() => {
    getColours(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const getColours = useCallback(async (page, query) => {
    try {
      setOpen(true);
      const response = await ProductService.getAllColour(page, query);
      setAllColor(response.data.results);
      setPageCount(Math.ceil(response.data.count / 25));
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page with new search
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page with no search query
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const TableHeader = ["ID", "COLOUR", "ACTION"];
  const TableData = allColor.map((value) => value);

  return (
    <>
      <MessageAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity="error"
        message={errorMessages[currentErrorIndex]}
      />
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              p: 2,
            }}
          >
            {/* Search Component on the left */}
            <Box sx={{ flexGrow: 1, flexBasis: "40%", minWidth: "300px" }}>
              <SearchComponent onSearch={handleSearch} onReset={handleReset} />
            </Box>

            {/* Title Text centered */}
            <Box sx={{ flexGrow: 2, textAlign: "center", minWidth: "150px" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Colour
              </h3>
            </Box>

            {/* Add Button on the right */}
            <Box
              sx={{
                flexGrow: 1,
                flexBasis: "40%",
                display: "flex",
                justifyContent: "flex-end",
                minWidth: "300px",
              }}
            >
              <Button
                onClick={() => setOpenPopup2(true)}
                variant="contained"
                color="success"
              >
                Add
              </Button>
            </Box>
          </Box>
          {/* CustomTable */}
          <CustomTable
            headers={TableHeader}
            data={TableData}
            openInPopup={openInPopup}
          />
          <CustomPagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </Paper>
      </Grid>
      <Popup
        title={"Create Colour"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <CreateColor getColours={getColours} setOpenPopup={setOpenPopup2} />
      </Popup>
      <Popup
        title={"Update Colour"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateColor
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopup}
          getColours={getColours}
        />
      </Popup>
    </>
  );
};
