import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import LeadServices from "../../services/LeadService";
import { CreateLeads } from "./CreateLeads";
import { UpdateLeads } from "./UpdateLeads";
import { Popup } from "../../Components/Popup";
import ProductService from "../../services/ProductService";
import { CustomPagination } from "../../Components/CustomPagination";
import { CustomLoader } from "../../Components/CustomLoader";
import { BulkLeadAssign } from "./BulkLeadAssign";
import { useSelector } from "react-redux";
import { CreateLeadsProformaInvoice } from "./../Invoice/ProformaInvoice/CreateLeadsProformaInvoice";
import { Helmet } from "react-helmet";
import { LeadPotentialCreate } from "./LeadPotential/LeadPotentialCreate";
import { LeadForecastCreate } from "./LeadForecast/LeadForecastCreate";
import CustomAutocomplete from "../../Components/CustomAutocomplete";
import { useNotificationHandling } from "../../Components/useNotificationHandling ";
import { MessageAlert } from "../../Components/MessageAlert";
import SearchComponent from "../../Components/SearchComponent ";
import { CreateEDCByLeads } from "./CreateEDByLeads";
import { CreateSRF } from "../Cutomers/SRF/CreateSRF";

export const OpenLead = () => {
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterSelectedQuery, setFilterSelectedQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openModalPotential, setOpenModalPotential] = useState(false);
  const [pinnedRows, setPinnedRows] = useState([]);
  const [openModalPI, setOpenModalPI] = useState(false);
  const [openModalForecast, setOpenModalForecast] = useState(false);
  const [openEDCModal, setOpenEDCModal] = useState(false);
  const [editforedc, setEditforedc] = useState();
  const [leadsByID, setLeadsByID] = useState(null);
  const [referenceData, setReferenceData] = useState([]);
  const [descriptionMenuData, setDescriptionMenuData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [openSRF, setOpenSRF] = useState(false);
  const data = useSelector((state) => state.auth);
  const userData = data.profile;
  const assigned = userData.active_sales_user || [];
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const FilterOptions = [
    { label: "References", value: "references__source" },
    { label: "Description", value: "description__name" },
    { label: "Stage", value: "stage" },
    ...(!userData.groups.includes("Sales Executive")
      ? [{ label: "Assigned To", value: "assigned_to__email" }]
      : []),
  ];

  useEffect(() => {
    const beforePrint = () => {
      setIsPrinting(true);
      setLeads([]);
    };

    const afterPrint = () => {
      setIsPrinting(false);
      // Fetch the data again and update the companyData state
      getleads();
    };

    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);

    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  const openInPopup = (item) => {
    setLeadsByID(item.lead_id);
    setOpenPopup(true);
  };

  const openInPopup3 = (item) => {
    setLeadsByID(item.lead_id);
    setOpenModalPotential(true);
  };

  const openInPopup4 = (item) => {
    setLeadsByID(item.lead_id);
    setOpenModalPI(true);
  };

  const openInPopup5 = (item) => {
    setLeadsByID(item.lead_id);
    setOpenModalForecast(true);
  };

  //open popup for SRF(Sample Requist Form)
  const handleOpenSRF = (data) => {
    setLeadsByID(data);
    setOpenSRF(true);
  };

  const FetchData = async (value) => {
    try {
      setOpen(true);
      setFilterQuery(value);
      if (value.includes("references__source")) {
        const res = await LeadServices.getAllRefernces();
        setReferenceData(res.data);
      }
      if (value.includes("description__name")) {
        const res = await ProductService.getNoDescription();
        setDescriptionMenuData(res.data);
      }
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      setOpen(false);
    }
  };

  const renderAutocomplete = (label, options, onChange) => (
    <CustomAutocomplete
      fullWidth
      size="small"
      onChange={(event, value) => onChange(value)}
      options={options}
      getOptionLabel={(option) => option}
      label={label}
    />
  );

  const handlePin = async (e, row) => {
    e.preventDefault();
    // Check if the row is already pinned
    const isPinned = pinnedRows.includes(row.lead_id);
    if (isPinned) {
      // If already pinned, remove it from the pinned rows
      setPinnedRows((prevPinnedRows) =>
        prevPinnedRows.filter((rowId) => rowId !== row.lead_id)
      );
    } else {
      // If not pinned, add it to the pinned rows
      setPinnedRows((prevPinnedRows) => [...prevPinnedRows, row.lead_id]);
    }

    // Call the API to update the pin status
    try {
      setOpen(true);

      const data = {
        pinned: !isPinned, // Toggle the pin status
        description: row.description || [],
      };

      await LeadServices.updateLeads(row.lead_id, data);
      getleads();
      setOpen(false);
    } catch (error) {
      console.log("error :>> ", error);
      setOpen(false);
    }
  };

  useEffect(() => {
    getleads();
  }, [currentPage, filterSelectedQuery, searchQuery]);

  const getleads = useCallback(async () => {
    try {
      setOpen(true);
      const response = await LeadServices.getAllLeads(
        currentPage,
        "others",
        filterQuery,
        filterSelectedQuery,
        searchQuery
      );
      setLeads(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, [currentPage, filterSelectedQuery, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const PriorityColor = leads.map((row) => {
    let color = "";
    switch (row.priority) {
      case "High":
        color = "#ffcccc";
        break;
      case "Medium":
        color = "#ccccff";
        break;
      case "Low":
        color = "#ffffcc";
        break;
      default:
        color = "#ffffff";
    }
    return { priority: color };
  });

  const TableheadersForExecutive = [
    "COMPANY",
    "NAME",
    "CONTACT",
    "ALTERNATE CONTACT",
    "CITY",
    "STATE",
    "PRIORITY",
    "STAGE",
    "ASSIGNED BY",
    "PIN",
    "ACTION",
  ];
  const Tableheaders = [
    "COMPANY",
    "NAME",
    "CONTACT",
    "ALTERNATE CONTACT",
    "CITY",
    "STATE",
    "PRIORITY",
    "STAGE",
    "ASSIGNED BY",
    "ASSIGNED TO",
    "PIN",
    "ACTION",
  ];
  const handleopenEDCmodal = (data) => {
    setEditforedc(data);
    setOpenEDCModal(true);
  };
  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <Helmet>
        <style>
          {`
            @media print {
              html, body {
                filter: ${isPrinting ? "blur(10px)" : "none"} !important;
              }
            }
          `}
        </style>
      </Helmet>
      <CustomLoader open={open} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Fliter By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="values"
                    label="Fliter By"
                    value={filterQuery}
                    onChange={(event) => FetchData(event.target.value)}
                  >
                    {FilterOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Dynamic Autocomplete Component */}
              {filterQuery && (
                <Grid item xs={12} sm={6} md={3}>
                  {filterQuery &&
                    renderAutocomplete(
                      filterQuery === "assigned_to__email"
                        ? "Assigned To"
                        : filterQuery === "references__source"
                        ? "Reference"
                        : filterQuery === "stage"
                        ? "Stage"
                        : filterQuery === "description__name"
                        ? "Description"
                        : "",
                      filterQuery === "assigned_to__email"
                        ? assigned.map((option) => option.email)
                        : filterQuery === "references__source"
                        ? referenceData.map((option) => option.source)
                        : filterQuery === "stage"
                        ? StageOptions.map((option) => option.value)
                        : filterQuery === "description__name"
                        ? descriptionMenuData.map((option) => option.name)
                        : [],
                      (value) => {
                        setFilterSelectedQuery(value);
                        setCurrentPage(1);
                      }
                    )}
                </Grid>
              )}

              {/* Search Field */}
              <Grid item xs={12} sm={6} md={3}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>

              <Grid item xs={6} sm={3} md={1.5}>
                {(userData.groups.includes("Director") ||
                  userData.groups.includes("Sales Manager")) && (
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                  >
                    Assign Bulk
                  </Button>
                )}
              </Grid>

              <Grid item xs={6} sm={3} md={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setOpenPopup2(true)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "rgb(34, 34, 34)",
                  }}
                >
                  Opened Leads
                </Typography>
              </Grid>
            </Grid>
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
              sx={{ minWidth: 1200 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <StyledTableRow>
                  {(userData.groups.includes("Sales Executive") ||
                  userData.groups.includes("Business Development Executive")
                    ? TableheadersForExecutive
                    : Tableheaders
                  ).map((header) => (
                    <StyledTableCell key={header} align="center">
                      {header}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {leads.map((row, i) => (
                  <StyledTableRow
                    key={row.i}
                    style={{
                      backgroundColor:
                        (PriorityColor[i] && PriorityColor[i].priority) || "",
                      cursor: "pointer", // Add cursor style to indicate it's clickable
                      "&:hover": {
                        backgroundColor: "#f5f5f5", // Add background color on hover
                      },
                      "&.pinned-row": {
                        backgroundColor: "#e0e0e0", // Set your desired background color for pinned rows
                      },
                    }}
                    className={
                      pinnedRows.includes(row.lead_id) ? "pinned-row" : ""
                    }
                  >
                    <StyledTableCell align="center">
                      {row.company}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.alternate_contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.state}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.priority}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.stage}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.assigned_by}
                    </StyledTableCell>
                    {/* Display 'Assigned To' column only for non-executive users */}
                    {!(
                      userData.groups.includes("Sales Executive") ||
                      userData.groups.includes("Business Development Executive")
                    ) && (
                      <StyledTableCell align="center">
                        {row.assigned_name}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      <IconButton
                        onClick={(e) => handlePin(e, row)}
                        style={{ transform: "rotate(45deg)" }}
                      >
                        {row.pinned ? (
                          <PushPinIcon /> // Render this icon if the row is pinned
                        ) : (
                          <PushPinOutlinedIcon /> // Render this icon if the row is not pinned
                        )}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => openInPopup(row)}>View</Button>
                      <Button onClick={() => openInPopup3(row)}>
                        Potential
                      </Button>
                      ,<Button onClick={() => openInPopup4(row)}>PI</Button>{" "}
                      <Button onClick={() => openInPopup5(row)}>
                        Forecast
                      </Button>
                      {(userData.groups.includes("Sales Manager") ||
                        userData.groups.includes("Director")) && (
                        <Button
                          color="secondary"
                          variant="text"
                          onClick={() => handleopenEDCmodal(row)}
                        >
                          Assign EDC
                        </Button>
                      )}
                      {!userData.groups.includes(
                        "Accounts Billing Department"
                      ) && (
                        <Button
                          color="success"
                          onClick={() => handleOpenSRF(row)}
                        >
                          SRF
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>
      <Popup
        fullScreen={true}
        title={"Create Leads"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <CreateLeads
          getleads={getleads}
          setOpenPopup={setOpenPopup2}
          currentPage={currentPage}
          filterQuery={filterQuery}
          filterSelectedQuery={filterSelectedQuery}
          searchQuery={searchQuery}
        />
      </Popup>
      <Popup
        fullScreen={true}
        title={"Update Leads"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateLeads
          leadsByID={leadsByID}
          setOpenPopup={setOpenPopup}
          getAllleadsData={getleads}
          currentPage={currentPage}
          filterQuery={filterQuery}
          filterSelectedQuery={filterSelectedQuery}
          searchQuery={searchQuery}
        />
      </Popup>

      <Popup
        maxWidth={"lg"}
        title={"Create Potential"}
        openPopup={openModalPotential}
        setOpenPopup={setOpenModalPotential}
      >
        <LeadPotentialCreate
          getleads={getleads}
          getLeadByID={null}
          leadsByID={leadsByID}
          setOpenPopup={setOpenModalPotential}
          currentPage={currentPage}
          filterQuery={filterQuery}
          filterSelectedQuery={filterSelectedQuery}
          searchQuery={searchQuery}
        />
      </Popup>
      <Popup
        fullScreen={true}
        title={"Create Leads Proforma Invoice"}
        openPopup={openModalPI}
        setOpenPopup={setOpenModalPI}
      >
        <CreateLeadsProformaInvoice
          leadsByID={leadsByID}
          setOpenPopup={setOpenModalPI}
        />
      </Popup>
      <Popup
        // fullScreen={true}
        title={"Create Lead Forecast"}
        openPopup={openModalForecast}
        setOpenPopup={setOpenModalForecast}
      >
        <LeadForecastCreate
          getleads={getleads}
          leadsByID={leadsByID}
          setOpenPopup={setOpenModalForecast}
          currentPage={currentPage}
          filterQuery={filterQuery}
          filterSelectedQuery={filterSelectedQuery}
          searchQuery={searchQuery}
        />
      </Popup>
      <Popup
        maxWidth={"lg"}
        title={"Assign Bulk Lead to another Employee"}
        openPopup={openModal}
        setOpenPopup={setOpenModal}
      >
        <BulkLeadAssign setOpenPopup={setOpenModal} />
      </Popup>
      <Popup
        maxWidth="lg"
        title={"Assign to Exclusive Distribution Customer"}
        openPopup={openEDCModal}
        setOpenPopup={setOpenEDCModal}
      >
        <CreateEDCByLeads
          setOpenPopup={setOpenEDCModal}
          editforedc={editforedc}
        />
      </Popup>

      <Popup
        maxWidth={"lg"}
        title={"Create Sample Request Form"}
        openPopup={openSRF}
        setOpenPopup={setOpenSRF}
      >
        <CreateSRF
          customerData={leadsByID}
          type="lead"
          setOpenModal={setOpenSRF}
        />
      </Popup>
    </>
  );
};

const StageOptions = [
  // { label: "New", value: "new" },
  { label: "Open", value: "open" },
  { label: "Opportunity", value: "opportunity" },
  { label: "Potential", value: "potential" },
  // { label: "Interested", value: "interested" },
  // { label: "Converted", value: "converted" },
  // { label: "Not Interested", value: "not_interested" },
  // { label: "Close", value: "close" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: "#006BA1",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: 5,
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
  // remove space between rows
  "& > td, & > th": {
    padding: 4,
  },
  // remove margin on left and right sides
  "& > td:first-child, & > th:first-child": {
    paddingLeft: 4,
  },
  "& > td:last-child, & > th:last-child": {
    paddingRight: 4,
  },
  // hover effect
  "&:hover": {
    backgroundColor: "lightgray !important", // Replace with your desired hover color
  },
}));
