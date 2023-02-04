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

  function getData() {
    axios({
      method: "POST",
      headers: headers,
      url: "/upload",
      data: { path: JSON.stringify(image) },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    axios({
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
      <label className="file-input-label">
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
      <button className={"button"} onClick={getData}>
        Submit
      </button>
      <div style={{ border: "solid" }}>
        <pre>Food Item: {responseData.food_name}</pre>
        <pre>Serving Quantity: {responseData.serving_qty}</pre>
        <pre>Serving Unit: {responseData.serving_unit}</pre>
        <pre>Serving Weight in Grams: {responseData.serving_weight_grams}</pre>
        <pre>Calories: {responseData.calories}</pre>
        <pre>Total Fat: {responseData.total_fat}</pre>
        <pre>Saturated Fat: {responseData.saturated_fat}</pre>
        <pre>Cholesterol: {responseData.cholesterol}</pre>
        <pre>Sodium: {responseData.sodium}</pre>
        <pre>Total Carbohydrate: {responseData.total_carbohydrate}</pre>
        <pre>Dietary Fiber: {responseData.dietary_fiber}</pre>
        <pre>Sugar: {responseData.sugars}</pre>
        <pre>Protein: {responseData.protein}</pre>
        <pre>Potassium: {responseData.potassium}</pre>
      </div>
    </div>
  );
};

export default ImageUpload;
