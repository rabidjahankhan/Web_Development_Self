import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description: desc,
      dueDate,
    };

    const existing = JSON.parse(localStorage.getItem("keep_tasks") || "[]");
    existing.push(newTask);
    localStorage.setItem("keep_tasks", JSON.stringify(existing));

    navigate("/"); // go back to home page
  };

  return (
    <div className="container">
      <h1>Create New Task</h1>

      <div className="form-control">
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      <div className="form-control">
        <label>Description</label>
        <textarea 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />
      </div>

      <div className="form-control">
        <label>Due Date</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </div>

      <button onClick={handleSave} className="new-task-btn">
        Save Task
      </button>
    </div>
  );
}

export default NewTask;
