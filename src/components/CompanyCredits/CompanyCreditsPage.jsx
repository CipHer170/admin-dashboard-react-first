import React, { useContext, useState } from "react";
import CompanyCredits from "./CompanyCredits";
import "./CompanyCredits.scss";
import { Button } from "@mui/material";
import { DataContext } from "../../context/DataContextPage";
import logo from "../../assets/img/bkg_img.svg";
function CompanyCreditsPage() {
  const { open, setOpen } = useContext(DataContext);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div className="company">
      <Button onClick={handleClose}>Add Company</Button>
      {/* <div className="company__credits">
        <div className="company__credits_title">
          <h2>Company name:</h2>
          <h2>Company Adress:</h2>
        </div>
        <div className="company__credits_custom">
          <pre>Fully</pre>
          <pre>Earth</pre>
        </div>
        <img src={logo} alt="company_logo" />
      </div> */}

      <div>{open ? "company credits" : <CompanyCredits />}</div>
    </div>
  );
}

export default CompanyCreditsPage;
