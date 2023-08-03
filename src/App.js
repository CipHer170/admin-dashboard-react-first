import { useEffect, useState } from "react";
import Provider from "./context/DataContextPage";
import "./App.scss";
import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RequiredAuth from "./components/Auth/RequiredAuth";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; //v4 function added random letters
import DashboardMenuPage from "./components/Menu/DashboardMenuPage";
import MiniDrawer from "./components/Menu/DashboardMenuPage";
import TablePage from "./components/DataGrid/TablePage";
import Wrapper from "./components/Wrapper";
import Catalogs from "./components/Catalog/Catalog";
import Accounts from "./components/Accounts/Accounts";

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
        <Route element={<MiniDrawer />} path="/dashboard">
          <Route path="products" element={<Wrapper />} />
          <Route path="catalog" element={<Catalogs />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
        <Route
          path="/"
          element={
            <RequiredAuth>
              {/* <Wrapper dataProps={dataProps} /> */}
              <DashboardMenuPage dataProps={dataProps} />
            </RequiredAuth>
          }
        />
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Provider>
  );
}

export default App;
