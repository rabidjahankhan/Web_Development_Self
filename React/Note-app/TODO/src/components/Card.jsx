import "./Card.css";


export default function Card({title, content}) {
    return (
        <div className="card-container">
        <div className="card-item">
            <h2>Title</h2>
            <p>Content</p>
        </div>
        </div>
    );
}