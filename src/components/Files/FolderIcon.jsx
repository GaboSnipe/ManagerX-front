import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setFolder, removeFolder } from '../../features/workplace/workplaceSlice';
import { toast, ToastContainer } from 'react-toastify';

// Компонент для контекстного меню
const CustomContextMenu = ({ x, y, onClose, selectedFolder }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
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
    if (selectedFolder && newTitle.trim() !== '') {
      dispatch(setFolder({ ...selectedFolder, title: newTitle }));
      setNewTitle('');
      onClose();
    } else {
      toast.warning('Please enter a valid folder name');
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
      ref={menuRef}
      className="bg-gray-900 p-4 rounded-lg"
      style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}
    >
      <ul>
        <li className="text-yellow-600 font-bold">
          <button onClick={handleRemove}>Rename</button>
        </li>
        <li className="text-red-600 font-bold mt-2">
          <button onClick={handleRemove}>Delete</button>
        </li>
        <li className="text-green-600 font-bold mt-2">
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
  const [isEditing, setIsEditing] = useState(false);
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

  const handleContextMenu = (event, folder) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      folder: folder,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const isSelected = (folder) => selectedFolder?.uuid === folder.uuid;
  const listViewClass = listView ? 'flex-row h-4' : 'flex-col h-36';

  return (
    <div className="flex flex-wrap gap-4">
      {folders.map((folder) => (
        <button
          key={folder.uuid}
          onContextMenu={(e) => {
            e.stopPropagation();
            handleContextMenu(e, folder);
          }}
          onClick={() => handleClick(folder)}
          className={`relative flex items-center justify-center hover:bg-gray-200 hover:rounded-lg ${listViewClass} ${isSelected(folder) ? 'bg-gray-300 p-1 content-center rounded-lg' : ''}`}
        >

          <FaFolder className={`text-yellow-400 ${listView ? 'text-xl' : 'text-6xl'}`} />
          {isEditing ? (
            <input
              value={folder.title}
              className={`${listView ? '' : 'mt-1'} text-sm p-1 rounded-lg whitespace-normal break-words w-24 h-14 flex items-center justify-center text-center resize-none`}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
<div
  className={`${listView ? '' : 'mt-1'} text-sm p-1 rounded-lg w-24 h-12 flex items-center justify-center overflow-hidden whitespace-normal leading-tight`}
>
  <span className="break-all">
    {folder.title}
  </span>
</div>




          )}



        </button>
      ))}
      {contextMenu && (
        <CustomContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onClose={handleClose}
          selectedFolder={contextMenu.folder}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default FolderIcon;
