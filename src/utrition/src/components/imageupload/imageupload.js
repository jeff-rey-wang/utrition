import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [responseData, setResponseData] = useState("");
  function handleImage(e) {
    setImage(e.target.files[0].name);
  }

  function getData() {
    axios({
      method: "POST",
      url: "/upload",
      data: { path: JSON.stringify(image) },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    axios({
      method: "GET",
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
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div style={{ flexDirection: "row" }}>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={getData}>Submit</button>
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
