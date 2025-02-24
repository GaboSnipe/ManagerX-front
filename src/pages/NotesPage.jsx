import React, { useEffect, useState } from 'react';
import { NotesListComponent } from '../components';
import TaskService from '../services/TaskService';
import { setSelectedNoteSlice } from '../features/task/taskSlice';
import { useDispatch } from 'react-redux';

const NotesPage = () => {
  const [notesList, setNotesList] = useState([]);
  const dispatch = useDispatch();

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
      fetchNotes();
    } catch (error) {
      setError('err.');
      console.error('err:', error);
    } 
  }

  const deleteNote = async (uuid) => {
    await TaskService.deleteCurrentNote(uuid)
    dispatch(setSelectedNoteSlice({}));
    fetchNotes();

  }

  const saveChangeNote = async ({uuid, newTitle, newContent}) =>{
    await TaskService.updateCurrentNote({uuid, newTitle: newTitle.trim() === "" ? "Untitled Note" : newTitle, newContent});
    fetchNotes();
  }

  return (
    <div className="">
      <NotesListComponent notesList={notesList} addNewNote={addNewNote} saveChangeNote={saveChangeNote} deleteNote={deleteNote} />
    </div>
  );
};

export default NotesPage;
