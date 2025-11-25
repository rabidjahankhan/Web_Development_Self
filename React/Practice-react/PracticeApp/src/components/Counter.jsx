import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ margin: "20px" }}>
      <h2>Count: {count}</h2>

      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          margin: "5px",
        }}
      >
        (+)
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          margin: "5px",
        }}
      >
        (-)
      </button>
    </div>
  );
}
