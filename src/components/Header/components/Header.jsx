import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { setFolder, setFile, setSeeResizebleDiv, setShowFileIcon, setIsModalOpen } from '../../../features/workplace/workplaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddEnable } from '../../../features/task/taskSlice';
import ModalWindow from '../../ModalWindow';
import TaskEdit from '../../TaskEdit';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [seeAddTaskDiv, setSeeAddTaskDiv] = useState(false);
  const showFileIcon = useSelector(state => state.workplace.showFileIcon);
  const [isOpenAddTaskWindow, setIsOpenAddTaskWindow] = useState(false)
  const isAddEnable = useSelector((state) => state.task.isAddEnable);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    comment: '',
    deadline: '',
    assign_to: '',
    folder: '',
  });
  const [errors, setErrors] = useState({});
  const statuses = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Canceled']; // Пример статусов
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.assign_to) newErrors.assign_to = 'Assign to is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  };

  const startAddTask = () => {
    dispatch(setIsAddEnable(true))
  }

  const addFolder = () => {
    dispatch(setIsModalOpen(true));

  }


  const backButton = () => {
    dispatch(setShowFileIcon(false));
    dispatch(setFolder({}));
    dispatch(setFile({}));
    dispatch(setSeeResizebleDiv(false));
  };

  const addFileInFolder = () => {
    dispatch(setIsModalOpen(true));
  };

  const openAddTaskWindow = () => {
    setIsOpenAddTaskWindow(true);
  }

  const closeAddTaskWindow = () => {
    setIsOpenAddTaskWindow(false);
  }




  const renderHeaderContent = (pathname) => {
    switch (pathname) {
      case '/projects':
        return (
          <>
          </>
        );
      case '/workplace':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex space-x-2">

              {showFileIcon ? (
                <>

                  <button
                    onClick={backButton}
                    className="bg-gray-600 rounded-lg p-2 focus:bg-gray-500 text-white flex items-center"
                  >

                    <FaArrowLeft className="mr-2" />
                    Back
                  </button>

                  <button
                    onClick={addFileInFolder}

                    className="bg-gray-600 rounded-lg p-2 focus:bg-gray-500 text-white"
                  >
                    Add File
                  </button>
                </>
              ) : (

                <button
                  onClick={addFolder}
                  className="bg-gray-600 rounded-lg p-2 focus:bg-gray-500 text-white"
                >
                  Add Folder
                </button>
              )}
            </div>

          </>
        );
      case '/tasks':
        return (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
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
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={openAddTaskWindow}
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
                  Add Task
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
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900">
                      Choose brand
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-gray-9000"
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Microsoft (16)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="razor"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="razor"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Razor (49)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="nikon"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="nikon"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Nikon (12)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="benq"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor="benq"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          BenQ (74)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            {isOpenAddTaskWindow &&
              <TaskEdit isEditing={false} closeWindow={closeAddTaskWindow} />
            }
          </>
        );
      default:
        return (
          <>
          </>
        );
    }
  };

  return (
    <header className="bg-white shadow">
      {renderHeaderContent(location.pathname)}
    </header>
  );
};

export default Header;
