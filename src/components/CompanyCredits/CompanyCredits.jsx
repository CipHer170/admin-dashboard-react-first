import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BsCloudUpload } from "react-icons/bs";

function CompanyCredits() {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [addCompanyCredits, setCompanyCredits] = useState(false);
  const companyData = {
    companyName,
    setCompanyName,
    companyLogo,
    setCompanyLogo,
    companyAddress,
    setCompanyAddress,
    addCompanyCredits,
    setCompanyCredits,
  };
  const imgGetter = useRef(null);

  const handleNewCompanyCredits = () => {
    setCompanyCredits(!addCompanyCredits);
  };

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
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleCompanyInfo = (e) => {
    setCompanyInfo(e.target.value);
  };
  const handleCompanyAddress = (e) => {
    setCompanyAddress(e.target.value);
  };
  //   const handleAddNewCompany = (e) => {
  //     e.preventDefault();
  //   };

  const handleClickPickImg = () => {
    imgGetter.current.click();
  };
  const handleUploadClick = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setCompanyLogo(reader.result);
      };
      e.target = null;
    }
  };
  return (
    <div>
      <Button onClick={handleNewCompanyCredits}>Add Company</Button>
      {addCompanyCredits ? (
        <div className="addCompanyCredits">
          <Stack>
            <Modal
              open={addCompanyCredits}
              onClose={handleNewCompanyCredits}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="modalPage">
                <Stack>
                  <Stack>
                    {/* company name */}
                    <Typography>
                      <label htmlFor="">Company Name</label>
                    </Typography>
                    <TextField
                      type="text"
                      required
                      value={companyName}
                      onChange={handleCompanyName}
                    />

                    {/* company stack */}
                    <Typography>
                      <label htmlFor="">Company Stack</label>
                    </Typography>
                    <TextField
                      type="text"
                      required
                      value={companyInfo}
                      onChange={handleCompanyInfo}
                    />

                    {/* company address */}
                    <Typography>
                      <label htmlFor="">Company Address</label>
                    </Typography>
                    <TextField
                      type="text"
                      required
                      value={companyInfo}
                      onChange={handleCompanyAddress}
                    />

                    {/* company logo */}
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      height={"150px"}
                      alignItems={"end"}
                    >
                      {/* image button/image */}
                      <Stack
                        height={"100%"}
                        width={"50%"}
                        margin={0}
                        padding={0}
                      >
                        <input
                          ref={imgGetter}
                          className="hidden"
                          type="file"
                          onChange={(e) => handleUploadClick(e)}
                        />
                        <Button
                          onClick={!companyLogo ? handleClickPickImg : () => 0}
                          sx={styledBtn}
                        >
                          {companyLogo ? (
                            <Stack width={"100%"} height={"100%"}>
                              <img
                                src={companyLogo}
                                alt={companyName}
                                style={styledImg}
                              />
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
                                onClick={() => setCompanyLogo("")}
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
                      <Stack
                        sx={{
                          height: "40px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleNewCompanyCredits}
                        >
                          save
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </div>
      ) : (
        <div>Bye</div>
      )}
    </div>
  );
}

export default CompanyCredits;
