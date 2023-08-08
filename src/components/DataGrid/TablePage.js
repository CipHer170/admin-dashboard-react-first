import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/DataContextPage";
import "../../App.scss";
import { Box } from "@mui/material";

function TablePage() {
  const { rows, columns } = useContext(DataContext);

  const widthForUserTable = window.screen.availWidth - 500;
  console.log(widthForUserTable);

  return (
    <Box
      sx={{
        width: widthForUserTable,
        alignContent: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter={true}
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default TablePage;
