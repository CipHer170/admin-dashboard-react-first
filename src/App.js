import { useState } from "react";
import Provider from "./context/DataContextPage";
import Wrapper from "./components/Wrapper";
import "./App.scss";
import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RequiredAuth from "./components/Auth/RequiredAuth";

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
              <Wrapper dataProps={dataProps} />
            </RequiredAuth>
          }
        />
      </Routes>
      {/* <Wrapper dataProps={dataProps} /> */}
    </Provider>
  );
}

export default App;
