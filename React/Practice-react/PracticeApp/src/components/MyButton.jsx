export default function MyButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
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
      {text}
    </button>
  );
}
