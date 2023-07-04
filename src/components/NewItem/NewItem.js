import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { dataFormatter } from "../../context/DataContextPage";
import UploadFile from "../UploadFile/UploafFile";

function NewItem({
  price,
  description,
  title,
  setPrice,
  setTitle,
  setDescription,
  image,
  setImage,
  amount,
  setAmount,
}) {
  const images = dataFormatter(image);
  const imgGetter = useRef(null);
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

  const handleAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };
  // ***upload image***
  const handleUploadClick = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setImage(reader.result);
      };
      e.target = null;
    }
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  // ***add new item***
  const handleAddNewItem = (event) => {
    event.preventDefault();
    const newProduct = { title, description, price, image, amount };
    if (title.trim().length > 0 && price >= 1 && amount >= 1) {
      if (rows !== "") {
        if (edit !== null) {
          updateData(edit, newProduct);
        } else {
          createData(newProduct);
        }
      }
    } else {
      alert("check all fileds");
    }

    setOpen(false);
  };

  const handleClickPickImg = () => {
    imgGetter.current.click();
    console.log(image);
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
          {/***************** u r here adding exit button */}
          <Button
            onClick={setOpen(false)}
            style={{ position: "absolute", right: "50px", top: "10px" }}
          >
            <AiOutlineClose />
          </Button>
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
              <Stack>
                <Typography>
                  <label>Amount</label>
                </Typography>
                <TextField
                  // multiline={true}
                  // minRows={5}
                  type="text"
                  value={amount}
                  onChange={handleAmount}
                />
              </Stack>
            </Stack>
            <Stack direction="row">
              <input
                ref={imgGetter}
                className="hidden"
                type="file"
                onChange={(e) => handleUploadClick(e)}
              />
              <Button onClick={handleClickPickImg}>
                {edit && image !== "" ? (
                  <img
                    src={image}
                    alt={title}
                    width={"200px"}
                    height={"200px"}
                  />
                ) : (
                  <BsCloudUpload />
                )}
              </Button>
              {/* <img src={rows?.image} /> */}
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
