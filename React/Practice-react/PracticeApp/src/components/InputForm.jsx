import { useState } from "react";

export default function InputForm() {
  const [text, setText] = useState("");

  return (
    <div>
      <h3></h3>

      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          width: "250px",
          marginRight: "10px",
        }}
      />

      <p>
        Your Input: <strong>{text}</strong>
      </p>
    </div>
  );
}
