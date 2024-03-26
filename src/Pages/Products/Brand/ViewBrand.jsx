import React, { useEffect, useRef, useState } from "react";
import { Grid, Button, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductService from "../../../services/ProductService";
import { Popup } from "./../../../Components/Popup";
import { CreateBrand } from "./CreateBrand";
import { UpdateBrand } from "./UpdateBrand";
import { ErrorMessage } from "./../../../Components/ErrorMessage/ErrorMessage";
import { CustomLoader } from "./../../../Components/CustomLoader";
import "../../CommonStyle.css";
import { CustomTable } from "../../../Components/CustomTable";
import CustomTextField from "../../../Components/CustomTextField";

export const ViewBrand = () => {
  const [brand, setBrand] = useState([]);
  const [open, setOpen] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const getBrandList = async () => {
    try {
      setOpen(true);
      const response = await ProductService.getAllBrand();
      setBrand(response.data.results);

      setOpen(false);
    } catch (err) {
      setOpen(false);
      if (!err.response) {
        setErrMsg(
          "“Sorry, You Are Not Allowed to Access This Page” Please contact to admin"
        );
      } else if (err.response.status === 400) {
        setErrMsg(
          err.response.data.errors.name
            ? err.response.data.errors.name
            : err.response.data.errors.non_field_errors
        );
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.errors.code);
      } else {
        setErrMsg("Server Error");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const getSearchData = async (value) => {
    try {
      setOpen(true);
      const response = await ProductService.getAllSearchBrand(searchQuery);
      if (response) {
        setBrand(response.data.results);
      } else {
        getBrandList();
      }
      setOpen(false);
    } catch (error) {
      console.log("error Search leads", error);
      setOpen(false);
    }
  };

  const getResetData = () => {
    setSearchQuery("");
    getBrandList();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item.id);
    setOpenPopup(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const TableHeader = ["ID", "BRAND", "SHORT NAME", "ACTION"];
  const TableData = brand.map((value) => value);
  return (
    <>
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <ErrorMessage errRef={errRef} errMsg={errMsg} />
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
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={getSearchData}
                    fullWidth
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSearchQuery("");
                      // setCurrentPage(1);
                      getResetData(1, "");
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
                startIcon={<AddIcon />}
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
