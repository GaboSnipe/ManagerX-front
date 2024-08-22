import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FolderIcon, FileIcon, ResizableDiv } from '../components';
import { setFolder, setFile, setSeeResizebleDiv, setShowFileIcon, setFolderList, setIsModalOpen } from '../features/workplace/workplaceSlice';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addFileInFolderThunk, getFolderDetailsThunk, getFolderListThunk, addFolderThunk } from '../features/workplace/workplaceThunk';
import { getProjectHeadersThunk } from '../features/project/projectThunk';
import { v4 as uuidv4 } from 'uuid';
import { TextEditor } from "../components/Tasks/components/index.js";
import { ModalWindow } from "../components";
import { toast } from "react-toastify";

const mandatoryHeaders = [
  { accessor: 'id', type: "integer", label: '#', sortable: false, sortbyOrder: "desc", order: 0, visible: true },
  { accessor: 'title', type: "string", label: 'სახელი', sortable: true, sortbyOrder: "desc", order: 1, visible: true },
  { accessor: 'customer', type: "string", label: 'დამკვეთი', sortable: true, sortbyOrder: "desc", order: 2, visible: true },
  { accessor: 'case', type: "string", label: 'ქეისი', sortable: true, sortbyOrder: "desc", order: 3, visible: true },
  { accessor: 'status', type: "string", label: 'სტატუსი', sortable: true, sortbyOrder: "desc", order: 4, visible: true },
  { accessor: 'created_at', type: "date", label: 'შექმნის თარიღი', sortable: true, sortbyOrder: "desc", order: 998, visible: true },
  { accessor: 'updated_at', type: "date", label: 'განახლების თარიღი', sortable: true, sortbyOrder: "desc", order: 999, visible: true },
  { accessor: 'uuid', type: "string", label: 'uuid', sortable: true, sortbyOrder: "desc", order: 1000, visible: false },
  { accessor: 'comment', type: "string", label: 'comment', sortable: true, sortbyOrder: "desc", order: 1001, visible: false },
];

const formatHeaders = (mandatoryHeaders, response) => {
  const headers = [...mandatoryHeaders];
  response.forEach((item, index) => {
    headers.push({
      accessor: item.name,
      type: item.data_type,
      label: item.label,
      sortable: true,
      sortbyOrder: "desc",
      order: index + 5,
      visible: true,
    });
  });
  return headers.sort((a, b) => a.order - b.order);
};

const formatData = (formattedHeaders, response) => {
  const headerMap = new Map(formattedHeaders.map(header => [header.accessor, header]));
  const data = formattedHeaders.map(header => ({
    accessor: header.accessor,
    type: header.type,
    label: header.label,
    value: response[header.accessor] || null,
    order: header.order,
    visible: header.visible,
  }));

  if (response.custom_fields) {
    response.custom_fields.forEach(field => {
      const header = headerMap.get(field.field.name);
      if (header) {
        const item = data.find(d => d.accessor === header.accessor);
        if (item) item.value = field.value;
      }
    });
  }

  return data.sort((a, b) => a.order - b.order);
};

const CustomContextMenu = ({ x, y, onClose }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const showFileIcon = useSelector(state => state.workplace.showFileIcon);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAdd = () => {
    dispatch(setIsModalOpen(true));
    onClose();
  }


  return (
    <div
      ref={menuRef}
      className="bg-gray-900 p-4 rounded-lg"
      style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}
    >
      <ul>
        <li className="text-green-600 font-bold">
          <button onClick={handleAdd} >{showFileIcon ? "Add File" : "Add Folder"}</button>
        </li>
      </ul>
    </div>
  );
};

