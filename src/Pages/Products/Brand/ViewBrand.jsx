import React, { useCallback, useEffect, useState } from "react";
import { Grid, Button, Paper, Box } from "@mui/material";
import ProductService from "../../../services/ProductService";
import { Popup } from "./../../../Components/Popup";
import { CreateBrand } from "./CreateBrand";
import { UpdateBrand } from "./UpdateBrand";
import { CustomLoader } from "./../../../Components/CustomLoader";
import "../../CommonStyle.css";
import { CustomTable } from "../../../Components/CustomTable";
import CustomTextField from "../../../Components/CustomTextField";
import { CustomPagination } from "../../../Components/CustomPagination";
import { MessageAlert } from "../../../Components/MessageAlert";
import { useNotificationHandling } from "../../../Components/useNotificationHandling ";

export const ViewBrand = () => {
  const [brand, setBrand] = useState([]);
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
    getBrandList(currentPage);
  }, [currentPage, getBrandList]);

  const getBrandList = useCallback(
    async (page, query = searchQuery) => {
      try {
        setOpen(true);
        const response = await ProductService.getAllBrand(page, query);
        setBrand(response.data.results);
        const total = response.data.count;
        setPageCount(Math.ceil(total / 25));
      } catch (error) {
        handleError(error); // Handle errors from the API call
      } finally {
        setOpen(false); // Always close the loader
      }
    },
    [searchQuery]
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const TableHeader = ["ID", "BRAND", "SHORT NAME", "ACTION"];
  const TableData = brand.map((value) => value);
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
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box display="flex">
            <Box
              sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ marginRight: 5, marginLeft: 5 }}
              >
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    size="small"
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => getBrandList(currentPage, searchQuery)}
                    fullWidth
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                      getBrandList(1, "");
                    }}
                    fullWidth
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box display="flex" justifyContent="center" marginBottom="10px">
              <h3
                style={{
                  marginBottom: "1em",
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Brand
              </h3>
            </Box>
            <Box flexGrow={0.5} align="right">
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
        title={"Create Brand"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <CreateBrand getBrandList={getBrandList} setOpenPopup={setOpenPopup2} />
      </Popup>
      <Popup
        title={"Update Brand"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateBrand
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopup}
          getBrandList={getBrandList}
        />
      </Popup>
    </>
  );
};
