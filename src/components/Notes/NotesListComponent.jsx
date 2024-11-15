import React, { useState } from 'react';
import { NoteEditor, NoteNode, AddNewNoteButton } from './components';

const NotesListComponent = ({ notesList, addNewNote, isAddingNewNote, setIsAddingNewNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const chooseNote = async (note) =>{
    await setIsAddingNewNote(false);
    setSelectedNote(note);
  }

  const startAddingNewNote = () =>{
    setIsAddingNewNote(true);

  }

  return (
    <div className="flex p-6 bg-gray-100 min-h-[52rem] rounded-lg shadow-lg space-y-4 m-8">
      <div className="flex flex-col bg-grat-100 w-64 mr-4 rounded-lg space-y-2 overflow-y-auto">
        <AddNewNoteButton startAdding={startAddingNewNote} />
        {notesList.map((note) => (
          <NoteNode key={note.id} note={note} setSelectedNote={chooseNote} isSelected={selectedNote?.uuid === note?.uuid} />
        ))}
      </div>
      <div className="w-full p-4 rounded-lg ">
        <NoteEditor selectedNote={selectedNote} isAddingNewNote={isAddingNewNote} addNewNote={addNewNote} />
        <div className="flex justify-center mb-16">
         
        </div>
      </div>
    </div>
  );
};

export default NotesListComponent;