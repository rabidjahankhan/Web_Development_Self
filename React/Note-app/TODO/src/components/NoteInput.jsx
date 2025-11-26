import { Pin, SquareCheckBig, Brush, Image, Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "./NoteInput.css";

export default function NoteInput({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const noteRef = useRef(null);

  const letestNoteRef = useRef(note);
  useEffect(() => {
    letestNoteRef.current = note;
  }, [note]);

  function handleExpanded() {
    setIsExpanded(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    if (!note.title && !note.content) return;

    onAddNote(note);

    setNote({ title: "", content: "" });
    setIsExpanded(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        if (letestNoteRef.current.title || letestNoteRef.current.content) {
          onAddNote(letestNoteRef.current);
          setNote({ title: "", content: "" });
        }
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onAddNote]);

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
