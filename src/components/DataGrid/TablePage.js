import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/DataContextPage";

function TablePage() {
  const { rows, columns } = useContext(DataContext);
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        pageSizeOptions={[5, 10]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}

export default TablePage;
