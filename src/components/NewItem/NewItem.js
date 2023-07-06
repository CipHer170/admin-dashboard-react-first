import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

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
  const imgGetter = useRef(null);
  const { rows, open, setOpen, createData, edit, updateData } =
    useContext(DataContext);
  const handleClose = () => setOpen(false);
  const [clickImgBtn, setClickImgBtn] = useState(false);
  const [num, setNum] = useState(true);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "65%",
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

    if (num && title.trim().length > 0 && price >= 1 && amount >= 1) {
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
  };
  // const showImg =

  // *** styled btn***
  const styledBtn = {
    width: "inherit",
    height: "inherit",
    padding: "0",
    position: "relative",
  };
  const styledImg = {
    paddingLeft: "10px",
    maxWidth: "100%",
  };
  return (
    <Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalPage">
          {/***************** u r here adding exit button */}
          <Button
            onClick={() => {
              edit ? setOpen(false) : setOpen(!false);
              return;
            }}
            style={{ position: "absolute", right: "5%", top: "1%" }}
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
              {/* *** price amount */}
              <Stack flexDirection={"row"} justifyContent={"space-evenly"}>
                <Stack width={"50%"}>
                  <Typography>
                    <label>Price</label>
                  </Typography>
                  <TextField
                    type="text"
                    value={price}
                    onChange={handleChangePrice}
                    required
                  />
                </Stack>

                <Stack width={"50%"}>
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

              {/* *** image button */}
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                height={"150px"}
                alignItems={"end"}
                // sx={{ backgroundColor: "blue" }}
              >
                <Stack height={"100%"} width={"50%"} margin={0} padding={0}>
                  <input
                    ref={imgGetter}
                    className="hidden"
                    type="file"
                    onChange={(e) => handleUploadClick(e)}
                  />
                  <Button
                    onClick={!image ? handleClickPickImg : () => 0}
                    sx={styledBtn}
                  >
                    {image ? (
                      <Stack>
                        <img src={image} alt={title} style={styledImg} />
                        {/* **** u r here 6.07.2023  button to delete image*/}
                        <Button
                          sx={{
                            position: "absolute",
                            right: "0",
                            backgroundColor: "#3333",
                            borderRadius: "50px",
                            minWidth: "20%",
                            minHeight: "20%",
                          }}
                        >
                          X
                        </Button>
                      </Stack>
                    ) : (
                      <Stack textAlign={"center"}>
                        <Typography>Product image</Typography>
                        <BsCloudUpload marginLeft={"10px"} />
                      </Stack>
                    )}
                  </Button>
                </Stack>
                <Stack
                  sx={{ height: "40px", display: "flex", flexDirection: "row" }}
                >
                  <Button variant="contained" onClick={handleAddNewItem}>
                    {edit !== null ? "Update" : "Save"}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default NewItem;
