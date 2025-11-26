import { useState, useEffect, useRef } from "react";
import NoteInput from "./components/NoteInput";
import Card from "./components/Card";

function App() {
  const [notes, setNotes] = useState([]);
  const isFirstLoad = useRef(true); // <- used to skip first save

  // LOAD once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes");
      if (raw) {
        const storedNotes = JSON.parse(raw);
        if (Array.isArray(storedNotes)) {
          setNotes(storedNotes);
        }
      }
    } catch (err) {
      console.error("Failed to parse notes from localStorage:", err);
    }
  }, []);

  // SAVE whenever notes changes, but skip the very first render
  useEffect(() => {
    if (isFirstLoad.current) {
      // we've just mounted — don't overwrite storage yet
      isFirstLoad.current = false;
      return;
    }
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (err) {
      console.error("Failed to save notes to localStorage:", err);
    }
  }, [notes]);

  function addNote(newNote) {
    setNotes((prev) => [...prev, newNote]);
  }

  return (
    <>
      <NoteInput onAddNote={addNote} />

      {notes.map((note, index) => (
        <Card key={index} title={note.title} content={note.content} />
      ))}
    </>
  );
}

export default App;
