import React from 'react';

const NoteNode = ({ note, setSelectedNote }) => {
  return (
    <button 
      onClick={() => setSelectedNote(note)}
      className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition duration-200 ease-in-out"
    >
      <span className="text-sm truncate">{note.title}</span>
    </button>
  );
};

export default NoteNode;
