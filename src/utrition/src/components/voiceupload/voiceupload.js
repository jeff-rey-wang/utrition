import React, { useState } from "react";
import axios from "axios";
import useSpeechToText from "react-hook-speech-to-text";

const VoiceUpload = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const reset = () => {

  };

  const voice_submit = () => {
    var transcript = "";
    results.map((result) => (
      transcript += " " + result.transcript
    ))
    console.log(transcript)
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h3>Tell us what you ate:  {isRecording ? "🔊" : "🔇"	}</h3>
      <button className={"button"} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? "❌ Stop Talking" : "📣 Start Talking"}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      <br></br>
      {/* <p>{result.transcript}</p> */}
      <button className={"button"} onClick={reset}>Reset</button>
      <button className={"button"} onClick={voice_submit}>Submit</button>
    </div>
  );
};

export default VoiceUpload;
