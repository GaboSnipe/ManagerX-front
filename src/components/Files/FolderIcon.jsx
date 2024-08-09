import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setFolder, removeFolder } from '../../features/workplace/workplaceSlice';
import { toast, ToastContainer } from 'react-toastify';

const CustomContextMenu = ({ x, y, onClose, selectedFolder }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.workplace.folders);

  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleEdit = () => {
    if (selectedFolder) {
      dispatch(setFolder({ ...selectedFolder, title: newTitle }));
      setNewTitle('');
      onClose();
    }
  };

  const handleRemove = () => {
    if (selectedFolder && Object.keys(selectedFolder).length > 0) {
      if (window.confirm('Are you sure you want to delete this folder?')) {
        dispatch(removeFolder(selectedFolder.uuid));
        onClose();
      }
    } else {
      toast.warning('Please select a folder to delete');
    }
  };

  return (
    <div
      className='bg-gray-900 p-4 rounded-lg'
      style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}>
      <ul>
        <li className='text-yellow-600 font-bold'>
          <button onClick={handleEdit}>Rename</button>
        </li>
        <li className='text-red-600 font-bold'>
          <button onClick={handleRemove}>Delete</button>
        </li>
        <li className='text-green-600 font-bold'>
          <button onClick={onClose}>Cancel</button>
        </li>
      </ul>
    </div>
  );
};

const FolderIcon = ({ onDoubleClick, handleSingleClick, folders, listView }) => {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.workplace.folderInfo);
  const [contextMenu, setContextMenu] = useState(null);

  const timerRef = useRef(null);
  const doubleClickThreshold = 250;

  const handleClick = (folder) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      handleDoubleClick(folder);
    } else {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        handleSingleClick(folder);
      }, doubleClickThreshold);
    }
  };

  const handleDoubleClick = (folder) => {
    if (onDoubleClick) {
      onDoubleClick(folder);
      dispatch(setFolder(folder));
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {folders.map((folder) => (
        <button
          key={folder.uuid}
          onContextMenu={handleContextMenu}
          onClick={() => handleClick(folder)}
          className={`relative flex items-center justify-center hover:bg-gray-300 ${listView === true ? 'flex-row h-4' : 'flex-col h-36'} ${selectedFolder.uuid === folder.uuid ? 'bg-gray-300 p-1 content-center rounded-lg' : ''}`}
        >
          <FaFolder className={`text-yellow-400 ${listView === true ? 'text-xl' : 'text-6xl'}`} />
          <span className={`${listView === true ? '' : 'mt-1'} text-sm p-1 rounded-lg whitespace-normal break-words w-24 h-12 flex items-center justify-center text-center`}>
            {folder.title}
          </span>
        </button>
      ))}
      {contextMenu && (
        <CustomContextMenu x={contextMenu.mouseX} y={contextMenu.mouseY} onClose={handleClose} selectedFolder={selectedFolder} />
      )}
      <ToastContainer />
    </div>
  );
};

export default FolderIcon;
