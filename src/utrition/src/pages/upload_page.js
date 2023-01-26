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
      <h1 style={{ position: "absolute", top: "30%", clear: "right" }}>
        Upload an Image
      </h1>
      <ImageUpload />
      <h1 style={{ position: "relative" }}>Speak</h1>
      <VoiceUpload />
    </div>
  );
};

export default Upload;
