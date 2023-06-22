import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import Provider from "./context/DataContextPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ***col*****
// {
//   id: 'name',
//   numeric: false,
//   disablePadding: true,
//   label: 'Dessert (100g serving)',
// },

// *****row***
// {
//  name: "sjkdhljskd",
// calories: 23123,
// fat:1212,
// carbs:56756,
// protein:78978,
// }
