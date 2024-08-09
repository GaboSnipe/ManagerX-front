import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { FolderIcon, FileIcon, ResizableDiv } from '../components';
import { setFolder, setFile, setSeeResizebleDiv } from '../features/workplace/workplaceSlice';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addFileInFolderThunk, getFolderDetailsThunk, getFolderListThunk } from '../features/workplace/workplaceThunk';
import { getProjectHeadersThunk } from '../features/project/projectThunk';
import { v4 as uuidv4 } from 'uuid';
import {TextEditor} from "../components/Tasks/components/index.js";

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

const WorkPlace = () => {
  const loading = useAuthCheck();
  const dispatch = useDispatch();
  const [showFileIcon, setShowFileIcon] = useState(false);

  const selectedFolder = useSelector(state => state.workplace.folderInfo);
  const seeResizebleDiv = useSelector(state => state.workplace.seeResizebleDiv);
  const selectedFile = useSelector(state => state.workplace.fileInfo);
  const folders = useSelector(state => state.workplace.folderList);
  const files = useSelector(state => state.workplace.fileList);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState(() => formatData(headers, selectedFolder));
  const [filesSel, setSelFile] = useState(null);
  const [formState, setFormState] = useState({ title: '', file: null });
  const [seeAddFileDiv, setSeeAddFileDiv] = useState(false);

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

  const backButton = () => {
    setShowFileIcon(false);
    dispatch(setFolder({}));
    dispatch(setFile({}));
    dispatch(setSeeResizebleDiv(false));
  };

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
    setShowFileIcon(true);
    dispatch(setSeeResizebleDiv(false));
  };

  const closeSeeAddDiv = () => {
    setSeeAddFileDiv(false);
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-full">
        {showFileIcon && (
          <>
            <button
              onClick={backButton}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            {seeAddFileDiv && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSeeAddDiv}></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <input
                      type="text"
                      name="title"
                      value={formState.title}
                      onChange={handleFormChange}
                      placeholder="Enter file title"
                      className="p-2 rounded mb-4 w-full"
                    />
                    <input
                      type="file"
                      name="file"
                      onChange={handleDocUpload}
                      className="p-2 rounded mb-4 w-full"
                    />
                    <button
                      onClick={confirmAddFile}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                      Add File
                    </button>
                  </div>
                </div>
              </>
            )}

<button
              onClick={addFileInFolder}
             
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Add File
              </button>
          </>
        )}
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
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
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


                            <td className="px-6 py-4 text-right border border-gray-300">
                              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                              </a>
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
        </div>
      </div>
    </div>
  );
};

export default WorkPlace;