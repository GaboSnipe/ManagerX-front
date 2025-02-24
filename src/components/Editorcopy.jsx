import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "./customQuillStyles.css";

const toolbarOptions = [
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
  ['clean']
];

const formats = [
  'header', 'font',
  'list', 'bullet',
  'bold', 'italic', 'underline',
  'color', 'background',
  'link'
];

const Editorcopy = forwardRef(({ readOnly, defaultValue, onTextChange }, ref) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // Prevent errors if container is null

    const editorContainer = container.ownerDocument.createElement('div');
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow',
    });

    quillRef.current = quill;
    if (ref && ref.current) {
      ref.current = quill;
    }

    if (defaultValue) {
      try {
        const delta = JSON.parse(defaultValue);
        quill.setContents(delta);
      } catch (error) {
        console.error(error);
      }
    }

    quill.on('text-change', () => {
      if (onTextChange) {
        const delta = quill.getContents();
        const contentString = JSON.stringify(delta);
        onTextChange(contentString);
      }
    });
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
      const toolbar = quillRef.current.getModule('toolbar');
      if (toolbar) {
        toolbar.container.style.display = readOnly ? 'none' : '';
      }
    }

    return () => {
      if (ref && ref.current) {
        ref.current = null;
      }
      container.innerHTML = '';
    };
  }, [defaultValue, onTextChange, ref, readOnly]);

  return <div ref={containerRef}></div>;
});

Editorcopy.displayName = 'Editorcopy';

export default Editorcopy;
