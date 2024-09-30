import React, { useEffect, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { ReactFileManager } from "../../lib";
import "../../lib/style.css"
import FileService from "../services/FileService"
import { useDispatch } from 'react-redux';
import { createRcFolder, getRcFileList, uploadRcFile } from '../features/workplace/workplaceThunk';
import DocViewer from 'react-doc-viewer';
import { useSelector } from 'react-redux';


const NewWorkPlace = () => {
  const dispatch = useDispatch();
  const [fileBrowserStory, setFileBrowserStory ] = useState([]);
  const [parrentPath, setParrentPath] = useState("");
  const loadingFile = useSelector(state => state.workplace.fileLoading);



  const getFileBrowser = async (settings) => {
    const defaultSettings = {
      "fs": "GoogleDrive:",
      "remote": "",
    };
    try {
      const response = await dispatch(getRcFileList(settings || defaultSettings));
      if (response.payload) {
        setFileBrowserStory(response.payload.list);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(()=>{

    getFileBrowser();
  },[])

  const onDoubleClick = (fileObj) => {
    if(fileObj.IsDir){
      let settings = {
        "fs": "GoogleDrive:",
        "remote":  fileObj.Path,
    }
      getFileBrowser(settings);
      setParrentPath(fileObj.Path);
    }else {
      window.open(`https://drive.google.com/open?id=${fileObj.ID}`, '_blank');
    }
  }

  function removeLastSegment(path) {
    const dirArray = Array.from(path);

    let lastSlashIndex = -1;
    for (let i = dirArray.length - 1; i >= 0; i--) {
        if (dirArray[i] === '/') {
            lastSlashIndex = i;
            break;
        }
    }

    if (lastSlashIndex > -1) {
        return dirArray.slice(0, lastSlashIndex).join('');
    }

    return '';
}


  const handleGoUp = async () => {
    const parrentDit = removeLastSegment(parrentPath);
    let settings = {
      "fs": "GoogleDrive:",
      "remote":  parrentDit,
  }
    getFileBrowser(settings);
    setParrentPath(parrentDit)
  };

  const createFolder = async (folderName) => {
    const remotePath = `${parrentPath}${parrentPath ? '/' : ''}${folderName}`;
    dispatch(createRcFolder(remotePath))
      .then(() => {
        getFileBrowser({
          fs: "GoogleDrive:",
          remote: parrentPath,
        });
      });
  };
  
  
  const uploadFile = async (file) => {
    try {
      await dispatch(uploadRcFile({ remotePath: parrentPath, file }));
      
      getFileBrowser({
        fs: "GoogleDrive:",
        remote: parrentPath,
      });
    } catch (error) {
      console.error(error);
    }
    
  };
  

  return (
        <>
        <div className="min-h-full">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className='border-2 border-gray-200 rounded-lg'>
          <ReactFileManager fs={fileBrowserStory} onDoubleClick={onDoubleClick} parrentPath={parrentPath} goUp={handleGoUp} onCreateFolder={createFolder} onUpload={uploadFile}  loading={loadingFile}/> 

          </div>

          </div>
        </div>
      </>
  );
}

export default NewWorkPlace;
