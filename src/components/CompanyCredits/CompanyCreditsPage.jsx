import React, { useEffect } from "react";
import { useState } from "react";
import "./CompanyCredits.scss";
import { Button } from "@mui/material";
import CompanyCredits from "./CompanyCredits";
import axios from "axios";
import { dataFormatter } from "../../context/DataContextPage";
import noImage from "../../assets/img/no_image.jpg";
import { FaRegEdit } from "react-icons/fa";
import NewItem from "../NewItem/NewItem";

function CompanyCreditsPage() {
  const [compName, setCompName] = useState();
  const [compInfo, setCompInfo] = useState();
  const [compLogo, setCompLogo] = useState();
  const [company, setCompany] = useState([]);

  const [data, setData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const transferringData = {
    compName,
    setCompName,
    compInfo,
    setCompInfo,
    showModal,
    setShowModal,
    company,
    setCompany,
    compLogo,
    setCompLogo,
  };
  useEffect(() => {
    getCompany();
  }, []);
  const getCompany = async () => {
    try {
      const res = await axios.get(
        "https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/company.json"
      );
      setCompany(dataFormatter(res.data));
    } catch (error) {
      console.warn(error);
    }
  };

  const editName = async (newCompName, id) => {
    await axios.put(
      `https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/company/${id}.json`,
      newCompName
    );
    const newData = { ...newCompName, id };
    const updateData = compName.map((item) => {
      if (item.id === id) {
        return newData;
      }
      return item;
    });
    setCompName(updateData);
  };

  const handleEditName = (e) => {
    e.preventDefault();
    const newProduct = { compInfo, compName, compLogo };
    editName(newProduct);
  };
  return (
    <div>
      {showModal ? (
        <CompanyCredits {...transferringData} />
      ) : (
        <h1>Company Details</h1>
      )}

      {company.length > 0 ? (
        <div className="compName">
          <div className="compName__container">
            <h3>Company name</h3>

            <pre className="compName__name_data hide_btn">
              {company[0].compName}{" "}
              <FaRegEdit className="edit_btn" onClick={handleEditName} />
            </pre>
            <h3>Company info</h3>
            <pre className="compName__info_data hide_btn">
              {company[0].compInfo}{" "}
              <FaRegEdit className="edit_btn" onClick={handleEditName} />
            </pre>
          </div>
          <img
            src={company[0].compLogo ? company[0].compLogo : noImage}
            alt="company__logo"
            className="compName__logo"
          />
        </div>
      ) : (
        <Button onClick={() => setShowModal(!showModal)}>Add Company</Button>
      )}
    </div>
  );
}

export default CompanyCreditsPage;
