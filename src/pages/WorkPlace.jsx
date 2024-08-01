import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { FolderIcon, FileIcon, ResizableDiv } from '../components';
import { setFolder, setFile } from '../features/workplace/workplaceSlice';

const WorkPlace = () => {
  const dispatch = useDispatch();
  const [seeFolderResizebleDiv, setSeeFolderResizebleDiv] = useState(false);
  const [seeFileResizebleDiv, setSeeFileResizebleDiv] = useState(false);
  const selectedFolder = useSelector((state) => state.workplace.folderInfo);
  const selectedFile = useSelector((state) => state.workplace.fileInfo);

  const [showFileIcon, setShowFileIcon] = useState(false);

  const backButton = () => {
    setShowFileIcon(false);
    dispatch(setFolder({}));
    dispatch(setFile({}));
    setSeeFileResizebleDiv(false);
  }

  const folderShowClose = () => {
    setSeeFolderResizebleDiv(false);
    dispatch(setFolder({}));
  }

  const fileShowClose = () => {
    setSeeFileResizebleDiv(false);
    dispatch(setFile({}));
  }
  const handleClick = (file) => {
    dispatch(setFile(file));
    setSeeFileResizebleDiv(true);
  };
  const handlFoldereSingleClick = (folder) => {
    dispatch(setFolder(folder));
    setSeeFolderResizebleDiv(true);
  };
  const handlFoldereDoubleClick = (folder) => {
    setShowFileIcon(true);
    setSeeFolderResizebleDiv(false);
  };


  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-full">
        {showFileIcon && (
          <button
            onClick={backButton}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        )}
        <div className="flex">
          <div className="w-full flex-1 overflow-x-auto mb-8 overflow-hidden rounded-lg sm:px-6 lg:px-8 mt-5">
            <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8">
              {showFileIcon ? (
                <FileIcon handleClick={handleClick} selectedFile={selectedFile} />

              ) : (
                <FolderIcon onDoubleClick={handlFoldereDoubleClick} handleSingleClick={handlFoldereSingleClick}/>
              )}
            </div>
          </div>
          {seeFolderResizebleDiv && (
            <ResizableDiv setSeeResizebleDiv={folderShowClose}>
              <p className="text-purple-800 text-5xl">{selectedFolder.uuid}</p>
            </ResizableDiv>
          )}
          {seeFileResizebleDiv && (
            <ResizableDiv setSeeResizebleDiv={fileShowClose}>
              <p className="text-purple-800 text-5xl">{selectedFile.uuid}</p>
            </ResizableDiv>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkPlace;
