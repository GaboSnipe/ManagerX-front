import React, { useState, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import {Editor} from '../../';
import Quill from 'quill/core';

const Delta = Quill.import('delta');

const TextEditor = () => {
  const quillRef = useRef(null);
  const [readOnly, setReadOnly] = useState(true);

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  return (
    <section className="w-auto p-5">
      <p className="text-start text-gray-700 text-2xl mb-4">Description: </p>
      <div className="p-5 border border-gray-300 rounded">
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()
            .insert('Hello')
            .insert('\n', { header: 1 })
            .insert('Some ')
            .insert('initial', { bold: true })
            .insert(' ')
            .insert('content', { underline: true })
            .insert('\n')}
        />
      </div>

    </section>
  );
};

export default TextEditor;
