import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";

function AddImageBtn({ imageAds, setImageAds, title, id }) {
  const imgGetter = useRef(null);
  // ***upload image***
  const handleUploadClick = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setImageAds(reader.result);
      };
      e.target = null;
    }
  };

  const handleClickPickImg = () => {
    imgGetter.current.click();
  };

  // styles
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

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/ads/${id}.json`
      );
      const changeData = imageAds.filter((item) => {
        return item.id !== id;
      });
      setImageAds(changeData);
    } catch (error) {}
  };

  return (
    <Stack height={"100%"} width={"50%"} margin={0} padding={0}>
      <input
        ref={imgGetter}
        className="hidden"
        type="file"
        onChange={(e) => handleUploadClick(e)}
      />
      <Button onClick={!imageAds ? handleClickPickImg : () => 0} sx={styledBtn}>
        {imageAds ? (
          <Stack width={"100%"} height={"100%"}>
            <img src={imageAds} alt={title} style={styledImg} />
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
              onClick={() => deleteData(id)}
            >
              X
            </Button>
          </Stack>
        ) : (
          <Stack textAlign={"center"}>
            <Typography>Product imageAds</Typography>
            <BsCloudUpload />
          </Stack>
        )}
      </Button>
    </Stack>
  );
}

export default AddImageBtn;
