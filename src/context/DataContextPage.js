import { createContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const DataContext = createContext();
function Provider({ children }) {
  const [rows, setRows] = useState([]);
  // const [row, setRow] = useState({});
  const [open, setOpen] = useState(false);

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
        // rows
        item
      );
      const newData = { ...item, id: response?.data?.name };

      const updateRows = [newData, ...rows];
      setRows(updateRows);
    } catch (error) {
      alert(
        "Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug"
      );
    }
  };
  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://dashboard-first-default-rtdb.firebaseio.com/dashboard/${id}.json`
      );
      const changeData = rows.filter((item) => {
        return item.id !== id;
      });
      setRows(changeData);
    } catch (error) {}
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
      renderCell: ({ id }) => {
        return <Button onClick={() => deleteData(id)}> Delete</Button>;
      },
    },
  ];
  const onClickDelete = (e) => {
    e.stopPropagation();
    // alert("clicked delete");
    deleteData();
  };
  const onClickEdit = (e) => {
    e.stopPropagation();
    alert("clicked");
  };
  const handleOpen = () => setOpen(true);

  const value = {
    fetchData,
    createData,
    rows,
    columns,
    onClickEdit,
    onClickDelete,
    handleOpen,
    open,
    setOpen,
    deleteData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export { DataContext };
export default Provider;

export function dataFormatter(data = {}) {
  const objectToArray = Object.entries(data || {});
  const newData = objectToArray.map((item) => ({
    ...item[1],
    id: item[0],
  }));
  return newData;
}
