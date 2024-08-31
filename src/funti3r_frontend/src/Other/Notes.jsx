import React, { useState, useEffect } from 'react';
import '../App.css';
import UserSidebar from './UserSidebar'; 

const NotesApp = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, newContent) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="main-container">
      <UserSidebar />
      <div className="content">
        <div className="main-title">
          <h1 style={{ marginBottom: '30px' }}>My Notes</h1>
        </div>

        <div id="app">
          {notes.map(note => (
            <textarea
              key={note.id}
              className="note"
              value={note.content}
              placeholder="Empty Sticky Note"
              onChange={(e) => updateNote(note.id, e.target.value)}
              onDoubleClick={() => {
                if (window.confirm("Are you sure you wish to delete this sticky note?")) {
                  deleteNote(note.id);
                }
              }}
            />
          ))}
          <button className="add-note" onClick={addNote}>+</button>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
