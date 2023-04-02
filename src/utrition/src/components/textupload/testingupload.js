import React, { useState } from "react";
import axios from "axios";

const TextUploadmock = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");
  
  function handleSubmit() {
  const headers = {
    upload_type: "text",
    food_text: text,
  };
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
      console.log(error.response.data);
    });
    console.log(response)
  }
};

export default TextUploadmock;
