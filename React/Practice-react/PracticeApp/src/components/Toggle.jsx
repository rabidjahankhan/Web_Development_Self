import { useState } from "react";

export default function Toggle() {

    const [isToggle, setIsToggle] = useState(true);

  return (
    <div style={{ margin: "20px" }}>
      <button
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          margin: "5px",
        }}
        onClick={() => setIsToggle(!isToggle)}
      >
        {isToggle ? "Hide" : "show"}
      </button>
      {!isToggle && (<p>This is a Toggle Button</p>)}
    </div>
  );
}
