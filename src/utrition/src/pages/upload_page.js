import React from "react";
import { useState } from "react";
import ImageUpload from "../components/imageupload/imageupload";
import TextUpload from "../components/textupload/textupload";
import UploadContainer from "../components/uploadcontainer/uploadcontainer";
import VoiceUpload from "../components/voiceupload/voiceupload";
import "./upload_page.css";

const Upload = () => {
  const Image = 2;
  const Voice = 1;
  const Text = 0;

  const [currentUpload, setCurrentUpload] = useState(Text);

  function changeDisplay(selected) {
    if (selected !== currentUpload) {
      setCurrentUpload(selected);
    }
  }
  return (
    <div className="upload-container">
      <div className="left"></div>
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
        <div className="components container">
          <UploadContainer />
        </div>
        <div
          style={{
            position: "absolute",
            top: "30%",
            padding: "35px 0px",
            display: "none",
          }}
        >
          <h1>Upload an Image</h1>
          <ImageUpload />
        </div>
        <div
          style={{
            position: "absolute",
            top: "60%",
            padding: "35px 0px",
            display: "none",
          }}
        >
          <h1>Speak</h1>
          <VoiceUpload />
        </div>
        <div
          style={{
            position: "absolute",
            top: "110%",
            padding: "35px 0px",
            display: "none",
          }}
        >
          <h1>Please tell us what you ate!</h1>

          <h3>Example: I had three oranges and a grilled cheese sandwich</h3>
          <TextUpload />
        </div>
      </div>
    </div>
  );
};

export default Upload;
