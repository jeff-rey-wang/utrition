import React, { useEffect, useState } from "react";
import APIService from '../../components/apiService/index.js'
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [responseData, setResponseData] = useState("");
  function handleImage(e) {
    setImage(e.target.files[0].name);
  }
  function handleApi() {
    //const formData = new FormData();
    //formData.append("image", image);

    /*axios.post("http://localhost:5000/upload", { foodPath: image }).then((res) => {
      console.log(res);
    });*/

    APIService.GiveImagePath({image})
    .then((res) => console.log(res))
    .catch(error => console.log('error',error))

    // axios.post("url", formData).then((res) => {
    //   console.log(res);
    // });
  }

  /*function requestApi() {
    axios.get(`https://randomuser.me/api`).then(({ data }) => {
      console.log(data);
      return JSON.stringify(data, null, 2);
    });
  }*/

  function getData() {
    axios({
      method: "POST",
      url:"/upload",
      data: {path:JSON.stringify(image)},
    })
    .then(response => response.json())
    .catch(error => console.log(error))


    axios({
      method: "GET",
      url:"/upload",
    })
    .then((response) => {
      setResponseData(({
        food: response.data}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  return (
    <div style={{}}>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={handleApi}>Submit</button>
      <button onClick={getData}>Display</button>
      <div style={{ border: "solid" }}>
        <pre>{responseData.food || "Result is here"}</pre>
      </div>
    </div>
  );
};

export default ImageUpload;
