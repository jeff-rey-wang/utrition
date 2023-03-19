import React, { useState } from "react";
import axios from "axios";
import useSpeechToText from "react-hook-speech-to-text";

const VoiceUpload = () => {
  const [responseData, setResponseData] = useState("");
  const [softReset, forceSoftReset] = useState(true);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  function reset() {
    results.splice(0, results.length);
    forceSoftReset(!softReset);
  };

  function voice_submit() {
    var transcript = "";
    results.map((result) => (transcript += " " + result.transcript));
    console.log(transcript);

    const headers = {
      upload_type: "voice",
      food_text: transcript,
    };
    results.splice(0, results.length);
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

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h3>Tell us what you ate: {isRecording ? "🔊" : "🔇"}</h3>
      <button
        className={"button left-shift"}
        style={{ marginLeft: "0px" }}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? "❌ Stop Talking" : "📣 Start Talking"}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      <button
        className={"button"}
        style={{ marginLeft: "0px" }}
        onClick={reset}
      >
        Reset
      </button>
      <button className={"button"} onClick={voice_submit}>
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

export default VoiceUpload;
