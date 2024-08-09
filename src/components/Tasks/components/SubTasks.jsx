import React, { useRef, useState, useEffect } from 'react';
import { FiCalendar, FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import CustomDataInput from "./CustomDataInput";
import "react-datepicker/dist/react-datepicker.css";
import { setSelectedSubtask, setSeeResizebleDiv } from '../../../features/task/taskSlice';
import UserSearchDropDown from '../../UserSearchDropDown';
import "../../../styles/DefaultStyles.css"
import UserService from '../../../services/UserService';

const statuses = {
  "TODO": "To Do",
  "INPROGRESS": "In Progress",
  "DONE": "Done",
  "REJECTED": "Rejected",
  "UNCERTAIN": "Uncertain"
};
const statusStyles = {
  "TODO": "bg-yellow-500",
  "INPROGRESS": "bg-blue-500",
  "DONE": "bg-green-500",
  "REJECTED": "bg-gray-500",
  "UNCERTAIN": "bg-purple-500"
};

const SubTasks = ({ subtask, motherRef, index, isEditing }) => {
  const dispatch = useDispatch();
  const selectedSubTask = useSelector((state) => state.task.selectedSubtask);
  const [startDate, setStartDate] = useState(new Date());
  const seeResizebleDiv = useSelector((state) => state.task.seeResizebleDiv);
       const [assignTo, setAssignTo] = useState({});
       const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();

  const handleClick = (subtask) => {
    dispatch(setSelectedSubtask(subtask));
    dispatch(setSeeResizebleDiv(selectedSubTask.uuid === subtask.uuid ? !seeResizebleDiv : true));
  };

  const handlePosition = () => {
    if (dropdownRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const motherRect = motherRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;

      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if ((spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) || dropdownRect.height + buttonRect.bottom > motherRect.bottom) {
        dropdownRef.current.style.top = `-${dropdownRect.height}px`;
      } else {
        dropdownRef.current.style.top = `${buttonRect.height}px`;
      }
    }
  };

  const toggleDropdown = () => {
    if (isEditing) {
      setIsDropdownOpen((prev) => {
        if (!prev) {
          handlePosition();
        }
        return !prev;
      });
    }

  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      handlePosition();
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isDropdownOpen) {
        handlePosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDropdownOpen]);

  useEffect(() => {
    const getAssignTo = async () => {
      try {
        const response = await UserService.getUserInfo(subtask.assign_to);
        setAssignTo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAssignTo();
  }, []);


  return (
    <tr
      key={index}
      className={`border-t relative ${subtask.uuid === selectedSubTask.uuid ? "bg-blue-100" : ""} rounded-lg`}
    >
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative ml-2">
            <input
              placeholder="checkbox"
              type="checkbox"
              className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
            />
            <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
              <svg
                className="icon icon-tabler icon-tabler-check"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </div>
          </div>
          <input
        type="text"
        className="pl-5"
        value={subtask.title}
        readOnly={!isEditing}
      />

        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <FiUserPlus className="text-gray-400" />
          <UserSearchDropDown value={assignTo} isEditing={isEditing} />
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <div className="py-2 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
            <div className="flex items-center space-x-2">
              <FiCalendar className="" />
              <div className="py-2 text-sm text-red-700 bg-red-100 rounded flex">

                                <DatePicker
                  disabled={!isEditing}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<CustomDataInput />} 
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="relative py-2">
        <div className="flex items-center space-x-2 relative">
          <div className="relative">
            <button
              ref={buttonRef}
              className="font-medium rounded-lg text-xs text-start inline-flex items-center"
              onClick={toggleDropdown}
            >
                <span className={`${statusStyles[subtask.status]} text-white px-2 py-1 rounded`}>
                {statuses[subtask.status]}
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

            <div
              ref={dropdownRef}
              className={`absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-gray-400 shadow-xl ${isDropdownOpen ? "block" : "hidden"}`}
              style={{ top: dropdownRef.current ? dropdownRef.current.style.top : "100%" }}
            >
                    <ul className="text-center">
                      {Object.keys(statuses).map((statusKey) => (
                        <li key={statusKey}>
                          <a className="block px-4 py-2 hover:bg-gray-100">
                            <span className={`${statusStyles[statusKey]} text-white px-2 py-1 rounded`}>
                              {statuses[statusKey]}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
            </div>
          </div>
        </div>
      </td>
      <td>
        <button
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => handleClick(subtask)}
        >
          {selectedSubTask.uuid === subtask.uuid && seeResizebleDiv ? "Close" : "View"}
        </button>
      </td>
    </tr>
  );
};

export default SubTasks;
