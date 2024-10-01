import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectSeeResizebleDiv, setFileInfo, setProject, setProjectHeaders } from '../features/project/projectSlice';
import { Paginations, Table, ResizableDiv, FileIcon, ProjectEdit } from '../components';
import { v4 as uuidv4 } from 'uuid';
import { getProjectListThunk, getProjectHeadersThunk, createNewProjectThunk } from '../features/project/projectThunk';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAuthCheck from '../utils/hooks/useAuthCheck';
import Editorcopy from "../components/Editorcopy"
import ProjectEditing from '../components/ProjectEditing';
import ProjectsService from '../services/ProjectsService';

const mandatoryHeaders = [
  { accessor: 'id', type: "integer", label: '', sortable: false, sortbyOrder: "desc", order: -1, visible: true },
  { accessor: 'conclusionNumber', type: "string", label: '#', sortable: true, sortbyOrder: "desc", order: 0, visible: true },
  { accessor: 'task.title', type: "string", label: 'სახელი', sortable: true, sortbyOrder: "desc", order: 1, visible: true },
  { accessor: 'task.status', type: "string", label: 'სტატუსი', sortable: true, sortbyOrder: "desc", order: 2, visible: true },
  { accessor: 'task.comment', type: "string", label: 'კომენტარი', sortable: true, sortbyOrder: "desc", order: 3, visible: false },
  { accessor: 'task.deadline_from', type: "date", label: 'დედლაინი (-დან)', sortable: true, sortbyOrder: "desc", order: 4, visible: false },
  { accessor: 'task.deadline_to', type: "date", label: 'დედლაინი (-მდე)', sortable: true, sortbyOrder: "desc", order: 998, visible: false },
  { accessor: 'task.drive_folder_path', type: "string", label: 'ფოლდერის მისამართი', sortable: true, sortbyOrder: "desc", order: 999, visible: true },
  { accessor: 'uuid', type: "string", label: 'uuid', sortable: true, sortbyOrder: "desc", order: 1000, visible: false },
]



function checkPathExists(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (acc && acc[part] !== undefined) {
      return acc[part];
    }
    return undefined;
  }, obj) !== undefined;
}

function getValueFromPath(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (acc && acc[part] !== undefined) {
      return acc[part];
    }
    return undefined;
  }, obj);
}

const formatedHeaders = (mandatoryHeaders, response) => {
  var formated = [...mandatoryHeaders];

  var i = 5;
  response.forEach(item => {
    formated.push({
      accessor: "tableHeaders_" + item['id'],
      type: item['data_type'],
      label: item['name'],
      sortable: true,
      sortbyOrder: "desc",
      order: i,
      visible: true,
    });
    i += 1;
  })

  return formated.sort((a, b) => a.order - b.order);
}

const formatedData = (formattedHeaders, response) => {
  let formated = [];
  let headers = [...formattedHeaders].sort((a, b) => a.order - b.order);

  response.forEach((folder, index) => {
    let tmp = headers.map(header => {
      let value = null;
      let visible = header.visible;

      if (checkPathExists(folder, header.accessor)) {
        value = getValueFromPath(folder, header.accessor);
      } else if (folder.custom_fields) {
        folder.custom_fields.forEach(field => {
          if ("tableHeaders_" + field.field.id === header.accessor) {
            value = field.value;
          }
        });
      }

      return {
        accessor: header.accessor,
        type: header.type,
        label: header.label,
        value: value,
        order: header.order,
        visible: visible
      };
    });

    tmp[0].value = index + 1;
    formated.push(tmp);
  });

  return formated;
};




