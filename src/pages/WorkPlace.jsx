import React, { useState } from 'react';
import { FolderIcon, FileIcon, ResizableDiv } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';

const setSeeFolderResizebleDiv = (value) => ({
  type: 'SET_WORKPLACE_FOLDER_SEE_RESIZEBLEDIV',
  payload: value,
});
const setSeeFileResizebleDiv = (value) => ({
  type: 'SET_WORKPLACE_FILE_SEE_RESIZEBLEDIV',
  payload: value,
});
const setFolder = (value) => ({
  type: 'SET_FOLDER',
  payload: value,
});
const setFile = (value) => ({
  type: 'SET_FILE',
  payload: value,
});

const WorkPlace = () => {
  const dispatch = useDispatch();
  const seeFolderResizebleDiv = useSelector((state) => state.WorkPlace.seeResizebleDivFolder);
  const seeFileResizebleDiv = useSelector((state) => state.WorkPlace.seeResizebleDivFile);
  const selectedFolder = useSelector((state) => state.WorkPlace.folderInfo);
  const selectedFile = useSelector((state) => state.WorkPlace.fileInfo);

  const [showFileIcon, setShowFileIcon] = useState(false);

  const backButton = () => {
    setShowFileIcon(false);
    dispatch(setFolder({}));
    dispatch(setFile({}));
    dispatch(setSeeFileResizebleDiv(false));
  }
  const folderShowClose = () => {
    dispatch(setSeeFolderResizebleDiv(false));
    dispatch(setFolder({}));

  }
  const fileShowClose = () => {
    dispatch(setSeeFileResizebleDiv(false));
    dispatch(setFile({}));

  }

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-full">
        {showFileIcon &&
          <button
            onClick={backButton}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>}
        <div className="flex">  
          <div className="w-full flex-1 overflow-x-auto mb-8 overflow-hidden rounded-lg sm:px-6 lg:px-8 mt-5">
            <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8">
              {showFileIcon ? (
                <FileIcon />
              ) : (
                <FolderIcon
                  onDoubleClick={() => setShowFileIcon(true)} // Передайте обработчик двойного клика
                />
              )}
            </div>
          </div>
          {seeFolderResizebleDiv && (
            <ResizableDiv setSeeResizebleDiv={folderShowClose}>
              <p className="text-purple-800 text-5xl tex">{selectedFolder.uuid}</p>
            </ResizableDiv>
          )}
          {seeFileResizebleDiv && (
            <ResizableDiv setSeeResizebleDiv={fileShowClose}>
              <p className="text-purple-800 text-5xl tex">{selectedFile.uuid}</p>
            </ResizableDiv>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkPlace;
