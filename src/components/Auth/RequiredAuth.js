import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContextPage";
import "./login.scss";
function RequiredAuth({ children }) {
  const location = useLocation();
  const { userToken } = useContext(DataContext);

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <div className="login-require">{children}</div>;
}

export default RequiredAuth;
