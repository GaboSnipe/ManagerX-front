import React, { useState, useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor } from './';

const TextEditor = ({ isEditing, defaultValue, setFormData }) => {
  const [readOnly, setReadOnly] = useState(isEditing);
  const quillRef = useRef(null);


  useEffect(() => {
    setReadOnly(!isEditing);
  }, [isEditing]);

  const handleTextChange = (contentString) => {
    setFormData(prevData => ({
      ...prevData,
      comment: contentString
    }));
  };


  return (
    <section >
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onTextChange={handleTextChange}
        />
    </section>
  );
};

export default TextEditor;
