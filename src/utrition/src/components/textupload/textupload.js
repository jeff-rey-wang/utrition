import React, { useState } from "react";
import "./textupload.css";

const TextUpload = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(text);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div className={"instruction"}>
            <p>
              {" "}
              Tell us what food you ate: (e.g. "I ate 3 pineapples, 1 Big Mac")
            </p>
          </div>
          <textarea
            id="text-input"
            placeholder="Type your food here:"
            value={text}
            onChange={handleChange}
            cols={"50"}
            rows={"4"}
          />
        </label>
        <input className={"button"} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TextUpload;
