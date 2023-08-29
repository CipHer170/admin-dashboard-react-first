// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// import { DataContext } from "./DataContextPage";

// const CompanyContext = createContext();

// function Provider(children) {
//   const { userToken } = useContext(DataContext);
//   const [companyName, setCompanyName] = useState();
//   //   const queryParams = `auth=${userToken}`;
//   const postUrl = `https://farman-shopper-default-rtdb.asia-southeast1.firebasedatabase.app/companyCredits.json`;

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(postUrl);
//       setCompanyName(res);
//     } catch (error) {
//       console.log("hello");
//     }
//   };

//   const createCompany = async (item) => {
//     try {
//       const res = await axios.post(postUrl, item);
//       setCompanyName(res);
//     } catch (error) {
//       alert("err");
//     }
//   };
//   const value = {
//     fetchData,
//     companyName,
//     setCompanyName,
//     createCompany,
//   };
//   return (
//     <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
//   );
// }
// export { CompanyContext };
// export default Provider;
