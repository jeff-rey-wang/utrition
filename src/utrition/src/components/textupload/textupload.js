import React, { useState } from "react";
import "./textupload.css";

const TextUpload = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleChange(event) {
    this.setText({ value: event.target.value });
  }

  function handleSubmit(event) {}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Food:
          <textarea value={text} onChange={handleChange} />
        </label>
        <input className={"button"} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TextUpload;
