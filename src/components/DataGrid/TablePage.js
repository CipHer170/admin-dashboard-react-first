import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/DataContextPage";

function TablePage() {
  const { rows, columns } = useContext(DataContext);
  
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        initialState={{
          pagination: {
            paginationModel: { page: 5, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
      />
    </>
  );
}

export default TablePage;
