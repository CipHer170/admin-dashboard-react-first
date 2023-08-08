import { createContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { IoIosImages } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReviewImage from "../components/UploadFile/ReviewImage";
const DataContext = createContext();

function Provider({
  children,
  setPrice,
  setTitle,
  setDescription,
  setImage,
  setAmount,
  image,
}) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [userToken, setUserToken] = useState();
  const [isLogIn, setIsLogIn] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const styleBtn = {
    width: "20px",
    height: "20px",
  };

  // *****getting data*****
  const queryParams = `auth=${userToken}`;
  const postUrl = `https://shop-5138f-default-rtdb.firebaseio.com/dashboard.json?${queryParams}`;
  // or add {
  // headers: {
  // method: "GET",
  // headers: { "Content-Type": "application/json" }
  // params: {query:queryParams} =====  `https://shop-5138f-default-rtdb.firebaseio.com/dashboard.json?${queryParams}`
  // },

  const ImageArray = dataFormatter(image);

  const fetchData = async () => {
    setIsLoading(false);
    try {
      const response = await axios.get(postUrl);
      setRows(dataFormatter(response.data));
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(true);
  };
  // ****creating data*******
  const createData = async (item) => {
    try {
      const response = await axios.post(
        postUrl,
        // rows
        item
      );
      const newData = { ...item, id: response?.data?.name };

      const updateRows = [...rows, newData];
      setRows(updateRows);
    } catch (error) {
      alert("Bug Bug Bug Bug");
    }
  };

  // ******delete data**********
  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://shop-5138f-default-rtdb.firebaseio.com/dashboard/${id}.json?${queryParams}`
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
        `https://shop-5138f-default-rtdb.firebaseio.com/dashboard/${id}.json?${queryParams}`,
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
    } catch (error) {}
  };
  // ***** edit button *****
  const editData = (oldItem = {}) => {
    const {
      title = "",
      price = "",
      description = "",
      id = "",
      image = "",
      amount = "",
    } = oldItem || {};
    setTitle(title);
    setPrice(price);
    setDescription(description);
    setOpen(true);
    setEdit(id);
    setImage(image);
    setAmount(amount);
  };

  const [showModal, setShowModal] = useState(false);

  const reviewImage = () => {
    setShowModal(true);
  };

  // *****columns*****
  const columns = [
    {
      field: "№",
      width: 40,
      renderCell: ({ id }) => {
        return rows.findIndex((el) => el.id === id) + 1;
      },
    },
    {
      field: "title",
      width: 200,
    },
    {
      field: "description",
      width: 200,
    },
    {
      field: "price",
      width: 100,
    },
    {
      field: "image",
      width: 150,
      renderCell: ({ value = "" } = {}) => {
        return value === "" ? (
          <IoIosImages style={styleBtn} />
        ) : (
          <ReviewImage setAmount={setAmount} image={value} />
        );
      },
    },
    {
      sortable: false,
      field: "amount",
      type: "number",
      width: 100,
    },
    {
      sortable: false,
      field: "Edit",
      renderCell: ({ row: oldItem }) => {
        return (
          <Button onClick={() => editData(oldItem)}>
            <FaRegEdit style={styleBtn} />
          </Button>
        );
      },
    },
    {
      field: "Delete",
      sortable: false,
      renderCell: ({ id }) => {
        return (
          <Button onClick={() => deleteData(id)}>
            {" "}
            <RiDeleteBin6Line style={styleBtn} />
          </Button>
        );
      },
    },
  ];

  // login Form
  const handleOpen = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setAmount("");
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
    userToken,
    setUserToken,
    isLogIn,
    setIsLogIn,
    isLoading,
    ImageArray,
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
