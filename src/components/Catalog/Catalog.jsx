import React, { useContext, useEffect, useRef, useState } from "react";
import "./Catalog.css";
import { Button, Stack, Typography } from "@mui/material";
import { BsCloudUpload } from "react-icons/bs";
import { DataContext } from "../../context/DataContextPage";
import axios from "axios";
import AddImageBtn from "./AddImageBtn";
import { dataFormatter } from "../../context/DataContextPage";
function Catalog({ title, image, setImage }) {
  const { setOpen, edit, queryParams } = useContext(DataContext);
  const handleClose = () => setOpen(false);
  const [num, setNum] = useState(true);
  const [imageAds, setImageAds] = useState();

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

  const handleAddNewItem = (e) => {
    e.preventDefault();
    const newAddImage = { imageAds };
    createAdd(newAddImage);
  };

  const fetchAddImage = async () => {
    try {
      const response = await axios.get(
        `https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/ads.json`
      );
      setImageAds(dataFormatter(response.data));
    } catch (error) {
      console.warn(error);
    }
  };
  const createAdd = async (items) => {
    try {
      const response = await axios.post(
        `https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/ads.json`,
        // rows
        items
      );
      const newAdd = { ...items, id: response?.data?.name };
      const updatedAdd = [...imageAds, newAdd];
      setImageAds(updatedAdd);
    } catch (error) {
      alert("Bug Bug Bug Bug");
    }
  };

  useEffect(() => {
    fetchAddImage();
  }, []);
  console.log(imageAds, "img adds", "id=>", imageAds);
  return (
    <div className="catalog">
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        height={"150px"}
        alignItems={"end"}
      >
        {/* image button/image */}
        <AddImageBtn imageAds={imageAds} setImageAds={setImageAds} />

        {/* save/update btn */}
        <Stack sx={{ height: "40px", display: "flex", flexDirection: "row" }}>
          <Button variant="contained" onClick={handleAddNewItem}>
            {edit !== null ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
      <div className="preview__ads">
        <img src={imageAds} alt="" />
      </div>
    </div>
  );
}

export default Catalog;
