import React from "react";
import ImageUpload from "../components/imageupload/imageupload";
import ManualUpload from "../components/manualupload/manualupload";
import VoiceUpload from "../components/voiceupload/voiceupload";
import "./upload_page.css";

const Upload = () => {
  return (
    <div
      style={{
        color: "#187d04",
        display: "flex",
        height: "100vh",
      }}
    >
      <div class="left"></div>
      <div class="right">
        <div style={{ position: "absolute", top: "30%", padding: "35px 0px" }}>
          <h1>Upload an Image</h1>
          <ImageUpload />
        </div>
        <div style={{ position: "absolute", top: "60%", padding: "35px 0px" }}>
          <h1>Speak</h1>
          <VoiceUpload />
        </div>
        <div style={{ position: "absolute", top: "110%", padding: "35px 0px" }}>
          <h1>Please tell us what you ate!</h1>

          <h3>Example: I had three oranges and a grilled cheese sandwich</h3>
          <ManualUpload />
        </div>
      </div>
    </div>
  );
};

export default Upload;
