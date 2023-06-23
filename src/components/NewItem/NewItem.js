import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { BsCloudUpload } from "react-icons/bs";

function NewItem() {
  const { rows, open, setOpen, createData } = useContext(DataContext);
  const handleClose = () => setOpen(false);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [num, setNum] = useState(true);
  const data = (title, description, price, image);
  // const { title, description, price } = rows;
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    minHeight: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // const handlePrice = (e) => {
  //   const res = e.target.value.replace(/\D/g, "");
  // };

  function isNumber(str) {
    if (str.trim() === "") {
      return false;
    }
    return !isNaN(str);
  }

  const handleChangePrice = (event) => {
    event.preventDefault();
    setPrice(event.target.value);
    if (isNumber(event.target.value)) {
      setNum(true);
    } else {
      setNum(false);
    }
  };
  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleAddNewItem = (event) => {
    event.preventDefault();

    if (num && event !== "") {
      const newProduct = { title, description, price, image };
      if (rows !== "") {
        createData(newProduct);
      }
    } else {
      alert("check price");
    }
  };
  return (
    <Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant={"h2"}>Add new item</Typography>
          <Stack gap="20px">
            <Stack gap={1} className="edit-container">
              <Typography>
                <label> Title</label>
              </Typography>
              <Stack>
                <TextField
                  type="text"
                  required
                  value={title}
                  onChange={handleTitle}
                />
              </Stack>
              <Typography>
                <label>Description</label>
              </Typography>
              <Stack>
                <TextField
                  multiline={true}
                  minRows={5}
                  type="text"
                  value={description}
                  onChange={handleDescription}
                />
              </Stack>
              <Typography>
                <label>Price</label>
              </Typography>
              <Stack>
                <TextField
                  type="text"
                  value={price}
                  onChange={handleChangePrice}
                  required
                />
              </Stack>
            </Stack>
            <Stack direction="row">
              <Button>
                <BsCloudUpload />
              </Button>

              <Button variant="contained" onClick={handleAddNewItem}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default NewItem;

// {/* <Stack
// sx={style}
// direction={"column"}
// justifyContent={"space-between"}
// alignItems={"center"}
// >
// <Stack
//   direction={"column"}
//   alignItems={"space-between"}
//   justifyContent={"space-between"}
// >
//   <TextField
//     required
//     id="outlined-required"
//     label="Title"
//     defaultValue="Title"
//     fullWidth
//   />
//   <TextField
//     required
//     id="outlined-required"
//     label="Description"
//     defaultValue="Description"
//     fullWidth
//   />
//   <TextField
//     id="outlined-password-input"
//     label="price"
//     // type="password"
//     autoComplete="price"
//   />

//   {/* <TextField id="outlined-search" label="Search field" type="search" />
// <TextField
// id="outlined-helperText"
// label="Helper text"
// defaultValue="Default Value"
// helperText="Some important text"
// />
// </Stack>
// <Stack direction={"row"} justifyContent={"space-between"}>
//   <Button variant="outlined">
//     <BsCloudUpload />
//   </Button>
//   <Button>Save</Button>
// </Stack>
// </Stack> */}
