import React, { useCallback, useEffect, useState } from "react";
import { CustomLoader } from "../../Components/CustomLoader";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomPagination } from "../../Components/CustomPagination";
import CustomerServices from "../../services/CustomerService";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Popup } from "../../Components/Popup";
import { WhatsappGroupCreate } from "./WhatsappGroupCreate";

export const WhatsappGroup = () => {
  const [whatsappGroupData, setWhatsappGroupData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopupWhatsapp, setOpenPopupWhatsapp] = useState(false);

  useEffect(() => {
    getAllWhatsappGroup();
  }, []);

  const getAllWhatsappGroup = async () => {
    try {
      setOpen(true);
      const res = await CustomerServices.getWhatsappImageData();
      setWhatsappGroupData(res.data);
      setPageCount(Math.ceil(res.data.length / 25));
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }, []);

  const handleSendAgain = async (referenceId) => {
    try {
      setOpen(true);

      await CustomerServices.resendWhatsappMessage(referenceId);
      console.log(
        `Message with reference ID ${referenceId} resent successfully`
      );
    } catch (err) {
      console.error(`Error resending message: ${err}`);
    } finally {
      setOpen(false);
    }
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <CustomLoader open={open} />
      <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
        <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Button
                color="success"
                variant="contained"
                onClick={() => setOpenPopupWhatsapp(true)}
                startIcon={<WhatsAppIcon />}
              >
                Whatsapp
              </Button>
            </Grid>
          </Grid>
        </Box>

        {whatsappGroupData
          .filter(
            (data) =>
              data.message &&
              data.message.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((data, index) => (
            <Accordion key={data.id} sx={{ margin: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {index + 1}) Date: {formatDate(data.creation_date)} | Sent:{" "}
                  {data.messages_statistics.sent} | Failed:{" "}
                  {data.messages_statistics.unsent} | Queue:{" "}
                  {data.messages_statistics.queue} | Refrence ID:{" "}
                  {data.reference_id}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.message}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Grid item xs={12} sm={1} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSendAgain(data.reference_id)}
                  >
                    Send Again
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        <Box sx={{ marginBottom: 4 }}>
          <CustomPagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
          <Popup
            title={"Whatsapp Message Create"}
            openPopup={openPopupWhatsapp}
            setOpenPopup={setOpenPopupWhatsapp}
          >
            <WhatsappGroupCreate
              // getsetWhatsappGroupDetails={getsetWhatsappGroupDetails}
              setOpenPopup={setOpenPopupWhatsapp}
            />
          </Popup>
        </Box>
      </Paper>
    </>
  );
};
