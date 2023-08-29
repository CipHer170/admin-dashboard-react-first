import React from "react";
import { useState } from "react";
import "./CompanyCredits.scss";
import logo from "../../assets/img/bkg_img.svg";
import { Button } from "@mui/material";
import CompanyCredits from "./CompanyCredits";

function CompanyCreditsPage() {
  const [compName, setCompName] = useState("CompName");
  const [compInfo, setCompInfo] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis tempore nostrum recusandae expedita eius repellat itaque nulla, voluptatum architecto?"
  );
  const [data, setData] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const transferringData = {
    compName,
    setCompName,
    compInfo,
    setCompInfo,
    showModal,
    setShowModal,
  };

  return (
    <div>
      {showModal ? (
        <Button onClick={() => setShowModal(!showModal)}>Add</Button>
      ) : (
        <CompanyCredits transferringData={transferringData} />
      )}

      {data ? (
        <div className="compName">
          <div className="compName__container">
            <h2>name</h2>
            <pre className="compName__name_data">{compName}</pre>
            <h2>info</h2>
            <pre className="compName__info_data">{compInfo}</pre>
            <Button onClick={() => setShowModal(!showModal)}>exit</Button>
          </div>

          <img src={logo} alt="" className="compName__img" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CompanyCreditsPage;
