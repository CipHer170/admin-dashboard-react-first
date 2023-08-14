import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContextPage";
import { Button, Stack } from "@mui/material";
import NewItem from "./NewItem/NewItem";
import TablePage from "./DataGrid/TablePage";
import IsLoading from "../context/IsLoading";

export default function Wrapper({ dataProps }) {
  const { handleOpen, fetchData, isLoading } = useContext(DataContext);
  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoading) {
    return <IsLoading />;
  }

  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      <Stack className="App__header">
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
