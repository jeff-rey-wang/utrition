import React, { useState } from "react";
import axios from "axios";
import "./textupload.css";

const TextUpload = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");

  const keyDownEvent = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setText("");

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
          error_msg: response.data.error_msg,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div>
      <form onKeyDown={keyDownEvent} onSubmit={handleSubmit}>
        <label>
          <div className={"instruction"}>
            <h3>Tell us what food you ate:</h3>
            <p>(e.g. "I ate 3 pineapples, 200g of Greek Yogurt")</p>
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
        <button type="submit" className={"button"}>
          Submit
        </button>
      </form>
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
          Serving Weight: {responseData.serving_weight_grams}g
        </pre>
        <pre hidden={responseData.calories ? false : true}>
          Calories: {responseData.calories}
        </pre>
        <pre hidden={responseData.total_fat ? false : true}>
          Total Fat: {responseData.total_fat}g
        </pre>
        <pre hidden={responseData.saturated_fat ? false : true}>
          Saturated Fat: {responseData.saturated_fat}g
        </pre>
        <pre hidden={responseData.cholesterol ? false : true}>
          Cholesterol: {responseData.cholesterol}mg
        </pre>
        <pre hidden={responseData.sodium ? false : true}>
          Sodium: {responseData.sodium}mg
        </pre>
        <pre hidden={responseData.total_carbohydrate ? false : true}>
          Total Carbohydrate: {responseData.total_carbohydrate}g
        </pre>
        <pre hidden={responseData.serving_qty ? false : true}>
          Dietary Fiber: {responseData.dietary_fiber}g
        </pre>
        <pre hidden={responseData.sugars ? false : true}>
          Sugar: {responseData.sugars}g
        </pre>
        <pre hidden={responseData.protein ? false : true}>
          Protein: {responseData.protein}g
        </pre>
        <pre hidden={responseData.potassium ? false : true}>
          Potassium: {responseData.potassium}mg
        </pre>
        <pre hidden={responseData.error_msg ? false : true}>
          {responseData.error_msg}
        </pre>
      </div>
    </div>
  );
};

export default TextUpload;
