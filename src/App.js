import { useEffect, useState } from "react";
import Provider from "./context/DataContextPage";
import "./App.scss";
import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RequiredAuth from "./components/Auth/RequiredAuth";
import DashboardMenuPage from "./components/Menu/DashboardMenuPage";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; //v4 function added random letters

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
              <DashboardMenuPage dataProps={dataProps} />
              {/* <Wrapper  /> */}
            </RequiredAuth>
          }
        />
      </Routes>
      {/* <Wrapper dataProps={dataProps} /> */}
    </Provider>
  );
}

export default App;
