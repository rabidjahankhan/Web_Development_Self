export default function Card({title, message}) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
  );
}
