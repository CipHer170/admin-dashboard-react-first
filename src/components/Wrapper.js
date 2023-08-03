import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContextPage";
import { Button, Stack } from "@mui/material";
import NewItem from "./NewItem/NewItem";
import TablePage from "./DataGrid/TablePage";

export default function Wrapper({ dataProps }) {
  const { handleOpen, fetchData } = useContext(DataContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>Products</h2>

        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Stack>
      {/* <UploadFile /> */}
      {handleOpen && <NewItem {...dataProps} />}
      <TablePage />
    </div>
  );
}
