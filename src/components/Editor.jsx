import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "./customQuillStyles.css"

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

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.ownerDocument.createElement('div');
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
      });

      quillRef.current = quill;
      ref.current = quill;

      if (defaultValue) {
        try {
          const delta = JSON.parse(defaultValue);
          quill.setContents(delta);
        } catch (error) {
          console.error('Ошибка при разборе начального значения:', error);
        }
      }

      quill.on('text-change', () => {
        if (onTextChange) {
          const delta = quill.getContents();
          const contentString = JSON.stringify(delta);
          onTextChange(contentString);
        }
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref, defaultValue]);

    useLayoutEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!readOnly);
        const toolbar = quillRef.current.getModule('toolbar');
        if (toolbar) {
          toolbar.container.style.display = readOnly ? 'none' : '';
        }
      }
    }, [readOnly]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;