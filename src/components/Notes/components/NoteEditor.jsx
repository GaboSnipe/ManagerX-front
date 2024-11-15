import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import TaskService from '../../../services/TaskService';

const NoteEditor = ({ selectedNote, isAddingNewNote, addNewNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.auth.userInfo.id);
  const editorRef = useRef(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveChangeNote = () =>{
    TaskService.updateCurrentNote({uuid:selectedNote.uuid, newTitle: title, newContent: content});
  }

  const renderEditor = () => (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      value={content}
      readOnly={!isAddingNewNote && !selectedNote}
      onChange={handleContentChange}
      placeholder="Compose an epic..."
      className="flex-grow border-none focus:ring-0 focus:outline-none"
      modules={{
        toolbar: isAddingNewNote || selectedNote
          ? [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image'],
            ]
          : [],
      }}
    />
  );

  return (
    <div className="w-full max-h-[40rem] h-full flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        {isAddingNewNote ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter note title"
            className="appearance-none bg-transparent border-none outline-none w-full p-0 m-0 text-inherit shadow-none"
          />
        ) : (
          selectedNote?.title || 'Select a Note'
        )}
      </h2>
      {isAddingNewNote || selectedNote ? (
        <>
          {renderEditor()}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                if (isAddingNewNote) {
                  addNewNote({ title, content, owner: user });
                }else if(selectedNote?.uuid) {
                  saveChangeNote();
                }
              }}
              className="bg-gray-300 m-2 w-24 rounded-md mt-16 text-gray-500 hover:bg-gray-400 hover:text-gray-600 transition duration-300"
            >
              {isAddingNewNote ? 'Create' : 'Save'}
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-gray-500">Select a note to edit</p>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
