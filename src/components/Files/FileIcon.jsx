import React, { useEffect, useRef, useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteFileThunk } from '../../features/workplace/workplaceThunk';


const CustomContextMenu = ({ x, y, onClose, file }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState('');
  const [dangerShow, setDangerShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleRemove = () => {
    setDangerShow(true);
  };

  const confirmDelete = () => {
    dispatch(deleteFileThunk(file.uuid));
    onClose();
  }
  const cancelDelete = () => {
    setDangerShow(false);
    onClose();
  }
  

  return (
    <>
      {!dangerShow ? (
        <div
          ref={menuRef}
          className="bg-gray-900 p-4 rounded-lg"
          style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}
        >
          <ul>
            <li className="text-red-600 font-bold mt-2">
              <button onClick={handleRemove}>Delete</button>
            </li>
            <li className="text-green-600 font-bold mt-2">
              <button onClick={onClose}>Cancel</button>
            </li>
          </ul>

        </div>) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2">Do you really want to delete this File?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )
      }
    </>

  );
};

const FileIcon = ({ handleClick, selectedFile, files, listView }) => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event, file) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      file: file,
    });
  };


  return (
    <div>

      <div className={`flex ${listView ? "flex-col items-start justify-start w-full" : "flex-wrap justify-center items-center"}  gap-4`}>
        {files.length === 0 ? (
          <h1 className='text-2xl text-center text-gray'>empty</h1>
        ) : (
          files.map(file => (
            <button
              key={file.uuid}
              onClick={() => handleClick(file)}
              onContextMenu={(e) => {
                e.stopPropagation();
                handleContextMenu(e, file);
              }}
              className={`relative flex items-center hover:bg-gray-300 ${listView === true ? 'flex-row h-4 w-full justify-start p-4' : 'flex-col h-36 w-36 justify-center'}  ${selectedFile.uuid === file.uuid ? 'bg-gray-300 p-1 rounded-lg' : ''}`}
            >
              <FaFile className={`text-yellow-400 ${listView === true ? 'text-xl' : 'text-6xl'}`} />
              <span className={`${listView === true ? '' : 'mt-1'} text-sm p-4 rounded-lg whitespace-normal break-words text-center`}>
                {file.title}
              </span>
            </button>
          )))}
      </div>
      {contextMenu && (
        <CustomContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onClose={handleClose}
          file={contextMenu.file}
        />
      )}
    </div>
  );
};

export default FileIcon;