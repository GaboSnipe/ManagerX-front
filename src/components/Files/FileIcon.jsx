import React from 'react';
import { FaFile } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const files = {
    "uuid": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
    "files": [
        {
            "uuid": "03a280e7-9c33-43aa-b5e4-e80e9b8bab99",
            "title": ".eslintrc.cjs",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/.eslintrc.cjs",
            "created_at": "2024-07-15T10:36:21.658442Z",
            "updated_at": "2024-07-15T10:36:21.658466Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        },
        {
            "uuid": "f72c78e8-4402-47f5-8c99-9f70599a8d43",
            "title": ".gitignore",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/.gitignore",
            "created_at": "2024-07-15T10:36:22.003489Z",
            "updated_at": "2024-07-15T10:36:22.003504Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        },
        {
            "uuid": "4594a2a3-987e-46dc-bcea-82afa5a001ce",
            "title": "index.html",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/index.html",
            "created_at": "2024-07-15T10:36:22.349961Z",
            "updated_at": "2024-07-15T10:36:22.349979Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        },
        {
            "uuid": "af93d484-236e-48e8-a61d-67618c744900",
            "title": "package.json",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/package.json",
            "created_at": "2024-07-15T10:36:22.696495Z",
            "updated_at": "2024-07-15T10:36:22.696513Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        },
        {
            "uuid": "a68c70de-399a-444a-936b-dae58c1179c7",
            "title": "package-lock.json",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/package-lock.json",
            "created_at": "2024-07-15T10:36:23.610372Z",
            "updated_at": "2024-07-15T10:36:23.610388Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        },
        {
            "uuid": "658445f1-cdd7-4fd2-aa8a-a9da1d2cd781",
            "title": "postcss.config.js",
            "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/postcss.config.js",
            "created_at": "2024-07-15T10:36:23.926537Z",
            "updated_at": "2024-07-15T10:36:23.926552Z",
            "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
            "tags": []
        }
    ],
    "title": "test3, magidebi",
    "customer": "test3",
    "case": "magidebi",
    "status": "TODO",
    "path": "media/uploads/test3/magidebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:21:14.371010Z",
    "updated_at": "2024-07-14T20:46:42.897841Z",
    "tags": []
};

const setFile = (project) => ({
    type: 'SET_FILE',
    payload: project,
  });
  
  const setSeeResizebleDiv = (value) => ({
    type: 'SET_WORKPLACE_FILE_SEE_RESIZEBLEDIV',
    payload: value,
  });

const FileIcon = () => {
  const selectedFile = useSelector((state) => state.WorkPlace.fileInfo);
    const dispatch = useDispatch();
    const handleClick = (file) => {
            dispatch(setFile(file));
            dispatch(setSeeResizebleDiv(true));
    };

    return (
        <div className="flex flex-wrap gap-4">
            {files.files.map(file => (
                <div key={file.uuid} className="flex flex-col items-center justify-center h-36">
                    <button onClick={() => handleClick(file)} className={`relative flex items-center justify-center ${selectedFile.uuid === file.uuid ? 'text-blue-500 bg-gray-300 w-full h-full content-center rounded-lg' : ''}`}>
                        <FaFile className={`${selectedFile.uuid === file.uuid ? 'text-blue-500' : 'text-gray-500'} text-6xl`} />
                    </button>
                    <span className={`${selectedFile.uuid === file.uuid ? 'text-white bg-blue-500 rounded-lg font-bold ' : ''}mt-2 text-sm p-2 rounded-lg whitespace-normal break-words w-24 h-12 flex items-center justify-center text-center`}>{file.title}</span>
                </div>
            ))}
        </div>
    );
};

export default FileIcon;
