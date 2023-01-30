import React, { useState } from "react";

const ManualUpload = () => {
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ManualUpload;
