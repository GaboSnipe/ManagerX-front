import React from 'react';
import { FaFile } from 'react-icons/fa';
import { useSelector } from 'react-redux';


// const files = {
//     "uuid": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//     "files": [
//         {
//             "uuid": "03a280e7-9c33-43aa-b5e4-e80e9b8bab99",
//             "title": ".eslintrc.cjs",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/.eslintrc.cjs",
//             "created_at": "2024-07-15T10:36:21.658442Z",
//             "updated_at": "2024-07-15T10:36:21.658466Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         },
//         {
//             "uuid": "f72c78e8-4402-47f5-8c99-9f70599a8d43",
//             "title": ".gitignore",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/.gitignore",
//             "created_at": "2024-07-15T10:36:22.003489Z",
//             "updated_at": "2024-07-15T10:36:22.003504Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         },
//         {
//             "uuid": "4594a2a3-987e-46dc-bcea-82afa5a001ce",
//             "title": "index.html",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/index.html",
//             "created_at": "2024-07-15T10:36:22.349961Z",
//             "updated_at": "2024-07-15T10:36:22.349979Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         },
//         {
//             "uuid": "af93d484-236e-48e8-a61d-67618c744900",
//             "title": "package.json",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/package.json",
//             "created_at": "2024-07-15T10:36:22.696495Z",
//             "updated_at": "2024-07-15T10:36:22.696513Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         },
//         {
//             "uuid": "a68c70de-399a-444a-936b-dae58c1179c7",
//             "title": "package-lock.json",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/package-lock.json",
//             "created_at": "2024-07-15T10:36:23.610372Z",
//             "updated_at": "2024-07-15T10:36:23.610388Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         },
//         {
//             "uuid": "658445f1-cdd7-4fd2-aa8a-a9da1d2cd781",
//             "title": "postcss.config.js",
//             "file": "https://mysite-uoqd.onrender.com/media/uploads/media/uploads/test3/magidebi/postcss.config.js",
//             "created_at": "2024-07-15T10:36:23.926537Z",
//             "updated_at": "2024-07-15T10:36:23.926552Z",
//             "folder": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
//             "tags": []
//         }
//     ],
//     "title": "test3, magidebi",
//     "customer": "test3",
//     "case": "magidebi",
//     "status": "TODO",
//     "path": "media/uploads/test3/magidebi/",
//     "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
//     "created_at": "2024-07-13T12:21:14.371010Z",
//     "updated_at": "2024-07-14T20:46:42.897841Z",
//     "tags": []
// };


const FileIcon = ({ handleClick, selectedFile, files }) => {

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {files.length === 0 ? (
        <h1 className=' text-7xl text-center'>Files are empty</h1>
      ) : (
        files.map(file => (
          <button
            key={file.uuid}
            onClick={() => handleClick(file)}
            className={`relative flex flex-col justify-center items-center h-36 w-36 ${selectedFile.uuid === file.uuid ? 'bg-gray-300 p-1 rounded-lg' : ''}`}
          >
            <FaFile className="text-yellow-400 text-6xl" />
            <span className={`mt-2 text-sm p-2 rounded-lg whitespace-normal break-words text-center`}>
              {file.title}
            </span>
          </button>
        ))
      )}
    </div>
  );
};

export default FileIcon;