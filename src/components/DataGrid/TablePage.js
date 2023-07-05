import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/DataContextPage";

function TablePage() {
  const { rows, columns } = useContext(DataContext);
  return (
    <div>
      {" "}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        checkboxSelection
        disableSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[10, 15]}
      />
    </div>
  );
}

export default TablePage;
