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

function NewItem({
  price,
  description,
  title,
  setPrice,
  setTitle,
  setDescription,
  image,
  setImage,
}) {
  const { rows, open, setOpen, createData, edit, updateData } =
    useContext(DataContext);
  const handleClose = () => setOpen(false);

  const [num, setNum] = useState(true);

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
        if (edit !== null) {
          updateData(edit, newProduct);
        } else {
          createData(newProduct);
        }
      }
    } else {
      alert("check price");
    }

    setOpen(false);
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
          <Typography variant={"h2"}>
            {edit !== null ? "Edit element" : "Add new item"}
          </Typography>
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
                Upload file
              </Button>

              <Button variant="contained" onClick={handleAddNewItem}>
                {edit !== null ? "Update" : "Save"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default NewItem;
