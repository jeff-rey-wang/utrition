import React, { useState } from "react";
import TextUpload from "../textupload/textupload";
import VoiceUpload from "../voiceupload/voiceupload";
import ImageUpload from "../imageupload/imageupload";
import "./uploadcontainer.css";

const UploadContainer = () => {
  const Image = 2;
  const Voice = 1;
  const Text = 0;
  const [currentUpload, setCurrentUpload] = useState(displayedUpload);

  function renderDisplay(selected) {
    setCurrentUpload(selected);
  }
const UploadContainer = ({ displayedUpload }) => {
  const Image = 0;
  const Voice = 1;
  const Text = 2;

  return (
    <div con>
      <div
        className={"component " + (displayedUpload !== Text ? "hidden" : "")}
      >
        <TextUpload />
      </div>
      <div
        className={"component " + (displayedUpload !== Voice ? "hidden" : "")}
      >
        <VoiceUpload />
      </div>
      <div
        className={"component " + (displayedUpload !== Image ? "hidden" : "")}
      >
        <ImageUpload />
      </div>
    </div>
  );
};

export default UploadContainer;
