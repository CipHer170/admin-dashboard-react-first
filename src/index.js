import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ***col*****s
// {
//   id: 'name',
//   numeric: false,
//   disablePadding: true,
// },
//   label: 'Dessert (100g serving)',

// *****row***
// {
//  name: "sjkdhljskd",
// calories: 23123,
// fat:1212,
// carbs:56756,
// protein:78978,
// }
