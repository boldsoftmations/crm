import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import { CustomerPotentialCreate } from "./CustomerPotentialCreate";
import { CustomerPotentialUpdate } from "./CustomerPotentialUpdate";
import { Popup } from "../../../Components/Popup";
import CustomerServices from "../../../services/CustomerService";
import { CustomTable } from "../../../Components/CustomTable";

export const CustomerPotentialView = ({ recordForEdit }) => {
  const [open, setOpen] = useState(false);
  const [potential, setPotential] = useState([]);
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [idForEdit, setIdForEdit] = useState(null);
  useEffect(() => {
    getCompanyDetailsByID();
  }, []);

  // API call to fetch company details based on type
  const getCompanyDetailsByID = async () => {
    try {
      setOpen(true);
      const potentialResponse =
        await CustomerServices.getCompanyDataByIdWithType(
          recordForEdit,
          "potential"
        );
      setPotential(potentialResponse.data.potential);
      setOpen(false);
    } catch (err) {
      setOpen(false);
      console.log("company data by id error", err);
    }
  };

  const openInPopup = (item) => {
    console.log("item", item);
    setIdForEdit(item);
    setOpenPopupUpdate(true);
  };

  const TableHeader = [
    "Date",
    "Description",
    "Product",
    "Current Buying Quantity(Monthly)",
    "Remark",
    "Action",
  ];

  const TableData =
    potential &&
    potential.map((value) => ({
      date: value.date,
      description: value.description,
      product: value.product,
      current_buying_quantity: value.current_buying_quantity,
      remark: value.remark,
    }));
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="1em"
          >
            <h3
              style={{
                textAlign: "left",
                marginBottom: "1em",
                fontSize: "24px",
                color: "rgb(34, 34, 34)",
                fontWeight: 800,
              }}
            >
              Customer Potential
            </h3>
            <Box>
              <Button
                variant="contained"
                onClick={() => setOpenPopupCreate(true)}
                sx={{ marginLeft: "10px", marginRight: "10px" }}
                size="small"
              >
                Add
              </Button>
            </Box>
          </Box>
          {TableData && (
            <CustomTable
              headers={TableHeader}
              data={TableData}
              openInPopup={openInPopup}
            />
          )}
        </Paper>
      </Grid>
      <Popup
        maxWidth="xl"
        title="Create Potential"
        openPopup={openPopupCreate}
        setOpenPopup={setOpenPopupCreate}
      >
        <CustomerPotentialCreate
          getCompanyDetailsByID={getCompanyDetailsByID}
          recordForEdit={recordForEdit}
          setOpenModal={setOpenPopupCreate}
        />
      </Popup>
      <Popup
        maxWidth="xl"
        title="Update Potential"
        openPopup={openPopupUpdate}
        setOpenPopup={setOpenPopupUpdate}
      >
        <CustomerPotentialUpdate
          getCompanyDetailsByID={getCompanyDetailsByID}
          idForEdit={idForEdit}
          setOpenModal={setOpenPopupUpdate}
        />
      </Popup>
    </>
  );
};
