import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  Button,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { CustomLoader } from "../../../Components/CustomLoader";
import MasterService from "../../../services/MasterService";
import { Popup } from "../../../Components/Popup";
import UpdateTransportRef from "./UpdateTransportRef";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const statusColor = (status) => {
  if (status === "Open") return { background: "#fff8e1", color: "#f57f17" };
  if (status === "Closed") return { background: "#e6f4ea", color: "#2e7d32" };
  if (status === "Rejected") return { background: "#fdecea", color: "#c62828" };
  if (status === "In Progress")
    return { background: "#e3f2fd", color: "#1565c0" };
  return { background: "#f0f0f0", color: "#333" };
};

// backend "2026-07-28 17:31:19" ya ISO "2026-07-28T17:31:19.249097+05:30"
// dono format aa sakte hain, dono ko readable bana dega
const formatDateTime = (value) => {
  if (!value) {
    return "-";
  }
  const dateObj = new Date(value.includes ? value.replace(" ", "T") : value);
  if (isNaN(dateObj.getTime())) {
    return value;
  }
  return dateObj.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ViewTransportRef = () => {
  const [transportRefData, setTransportRefData] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [recordData, setRecordData] = useState(null);

  const getTransportRefData = useCallback(async () => {
    try {
      setOpen(true);
      const response = await MasterService.getTransportRefData(page, search);
      setTransportRefData(
        response.data && response.data.results ? response.data.results : [],
      );
      setCount(response.data && response.data.count ? response.data.count : 0);
      setHasNext(response.data && response.data.next ? true : false);
      setHasPrevious(response.data && response.data.previous ? true : false);
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
  }, [page, search]);

  useEffect(() => {
    getTransportRefData();
  }, [getTransportRefData]);

  const handleSearchClick = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleEidtClick = (row) => {
    setOpenEditPopup(true);
    setRecordData(row);
  };

  return (
    <>
      <CustomLoader open={open} />
      <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
        <Box sx={{ marginBottom: 2 }}>
          <h3
            style={{
              fontSize: "24px",
              color: "rgb(34, 34, 34)",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            Transporter Mapping Request
          </h3>
        </Box>

        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
        </Box>

        <TableContainer
          sx={{
            maxHeight: 440,
            "&::-webkit-scrollbar": { width: 15 },
            "&::-webkit-scrollbar-track": { backgroundColor: "#f2f2f2" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#aaa9ac" },
          }}
        >
          <Table
            sx={{ minWidth: 1200 }}
            stickyHeader
            aria-label="transporter mapping request table"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Requested By</StyledTableCell>
                <StyledTableCell align="center">Company</StyledTableCell>
                <StyledTableCell align="center">Unit</StyledTableCell>
                <StyledTableCell align="center">PI Number</StyledTableCell>
                <StyledTableCell align="center">Pincode (Text)</StyledTableCell>
                <StyledTableCell align="center">
                  Canonical Pincode
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Remarks</StyledTableCell>
                <StyledTableCell align="center">Closed At</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {transportRefData && transportRefData.length > 0 ? (
                transportRefData.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      {formatDateTime(row.created_at)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.requested_by}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.company}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.unit}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pi_number}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pincode_text}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.canonical_pincode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          ...statusColor(row.status),
                          fontWeight: 600,
                          fontSize: "11px",
                          borderRadius: "6px",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.remarks ? row.remarks : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.closed_at ? formatDateTime(row.closed_at) : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => handleEidtClick(row)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    align="center"
                    sx={{ color: "#999", py: 4 }}
                  >
                    No transporter mapping requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Popup
          title={"Update Transport Master Request"}
          openPopup={openEditPopup}
          setOpenPopup={setOpenEditPopup}
        >
          <UpdateTransportRef
            dataForEdit={recordData}
            setOpenEditPopup={setOpenEditPopup}
            getTransportRefData={getTransportRefData}
          />
        </Popup>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
            Total records: {count}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              disabled={hasPrevious ? false : true}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              size="small"
              variant="outlined"
              disabled={hasNext ? false : true}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ViewTransportRef;
