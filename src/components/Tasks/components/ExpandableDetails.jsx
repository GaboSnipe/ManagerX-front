import React, { useState, useRef, useEffect } from "react";
import { UserSearchDropDown } from "../../";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDataInput from "./CustomDataInput";
import { setFolder, setSeeResizebleDiv } from '../../../features/workplace/workplaceSlice';
import { FaFolder, FaRegEdit } from 'react-icons/fa';
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import FileService from "../../../services/FileService";
import { parse, differenceInCalendarDays } from 'date-fns';
import UserService from "../../../services/UserService";
import { format } from 'date-fns';
import { getFolderDetailsThunk } from "../../../features/workplace/workplaceThunk";



const statuses = {
  "TODO": "To Do",
  "INPROGRESS": "In Progress",
  "DONE": "Done",
  "REJECTED": "Rejected",
};
const statusStyles = {
  "TODO": "bg-yellow-500",
  "INPROGRESS": "bg-blue-500",
  "DONE": "bg-green-500",
  "REJECTED": "bg-gray-500",
};

const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



const ExpandableDetails = ({ task, isEditing, setIsEditing, formData, setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownFolder, setIsDropdownFolder] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [folder, setLocalFolder] = useState({});
  const [creator, setCreator] = useState({});
  const [assignTo, setAssignTo] = useState({});
  const [folderList, setFolderList] = useState([]);
  const dropdownRef = useRef(null);
  const dropdownFolderRef = useRef(null);


  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        const response = await FileService.getFolderDetails(task?.folder);
        setLocalFolder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (task.folder && task.folder != "") {
      fetchFolderDetails();

    }

  }, []);
  useEffect(() => {

    const getAssignTo = async () => {
      try {
        const response = await UserService.getUserInfo(formData.assign_to || task.assign_to);
        setAssignTo(response.data[0]);

      } catch (error) {
        console.error(error);
      }
    };
    if (formData.assign_to || task.assign_to) {
      getAssignTo();
    }
  }, [formData.assign_to]);
  useEffect(() => {

    const getCreator = async () => {
      try {
        const response = await UserService.getUserInfo(formData.creator || task.creator);
        setCreator(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (formData.creator || task.creator) {
      getCreator();
    }
  }, [formData.creator]);


  const getDeadlineStyles = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'text-yellow-700 bg-yellow-100';
    if (diffDays > 0) return 'text-green-700 bg-green-100';
    if (diffDays < 0) return 'text-red-700 bg-red-100';

    return '';
  };

  const handleDropdownToggle = () => {
    if (isEditing) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  const handleDropdownFolderToggle = async () => {

    if (isEditing) {
      try {
        const response = await FileService.getFolderList();
        setFolderList(response.data);
      } catch (error) {
        console.error(error);
      }

      setIsDropdownFolder(!isDropdownFolder);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleClickOutsideFolder = (event) => {
    if (dropdownFolderRef.current && !dropdownFolderRef.current.contains(event.target)) {
      setIsDropdownFolder(false);
    }
  };
  const handleRedirectToWorkspace = () => {
    dispatch(setSeeResizebleDiv(true));
    dispatch(getFolderDetailsThunk(folder.uuid));

    navigate("/workplace");
  }

  const handleOutside = (event) => {
    handleClickOutsideFolder(event);
    handleClickOutside(event);
  };

  const handleStartEditing = () => {
    toast.warning(`${formData.title || task.title}: editing is enabled`, {
      containerId: "error"
    });
    setIsEditing(true);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);
  const changeStatus = (statusKey) => {
    setFormData(prevData => ({
      ...prevData,
      status: statusKey
    }));
    setIsDropdownOpen(false);
  };

  const setDataForm = (date) => {
    setFormData(prevData => ({
      ...prevData,
      deadline: date
    }));
  };

  const chooseFolder = (folder) => {
    setFormData(prevData => ({
      ...prevData,
      folder: folder.uuid
    }));
    setLocalFolder(folder)
    setIsDropdownFolder(false)
  }

  return (
    <section className="w-auto p-5 ">
      <div className="flex w-full justify-between items-center mb-4">
        <p className="text-start text-gray-700 text-2xl mb-4">Details: </p>
        {!isEditing &&
          <button onClick={handleStartEditing} className="bg-yellow-400 text-white text-base items-center px-4 py-2 rounded flex space-x-2"> <FaRegEdit /> <p>Edit</p></button>
        }
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-8 p-4">
          <div className="space-y-5">
            {/* Status */}
            <div className="flex items-center space-x-2 relative">
              <span className="text-gray-600 w-28">Status</span>
              <div className="">
                <button
                  className="font-medium rounded-lg text-xs text-start inline-flex items-center"
                  onClick={handleDropdownToggle}
                >
                  <span className={`${statusStyles[formData?.status || task?.status]} text-white px-2 py-1 rounded`}>
                    {statuses[formData?.status || task?.status]}
                  </span>
                  {isEditing &&
                    <svg
                      className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  }
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-full"
                  >
                    <ul className="">
                      {Object.keys(statuses).map((statusKey) => (
                        <li key={statusKey}>
                          <button onClick={(() => changeStatus(statusKey))} className="block px-4 py-2 hover:bg-gray-100">
                            <span className={`${statusStyles[statusKey]} text-white px-2 py-1 rounded`}>
                              {statuses[statusKey]}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>

                  </div>
                )}
              </div>

            </div>
            {/* Deadline */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Deadline</span>
              <div className={`py-2 px-3 text-sm rounded ${getDeadlineStyles(formData?.deadline || task?.deadline)}`}>

                {/* Due today at 18:00 */}
                <DatePicker
                  disabled={!isEditing}
                  selected={formData?.deadline || task?.deadline}
                  onChange={(date) => setDataForm(date)}
                  customInput={<CustomDataInput />}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            {/* Folder */}
            <div className="relative flex items-center space-x-2">
              <span className="text-gray-600 w-28">Folder</span>
              <div className="flex ">
                <button onClick={handleRedirectToWorkspace} className="flex mr-2">
                  <span className="text-gray-400 flex">
                    <FaFolder className="text-yellow-400 text-xl" />
                    <p className="px-3">{folder?.title}</p>
                  </span>
                </button>
                <button
                  onClick={handleDropdownFolderToggle}
                  aria-expanded={isDropdownFolder}
                  className="focus:outline-none "
                >
                  {isEditing &&
                    <svg
                      className={`w-2.5 h-2.5 transition-transform duration-300 ${isDropdownFolder ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  }
                </button>
                {isDropdownFolder && (
                  <div
                    ref={dropdownFolderRef}
                    className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-full"
                  >
                    <ul className="py-2 text-sm p-2 space-y-1">
                      {folderList.map((folder) => (
                        <li key={folder.uuid}>
                          <button className="flex" onClick={(() => chooseFolder(folder))}>
                            <FaFolder className="text-yellow-400 text-xl" />
                            <p className="px-3">{folder.title}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>


          </div>
          {/* Reporter and Assignee */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Reporter</span>
              <div className="flex items-center">
                <UserSearchDropDown value={assignTo} formData={formData} setFormData={setFormData} isEditing={isEditing} qkey={"assign_to"} />

              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Assignee</span>
              <UserSearchDropDown value={creator} formData={formData} setFormData={setFormData} isEditing={isEditing} qkey={"creator"} />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Created At</span>
              <div className="py-2 px-3 text-sm text-gray-700 bg-gray-100 rounded">
                {formatDate(task?.created_at)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableDetails;
