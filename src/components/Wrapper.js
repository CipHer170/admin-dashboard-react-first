import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContextPage";
import { Button, Stack } from "@mui/material";
import NewItem from "./NewItem/NewItem";
import TablePage from "./DataGrid/TablePage";
import { useNavigate } from "react-router-dom";

export default function Wrapper({ dataProps }) {
  const { handleOpen, fetchData } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>Table</h2>

        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
        <Button onClick={handleLogOut}>LogOut</Button>
      </Stack>
      {/* <UploadFile /> */}
      <TablePage />
      {handleOpen && <NewItem {...dataProps} />}
    </div>
  );
}
