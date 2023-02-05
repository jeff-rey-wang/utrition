import React from "react";
import { useState } from "react";
import UploadContainer from "../components/uploadcontainer/uploadcontainer";
import "./upload_page.css";

const Upload = () => {
  const Image = 0;
  const Voice = 1;
  const Text = 2;

  const [currentUpload, setCurrentUpload] = useState(Text);

  function changeDisplay(selected) {
    if (selected !== currentUpload) {
      setCurrentUpload(selected);
    }
  }
  return (
    <div className="upload-container">
      <div className="left">
        <div className="image-container">
          <img
            style={{
              height: "100%",
              width: "100%",
              maxWidth: "700px",
              overflow: "hidden",
              // height: 475
            }}
            src={require("./utritionfilter.jpg")}
            alt="Home Food"
          ></img>
        </div>
      </div>
      <div className="right">
        <div className="instructions container">
          <h2>How it works</h2>
          <h1>Upload Your Meal</h1>
          <h3>Choose one of the options below:</h3>
        </div>
        <div className="buttons container">
          <button
            className={"button " + (currentUpload === Text ? "selected" : "")}
            onClick={() => changeDisplay(Text)}
          >
            Text Upload
          </button>
          <button
            className={"button " + (currentUpload === Voice ? "selected" : "")}
            onClick={() => changeDisplay(Voice)}
          >
            Voice Upload
          </button>
          <button
            className={"button " + (currentUpload === Image ? "selected" : "")}
            onClick={() => changeDisplay(Image)}
          >
            Image Upload
          </button>
        </div>
        <div className="components">
          <UploadContainer displayedUpload={currentUpload} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
