import React, { useState } from 'react';
import { NoteEditor, NoteNode, AddNewNoteButton } from './components';

const NotesListComponent = ({ notesList }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="flex p-6 bg-gray-100 min-h-[52rem] rounded-lg shadow-lg space-y-4 m-8">
      <div className="flex flex-col bg-grat-100 w-64 mr-4 rounded-lg space-y-2 overflow-y-auto">
        <AddNewNoteButton />
        {notesList.map((note) => (
          <NoteNode key={note.id} note={note} setSelectedNote={setSelectedNote} isSelected={selectedNote?.id === note?.id} />
        ))}
      </div>
      <div className="w-full p-4 rounded-lg ">
        <NoteEditor selectedNote={selectedNote} />
        <div className="flex justify-center">
          {selectedNote &&
          <button className='bg-gray-200 m-2 w-24 rounded-sm text-gray-500 hover:bg-gray-300 hover:text-gray-600 transition duration-300'>
            save
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default NotesListComponent;