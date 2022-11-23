import React from "react";
import ImageUpload from "../components/imageupload";

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
      <h1 style={{position: "absolute", top:"30%", clear: "right" }}>Upload an Image</h1>
      <ImageUpload />
    </div>
  );
};

export default Upload;
