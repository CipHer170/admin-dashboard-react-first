import { useState } from "react";
function UploadFile() {
  const [image, setImage] = useState([]);
  // const upload = () => {
  //   if (image == null) return;
  //   storage
  //     .ref(`/images/${image.name}`)
  //     .put(image)
  //     .on("state_changed", alert("success"), alert);
  // };
  const handleUploadClick = (e) => {
    setImage([...image, e.target.files[0]]);
  };

  return (
    <div className="App">
      <center>
        <input type="file" onChange={(e) => handleUploadClick(e)} />
      </center>
    </div>
  );
}

export default UploadFile;

{
  /* onClick={upload} */
}
{
  /* <button onClick={() => handleUploadClick()}>Upload</button> */
}
