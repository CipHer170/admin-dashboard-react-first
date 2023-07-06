import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContextPage";
import { Button, Stack } from "@mui/material";
import NewItem from "./NewItem/NewItem";
import TablePage from "./DataGrid/TablePage";

export default function Wrapper({ dataProps }) {
  const { handleOpen } = useContext(DataContext);

  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>Table</h2>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Stack>
      {/* <UploadFile /> */}
      <TablePage />
      {handleOpen && <NewItem {...dataProps} />}
    </div>
  );
}
