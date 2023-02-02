import React, { useState } from "react";
import TextUpload from "../textupload/textupload";
import VoiceUpload from "../voiceupload/voiceupload";
import ImageUpload from "../imageupload/imageupload";
import "./uploadcontainer.css";

const UploadContainer = () => {
  const Image = 2;
  const Voice = 1;
  const Text = 0;
  const [currentUpload, setCurrentUpload] = useState(Voice);

  function renderDisplay(selected) {
    setCurrentUpload(selected);
  }

  return (
    <div con>
      <div className={"component " + (currentUpload !== Text ? "hidden" : "")}>
        <TextUpload />
      </div>
      <div className={"component " + (currentUpload !== Voice ? "hidden" : "")}>
        <VoiceUpload />
      </div>
      <div className={"component " + (currentUpload !== Image ? "hidden" : "")}>
        <ImageUpload />
      </div>
    </div>
  );
};

export default UploadContainer;
