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
        // "::-webkit-slider-thumb": "5px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        disableColumnFilter={true}
        disableColumnMenu
        disableColumnSelector
        disa
      />
    </Box>
  );
}

export default TablePage;
