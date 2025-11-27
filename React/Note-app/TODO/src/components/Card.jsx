import "./Card.css";


export default function Card({title, content, backgroundColor}) {
    return (
        <div className="card-container">
        <div className="card-item" style={{backgroundColor}}>
            <strong><h2>{title}</h2></strong>
            <p>{content}</p>
        </div>
        </div>
    );
}