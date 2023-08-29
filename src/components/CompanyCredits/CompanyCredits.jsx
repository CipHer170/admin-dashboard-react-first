import "./CompanyCredits.scss";
function CompanyCredits({
  compName,
  setCompName,
  compInfo,
  setCompInfo,
  showModal,
  setShowModal,
}) {
  const handleSubmitCompanyDetails = () => {
    console.log("sss");
  };

  return (
    <div className="company__modal">
      <div className="company__modal_bg "></div>
      <div className="company__modal_window ">
        <form
          action=""
          onSubmit={handleSubmitCompanyDetails}
          className="company__modal_form"
        >
          <label htmlFor="">Company Name</label>
          <input className="company__modal_compName " value={compName} />
          <label htmlFor="">Company Name</label>
          <input className="company__modal_compInfo " value={compInfo} />
        </form>
      </div>
    </div>
  );
}

export default CompanyCredits;
