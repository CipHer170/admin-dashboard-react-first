import { createContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const DataContext = createContext();

function Provider({ children, setPrice, setTitle, setDescription, setImage }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

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

      const updateRows = [...rows, newData];
      setRows(updateRows);
    } catch (error) {
      alert(
        "Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug Bug"
      );
    }
  };
  // ******delete data**********
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
  // ***** update button****
  const updateData = async (id, newItem) => {
    try {
      await axios.put(
        `https://dashboard-first-default-rtdb.firebaseio.com/dashboard/${id}.json`,
        newItem
      );
      const newData = { ...newItem, id };
      const updateData = rows.map((item) => {
        if (item.id === id) {
          return newData;
        }
        return item;
      });
      setRows(updateData);
    } catch (error) {
      console.log(error);
    }
  };
  // ***** edit button *****
  const editData = (oldItem = {}) => {
    const { title = "", price = "", description = "", id = "" } = oldItem || {};
    setTitle(title);
    setPrice(price);
    setDescription(description);
    setOpen(true);
    setEdit(id);
  };
  // *****columns*****
  const columns = [
    {
      field: "№",
      type: "number",
      width: 150,
      renderCell: ({ id }) => {
        return rows.findIndex((el) => el.id === id) + 1;
      },
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
      field: "image",
      numeric: false,
      disablePadding: true,
      width: 100,
    },

    {
      field: "amount",
      numeric: true,
      // disablePadding: true,
      type: "number",
      width: 100,
      editable: true,
    },

    {
      field: "action_edit",
      sortable: false,
      renderCell: ({ row: oldItem }) => {
        return <Button onClick={() => editData(oldItem)}> Edit</Button>;
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

  const handleOpen = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setEdit(null);
    setOpen(true);
  };

  const value = {
    fetchData,
    createData,
    rows,
    columns,
    edit,
    setEdit,
    editData,
    handleOpen,
    open,
    setOpen,
    deleteData,
    updateData,
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
