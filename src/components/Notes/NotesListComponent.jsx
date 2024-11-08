import React, { useState } from 'react';
import { NoteEditor, NoteNode, AddNewNoteButton } from './components';

const NotesListComponent = ({ notesList }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="flex h-full p-6 bg-gray-100 rounded-lg shadow-lg space-y-4 m-8">
      <div className="flex flex-col bg-grat-100 p-4 w-64 mr-4 rounded-lg shadow-lg space-y-2 overflow-y-auto">
        <AddNewNoteButton />
        {notesList.map((note) => (
          <NoteNode key={note.id} note={note} setSelectedNote={setSelectedNote} />
        ))}
      </div>
      <div className="w-full h-full p-4 rounded-lg ">
        <NoteEditor selectedNote={selectedNote} />
        <div className="flex justify-center">
          <button className='bg-gray-200 m-2 w-24 rounded-sm text-gray-500 hover:bg-gray-300 hover:text-gray-600 transition duration-300'>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesListComponent;
