import React, { useState, useRef } from "react";
import axios from "axios";
import "./imageupload.css";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [responseData, setResponseData] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [processing, setProcessing] = useState(false)
  const [correctFood, setCorrectFood] = useState(false);
  const fileInput = React.useRef(null);

  function handleImage(e) {
    setImage(e.target.files[0].name);
  }
  const headers = {
    upload_type: "image",
  };

  // New header
  const headers_confirm = {
    upload_type: "confirm",
  };

  
  const handleClick = (event) => {
    fileInput.current.click();
  };

  // Doesn't send any response, set food to 'correct', close confirmation
  function handleCorrectData() {
    setCorrectFood(true);
    setShowConfirmationDialog(false);
  }

  // Sends response to /upload, with new header;
  // set food to 'incorrect', close confirmation
  // populate and show error message
  async function handleIncorrectData() {
    setCorrectFood(false);
    const formData = new FormData();
    formData.append('index', null);
    await axios({
      method: "POST",
      headers: headers_confirm,
      url: "/upload",
      data: formData,
    })
      .then()
      .catch((error) => console.log(error));
      setResponseData({
        error_msg: "Please try again or use a different image."
      })
      setShowConfirmationDialog(false);
  }

  // Shows confirmation if in the correct state;
  // user will either deem the output correct/incorrect;
  // handled 2 different ways
  const renderConfirmationDialog = (food_name) => {
    if (!showConfirmationDialog) {
      return null;
    }
    return (
    <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <span>

              </span>
              <h2>Confirm Food</h2>
            </div>
            <div className="overlay-body">
              <p>We detected the image to be an {food_name}, is this correct?</p>
            </div>
            <div className="overlay-footer">
            <button className="overlay-yes" onClick={handleCorrectData}>
                Yes
              </button>
              <button className="overlay-no" onClick={handleIncorrectData}>
                No
              </button>
            </div>
          </div>
        </div>
    );
  };

  async function getData() {
    // clear response data, enter 'processing' state and predict 'incorrect' food

    setResponseData("")
    setProcessing(true);
    setCorrectFood(false);
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
      // Once response is filled, exit 'processing' state and show confirmation
      setProcessing(false);
      setShowConfirmationDialog(true);
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
      {/* Confirmation overlay */}
      {renderConfirmationDialog(responseData.food_name)}
      <div style={{ marginTop: "20px" }}>
        {/* Response only shows if user confirms food is correct */}
        <pre hidden={responseData.food_name && correctFood ? false : true}>
          Food Item: {responseData.food_name}
        </pre>
        <pre hidden={responseData.serving_qty && correctFood ? false : true}>
          Serving Quantity: {responseData.serving_qty}
        </pre>
        <pre hidden={responseData.serving_qty && correctFood ? false : true}>
          Serving Unit: {responseData.serving_unit}
        </pre>
        <pre hidden={responseData.serving_weight_grams && correctFood ? false : true}>
          Serving Weight: {responseData.serving_weight_grams}g
        </pre>
        <pre hidden={responseData.calories && correctFood ? false : true}>
          Calories: {responseData.calories}
        </pre>
        <pre hidden={responseData.total_fat && correctFood ? false : true}>
          Total Fat: {responseData.total_fat}g
        </pre>
        <pre hidden={responseData.saturated_fat && correctFood ? false : true}>
          Saturated Fat: {responseData.saturated_fat}g
        </pre>
        <pre hidden={responseData.cholesterol && correctFood ? false : true}>
          Cholesterol: {responseData.cholesterol}mg
        </pre>
        <pre hidden={responseData.sodium && correctFood ? false : true}>
          Sodium: {responseData.sodium}mg
        </pre>
        <pre hidden={responseData.total_carbohydrate && correctFood ? false : true}>
          Total Carbohydrate: {responseData.total_carbohydrate}g
        </pre>
        <pre hidden={responseData.serving_qty && correctFood ? false : true}>
          Dietary Fiber: {responseData.dietary_fiber}g
        </pre>
        <pre hidden={responseData.sugars && correctFood ? false : true}>
          Sugar: {responseData.sugars}g
        </pre>
        <pre hidden={responseData.protein && correctFood ? false : true}>
          Protein: {responseData.protein}g
        </pre>
        <pre hidden={responseData.potassium && correctFood ? false : true}>
          Potassium: {responseData.potassium}mg
        </pre>
        <pre hidden={responseData.error_msg ? false : true}>
          {responseData.error_msg}
        </pre>
        {/* Added text to communicate that ML is working */}
        <pre hidden={processing ? false : true}> 
          Classifying food...
        </pre>
      </div>
    </div>
  );
};

export default ImageUpload;
