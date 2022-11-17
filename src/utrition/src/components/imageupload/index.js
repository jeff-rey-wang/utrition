import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [responseData, setResponseData] = useState("");
  function handleImage(e) {
    setImage(e.target.files[0]);
  }
  function handleApi() {
    const formData = new FormData();
    formData.append("image", image);
    // axios.post("url", formData).then((res) => {
    //   console.log(res);
    // });
  }

  function requestApi() {
    axios.get(`https://randomuser.me/api`).then(({ data }) => {
      console.log(data);
      return JSON.stringify(data, null, 2);
    });
  }
  return (
    <div style={{}}>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={handleApi}>Submit</button>
      <button onClick={requestApi}>Display</button>
      <div style={{ border: "solid" }}>
        <pre>{responseData || "Result is here"}</pre>
      </div>
    </div>
  );
};

export default ImageUpload;
