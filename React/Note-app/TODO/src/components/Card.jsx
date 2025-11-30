import "./Card.css";
import { EllipsisVertical } from "lucide-react";

export default function Card({ title, content, backgroundColor, onOpen }) {
  return (
    <div className="card-item" style={{ backgroundColor }} onClick={onOpen}>
      <strong>
        <h2>{title}</h2>
      </strong>
      <p>{content}</p>
      <EllipsisVertical size={16} strokeWidth={0.5} className="ellipsis-vertical"/>
    </div>
  );
}
