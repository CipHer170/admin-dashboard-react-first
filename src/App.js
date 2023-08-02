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
  //   const [imageUpload, setImageUpload] = useState(null);
  //   const [imageList, setImageList] = useState([]);

  //   const imageListRef = ref(storage, "images/");
  //   const uploadImage = () => {
  //     if (!imageUpload) return;
  //     const imageRef = ref(storage, `images/${imageUpload.name}`);
  //     uploadBytes(imageRef, uploadImage).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   };

  //   useEffect(() => {
  //     listAll(imageListRef).then((res) => {
  //       res.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageList((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []);

  //   return (
  //     <div>
  //       <h1> hello world</h1>
  //       <input
  //         type="file"
  //         accept=".jpg, .jpeg, .png"
  //         onChange={(event) => setImageUpload(event.target.files[0])}
  //       />
  //       <button onClick={uploadImage} multiple={true}>
  //         Upload Image
  //       </button>

  //       {imageList.map((url) => {
  //         return (
  //           <div style={{ borderBottom: "1px solid red" }}>
  //             <img src={url} alt="sdf" width={200} height={200} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
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
