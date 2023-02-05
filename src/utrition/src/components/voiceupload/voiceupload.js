import React, { useState } from "react";
import axios from "axios";
import useSpeechToText from "react-hook-speech-to-text";

const VoiceUpload = () => {
  const [responseData, setResponseData] = useState("");

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

  const reset = () => {
    window.location.reload(false);
  };

  function voice_submit() {
    var transcript = "";
    results.map((result) => (transcript += " " + result.transcript));
    console.log(transcript);

    const headers = {
      upload_type: "voice",
      food_text: transcript,
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
      <div style={{ marginTop: "20px", border: "solid" }}>
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

export default VoiceUpload;
