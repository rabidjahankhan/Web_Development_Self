import { Pin, SquareCheckBig, Brush, Image, Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "./NoteInput.css";

export default function NoteInput({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // add backgroundColor state
  const [note, setNote] = useState({
    title: "",
    content: "",
    backgroundColor: "#ffffff",
  });

  const [showColors, setShowColors] = useState(false);
// show list of colors
  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
  ];

  const noteRef = useRef(null);

  const letestNoteRef = useRef(note);
  useEffect(() => {
    letestNoteRef.current = note;
  }, [note]);

  function handleExpanded() {
    setIsExpanded(true);
  }

  function handleExpandedFalse() {
    setIsExpanded(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    if (!note.title && !note.content) return;

    onAddNote(note);

    setNote({ title: "", content: "", backgroundColor: "" });
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
      <div
        className="note-card"
        ref={noteRef}
        onClick={handleExpanded}
        style={{ backgroundColor: note.backgroundColor || "#fff" }}
      >
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

            <div className="palette" onClick={() => setShowColors(!showColors)}>
              <Palette />
            </div>
            {showColors && (
              <div className="color-popup">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setNote((prev) => ({ ...prev, backgroundColor: color }));
                      setShowColors(false);
                    }}
                  ></div>
                ))}
              </div>
            )}

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
            <button onFocus={handleExpandedFalse}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
