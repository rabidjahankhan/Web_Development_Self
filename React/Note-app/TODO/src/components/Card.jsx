import "./Card.css";

export default function Card({ title, content, backgroundColor, onOpen }) {
  return (
    <div className="card-item" style={{ backgroundColor }} onClick={onOpen}>
      <strong>
        <h2>{title}</h2>
      </strong>
      <p>{content}</p>
    </div>
  );
}
