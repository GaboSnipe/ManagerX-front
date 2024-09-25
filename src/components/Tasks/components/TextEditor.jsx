import React, { useState, useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor } from '../../';

const TextEditor = ({ isEditing, defaultValue, setFormData }) => {
  const [readOnly, setReadOnly] = useState(false);
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
    <section className="w-auto p-5 max-h-96 overflow-y-auto overflow-x-hidden">
      <p className="text-start text-gray-700 text-2xl mb-4">აღწერა:</p>
      <div className="p-5 border border-gray-300 rounded">
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onTextChange={handleTextChange}
        />
      </div>
    </section>
  );
};

export default TextEditor;
