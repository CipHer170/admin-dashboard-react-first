import { useState } from "react";
function UploadFile() {
  const [image, setImage] = useState([]);

  const handleUploadClick = (e) => {
    setImage([...image, e.target.files[0]]);
  };

  return (
    <div className="App">
      {/* <center> */}
      <input type="file" onChange={(e) => handleUploadClick(e)} multiple />
      {/* </center> */}
    </div>
  );
}

export default UploadFile;
