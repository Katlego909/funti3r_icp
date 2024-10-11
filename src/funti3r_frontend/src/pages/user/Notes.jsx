import React, { useState, useEffect } from 'react';

const Notes = () => {
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
      title: "",
      content: "",
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, field, newValue) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, [field]: newValue } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you wish to delete this sticky note?")) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 sm:py-10 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-8">My Notes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {notes.map(note => (
          <div key={note.id} className="bg-white p-4 shadow-md rounded-lg relative">
            <input
              className="w-full p-1 text-base sm:text-lg font-medium border-b-2 border-gray-200 focus:outline-none focus:border-purple-500 mb-2"
              value={note.title}
              placeholder="Title"
              onChange={(e) => updateNote(note.id, 'title', e.target.value)}
            />
            <textarea
              className="w-full h-24 p-1 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              value={note.content}
              placeholder="Write your note here..."
              onChange={(e) => updateNote(note.id, 'content', e.target.value)}
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-200"
              onClick={() => deleteNote(note.id)}
            >
              🗑️
            </button>
          </div>
        ))}

        <button
          className="bg-black text-white font-medium p-2 rounded-lg hover:bg-gray-800 transition duration-200"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Notes;
