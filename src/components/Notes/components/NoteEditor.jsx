import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

const NoteEditor = ({ selectedNote, saveChangeNote }) => {
  const editorRef = useRef(null);
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');
  const [oldNote, setOldNote] = useState();
  const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing

  useEffect(() => {
    if (selectedNote?.uuid) {
      setLocalTitle(selectedNote.title || '');
      setLocalContent(selectedNote.content || '');
    } else {
      setLocalTitle('');
      setLocalContent('');
    }
  }, [selectedNote]);

  useEffect(() => {
    if (oldNote?.uuid !== selectedNote?.uuid) {
      saveChanges();
      setOldNote(selectedNote);
    }
  }, [selectedNote]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (localContent !== selectedNote?.content || localTitle !== selectedNote?.title) {
        saveChanges(localTitle, localContent);
        e.returnValue = ''; // Показать предупреждение о несохраненных данных
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [localTitle, localContent, selectedNote]);
  

  const saveChanges = (title, content) => {
    if (selectedNote?.uuid) {
      saveChangeNote({
        uuid: selectedNote.uuid,
        newTitle: title,
        newContent: content,
      });
    }
  };
  
  const debounceSaveChanges = (title, content) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(() => {
        saveChanges(title, content);
      }, 1000)
    );
  };
  
  const handleContentChange = (value) => {
    setLocalContent(value);
    debounceSaveChanges(localTitle, value);
  };
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    debounceSaveChanges(newTitle, localContent);
  };
  
  const renderEditor = () => (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      value={localContent}
      readOnly={!selectedNote}
      onChange={handleContentChange}
      placeholder="Compose an epic..."
      className="flex-grow border-none focus:ring-0 focus:outline-none"
      modules={{
        toolbar: selectedNote
          ? [
              ['bold', 'italic', 'underline', 'strike'],
              ['link'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['clean'],
            ]
          : [],
      }}
    />
  );

  return (
    <div className="w-full max-h-[40rem] h-full flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        {selectedNote?.title ? (
          <input
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="Enter note title"
            className="appearance-none bg-transparent border-none outline-none w-full p-0 m-0 text-inherit shadow-none"
          />
        ) : (
          'Select a Note'
        )}
      </h2>
      {selectedNote.uuid ? (
        <>
          {renderEditor()}
          <div className="mt-4 flex justify-center"></div>
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
