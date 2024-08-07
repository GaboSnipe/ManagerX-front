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


const ExpandableDetails = ({ task, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownFolder, setIsDropdownFolder] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const dropdownRef = useRef(null);
  const dropdownFolderRef = useRef(null);


  const folder = {
    case: "fanjrebu",
    comment: "shdnahjd",
    created_at: "2024-08-02T06:47:37.497863Z",
    custom_fields: [],
    customer: "nino",
    path: "media/uploads/nino/fanjrebu/",
    status: "TODO",
    tags: [],
    title: "nino, fanjrebu",
    updated_at: "2024-08-02T06:47:37.497885Z",
    uuid: "dd831e9d-e14f-490f-929f-9d082240c0f0"
  };
  const notify = () => toast("Wow so easy!");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownFolderToggle = () => {
    setIsDropdownFolder(!isDropdownFolder);
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
    dispatch(setFolder(folder));
    navigate("/workplace");

  }

  const handleOutside = (event) => {
    handleClickOutsideFolder(event);
    handleClickOutside(event);
  };

  const handleStartEditing = () => {
    toast.warning(`taskName: editing is enabled`);
    setIsEditing(true);
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);

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
                  <span className="bg-blue-500 text-white px-2 py-1 rounded">
                    IN PROGRESS
                  </span>
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
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-full"
                  >
                    <ul className="py-2 text-sm text-center">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded">TO DO</span>
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          <span className="bg-blue-500 text-white px-2 py-1 rounded">IN PROGRESS</span>
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          <span className="bg-green-500 text-white px-2 py-1 rounded">DONE</span>
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          <span className="bg-gray-500 text-white px-2 py-1 rounded">REJECTED</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            </div>
            {/* Deadline */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Deadline</span>
              <div className="py-2 px-3 text-sm text-red-700 bg-red-100 rounded">
                {/* Due today at 18:00 */}
                <DatePicker
                  disabled={false}
                  showTimeSelect
                  dateFormat="Pp"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<CustomDataInput />} />
              </div>
            </div>
            {/* Folder */}
            <div className="relative flex items-center space-x-2">
              <span className="text-gray-600 w-28">Folder</span>
              <div className="flex ">
                <button onClick={handleRedirectToWorkspace}  className="flex mr-2">
                  <span className="text-gray-400 flex">
                    <FaFolder className="text-yellow-400 text-xl" />
                    <p className="px-3">Test Folder</p>
                  </span>
                </button>
                <button
                  onClick={handleDropdownFolderToggle}
                  aria-expanded={isDropdownFolder}
                  className="focus:outline-none "
                >
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
                </button>
                {isDropdownFolder && (
                  <div
                    ref={dropdownFolderRef}
                    className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-full"
                  >
                    <ul className="py-2 text-sm p-2 space-y-1">
                      <li className="flex">
                        <FaFolder className="text-yellow-400 text-xl" />
                        <p className="px-3">Test Folder</p>
                      </li>
                      <li className="flex">
                        <FaFolder className="text-yellow-400 text-xl" />
                        <p className="px-3">Test Folder</p>
                      </li>
                      <li className="flex">
                        <FaFolder className="text-yellow-400 text-xl" />
                        <p className="px-3">Test Folder</p>
                      </li>
                      <li className="flex">
                        <FaFolder className="text-yellow-400 text-xl" />
                        <p className="px-3">Test Folder</p>
                      </li>
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
              <UserSearchDropDown value={{avatar: "NN", email: "Nino@mail.com", id: 2}}/>
                
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Assignee</span>
              <UserSearchDropDown value={{avatar: "KG", email: "Keso@mail.com", id: 1}}/>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 w-28">Created At</span>
              <div className="py-2 px-3 text-sm text-red-700 bg-red-100 rounded">
                Due today at 18:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableDetails;
