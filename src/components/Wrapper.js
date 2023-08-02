import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContextPage";
import { Box, Button, Stack } from "@mui/material";
import NewItem from "./NewItem/NewItem";
import TablePage from "./DataGrid/TablePage";
import DashboardMenuPage from "../components/Menu/DashboardMenuPage";

export default function Wrapper({ dataProps }) {
  const { handleOpen, fetchData } = useContext(DataContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      {/* <DashboardMenuPage dataProps={dataProps} /> */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>Products</h2>

          <Button variant="contained" onClick={handleOpen}>
            Add
          </Button>
        </Stack>
        {/* <UploadFile /> */}
        <TablePage />
        {handleOpen && <NewItem {...dataProps} />}
      </Box>
    </div>
  );
}
