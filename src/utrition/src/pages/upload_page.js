import React from "react";
import { useState } from "react";
import ImageUpload from "../components/imageupload/imageupload";
import TextUpload from "../components/textupload/textupload";
import VoiceUpload from "../components/voiceupload/voiceupload";
import "./upload_page.css";

const Upload = () => {
  const Image = 0;
  const Voice = 1;
  const Text = 2;

  const [currentUpload, setCurrentUpload] = useState(1);

  function renderImageUp() {
    if (currentUpload !== Image) {
      setCurrentUpload(Image);
      console.log("image ran" + currentUpload);
    }
  }
  function renderVoiceUp() {
    if (currentUpload !== Voice) {
      setCurrentUpload(Voice);
      console.log("voice ran" + currentUpload);
    }
  }
  function renderTextUp() {
    if (currentUpload !== Text) {
      setCurrentUpload(Text);
      console.log("Text ran" + currentUpload);
    }
  }
  return (
    <div class="upload-container">
      <div class="left"></div>
      <div class="right">
        <div class="instructions container">
          <h2>How it works</h2>
          <h1>Upload Your Meal</h1>
          <h3>Choose one of the options below:</h3>
        </div>
        <div class="buttons container">
          <button
            class={"button " + (currentUpload === Image ? "selected" : "")}
            onClick={renderImageUp()}
          >
            Image Upload
          </button>
          <button
            class={"button " + (currentUpload === Voice ? "selected" : "")}
            onClick={renderVoiceUp}
          >
            Voice Upload
          </button>
          <button
            class={"button " + (currentUpload === Text ? "selected" : "")}
            onClick={renderTextUp}
          >
            Text Upload
          </button>
        </div>
        <div class="components container"></div>
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
