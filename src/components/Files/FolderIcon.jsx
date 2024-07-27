import React, { useState, useRef } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const folders = [
  {
    "uuid": "b136783f-d285-47a9-ab4c-581ca05ba7a1",
    "title": "test4, kedlebi",
    "customer": "test4",
    "case": "kedlebi",
    "status": "TODO",
    "path": "media/uploads/test4/kedlebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:21:24.549962Z",
    "updated_at": "2024-07-14T20:46:20.223624Z",
    "tags": []
  },
  {
    "uuid": "9ad35fde-2072-4734-bd29-eb5112469efb",
    "title": "test6, skamebi",
    "customer": "test6",
    "case": "skamebi",
    "status": "DONE",
    "path": "media/uploads/test6/skamebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:22:20.497066Z",
    "updated_at": "2024-07-14T20:46:34.235448Z",
    "tags": []
  },
  {
    "uuid": "566e53c6-b9f2-41c3-8c20-a504695d1d5a",
    "title": "test3, magidebi",
    "customer": "test3",
    "case": "magidebi",
    "status": "TODO",
    "path": "media/uploads/test3/magidebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:21:14.371010Z",
    "updated_at": "2024-07-14T20:46:42.897841Z",
    "tags": []
  },
  {
    "uuid": "49c5db3e-1ae0-4a66-abc6-4a109c8f2671",
    "title": "test1, fanjrebi",
    "customer": "test1",
    "case": "fanjrebi",
    "status": "TODO",
    "path": "media/uploads/test1/fanjrebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:20:59.689138Z",
    "updated_at": "2024-07-14T20:46:52.370607Z",
    "tags": []
  },
  {
    "uuid": "44be808c-5f2b-4044-b349-7c2fdc746f1f",
    "title": "test, karebi",
    "customer": "test",
    "case": "karebi",
    "status": "TODO",
    "path": "media/uploads/test/karebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:20:45.134924Z",
    "updated_at": "2024-07-14T20:47:04.576285Z",
    "tags": []
  },
  {
    "uuid": "1a6a45a1-c2f8-42a1-a5d4-cfe021b8ee1c",
    "title": "test2, saxuravebi",
    "customer": "test2",
    "case": "saxuravebi",
    "status": "TODO",
    "path": "media/uploads/test2/saxuravebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:21:06.042643Z",
    "updated_at": "2024-07-14T20:47:17.163410Z",
    "tags": []
  },
  {
    "uuid": "0497bcd6-28e4-4a5e-a0be-bbab9d1c624a",
    "title": "test5, karadebi",
    "customer": "test5",
    "case": "karadebi",
    "status": "INPROGRESS",
    "path": "media/uploads/test5/karadebi/",
    "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
    "created_at": "2024-07-13T12:22:06.685924Z",
    "updated_at": "2024-07-14T20:47:25.890985Z",
    "tags": []
  },
  {
    "uuid": "e6c9ea61-0d1e-44c0-8d52-7f67e90161c4",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:20.023391Z",
    "updated_at": "2024-07-15T00:58:20.023408Z",
    "tags": []
  },
  {
    "uuid": "58141240-6baf-414c-bfb1-0a32f86528b2",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:29.064887Z",
    "updated_at": "2024-07-15T00:58:29.064902Z",
    "tags": []
  },
  {
    "uuid": "4fecb7a5-a569-40a9-aa87-47c7f96415ee",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:32.887788Z",
    "updated_at": "2024-07-15T00:58:32.887801Z",
    "tags": []
  },
  {
    "uuid": "e545e860-2153-4d01-baba-1f79502e18d9",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:35.876856Z",
    "updated_at": "2024-07-15T00:58:35.876869Z",
    "tags": []
  },
  {
    "uuid": "482c0d53-dca3-4e4d-b707-baae4c4631cb",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:36.072738Z",
    "updated_at": "2024-07-15T00:58:36.072750Z",
    "tags": []
  },
  {
    "uuid": "88c2a748-7720-45e0-b71b-9ee20a47e838",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:36.228040Z",
    "updated_at": "2024-07-15T00:58:36.228059Z",
    "tags": []
  },
  {
    "uuid": "a04989b9-4dd6-4684-a0f5-10d81d896019",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:36.513983Z",
    "updated_at": "2024-07-15T00:58:36.513998Z",
    "tags": []
  },
  {
    "uuid": "8e2bd9c3-a0bf-4674-a961-9b9f6d838d4e",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:36.726788Z",
    "updated_at": "2024-07-15T00:58:36.726804Z",
    "tags": []
  },
  {
    "uuid": "6c724500-2e63-48da-bf1f-85ebc7eb4b51",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T00:58:37.040122Z",
    "updated_at": "2024-07-15T00:58:37.040135Z",
    "tags": []
  },
  {
    "uuid": "a805b5b1-cf19-4d6c-b525-8346a37905c6",
    "title": "adeqi adeqi adeqi, adeqi",
    "customer": "adeqi adeqi adeqi",
    "case": "adeqi",
    "status": "TODO",
    "path": "media/uploads/adeqi adeqi adeqi/adeqi/",
    "comment": "adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi adeqi",
    "created_at": "2024-07-15T01:00:52.268365Z",
    "updated_at": "2024-07-15T01:00:52.268378Z",
    "tags": []
  },
  {
    "uuid": "ab044646-8f75-45bc-8435-6a2208a32e5e",
    "title": "a, b",
    "customer": "a",
    "case": "b",
    "status": "TODO",
    "path": "media/uploads/a/b/",
    "comment": "1",
    "created_at": "2024-07-15T01:02:10.187645Z",
    "updated_at": "2024-07-15T01:02:10.187666Z",
    "tags": []
  },
  {
    "uuid": "97132374-e98b-4533-abba-6ea3bbc71603",
    "title": "adwawwwa, dawdawad",
    "customer": "adwawwwa",
    "case": "dawdawad",
    "status": "TODO",
    "path": "media/uploads/adwawwwa/dawdawad/",
    "comment": "dawdadad",
    "created_at": "2024-07-15T02:04:51.785757Z",
    "updated_at": "2024-07-15T02:04:51.785773Z",
    "tags": []
  },
  {
    "uuid": "ecb6d8c7-7a64-4b98-815a-8ca59196022d",
    "title": "aaadadwda, daaa",
    "customer": "aaadadwda",
    "case": "daaa",
    "status": "TODO",
    "path": "media/uploads/aaadadwda/daaa/",
    "comment": "adada",
    "created_at": "2024-07-15T02:05:59.737336Z",
    "updated_at": "2024-07-15T02:05:59.737348Z",
    "tags": []
  },
  {
    "uuid": "6bd707c4-58fe-4d9b-b47e-ecfbdf5dacdc",
    "title": "asdasd, dasd",
    "customer": "asdasd",
    "case": "dasd",
    "status": "TODO",
    "path": "media/uploads/asdasd/dasd/",
    "comment": "dddd",
    "created_at": "2024-07-15T02:54:49.342449Z",
    "updated_at": "2024-07-15T02:54:49.342466Z",
    "tags": []
  },
  {
    "uuid": "ee55592e-a95c-4488-ae75-01aab00710f2",
    "title": "ad, dd",
    "customer": "ad",
    "case": "dd",
    "status": "TODO",
    "path": "media/uploads/ad/dd/",
    "comment": "saa",
    "created_at": "2024-07-15T09:08:00.158487Z",
    "updated_at": "2024-07-15T09:08:00.158516Z",
    "tags": []
  },
  {
    "uuid": "ef0eab2c-91fe-43b5-8df2-0423e57b5ab7",
    "title": "ad, dd",
    "customer": "ad",
    "case": "dd",
    "status": "TODO",
    "path": "media/uploads/ad/dd/",
    "comment": "saa",
    "created_at": "2024-07-15T09:08:00.160744Z",
    "updated_at": "2024-07-15T09:08:00.160776Z",
    "tags": []
  }
]



