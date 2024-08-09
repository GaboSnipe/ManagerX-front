import React from 'react';
import {FaFile, FaFolder} from 'react-icons/fa';
import { useSelector } from 'react-redux';


const FileIcon = ({ handleClick, selectedFile, files, listView }) => {

  return (
      <div className={`flex ${listView ? "flex-col items-start justify-start w-full" : "flex-wrap justify-center items-center"}  gap-4`}>
        {files.length === 0 ? (
            <h1 className='text-2xl text-center text-gray'>empty</h1>
        ) : (
            files.map(file => (
                <button
                    key={file.uuid}
                    onClick={() => handleClick(file)}
                    className={`relative flex items-center hover:bg-gray-300 ${listView === true ? 'flex-row h-4 w-full justify-start p-4' : 'flex-col h-36 w-36 justify-center'}  ${selectedFile.uuid === file.uuid ? 'bg-gray-300 p-1 rounded-lg' : ''}`}
                >
                  <FaFile className={`text-yellow-400 ${listView === true ? 'text-xl' : 'text-6xl'}`}/>
                  <span className={`${listView === true ? '' : 'mt-1'} text-sm p-4 rounded-lg whitespace-normal break-words text-center`}>
                    {file.title}
                  </span>
                </button>
  )
)
)}
</div>
)
  ;
};

export default FileIcon;