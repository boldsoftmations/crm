import React, { useEffect, useState } from "react";
import { CustomTable } from "../../Components/CustomTable";
import { Box, Grid, Paper } from "@mui/material";
import CustomerServices from "../../services/CustomerService";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import { Button } from "bootstrap";
import { WhatsappGroupCreate } from "./WhatsappGroupCreate";
import { Popup } from "../../Components/Popup";
import { CustomPagination } from "../../Components/CustomPagination";

export const WhatsappGroupView = () => {
  const [whatsappGroupData, setWhatsappGroupData] = useState([]);
  const [allWhatsappGroupMenu, setAllWhatsappGroupMenu] = useState([]);
  const [openPopupWhatsapp, setOpenPopupWhatsapp] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const data = useSelector((state) => state.auth);
  const userData = data.profile;

  useEffect(() => {
    getAllWhatsappGroup();
  }, []);

  const getAllWhatsappGroup = async () => {
    try {
      const res = await CustomerServices.getAllWhatsappGroupData();
      setAllWhatsappGroupMenu(res.data);
      setPageCount(Math.ceil(res.data.count / 25));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  const Tabledata = whatsappGroupData.map((row) => ({
    name: row.name,
    whatsapp_group: row.whatsapp_group,
    whatsapp_group_id: row.whatsapp_group_id,
  }));

  const Tableheaders = ["Comapny ", "Group Name", "Group Id"];

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                {" "}
              </Grid>
              <Grid item xs={12} sm={3}>
                <h3
                  style={{
                    textAlign: "center",
                    marginBottom: "1em",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Whatsapp Group
                </h3>
              </Grid>
              {(userData.groups.includes("Director") ||
                userData.groups.includes("Customer Service")) && (
                <Grid item xs={12} sm={3}>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => setOpenPopupWhatsapp(true)}
                    startIcon={<WhatsAppIcon />}
                  >
                    Whatsapp
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
          <CustomTable headers={Tableheaders} data={Tabledata} />
          {/* <CustomPagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          /> */}
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
        </Paper>
      </Grid>
    </>
  );
};
