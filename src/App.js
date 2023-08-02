import { useEffect, useState } from "react";
import Provider from "./context/DataContextPage";
import "./App.scss";
import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RequiredAuth from "./components/Auth/RequiredAuth";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; //v4 function added random letters
import Accounts from "./components/Accounts/Accounts";
import Catalog from "./components/Catalog/Catalog";
import TablePage from "./components/DataGrid/TablePage";
import Wrapper from "./components/Wrapper";
import DashboardMenuPage from "../components/Menu/DashboardMenuPage";

function App() {
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dataProps = {
    price,
    description,
    title,
    setPrice,
    setTitle,
    setDescription,
    setImage,
    amount,
    setAmount,
    image,
  };

  return (
    <Provider {...dataProps}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/wrapper"
          element={
            <RequiredAuth>
              {/* <Wrapper dataProps={dataProps} /> */}
              <DashboardMenuPage dataProps={dataProps} />
            </RequiredAuth>
          }
        />
      </Routes>
      <Routes>
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/products" element={<TablePage />} />
      </Routes>
      {/* <Wrapper dataProps={dataProps} /> */}
    </Provider>
  );
}

export default App;
