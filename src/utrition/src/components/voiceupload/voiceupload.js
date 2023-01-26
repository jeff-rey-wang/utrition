import React, { useState } from "react";
import axios from "axios";

const VoiceUpload = () => {
  const [speech, setSpeech] = useState("");
  const [responseData, setResponseData] = useState("");

  return <div style={{ display: "grid", textJustify: "center" }}>Voice</div>;
};

export default VoiceUpload;
