import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
export const DailySaleReviewView = () => {
  const theme = useTheme();

  // Helper function to create a row of data
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  // This data array could be dynamic, fetched from an API, for instance
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    // ...more rows
  ];

  return (
    <>
      <div style={styles.container}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 0.9 }}>
            {/* <CustomSearch
              filterSelectedQuery={searchQuery}
              handleInputChange={handleInputChange}
              getResetData={() => setSearchQuery("")}
            /> */}
          </div>
          <div style={{ flexGrow: 2 }}>
            <h3 style={styles.header}>Daily Sale Review</h3>
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 440, // Ensures that there's a scrolling area
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
          <Table sx={{ minWidth: 1200 }} stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: theme.palette.common.black }}>
              <TableRow>
                <StyledTableCell sx={{ color: theme.palette.common.white }}>
                  Dessert (100g serving)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.common.white }}
                  align="center"
                >
                  Calories
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.common.white }}
                  align="center"
                >
                  Fat&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.common.white }}
                  align="center"
                >
                  Carbs&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.common.white }}
                  align="center"
                >
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.fat}</StyledTableCell>
                  <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.protein}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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

const styles = {
  container: {
    padding: "16px",
    margin: "16px",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255)",
  },
  header: {
    textAlign: "left",
    marginBottom: "1em",
    fontSize: "24px",
    color: "rgb(34, 34, 34)",
    fontWeight: 800,
  },
};
