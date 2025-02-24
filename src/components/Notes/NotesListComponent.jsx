import React, { useState } from 'react';
import { NoteEditor, NoteNode, AddNewNoteButton } from './components';
import { useSelector } from 'react-redux';
import { setSelectedNoteSlice } from '../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import TaskService from '../../services/TaskService';

const NotesListComponent = ({ notesList, addNewNote, saveChangeNote, deleteNote }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.auth.userInfo.id);
  const selectedNote = useSelector((state) => state.task.selectedNote);


  const setSelectedNote = (note) => {
    dispatch(setSelectedNoteSlice(note));
  }

  const chooseNote = async (note) =>{
    setSelectedNote(note);
  }

  const startAddingNewNote = () =>{
    addNewNote({
      title: "Untitled Note",
      content: "",
      owner: user,
    });
    setTitle("");
    setContent("");
  }



  return (
    <div className="flex p-6 bg-gray-100 min-h-[52rem] rounded-lg shadow-lg space-y-4 m-8">
      <div className="flex flex-col bg-grat-100 w-64 mr-4 rounded-lg max-h-[49rem] overflow-y-scroll space-y-2 custom-scrollbar">
        <AddNewNoteButton startAdding={startAddingNewNote} />
        {notesList.map((note) => (
          <div key={note.uuid}>
          <NoteNode note={note} setSelectedNote={chooseNote} isSelected={selectedNote?.uuid === note?.uuid} deleteNote={deleteNote} />
          </div>
        ))}
      </div>
      <div className="w-full p-4 rounded-lg max-h-[49rem] overflow-y-scroll max-w-[96rem] overflow-scroll ">
        <NoteEditor selectedNote={selectedNote} addNewNote={addNewNote} saveChangeNote={saveChangeNote}  title={title} content={content} setTitle={setTitle} setContent={setContent}  />
        <div className="flex justify-center mb-16">
         
        </div>
      </div>
    </div>
  );
};

export default NotesListComponent;