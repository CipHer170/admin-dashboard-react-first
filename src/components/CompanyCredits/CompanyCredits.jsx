import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { AiOutlineClose } from "react-icons/ai";
import { CompanyContext } from "../../context/CompanyContextPage";

function CompanyCredits() {
  const { open, setOpen } = useContext(DataContext);
  const { companyName, createCompany } = useContext(CompanyContext);
  const handleClose = () => setOpen(false);

  // style
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
    createCompany(e.target.value);
  };
  // functions

  return (
    <Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalPage">
          <Stack gap={1} className="edit-container">
            {/* company name */}
            <Typography>
              <label> Company name</label>
            </Typography>
            <TextField
              type="text"
              required
              value={companyName}
              onChange={handleCompanyName}
            />
            {/* save btn */}
            <Button
              variant="contained"
              // onClick={handleAddNewCompany}
            >
              save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default CompanyCredits;
