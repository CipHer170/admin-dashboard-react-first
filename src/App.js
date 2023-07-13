import { useState } from "react";
import Provider from "./context/DataContextPage";
import Wrapper from "./components/Wrapper";
import "./App.scss";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Routes } from "react-router";
import AboutPage from "./components/AboutPage";
import LoginForm from "./components/Auth/LoginForm";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="aboutus" element={<LoginForm />} />
        <Route path="wrapper" element={<Wrapper dataProps={dataProps} />} />
      </Routes>
      {/* <Wrapper dataProps={dataProps} /> */}
    </Provider>
  );
}

export default App;
