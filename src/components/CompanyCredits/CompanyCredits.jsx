import axios from "axios";
import "./CompanyCredits.scss";
import { Button } from "@mui/material";
import { useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
function CompanyCredits({
  compName = "",
  setCompName,
  compInfo = "",
  setCompInfo,
  showModal,
  setShowModal,
  company,
  setCompany,
  compLogo,
  setCompLogo,
}) {
  const imgGetter = useRef(null);

  const createCompany = async (item) => {
    try {
      const res = await axios.post(
        "https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/company.json",
        item
      );
      setCompany(res);
    } catch (err) {
      console.log("company create", err);
    }
  };

  const handleNewCompany = (e) => {
    e.preventDefault();
    const newCompany = { compName, compInfo, compLogo };
    createCompany(newCompany);
    setCompInfo("");
    setCompName("");
    setCompany("");
    setShowModal(!showModal);
  };

  const handleCompName = (e) => {
    e.preventDefault();
    setCompName(e.target.value);
    console.log(compName);
  };

  const handleCompInfo = (e) => {
    setCompInfo(e.target.value);
    console.log(compInfo);
  };
  const handleUploadClick = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setCompLogo(reader.result);
      };
      e.target = null;
    }
  };

  const handleClickPickImg = () => {
    imgGetter.current.click();
  };
  const styledImg = {
    paddingLeft: "10px",
    width: "20%",
    height: "20%",
  };
  return (
    <div className="company__modal">
      <div className="company__modal_bg "></div>
      <div className="company__modal_window ">
        <form className="company__modal_form">
          <label htmlFor="">Company Name</label>
          <input
            className="company__modal_compName "
            value={compName}
            onChange={handleCompName}
          />
          <label htmlFor="">Company Info</label>
          <input
            className="company__modal_compInfo "
            value={compInfo}
            onChange={handleCompInfo}
          />
          <div height={"100%"} width={"50%"} margin={0} padding={0}>
            <input
              ref={imgGetter}
              className="hidden"
              type="file"
              onChange={(e) => handleUploadClick(e)}
            />
            <Button onClick={!compLogo ? handleClickPickImg : () => 0}>
              {compLogo ? (
                <div width={"50%"} height={"50%"}>
                  <img src={compLogo} alt={compName} style={styledImg} />
                  <Button
                    sx={{
                      position: "absolute",
                      right: "0",
                      borderRadius: "50px",
                      minWidth: "20%",
                      minHeight: "20%",
                    }}
                    onClick={() => setCompLogo("")}
                  >
                    X
                  </Button>
                </div>
              ) : (
                <div textAlign={"center"}>
                  <h2>Product image</h2>
                  <BsCloudUpload />
                </div>
              )}
            </Button>
          </div>
          <Button onClick={handleNewCompany}>Save</Button>
        </form>
      </div>
    </div>
  );
}

export default CompanyCredits;
