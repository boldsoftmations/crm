import React, { useEffect, useState } from "react";
import { CustomTable } from "../../Components/CustomTable";
import { Box, Button, Grid, Paper, Snackbar } from "@mui/material";
import CustomerServices from "../../services/CustomerService";
import { CustomPagination } from "../../Components/CustomPagination";
import { CustomLoader } from "../../Components/CustomLoader";
import CustomTextField from "../../Components/CustomTextField";
import { WhatsappGroupDelete } from "./WhatsappGroupDelete";
import { Popup } from "../../Components/Popup";
import SearchComponent from "../../Components/SearchComponent ";

export const WhatsappGroupView = () => {
  const [open, setOpen] = useState(false);
  const [whatsappGroupData, setWhatsappGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getAllWhatsappGroup();
  }, [currentPage, searchQuery]);

  const getAllWhatsappGroup = async (
    page = currentPage,
    searchValue = searchQuery
  ) => {
    try {
      setOpen(true);
      const res = await CustomerServices.getAllWhatsappGroupData(
        page,
        searchValue
      );
      setWhatsappGroupData(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 25));
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  const handleDelete = async (data) => {
    setSelectedRow(data);
    setDeletePopupOpen(true);
  };

  const onDeleteSuccess = async (deletedId) => {
    setWhatsappGroupData((prevData) =>
      prevData.filter((row) => row.whatsapp_group_id !== deletedId)
    );
    setSnackbarMessage("Group deleted successfully");
    setSnackbarOpen(true);
  };

  const closeDeletePopup = () => {
    setDeletePopupOpen(false);
    getAllWhatsappGroup();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const Tabledata = Array.isArray(whatsappGroupData)
    ? whatsappGroupData.map((row) => ({
        id: row.id,
        name: row.name,
        ref_customer: row.ref_customer,
        whatsapp_group: row.whatsapp_group,
        whatsapp_group_id: row.whatsapp_group_id,
      }))
    : [];

  const Tableheaders = [
    "Id",
    "Company ",
    "Group Company",
    "Group Name",
    "Group ID",
    "Action",
  ];

  return (
    <>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box display="flex" marginBottom="10px">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>
              <Grid item xs={12} sm={6} alignItems={"center"}>
                <h3
                  style={{
                    textAlign: "center",
                    marginBottom: "1em",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Whatsapp Group Information
                </h3>
              </Grid>
            </Grid>
          </Box>
          <CustomTable
            headers={Tableheaders}
            data={Tabledata}
            openDeletePopup={handleDelete}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <Popup
            title={"Whatsapp Group Delete"}
            openPopup={deletePopupOpen}
            setOpenPopup={setDeletePopupOpen}
          >
            <WhatsappGroupDelete
              selectedData={selectedRow}
              onClose={closeDeletePopup}
              onDeleteSuccess={onDeleteSuccess}
            />
          </Popup>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </Paper>
      </Grid>
    </>
  );
};
