import { Link } from "react-router-dom";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("keep_tasks") || "[]");
    setTasks(stored);
  }, []);

  const handleDelete = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
    localStorage.setItem("keep_tasks", JSON.stringify(filtered));
  };
  return (
    <>
      <div className="container">
        <Header />
        <h1>My Tasks</h1>

        <Link to="/new">
          <button className="new-task-btn">+ New Task</button>
        </Link>

        <div className="task-grid">
          {tasks.length === 0 && <p>No tasks yet. Create one!</p>}

          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
