import { useContext, useEffect, useState } from "react";
import Provider, { DataContext } from "./context/DataContextPage";
import Wrapper from "./components/Wrapper";
import "./App.scss";

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
      <Wrapper dataProps={dataProps} />
    </Provider>
  );
}

export default App;
