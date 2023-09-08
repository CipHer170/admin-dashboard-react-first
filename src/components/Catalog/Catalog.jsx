import React, { useContext, useRef, useState } from "react";
import "./Catalog.css";
import { Button, Stack, Typography } from "@mui/material";
import { BsCloudUpload } from "react-icons/bs";
import { DataContext } from "../../context/DataContextPage";
import axios from "axios";

function Catalog({
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
  const {
    rows,
    open,
    setOpen,
    createData,
    edit,
    updateData,
    deleteData,
    queryParams,
  } = useContext(DataContext);
  const handleClose = () => setOpen(false);
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
      setOpen(false);
    } else {
      alert("check all fileds");
    }
  };

  const handleClickPickImg = () => {
    imgGetter.current.click();
  };
  // const showImg =
  const handleDeleteImage = (e, id) => {
    deleteData(e);
  };
  // *** styled btn***
  const styledBtn = {
    width: "inherit",
    height: "inherit",
    padding: "0",
    position: "relative",
  };
  const styledImg = {
    paddingLeft: "10px",
    width: "100%",
    height: "100%",
  };

  const postUrl = `https://shop-5138f-default-rtdb.firebaseio.com/ads.json?${queryParams}`;
  const addAds = async () => {
    const res = await axios.post(postUrl);
  };

  return (
    <div className="catalog">
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        height={"150px"}
        alignItems={"end"}
      >
        {/* image button/image */}
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
              <Stack width={"100%"} height={"100%"}>
                <img src={image} alt={title} style={styledImg} />
                {/* **** u r here 6.07.2023  button to delete image*/}
                <Button
                  sx={{
                    position: "absolute",
                    right: "0",
                    // backgroundColor: "#3333",
                    borderRadius: "50px",
                    minWidth: "20%",
                    minHeight: "20%",
                  }}
                  onClick={() => setImage("")}
                >
                  X
                </Button>
              </Stack>
            ) : (
              <Stack textAlign={"center"}>
                <Typography>Product image</Typography>
                <BsCloudUpload />
              </Stack>
            )}
          </Button>
        </Stack>

        {/* save/update btn */}
        <Stack sx={{ height: "40px", display: "flex", flexDirection: "row" }}>
          <Button variant="contained" onClick={handleAddNewItem}>
            {edit !== null ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
      <div className="preview__ads">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Catalog;