const Projects = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.project.fileList);
  const seeResizebleDiv = useSelector((state) => state.project.seeResizebleDiv);
  const selectedProject = useSelector((state) => state.project.projectInfo);
  const response_headers = useSelector((state) => state.project.projectHeaders);
  const itemsCount = useSelector((state) => state.project.projectListLength);
  const response_adata = useSelector((state) => state.project.projectList);
  const selectedFile = useSelector((state) => state.project.fileInfo);
  const [isEditing, setIsEditing] = useState(false)
  const [isOpenAddProjectWindow, setIsOpenAddProjectWindow] = useState(false)
  const headers = formatedHeaders(mandatoryHeaders, response_headers)
  const [data, setData] = useState(formatedData(headers, response_adata));
  const [taskData, setTaskData] = useState({});
  const [isEditingProject, setIsEditingProject] = useState(false);
  const resizabledivwidth = useSelector((state) => state.project.resizabledivwidth);
  const [maxresizablediwwidth, setmaxresizabledivwidth] = useState(resizabledivwidth?.width || 0);
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const screenHeight = window.innerHeight;
  const headerHeight = useSelector((state) => state.workplace.headerHeight);

  useEffect(() => {
    const remValue = 2;
    const remInPixels = remValue * baseFontSize;
    const calculatedHeight = screenHeight - headerHeight - remInPixels;
    setDynamicHeight(calculatedHeight);
  }, [headerHeight]);

  const getData = async (settings) => {
    try {
      await dispatch(getProjectHeadersThunk()).unwrap();
      await dispatch(getProjectListThunk({ settings })).unwrap();
    } catch (err) {
      console.error('Failed to get project list:', err);
    }
  };

  const onCloseProjectAdd = (reqBody) => {
    dispatch(createNewProjectThunk(reqBody))
      .unwrap()
      .then((response) => {
        const targetUuid = response.uuid;
        getData()
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        toast.error(error.message, {
          containerId: "error"
        });
        console.error('Error:', error);
      });
  };


  useEffect(() => {
    if (resizabledivwidth && typeof resizabledivwidth === 'object' && resizabledivwidth.width) {
      setmaxresizabledivwidth(resizabledivwidth.width);
    }
  }, [resizabledivwidth]);


  const startEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setData(formatedData(headers, response_adata));
  }, [response_adata]);

  useEffect(() => {
    getData();
  }, [])

  const handleResizebleDivToggle = () => {
    dispatch(setProjectSeeResizebleDiv(!seeResizebleDiv));
  };
  const handleClick = (file) => {
    dispatch(setFileInfo(file));
  };

  const openAddProjectkWindow = () => {
    setIsOpenAddProjectWindow(true);
  }

  const closeAddProjectWindow = () => {
    setIsOpenAddProjectWindow(false);
  }

  const fetchProjectData = (data) => {
    const response = ProjectsService.fillCustomFields(data);
    setIsEditingProject(false)
    getData();
  }

  console.log(response_adata)


  return (
    <>
          <div className="flex"  style={{ height: `${dynamicHeight}px` }}>
            <div className="w-full flex-1 mb-8 overflow-y-auto custom-scrollbar rounded-lg shadow-lg sm:px-6 lg:px-8 mt-5">

              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      ძებნა
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border bg-transparent border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        placeholder="ძებნა"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    onClick={openAddProjectkWindow}
                    type="button"
                    className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add product
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button





                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        className="-ml-1 mr-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                      Actions
                    </button>
                    <div
                      id="actionsDropdown"
                      className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700"
                        aria-labelledby="actionsDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                          >
                            Mass Edit
                          </a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete all
                        </a>
                      </div>
                    </div>
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Filter
                      <svg
                        className="-mr-1 ml-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full flex-1 overflow-x-auto custom-scrollbar flex items-center">
                <Table columns={headers} data={data} setData={setData} />
              </div>

              <div className="flex justify-center h-24">
                <Paginations items={data} refreshData={getData} itemsCount={itemsCount} />
              </div>

            </div>
            {seeResizebleDiv && (
              <ResizableDiv setSeeResizebleDiv={handleResizebleDivToggle}>
                {selectedProject?.map((item) => {
                  if (item.accessor === 'task.title') {
                    return (
                      <p key={item.accessor} className="font-extrabold not-italic font-roboto text-lg tracking-wide leading-[150%] ml-3 text-gray-700">
                        {item.value}
                      </p>
                    );
                  }
                  return null;
                })}
                <div className='rounded-md border border-[#C8C2C2] ml-3 mt-2 max-w-32'>
                  <button onClick={() => setIsEditingProject(true)} className='text-xs text-[#3F3F46] px-4'>Edit project</button>
                </div>


                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-[#252525]">
                    <caption className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-[#252525]">


                      <section className="w-auto p-5 overflow-x-hidden">
                        <p className="text-start text-gray-700 text-2xl mb-4">აღწერა:</p>
                        <div style={{ width: maxresizablediwwidth - 150 }} className="p-5 border border-gray-300 rounded max-w-full">
                          <Editorcopy
                            defaultValue={selectedProject.filter((item) => item.accessor === 'task.comment')[0]?.value}
                            readOnly={true}
                          />
                        </div>
                      </section>
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
                      {selectedProject?.map((item) => {
                        if (!item.visible || item.accessor === 'id') return null;
                        if (item.type === "boolean") {
                          return (
                            <tr key={uuidv4()} className="w-full border border-gray-300 hover:bg-gray-200">
                              <th scope="row" className="px-6 py-4 font-medium text-[#252525] border border-gray-300">
                                {item.label}
                              </th>
                              <td className="px-6 py-4 border border-gray-300" colSpan={2}>
                                <div className="items-center m-3">
                                  {item.value === true ? (
                                    <FaCheckCircle className="text-green-500 text-2xl" />
                                  ) : (
                                    item.value === false ? (
                                      <FaTimesCircle className="text-red-500 text-2xl" />
                                    ) : null
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr key={uuidv4()} className="w-full border border-gray-300 hover:bg-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-[#252525] border border-gray-300">
                              {item?.label}
                            </th>
                            <td className="px-6 py-4 border border-gray-300" colSpan={2}>
                              {item?.value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                  </table>
                </div>
              </ResizableDiv>
            )}
          </div>

      {isOpenAddProjectWindow &&
        <ProjectEdit isEditing={false} closeWindow={closeAddProjectWindow} onSubmit={onCloseProjectAdd} />
      }
      {isEditingProject && <ProjectEditing isEditing={true} closeWindow={() => setIsEditingProject(false)} project={selectedProject} headers={response_headers} onSubmit={fetchProjectData} />}
    </>
  );
};

export default Projects;