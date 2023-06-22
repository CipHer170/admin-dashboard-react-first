import { createContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const DataContext = createContext();
function Provider({ children }) {
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState({});
  // const {id,title,description, price}=
  const fetchData = async () => {
    const response = await axios.get(
      `https://dashboard-first-default-rtdb.firebaseio.com/dashboard.json`
    );
    setRows(dataFormatter(response.data));
  };
  // ****creating data*******
  const createData = async (item) => {
    try {
      const response = await axios.post(
        `https://dashboard-first-default-rtdb.firebaseio.com/dashboard.json`,
        {
          title: "First title",
          description: "hello world",
          price: 100_000_000,
          image: `blob image`,
        }
      );

      setRow([...rows, row]);
    } catch (error) {
      alert(
        "Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug"
      );
    }
  };

  const columns = [
    {
      field: "id",
      numeric: false,
      disablePadding: true,
      width: 50,
    },
    {
      field: "title",
      numeric: false,
      disablePadding: true,
      width: 90,
    },
    {
      field: "description",
      numeric: false,
      disablePadding: true,
      width: 150,
    },
    {
      field: "price",
      numeric: false,
      disablePadding: true,
      width: 100,
    },
    {
      field: "action_edit",
      sortable: false,
      renderCell: (params) => {
        return <Button onClick={onClickEdit}> Edit</Button>;
      },
    },
    {
      field: "action_delete",
      sortable: false,
      renderCell: (params) => {
        return <Button onClick={onClickDelete}> Delete</Button>;
      },
    },
  ];
  const onClickDelete = (e) => {
    e.stopPropagation();
    alert("clicked delete");
  };
  const onClickEdit = (e) => {
    e.stopPropagation();
    alert("clicked");
  };
  const value = {
    fetchData,
    createData,
    rows,
    columns,
    onClickEdit,
    onClickDelete,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export { DataContext };
export default Provider;

export function dataFormatter(data = []) {
  const objectToArray = Object.entries(data);
  const newData = objectToArray.map((item) => ({
    ...item[1],
    id: item[0],
  }));
  return newData;
}
