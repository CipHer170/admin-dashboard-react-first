import { useContext, useEffect, useState } from "react";
import TablePage from "./components/DataGrid/TablePage";
import { DataContext } from "./context/DataContextPage";
import { Button, Stack } from "@mui/material";
import NewItem from "./components/NewItem/NewItem";
function App() {
  const { handleOpen } = useContext(DataContext);
  const { fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* ******ADD MENU ********** */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>Table</h2>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Stack>
      <TablePage />
      {/* <button onClick={createData}>click</button> */}

      {handleOpen && <NewItem />}
    </div>
  );
}

export default App;

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// const createDataRow = (id, title, description, price) => {
//   return {
//     id,
//     title,
//     description,
//     price,
//   };
// };
