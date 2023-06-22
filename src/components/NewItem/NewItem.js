import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContextPage";

function NewItem() {
  const { handleOpen } = useContext(DataContext);
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default NewItem;
