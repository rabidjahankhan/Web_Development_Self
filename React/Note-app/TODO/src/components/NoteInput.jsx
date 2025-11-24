import { Pin, SquareCheckBig, Brush, Image, Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "./NoteInput.css";

export default function NoteInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const noteRef = useRef(null);

  function handleExpanded() {
    setIsExpanded(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    if (!note.title && !note.content) return;

    console.log("Note submitted:", note);

    setNote({ title: "", content: "" });
    setIsExpanded(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="note-container">
      <div className="note-card" ref={noteRef} onClick={handleExpanded}>
        {!isExpanded && (
          <div className="three-icons">
            <SquareCheckBig />
            <Brush />
            <Image />
          </div>
        )}

        {isExpanded && (
          <>
            <div className="pin">
              <Pin />
            </div>

            <div className="color">
              <Palette />
            </div>

            <input
              name="title"
              value={note.title}
              placeholder="Title"
              onChange={handleChange}
              className="note-title"
            />
          </>
        )}

        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          className="note-textarea"
          onFocus={handleExpanded}
        />

        {isExpanded && (
          <div className="note-actions">
            <button onClick={handleSubmit}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}
