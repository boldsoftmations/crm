import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import "../../CommonStyle.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
  Paper,
  styled,
  Box,
  TableContainer,
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";

import ProductService from "../../../services/ProductService";
import { Popup } from "./../../../Components/Popup";
import { CreateFinishGoods } from "./CreateFinishGoods";
import { UpdateFinishGoods } from "./UpdateFinishGoods";
import { ErrorMessage } from "./../../../Components/ErrorMessage/ErrorMessage";
import { CustomSearch } from "./../../../Components/CustomSearch";
import { CustomLoader } from "./../../../Components/CustomLoader";
import { useDispatch } from "react-redux";
import {
  getBasicUnitData,
  getBrandData,
  getColourData,
  getPackingUnitData,
  getUnitData,
} from "../../../Redux/Action/Action";
import { getProductCodeData } from "./../../../Redux/Action/Action";
import { CustomPagination } from "./../../../Components/CustomPagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ViewFinishGoods = () => {
  const dispatch = useDispatch();
  const [finishGood, setFinishGood] = useState([]);
  const [open, setOpen] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    getPackingUnits();
  }, []);

  const getPackingUnits = async () => {
    try {
      const res = await ProductService.getAllPaginatePackingUnit("all");
      dispatch(getPackingUnitData(res.data));
    } catch (err) {
      console.log("error PackingUnit finishGoods", err);
    }
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const getBrandList = async () => {
    try {
      const res = await ProductService.getAllPaginateBrand("all");
      dispatch(getBrandData(res.data));
    } catch (err) {
      console.log("error finishGoods :>> ", err);
    }
  };

  useEffect(() => {
    getColours();
  }, []);

  const getColours = async () => {
    try {
      const res = await ProductService.getAllPaginateColour("all");
      dispatch(getColourData(res.data));
    } catch (err) {
      console.log("err Colour FinishGoods :>> ", err);
    }
  };

  useEffect(() => {
    getproductCodes();
  }, []);

  const getproductCodes = async () => {
    try {
      const res = await ProductService.getAllPaginateProductCode("all");
      dispatch(getProductCodeData(res.data));
    } catch (err) {
      console.log("error ProductCode finishGoods", err);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = async () => {
    try {
      const res = await ProductService.getAllPaginateUnit("all");
      dispatch(getUnitData(res.data));
    } catch (err) {
      console.log("error unit finishGoods", err);
    }
  };

  useEffect(() => {
    getBasicUnit();
  }, []);

  const getBasicUnit = async () => {
    try {
      const res = await ProductService.getAllPaginateBasicUnit("all");
      dispatch(getBasicUnitData(res.data));
    } catch (err) {
      console.log("error :>> ", err);
    }
  };

  const getFinishGoods = async () => {
    try {
      setOpen(true);
      if (currentPage) {
        const response = await ProductService.getFinishGoodsPaginate(
          currentPage
        );
        setFinishGood(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      } else {
        const response = await ProductService.getAllFinishGoods();

        setFinishGood(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      }
      setOpen(false);
    } catch (err) {
      setOpen(false);
      if (!err.response) {
        setErrMsg(
          "???Sorry, You Are Not Allowed to Access This Page??? Please contact to admin"
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
    getFinishGoods();
  }, []);

  const handlePageChange = async (event, value) => {
    try {
      const page = value;
      setCurrentPage(page);
      setOpen(true);
      if (searchQuery) {
        const response = await ProductService.getFinishGoodsPaginateWithSearch(
          page,
          searchQuery
        );
        if (response) {
          setFinishGood(response.data.results);
          const total = response.data.count;
          setpageCount(Math.ceil(total / 25));
        } else {
          getFinishGoods();
          setSearchQuery("");
        }
      } else {
        const response = await ProductService.getFinishGoodsPaginate(page);
        setFinishGood(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      }
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    getSearchData(event.target.value);
  };

  const getSearchData = async (value) => {
    try {
      setOpen(true);
      const filterSearch = value;

      const response = await ProductService.getAllSearchFinishGoods(
        filterSearch
      );
      if (response) {
        setFinishGood(response.data.results);
        const total = response.data.count;
        setpageCount(Math.ceil(total / 25));
      } else {
        getFinishGoods();
        setSearchQuery("");
      }

      setOpen(false);
    } catch (error) {
      console.log("error Search leads", error);
    } finally {
      setOpen(false);
    }
  };

  const getResetData = () => {
    setSearchQuery("");
    getFinishGoods();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  return (
    <>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <ErrorMessage errRef={errRef} errMsg={errMsg} />
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box display="flex">
            <Box flexGrow={0.9}>
              <CustomSearch
                filterSelectedQuery={searchQuery}
                handleInputChange={handleInputChange}
                getResetData={getResetData}
              />
            </Box>
            <Box flexGrow={2}>
              <h3
                style={{
                  textAlign: "left",
                  marginBottom: "1em",
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Finish Goods
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
          <TableContainer
            sx={{
              maxHeight: 440,
              "&::-webkit-scrollbar": {
                width: 15,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f2f2f2",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#aaa9ac",
              },
            }}
          >
            <Table
              sx={{ minWidth: 700 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">FINISH GOODS</StyledTableCell>

                  <StyledTableCell align="center">UNIT</StyledTableCell>

                  <StyledTableCell align="center">BRAND</StyledTableCell>
                  <StyledTableCell align="center">PRODUCT CODE</StyledTableCell>
                  <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
                  <StyledTableCell align="center">HSN CODE</StyledTableCell>
                  <StyledTableCell align="center">GST%</StyledTableCell>
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {finishGood.map((row, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {row.id ? row.id : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name ? row.name.toUpperCase() : "-"}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.unit ? row.unit : "-"}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.brand ? row.brand : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.productcode ? row.productcode : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.description ? row.description : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.hsn_code ? row.hsn_code : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.gst ? `${row.gst}%` : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => openInPopup(row.id)}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomPagination
            pageCount={pageCount}
            handlePageClick={handlePageChange}
          />
        </Paper>
      </Grid>
      <Popup
        title={"Create FinishGoods"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <CreateFinishGoods
          getFinishGoods={getFinishGoods}
          setOpenPopup={setOpenPopup2}
        />
      </Popup>
      <Popup
        title={"Update FinishGoods"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateFinishGoods
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopup}
          getFinishGoods={getFinishGoods}
        />
      </Popup>
    </>
  );
};
