import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsappGroupService from "../../services/WhatsappGroupService";
import { CustomLoader } from "../../Components/CustomLoader";
import CustomTextField from "../../Components/CustomTextField";
import { CustomPagination } from "../../Components/CustomPagination";
import { Popup } from "../../Components/Popup";
import { WhatsappGroupCreate } from "./WhatsappGroupCreate";

export const WhatsappGroupView = () => {
  const [whatsappGroup, setWhatsappGroup] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // Assuming you know how many pages there are
  const data = useSelector((state) => state.auth);
  const userData = data.profile;

  useEffect(() => {
    getsetWhatsappGroupDetails(currentPage);
  }, [currentPage, getsetWhatsappGroupDetails]);

  const getsetWhatsappGroupDetails = useCallback(
    async (page, query = searchQuery) => {
      try {
        setOpen(true);
        const response = await WhatsappGroupService.getAllWhatsappData(
          page,
          query
        );
        setWhatsappGroup(response.data.results);
        const total = response.data.count;
        setPageCount(Math.ceil(total / 25));
        setOpen(false);
      } catch (error) {
        console.error("Error fetching scripts", error);
        setOpen(false);
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

  const handleEditClick = (item) => {
    setRecordForEdit(item);
    setOpenPopupUpdate(true);
  };

  return (
    <>
      <CustomLoader open={open} />
      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
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
              onClick={() =>
                getsetWhatsappGroupDetails(currentPage, searchQuery)
              }
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
                getsetWhatsappGroupDetails(1, "");
              }}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
          {(userData.groups.includes("Sales Manager") ||
            userData.groups.includes("Sales Deputy Manager") ||
            userData.groups.includes("Sales Assistant Deputy Manager") ||
            userData.groups.includes("Director")) && (
            <Grid item xs={12} sm={2}>
              <Button
                onClick={() => setOpenPopupCreate(true)}
                variant="contained"
                color="success"
                fullWidth
              >
                Add
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
        {whatsappGroup.map((item, index) => (
          <Accordion key={item.id} sx={{ margin: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  {index + 1}) Group Name: {item.description || "N/A"}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ marginBottom: 4 }}>
                <Typography sx={{ my: 2 }}>Message: {item.message}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <CustomPagination
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </Box>
      <Popup
        title={"Whatsapp Message Create"}
        openPopup={openPopupCreate}
        setOpenPopup={setOpenPopupCreate}
      >
        <WhatsappGroupCreate
          getsetWhatsappGroupDetails={getsetWhatsappGroupDetails}
          setOpenPopup={setOpenPopupCreate}
        />
      </Popup>
    </>
  );
};
