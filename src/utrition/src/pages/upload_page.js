import React from "react";
import ImageUpload from "../components/imageupload/imageupload";
import VoiceUpload from "../components/voiceupload/voiceupload";

const Upload = () => {
  return (
    <div
      style={{
        border: "solid",
        borderColor: "#000",
        color: "#187d04",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1 style={{ position: "absolute", top: "30%" }}>Upload an Image</h1>
      <ImageUpload />
      <div style={{ position: "absolute", top: "70%" }}>
        <h1>Speak</h1>
        <VoiceUpload />
      </div>
    </div>
  );
};

export default Upload;
