import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Switch,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { CustomLoader } from "../../../Components/CustomLoader";
import InventoryServices from "./../../../services/InventoryService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ChalanView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chalanData, setChalanData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getChalanDetails();
  }, []);

  const getChalanDetails = async () => {
    setIsLoading(true);
    try {
      const response = await InventoryServices.getChalan();

      if (response && response.data.results) {
        setChalanData(response.data.results);
      }
    } catch (err) {
      console.error("Error fetching Chalan data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptClick = async (id) => {
    const data = { is_accepted: true };
    try {
      await InventoryServices.updateChalan(id, data);
      getChalanDetails();
    } catch (err) {
      console.error("Error updating Chalan", err);
    }
  };

  const filteredChalanData = Array.isArray(chalanData)
    ? chalanData.filter(
        (chalan) =>
          chalan.buyer_account &&
          chalan.buyer_account.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <CustomLoader open={isLoading} />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 3, display: "flex", flexDirection: "column" }}>
          <Box marginBottom="10px"></Box>
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
              Job Work Chalan
            </h3>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 400,
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
                  <StyledTableCell align="center">
                    Buyer Account
                  </StyledTableCell>
                  <StyledTableCell align="center">Job Worker</StyledTableCell>
                  <StyledTableCell align="center">Challan No</StyledTableCell>
                  <StyledTableCell align="center">Total Amount</StyledTableCell>
                  <StyledTableCell align="center">
                    Transpotation Cost
                  </StyledTableCell>
                  <StyledTableCell align="center">Accepted</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredChalanData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {row.buyer_account}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.job_worker}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.challan_no}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.total_amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.transpotation_cost}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Switch
                        checked={row.is_accepted}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        color="primary"
                        onClick={() => handleAcceptClick(row.id)}
                      >
                        Accept
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: 0, // Remove padding from header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0, // Remove padding from body cells
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
