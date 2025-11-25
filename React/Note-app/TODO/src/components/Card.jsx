import "./Card.css";


export default function Card({title, content}) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}