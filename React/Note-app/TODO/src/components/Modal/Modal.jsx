import "./Modal.css";
import { useEffect } from "react";

export default function Modal({ note = {}, onClose }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onMouseDown={(event) => event.stopPropagation()}
        tabIndex={-1}
        style={{ backgroundColor: note.backgroundColor || "#fff" }}
      >
        <div className="modal-header">
          <h2>{note.title || "Untitled"}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            close
          </button>
        </div>

        <div className="modal-body">
          <p>{note.content}</p>
        </div>
      </div>
    </div>
  );
}
