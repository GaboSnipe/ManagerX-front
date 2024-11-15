import React, { useEffect, useState } from 'react';
import { NotesListComponent } from '../components';
import TaskService from '../services/TaskService';

const NotesPage = () => {
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const [notesList, setNotesList] = useState([]);

  const fetchNotes = async () => {
    try {
      const result = await TaskService.getNotesList();
      setNotesList(result.data);
    } catch (error) {
      console.error('err:', error);
    }
  };


  useEffect(() => {
    
    fetchNotes();
  }, []);

  const addNewNote = async (newNote) => {
    try {
      await TaskService.createNewNote(newNote);
      setIsAddingNewNote(false);
      fetchNotes();
    } catch (error) {
      setError('err.');
      console.error('err:', error);
    } 
  }

  return (
    <div className="">
      <NotesListComponent notesList={notesList} addNewNote={addNewNote} isAddingNewNote={isAddingNewNote} setIsAddingNewNote={setIsAddingNewNote} />
    </div>
  );
};

export default NotesPage;
