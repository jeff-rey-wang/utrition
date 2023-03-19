import React, { useState } from "react";
import TextUpload from "../textupload/textupload";
import VoiceUpload from "../voiceupload/voiceupload";
import ImageUpload from "../imageupload/imageupload";
import "./uploadcontainer.css";

const UploadContainer = ({ displayedUpload }) => {
  const Image = 0;
  const Voice = 1;
  const Text = 2;


  function selectComponent(){
        if (displayedUpload === Image) {
          console.log("img")
          return (<div className={"component"}>
            <ImageUpload />
          </div>);  
        } else if (displayedUpload === Voice) {
          console.log("voice")
          return (<div className={"component"}>
            <VoiceUpload />
          </div>); 
        }
        else if(displayedUpload === Text) {
          console.log("txt")
          return (<div className={"component"}>
            <TextUpload />
          </div>); 
        }
        else {
          return null;
        }
  }
  return (
    <div>
      {selectComponent()}
    </div>
  );
};
export default UploadContainer;