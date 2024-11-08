import React from 'react';
import { FaPlus } from "react-icons/fa";

const AddNewNoteButton = () => {
  return (
    <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200 ease-in-out">
      <FaPlus />
      <span>Add New Note</span>
    </button>
  );
};

export default AddNewNoteButton;
