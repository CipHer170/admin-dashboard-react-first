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
        pageSize={5}
        editMode={true}
        checkboxSelection
        disableSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default TablePage;
