import { useState } from "react";
import NoteInput from "./components/NoteInput";
import Card from "./components/Card";

function App() {
  const [notes, setNotes] = useState([]);

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
