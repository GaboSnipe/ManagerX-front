import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

const NoteEditor = ({ selectedNote }) => {
  const [content, setContent] = useState(selectedNote?.content || null);
  const editorRef = useRef(null);

  useEffect(() => {
    setContent(selectedNote?.content || '');
  }, [selectedNote]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        {selectedNote?.title || "Select a Note"}
      </h2>
      {selectedNote ?
      <ReactQuill
        ref={editorRef}
        theme="snow"
        value={content}
        readOnly={selectedNote ? false : false}
        onChange={handleContentChange}
        placeholder="Compose an epic..."
        className="flex-grow border-none focus:ring-0 focus:outline-none"
        modules={{
          toolbar: selectedNote ? [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image'],
          ] : [],
        }}
      />
      :
      <div>
        <p className='text-gray-500'>select a note</p>
        </div>

      }
    </div>
  );
};

export default NoteEditor;