const WorkPlace = () => {
  const loading = useAuthCheck();
  const dispatch = useDispatch();
  const showFileIcon = useSelector(state => state.workplace.showFileIcon);

  const selectedFolder = useSelector(state => state.workplace.folderInfo);
  const [contextMenu, setContextMenu] = useState(null);
  const seeResizebleDiv = useSelector(state => state.workplace.seeResizebleDiv);
  const selectedFile = useSelector(state => state.workplace.fileInfo);
  const folders = useSelector(state => state.workplace.folderList);
  const files = useSelector(state => state.workplace.fileList);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState(() => formatData(headers, selectedFolder));
  const [filesSel, setSelFile] = useState(null);
  const [dangerShow, setDangerShow] = useState(false);
  const [formState, setFormState] = useState({ title: '', file: null });
  const [seeAddFileDiv, setSeeAddFileDiv] = useState(false);
  const isModalOpen = useSelector(state => state.workplace.isModalOpen);
  const [folderFormData, setFolderFormData] = useState({ status: 'TODO' });
  const [fileFormData, setFileFormData] = useState({
    title: '',
    folder: selectedFolder?.uuid || '',
    file: null,
  });

  useEffect(() => {
    if (selectedFolder?.uuid) {
      setFileFormData((prevData) => ({
        ...prevData,
        folder: selectedFolder?.uuid,
      }));
    }
  }, [selectedFolder?.uuid]);

  const handleChangeFolderForm = (event) => {
    const { name, value } = event.target;
    setFolderFormData({ ...folderFormData, [name]: value });
  };
  const handleChangeFileForm = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setFileFormData({ ...fileFormData, file: files[0] });
    } else {
      setFileFormData({ ...fileFormData, [name]: value });
    }
  };

  const handleSubmitFolder = (event) => {
    event.preventDefault();
    try {
      dispatch(addFolderThunk(folderFormData));
      toast.success("Folder Created", {
        containerId: "error"
      })
      setFolderFormData({ status: 'TODO' })
      dispatch(setIsModalOpen(false));
    } catch (err) {
      console.error(err)
      toast.warning(err, {
        containerId: "error"
      });
    }
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', fileFormData.title);
      formData.append('folder', fileFormData.folder);
      if (fileFormData.file) {
        formData.append('file', fileFormData.file);
      }

      await dispatch(addFileInFolderThunk(formData));
      toast.success("File Uploaded", {
        containerId: "error",
      });
      setFileFormData({
        title: '',
        folder: selectedFolder?.uuid || '',
        file: null,
      });
      dispatch(setIsModalOpen(false));
    } catch (err) {
      console.error(err);
      toast.warning(err.message || 'An error occurred', {
        containerId: "error",
      });
    }
  };



  const CancelCreating = () => {
    setFolderFormData({ status: 'TODO' })
    dispatch(setIsModalOpen(false));

  }

  useEffect(() => {
    if(folderFormData.customer && folderFormData.customer != "" || folderFormData.case && folderFormData.case != ""){
      setFolderFormData({ ...folderFormData, title: `${folderFormData.customer}, ${folderFormData.case}` });
    } else if (folderFormData.customer && folderFormData.customer != "") {
      setFolderFormData({ ...folderFormData, title: `${folderFormData.customer}` });
    } else if (folderFormData.case && folderFormData.case != "") {
      setFolderFormData({ ...folderFormData, case: `${folderFormData.case}` });
    }

  },[folderFormData.case, folderFormData.customer])


  const getData = useCallback(async () => {
    try {
      const response = await dispatch(getProjectHeadersThunk()).unwrap();
      const formattedHeaders = formatHeaders(mandatoryHeaders, response);
      setHeaders(formattedHeaders);
    } catch (err) {
      console.error('Failed to get headers list:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    setData(formatData(headers, selectedFolder))
  }, [headers, selectedFolder]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchFolderList = async () => {
      try {
        await dispatch(getFolderListThunk()).unwrap();
      } catch (err) {
        console.error('Failed to get project list:', err);
      }
    };
    fetchFolderList();
  }, [dispatch]);


  const addFileInFolder = () => {
    setSeeAddFileDiv(true);
  };

  const confirmAddFile = () => {
    if (!formState.title || !filesSel || !selectedFolder.uuid) {
      alert('Please provide a title, select a file, and ensure the folder is selected.');
      return;
    }

    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('file', filesSel);
    formData.append('folderId', selectedFolder.uuid);

    dispatch(addFileInFolderThunk(formData));
    setSeeAddFileDiv(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const folderShowClose = () => {
    dispatch(setSeeResizebleDiv(false));

    dispatch(setFolder({}));
  };

  const fileShowClose = () => {
    dispatch(setSeeResizebleDiv(false));
    dispatch(setFile({}));
  };

  const handleClick = file => {
    dispatch(setFile(file));
    dispatch(setSeeResizebleDiv(true));
  };

  const clockhandler = file => {
    dispatch(setFile(file));
  };

  const handleDocUpload = (event) => {
    const file = event.target.files[0];
    setSelFile(file);
  };

  const handleFolderSingleClick = folder => {
    dispatch(setFolder(folder));
    dispatch(getFolderDetailsThunk(folder.uuid));
    dispatch(setSeeResizebleDiv(true));
  };

  const handleFolderDoubleClick = folder => {
    dispatch(getFolderDetailsThunk(folder.uuid)).unwrap();
    dispatch(setShowFileIcon(true));
    dispatch(setSeeResizebleDiv(false));
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
    <div className='flex'>
    <div
      onContextMenu={(e) => handleContextMenu(e)}
      className="flex-grow">
      <div className="mx-auto max-w-full">
        <div className="flex">
          <div className="w-full flex-1 overflow-x-auto mb-8 overflow-hidden rounded-lg sm:px-6 lg:px-8 mt-5">
            <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8">
              {showFileIcon ? (
                <FileIcon files={files} handleClick={handleClick} selectedFile={selectedFile} />
              ) : (
                <FolderIcon
                  folders={folders}
                  onDoubleClick={handleFolderDoubleClick}
                  handleSingleClick={handleFolderSingleClick}
                />
              )}
            </div>
          </div>
          
        </div>
      </div>
      {contextMenu && (
        <CustomContextMenu
          x={contextMenu.mouseX}
          y={contextMenu.mouseY}
          onClose={handleClose}
          selectedFolder={contextMenu.folder}
        />
      )}


    </div>
    {seeResizebleDiv && (
      showFileIcon ?
        (

          <ResizableDiv setSeeResizebleDiv={fileShowClose}>
            <p className="text-purple-800 text-5xl"></p>
          </ResizableDiv>
        )
        :
        (
          <ResizableDiv setSeeResizebleDiv={folderShowClose}>
            <div>
              
            </div>
            <div className="text-[#252525] p-4">
              <FileIcon files={files} handleClick={clockhandler} selectedFile={selectedFile} listView={true} />
            </div>

            <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right">
                <caption className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-[#252525]">
                  <TextEditor isEditing={false} />
                </caption>

                <thead className="w-full text-xs uppercase text-[#252525]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.map((item) => {
                      if (!item.visible || item.accessor === 'id') return;
                      return (
                        <tr key={uuidv4()} className="w-full border border-gray-300 hover:bg-gray-200">
                          <th scope="row" className="px-6 py-4 font-medium text-[#252525] border border-gray-300">
                            {
                              item?.label
                            }
                          </th>
                          <td className="px-6 py-4 border border-gray-300" colSpan={2}>
                            {item?.value}
                          </td>
                        </tr>
                      )
                    })

                  }
                </tbody>
              </table>
            </div>
          </ResizableDiv>
        )

    )}

    <ModalWindow
    isOpen={isModalOpen}
    onClose={() => dispatch(setIsModalOpen(false))}
    title={showFileIcon ? "File Upload" : "Folder Create"}
  >
    {showFileIcon ? (
      <form className="max-w-md mx-auto" onSubmit={handleSubmitFile}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            value={fileFormData.title || ''}
            onChange={handleChangeFileForm}
            required
            id="floating_title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            id="doc_file"
            className="sr-only flex"
            onChange={handleChangeFileForm}
          />
          <label
            htmlFor="doc_file"
            className="text-sm text-gray-400 border py-1 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none flex items-center justify-center"
          >
            <span>{fileFormData.file ? fileFormData.file.name : 'Choose File'}</span>
          </label>
        </div>

        <div className="w-full flex justify-end space-x-4">
          <button
            type="button"
            onClick={CancelCreating}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    ) : (
      <form className="max-w-md mx-auto" onSubmit={handleSubmitFolder}>
        <div className='mb-4'>
          <span className='text-sm text-gray-400'>Enter customer and case to generate title for folder</span>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="customer"
            value={folderFormData.customer || ''}
            onChange={handleChangeFolderForm}
            id="floating_customer"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_customer"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Customer
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="case"
            value={folderFormData.case || ''}
            onChange={handleChangeFolderForm}
            id="floating_case"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_case"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Case
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            value={folderFormData.title || ''}
            onChange={handleChangeFolderForm}
            required
            id="floating_title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div className="w-full flex justify-end space-x-4">
          <button
            onClick={CancelCreating}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    )}

  </ModalWindow>
  </div>
  );
};

export default WorkPlace;