import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setFolder, removeFolder, setIsModalOpen, setSeeResizebleDiv } from '../../features/workplace/workplaceSlice';
import { toast, ToastContainer } from 'react-toastify';
import ModalWindow from '../ModalWindow';
import { deleteFolderThunk, getFolderDetailsThunk } from '../../features/workplace/workplaceThunk';

const CustomContextMenu = ({ x, y, onClose, folder }) => {
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

  const handleEdit = () => {
    dispatch(getFolderDetailsThunk(folder.uuid));
    dispatch(setSeeResizebleDiv(true));
    onClose();
  };

  const handleRemove = () => {
    setDangerShow(true);
  };



  const confirmDelete = () => {
    dispatch(deleteFolderThunk(folder.uuid));
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
            <li className="text-yellow-600 font-bold">
              <button onClick={handleEdit}>Edit</button>
            </li>
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
            <p className="text-sm text-gray-600 mt-2">Do you really want to delete this Folder?</p>
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
          folder={contextMenu.folder}
        />
      )}
    </div>
  );
};

export default FolderIcon;
