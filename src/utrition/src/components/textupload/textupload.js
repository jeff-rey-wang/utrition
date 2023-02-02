import React, { useState } from "react";
import axios from "axios";
import "./textupload.css";

const TextUpload = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(text);
    setText("");

    const headers = {
      'upload_type': 'text',
      'food_text': text,
    }
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
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div className={"instruction"}>
            <p>
              {" "}
              Tell us what food you ate: <br /> (e.g. "I ate 3 pineapples, 200g
              of Greek Yogurt")
            </p>
          </div>
          <textarea
            id="text-input"
            placeholder="Type your food here:"
            value={text}
            onChange={handleChange}
            cols={"50"}
            rows={"4"}
          />
        </label>
        <input className={"button"} type="submit" value="Submit" />
      </form>
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

export default TextUpload;
