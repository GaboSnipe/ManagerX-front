import React, { useRef, useState, useEffect } from 'react';
import { FiCalendar, FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import CustomDataInput from "./CustomDataInput";
import "react-datepicker/dist/react-datepicker.css";
import taskSlice, { setSelectedSubtask, setSeeResizebleDiv } from '../../../features/task/taskSlice';
import UserSearchDropDown from '../../UserSearchDropDown';
import "../../../styles/DefaultStyles.css"
import UserService from '../../../services/UserService';
import TaskService from '../../../services/TaskService';

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

const SubTasks = ({ subtask, motherRef, index, isEditing, saveSubTasks, setSaveSubTasks, taskUuid, setSubTasks, removeSubTask, setIsAlert }) => {
  const dispatch = useDispatch();
  const selectedSubTask = useSelector((state) => state.task.selectedSubtask);
  const [startDate, setStartDate] = useState(new Date());
  const seeResizebleDiv = useSelector((state) => state.task.seeResizebleDiv);
  const [assignTo, setAssignTo] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const [dangerShow, setDangerShow] = useState(false);
  const [newSubTask, setNewSubTask] = useState(subtask)

  const handleClick = async (subtask) => {
    if(subtask?.uuid) {
    try {
      const response = await TaskService.getSubTask(subtask?.uuid);
      dispatch(setSelectedSubtask(response.data));
  
      const isSameSubtask = selectedSubTask?.uuid === subtask.uuid;
      dispatch(setSeeResizebleDiv(!isSameSubtask));
    } catch (error) {
      console.error('Error fetching subtask:', error);
    }
  }
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
        const response = await UserService.getUserInfo(newSubTask.assign_to);
        setAssignTo(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (newSubTask.assign_to) {
      getAssignTo();
    }

  }, [newSubTask.assign_to]);


  const setDataForm = (date) => {
    setNewSubTask(prevData => ({
      ...prevData,
      deadline: date
    }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };



  const saveChangeSubTask = () => {
    const newFormData = {};

    const fieldsToCheck = ['assign_to', 'title', 'status', 'deadline'];

    fieldsToCheck.forEach(field => {
      if (newSubTask[field] !== undefined && newSubTask[field] !== subtask[field]) {
        if (field === 'deadline') {
          newFormData.deadline = formatDate(newSubTask.deadline);
        } else {
          newFormData[field] = newSubTask[field];
        }
      }
    });

    if (Object.keys(newFormData).length > 0) {
      TaskService.editSubTask(subtask.uuid, newFormData)
        .then(response => {
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const formatAndValidateSubTask = (subTask) => {
    const formattedSubTask = {
      ...subTask,
      deadline: formatDate(subTask.deadline),
      task: taskUuid,
    };

    const isValid = formattedSubTask.title != "" && formattedSubTask.assign_to != null;
    return { formattedSubTask, isValid };
  };

  const saveNewSubTask = async () => {
    const { formattedSubTask, isValid } = formatAndValidateSubTask(newSubTask);

    if (isValid) {
      try {
        await TaskService.createSubTask(formattedSubTask);
        const response = await TaskService.getSubtaskList(taskUuid);
        setSubTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      removeSubTask(newSubTask.uuid || newSubTask.localId);



    }
  };


  useEffect(() => {
    if (saveSubTasks) {
      if (newSubTask.uuid) {
        saveChangeSubTask();
      } else {
        saveNewSubTask();
      }

    }
    setSaveSubTasks(false);
  }, [saveSubTasks])

  const changeStatus = (statusKey) => {
    setNewSubTask(prevData => ({
      ...prevData,
      status: statusKey
    }));
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setNewSubTask(prevData => ({
      ...prevData,
      title: e.target.value
    }));
  };

  const handleDeleteSubTask = () => {
    setDangerShow(true)
  }

  const confirmDelete = () => {
    if (newSubTask.uuid) {
      TaskService.deleteSubTask(newSubTask.uuid)
        .then(() => {
          removeSubTask(newSubTask.uuid || newSubTask.localId);
        })
        .catch(error => {
          console.error('Error deleting subtask:', error);
        });
    } else {
      removeSubTask(newSubTask.uuid || newSubTask.localId);

    }

    setDangerShow(false);
  };


  const cancelDelete = () => {
    setDangerShow(false);
  };


  return (
    <tr
      key={index}
      className={`border-t relative ${newSubTask?.uuid != null && newSubTask.uuid === selectedSubTask.uuid ? "bg-blue-100" : ""} rounded-lg`}
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
            className="border-none outline-none focus:outline-none bg-transparent focus:border-none focus:ring-0 pl-5"
            placeholder="Enter task name"
            onChange={((e) => handleInputChange(e))}
            value={newSubTask.title}
            readOnly={!isEditing}
          />

        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <FiUserPlus className="text-gray-400" />
          <UserSearchDropDown value={assignTo} formData={newSubTask} setFormData={setNewSubTask} isEditing={isEditing} qkey={"assign_to"} />
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <div className={`py-2 px-3 text-sm focus:outline-none leading-none ${getDeadlineStyles(newSubTask.deadline)}  rounded`}>
            <div className="flex items-center space-x-2">
              <FiCalendar className="" />
              <div className={`py-2 text-sm rounded flex`}>

                <DatePicker
                  disabled={!isEditing}
                  selected={newSubTask.deadline}
                  onChange={(date) => setDataForm(date)}
                  customInput={<CustomDataInput />}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
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
              <span className={`${statusStyles[newSubTask.status]} text-white px-2 py-1 rounded`}>
                {statuses[newSubTask.status]}
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
                    <button onClick={(() => changeStatus(statusKey))} className="block px-4 py-2 hover:bg-gray-100">
                      <span className={`${statusStyles[statusKey]} text-white px-2 py-1 rounded`}>
                        {statuses[statusKey]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </td>
      <td>

        {isEditing ?
          (
            <button
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleDeleteSubTask}
            >
              <span>Delete</span>
            </button>
          ) :
          (
            <button
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => handleClick(newSubTask)}
            >
              {selectedSubTask.uuid === newSubTask.uuid && seeResizebleDiv ? "Close" : "View"}
            </button>

          )
        }
        {dangerShow && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
              <p className="text-sm text-gray-600 mt-2">Do you really want to delete this subtask?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

      </td>
    </tr>
  );
};

export default SubTasks;
