import React, { memo } from "react";
import { Pagination, TableFooter } from "@mui/material";

export const CustomPagination = memo(
  ({ pageCount, currentPage, handlePageClick }) => {
    return (
      <TableFooter
        sx={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
      >
        <Pagination
          count={pageCount}
          page={currentPage + 1} // Adjust for 1-based index
          onChange={(event, page) => handlePageClick(event, page - 1)} // Convert back to 0-based index
          color="primary"
          variant="outlined"
          shape="circular"
        />
      </TableFooter>
    );
  }
);