const setFolder = (project) => ({
  type: 'SET_FOLDER',
  payload: project,
});

const setSeeResizebleDiv = (value) => ({
  type: 'SET_WORKPLACE_FOLDER_SEE_RESIZEBLEDIV',
  payload: value,
});



const CustomContextMenu = ({ x, y, onClose }) => {
  return (
    <div 
    className='bg-zinc-800 p-4 rounded-lg'
    style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}>
      <ul>
        <li className='text-yellow-600 font-bold'  onClick={onClose}>Rename</li>
        <li className='text-red-600 font-bold' onClick={onClose}>Delete</li>
        <li className='text-green-600 font-bold' onClick={onClose}>kide ragac</li>
      </ul>
    </div>
  );
};

const FolderIcon = ({ onDoubleClick }) => {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.WorkPlace.folderInfo);
  const seeResizebleDiv = useSelector((state) => state.WorkPlace.seeResizebleDiv);
  const [contextMenu, setContextMenu] = useState(null);

  const [clickTimeout, setClickTimeout] = useState(null);
  const doubleClickThreshold = 250;
  const timerRef = useRef(null);

  const handleSingleClick = (folder) => {
    dispatch(setFolder(folder));
    dispatch(setSeeResizebleDiv(true));
  };

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
      onDoubleClick();
      dispatch(setFolder(folder));
      dispatch(setSeeResizebleDiv(false));
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
          className={`relative flex flex-col items-center justify-center h-36 ${selectedFolder.uuid === folder.uuid ? 'bg-gray-300 p-1 content-center rounded-lg' : ''}`}
        >
          <FaFolder className="text-yellow-400 text-6xl" />
          <span className={`mt-1 text-sm p-1 rounded-lg whitespace-normal break-words w-24 h-12 flex items-center justify-center text-center`}>
          {folder.title}
          </span>
        </button>
        
      ))}
      {contextMenu && <CustomContextMenu x={contextMenu.mouseX} y={contextMenu.mouseY} onClose={handleClose} />}
    </div>
  );
};

export default FolderIcon;