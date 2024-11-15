import React from 'react';

const NoteNode = ({ note, setSelectedNote, isSelected }) => {
  return (
    <button 
      onClick={() => setSelectedNote(note)}
      className={`hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 ease-in-out ${isSelected && "bg-blue-200"}` }
      >
      <span className="text-sm truncate">{note.title}</span>
    </button>
  );
};

export default NoteNode;
