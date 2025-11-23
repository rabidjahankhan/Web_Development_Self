export default function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p className="desc">
        {task.description?.slice(0, 80)}
        {task.description?.length > 80 ? "..." : ""}
      </p>

      <p className="due-date">
        Due: <b>{task.dueDate || "No due date"}</b>
      </p>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
