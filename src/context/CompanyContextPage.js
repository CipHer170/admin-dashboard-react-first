import { createContext, useState } from "react";

const CompanyContext = createContext();

function Provider({
  children,
  companyName,
  setCompanyName,
  companyLogo,
  setCompanyLogo,
  companyAddress,
  setCompanyAddress,
  addCompanyCredits,
  setCompanyCredits,
}) {
  const value = {
    companyName,
    setCompanyName,
    companyLogo,
    setCompanyLogo,
    companyAddress,
    setCompanyAddress,
    addCompanyCredits,
    setCompanyCredits,
  };
  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}
export { CompanyContext };
export default Provider;
