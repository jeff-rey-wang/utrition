import React, { useState, useRef } from "react";
import axios from "axios";
import "./imageupload.css";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [responseData, setResponseData] = useState("");
  const fileInput = React.useRef(null);

  function handleImage(e) {
    setImage(e.target.files[0].name);
  }
  const headers = {
    upload_type: "image",
  };

  const handleClick = (event) => {
    fileInput.current.click();
  };

  async function getData() {
    const formData = new FormData();
    formData.append('image', fileInput.current.files[0]);
    await axios({
      method: "POST",
      headers: headers,
      url: "/upload",
      data: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    await axios({
      method: "GET",
      headers: headers,
      url: "/upload",
    })
      .then((response) => {
        setResponseData({
          food_name: response.data.food_name,
          serving_qty: response.data.serving_qty,
          serving_unit: response.data.serving_unit,
          serving_weight_grams: response.data.serving_weight_grams,
          calories: response.data.calories,
          total_fat: response.data.total_fat,
          saturated_fat: response.data.saturated_fat,
          cholesterol: response.data.cholesterol,
          sodium: response.data.sodium,
          total_carbohydrate: response.data.total_carbohydrate,
          dietary_fiber: response.data.dietary_fiber,
          sugars: response.data.sugars,
          protein: response.data.protein,
          potassium: response.data.potassium,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div>
      <h3>Show us what you ate: </h3>
      <label className="file-input-label" style={{ marginLeft: "0px" }}>
        <button className="select-button" onClick={handleClick}>
          Select Image
        </button>
        <span className="file-display">{image}</span>
      </label>
      <input
        type="file"
        id="imageUpload"
        ref={fileInput}
        onChange={handleImage}
        hidden
      />
      <button
        className={"button"}
        style={{ marginLeft: "0px" }}
        onClick={getData}
      >
        Submit
      </button>
      <div style={{ marginTop: "20px" }}>
        <pre hidden={responseData.food_name ? false : true}>
          Food Item: {responseData.food_name}
        </pre>
        <pre hidden={responseData.serving_qty ? false : true}>
          Serving Quantity: {responseData.serving_qty}
        </pre>
        <pre hidden={responseData.serving_qty ? false : true}>
          Serving Unit: {responseData.serving_unit}
        </pre>
        <pre hidden={responseData.serving_weight_grams ? false : true}>
          Serving Weight in Grams: {responseData.serving_weight_grams}
        </pre>
        <pre hidden={responseData.calories ? false : true}>
          Calories: {responseData.calories}
        </pre>
        <pre hidden={responseData.total_fat ? false : true}>
          Total Fat: {responseData.total_fat}
        </pre>
        <pre hidden={responseData.saturated_fat ? false : true}>
          Saturated Fat: {responseData.saturated_fat}
        </pre>
        <pre hidden={responseData.cholesterol ? false : true}>
          Cholesterol: {responseData.cholesterol}
        </pre>
        <pre hidden={responseData.sodium ? false : true}>
          Sodium: {responseData.sodium}
        </pre>
        <pre hidden={responseData.total_carbohydrate ? false : true}>
          Total Carbohydrate: {responseData.total_carbohydrate}
        </pre>
        <pre hidden={responseData.serving_qty ? false : true}>
          Dietary Fiber: {responseData.dietary_fiber}
        </pre>
        <pre hidden={responseData.sugars ? false : true}>
          Sugar: {responseData.sugars}
        </pre>
        <pre hidden={responseData.protein ? false : true}>
          Protein: {responseData.protein}
        </pre>
        <pre hidden={responseData.potassium ? false : true}>
          Potassium: {responseData.potassium}
        </pre>
      </div>
    </div>
  );
};

export default ImageUpload;
