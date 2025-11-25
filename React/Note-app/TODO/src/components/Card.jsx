import "./Card.css";


export default function Card({title, content}) {
    return (
        <div className="card-container">
        <div className="card-item">
            <strong><h2>{title}</h2></strong>
            <p>{content}</p>
        </div>
        </div>
    );
}