import { Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useState } from "react";

const PaginationComponent = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
    onPageChange(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            style={{
              borderRadius: "6px",
              backgroundColor: item.selected ? "#24243e" : "transparent", // Change #yourSelectedColor to the color you want for the selected page
              color: item.selected ? "White" : "black",
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationComponent;
