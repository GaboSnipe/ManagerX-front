import React from 'react';
import { TiDelete } from "react-icons/ti";

const NoteNode = ({ note, setSelectedNote, isSelected, deleteNote }) => {
  return (
    <div
      className={`px-4 py-2 rounded-lg flex items-center hover:bg-blue-200 w-full text-blue-800 font-medium transition duration-200 ease-in-out ${
        isSelected ? "bg-blue-200" : ""
      }`}
    >
      <button
        onClick={() => setSelectedNote(note)}
        className="flex-1 text-left truncate max-w-[11rem]"
        title={note.title}
      >
        <span className="text-sm">{note.title}</span>
      </button>

      <button
        className="ml-auto text-gray-400 hover:text-red-600 cursor-pointer transition duration-200"
        onClick={() => deleteNote(note.uuid)}
        aria-label="Delete note"
      >
        <TiDelete className="text-2xl" title="Delete note" />
      </button>
    </div>
  );
};

export default NoteNode;
