import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

function Notes() {
     // I started by setting up my state to handle both the list of notes and the current note I'm working on.

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');


  // This function handles adding a new note to my list.
  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };


  // This function lets me delete a note by its index.
  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" >
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
            <Typography variant="h4" component="div" gutterBottom>
              Notes
            </Typography>

            {/* Add Note Section */}
            <Box mb={3}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNote}
              >
                Add Note
              </Button>
            </Box>

            {/* Notes List Section */}
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <Card key={index} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="body1" component="div">
                      {note}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteNote(index)}
                      color="error"
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No notes available.
              </Typography>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Notes;
