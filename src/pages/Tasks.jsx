import React, { useEffect, useRef, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addTaskThunk, getTaskListThunk } from '../features/task/taskThunk';
import { setSeeResizebleDiv, setSelectedSubtask, setIsEditingSubTask, setSelectedSubTaskEdit } from '../features/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandableTable, ResizableDiv, UserSearchDropDown } from '../components';
import { format } from 'date-fns';
import { CustomDataInput, TextEditor } from '../components/Tasks/components';
import UserService from '../services/UserService';
import { FaRegEdit, FaTasks } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import TaskService from '../services/TaskService';


const formatDeadline = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 0) return 'Overdue';
  return deadlineDate.toLocaleDateString();
};
const statuses = {
  "TODO": "შესასრულებელი",
  "INPROGRESS": "მიმდინარე",
  "DONE": "შესრულებული",
  "REJECTED": "უარყოფილი",
};
const statusStyles = {
  "TODO": "bg-yellow-500",
  "INPROGRESS": "bg-blue-500",
  "DONE": "bg-green-500",
  "REJECTED": "bg-gray-500",
};

const usersList = [
  { email: "test@gmail.com", id: 2, userName: 'test' },
  { email: "test2@gmail.com", id: 2, userName: 'test2' },
  { email: "test3@gmail.com", id: 2, userName: 'test3' },
  { email: "test4@gmail.com", id: 2, userName: 'test4' },
];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const Tasks = () => {
  const dispatch = useDispatch();
  const [seeAddDiv, setSeeAddDiv] = useState(false);
  const [seeDiv, setSeeDiv] = useState(false);
  const selectedSubTask = useSelector((state) => state.task.selectedSubtask);
  const selectedSubTaskEdit = useSelector((state) => state.task.selectedSubTaskEdit);
  const [isDropdownTaskList, setIsDropdownTaskList] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAddEnable = useSelector((state) => state.task.isAddEnable);
  const seeResizebleDiv = useSelector((state) => state.task.seeResizebleDiv);
  const isEditingSubTask = useSelector((state) => state.task.isEditingSubTask);
  const dropdownRef = useRef(null);
  const dropdownTaskListRef = useRef(null);
  const [tasks, setTasks] = useState([])
  const [creator, setCreator] = useState({});
  const [assignTo, setAssignTo] = useState({});
  const [showTask, setShowTask] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndData] = useState(new Date())
  const [newSubTask, setNewSubTask] = useState({});
  const [formState, setFormState] = useState({
    title: "",
    status: "",
    comment: "",
    deadline: "",
    assign_to: ""
  });
  const defaultTask = {
    title: "",
    status: "TODO",
    comment: "",
    deadline: formatDate(new Date()),
    assign_to: "",
    created_at: new Date(),
    folder: "",
    subtasks: [],
  }
  const formatDateSub = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };
  useEffect(() => {
    const getCreator = async () => {
      try {
        const response = await UserService.getUserInfo(newSubTask?.creator || selectedSubTask?.creator);
        setCreator(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (newSubTask?.creator || selectedSubTask?.creator) {
      getCreator();
    }
  }, [newSubTask?.creator, selectedSubTask?.creator]);

  useEffect(() => {
    const getAssignTo = async () => {
      try {
        const response = await UserService.getUserInfo(newSubTask?.assign_to || selectedSubTask?.assign_to);
        setAssignTo(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (newSubTask?.assign_to || selectedSubTask?.assign_to) {
      getAssignTo();
    }
  }, [newSubTask?.assign_to, selectedSubTask?.assign_to]);


  const startEdit = () => {
    dispatch(setIsEditingSubTask(true))
  }

  const cancelEdit = () => {
    dispatch(setIsEditingSubTask(false))
    setNewSubTask({});
  }
  const changeStatus = (statusKey) => {

    setIsDropdownOpen(false);
  };
  const handleDropdownToggle = () => {
    if (isEditingSubTask) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getTaskListThunk()).unwrap();
        setTasks(response);
      } catch (err) {
        console.error('Failed to get task list:', err);
      }
    };
    getData();
  }, [dispatch]);

  const closeAddDiv = () => {
    setSeeAddDiv(false);
  };
  const showAddDiv = () => {
    setSeeAddDiv(true);
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
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  const handleClickOutsideTaskList = (event) => {
    if (dropdownTaskListRef.current && !dropdownTaskListRef.current.contains(event.target)) {
      setIsDropdownTaskList(false);
    }
  };
  const handleOutside = (event) => {
    handleClickOutside(event);
    handleClickOutsideTaskList(event);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDropdownTaskListToggle = async () => {

    if (isEditingSubTask) {

      setIsDropdownTaskList(!isDropdownTaskList);
    }
  };

  const setNewSubTaskStatus = (status) => {
    setNewSubTask(prevData => ({
      ...prevData,
      status: status
    }));
    setIsDropdownOpen(false);
  }
  const setNewSubTaskDeadLine = (date) => {
    setNewSubTask(prevData => ({
      ...prevData,
      deadline: date
    }));
  }
  const setNewSubTaskTitle = (e) => {
    setNewSubTask(prevData => ({
      ...prevData,
      title: e.target.value
    }));

  };
  const setNewSubTaskTask = (uuid) => {
    setNewSubTask(prevData => ({
      ...prevData,
      task: uuid
    }));
    setIsDropdownTaskList(false);
  };

  const saveChangeSubTask = () => {
    const newFormData = {};

    const fieldsToCheck = ['assign_to', 'comment', 'creator', 'deadline', 'status', 'task', 'title'];

    fieldsToCheck.forEach(field => {
      if (newSubTask[field] !== undefined && newSubTask[field] !== selectedSubTask[field]) {
        if (field === 'deadline') {
          newFormData.deadline = formatDate(newSubTask.deadline);
        } else {
          newFormData[field] = newSubTask[field];
        }
      }
    });

    if (Object.keys(newFormData).length > 0) {
      TaskService.editSubTask(selectedSubTask.uuid, newFormData)
        .then(response => {
          dispatch(setSelectedSubtask(response.data))
          setNewSubTask({});
        })
        .catch(error => {
          console.error(error);
        });
    }
  };


  useEffect(() => {
    setShowTask(newSubTask.task || selectedSubTask.task)
  }, [newSubTask.task, selectedSubTask.task])


  const onChangeSearchData = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndData(end);
  }


  const confirmAddFile = () => {
    dispatch(addTaskThunk(formState));
    closeAddDiv();
  };

  const closeResDiv = () => {
    setSeeDiv(false);
  };

  const makediv = (task) => {
    setSeeDiv(true);
  };

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef();

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "", assignee: "", priority: "", dueDate: "" }]);
  };

  const handleResizebleDivToggle = () => {
    dispatch(setSeeResizebleDiv(false));
  };

  return (
    <div className="flex">
      <div className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:px-6 max-w-full">
          <div className="mt-7 w-full text-sm">

            <div>
              
            </div>

            <table className="w-full whitespace-nowrap">
              <tbody>
                {isAddEnable &&
                  <ExpandableTable task={defaultTask} setTasks={setTasks} isDisable={true} isExpandedDefault={true} />
                }

                {tasks.map((task) => (
                  <ExpandableTable key={task.uuid} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {seeResizebleDiv &&
        <ResizableDiv setSeeResizebleDiv={handleResizebleDivToggle}>
          <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg min-w-full">
            <div className='w-full p-4'>
              <div>


                <div className="flex w-full justify-between items-center mb-4">
                  <div className="flex items-center pl-5 space-x-2">
                    <input
                      type="text"
                      value={newSubTask?.title || selectedSubTask?.title}
                      readOnly={!isEditingSubTask}
                      onChange={setNewSubTaskTitle}
                      className="border-none outline-none bg-transparent focus:outline-none focus:border-none focus:ring-0 bg-[#f9f9f9]"

                    />

                  </div>

                  {!isEditingSubTask &&
                    <button onClick={startEdit} className="bg-yellow-400 text-white text-base items-center px-4 py-2 rounded flex space-x-2"> <FaRegEdit /> <p>შეცვლა</p></button>
                  }
                </div>
              </div>
              <TextEditor isEditing={isEditingSubTask} defaultValue={selectedSubTask.comment} setFormData={setNewSubTask} />
              <div className="space-y-5">
                <div className="relative flex items-center space-x-2">
                  <span className="text-gray-600 w-28">Task</span>
                  <div className="flex ">
                    <button className="flex mr-2 focus:outline-none "
                      onClick={handleDropdownTaskListToggle}
                      aria-expanded={isDropdownTaskList}>
                      <span className="text-gray-400 flex">
                        <FaTasks className="text-blue-500 text-xl" />
                        <p className="px-3">  {tasks.find(task => task.uuid === showTask)?.title || ''}</p>
                      </span>
                      {isEditingSubTask &&
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-300 ${isDropdownTaskList ? 'rotate-180' : ''}`}
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
                    {isDropdownTaskList && (
                      <div
                        ref={dropdownTaskListRef}
                        className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-full"
                      >
                        <ul className="py-2 text-sm p-2 space-y-1">
                          {tasks.map((task) => (
                            <li key={task.uuid}>
                              <button className="flex" onClick={(() => setNewSubTaskTask(task.uuid))}>
                                <FaTasks className="text-blue-400 text-xl" />
                                <p className="px-3">{task.title}</p>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 relative">
                  <span className="text-gray-600 w-28">Status</span>
                  <div className="">
                    <button
                      className="font-medium rounded-lg text-xs text-start inline-flex items-center"
                      onClick={handleDropdownToggle}
                    >
                      <span className={`${statusStyles[newSubTask?.status || selectedSubTask?.status]} text-white px-2 py-1 rounded`}>
                        {statuses[newSubTask?.status || selectedSubTask?.status]}
                      </span>
                      {isEditingSubTask &&
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
                              <button onClick={(() => setNewSubTaskStatus(statusKey))} className="block px-4 py-2 hover:bg-gray-100">
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
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 w-28">Deadline</span>
                  <div className={`py-2 px-3 text-sm rounded ${getDeadlineStyles(newSubTask.deadline || selectedSubTask?.deadline)}`}>
                    <DatePicker
                      disabled={!isEditingSubTask}
                      selected={newSubTask.deadline || selectedSubTask?.deadline}
                      onChange={(date) => setNewSubTaskDeadLine(date)}
                      customInput={<CustomDataInput />}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 w-28">Reporter</span>
                  <div className="flex items-center">
                    <UserSearchDropDown value={assignTo} formData={selectedSubTask} setFormData={setNewSubTask} isEditing={isEditingSubTask} qkey={"assign_to"} />

                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 w-28">Assignee</span>
                  <UserSearchDropDown value={creator} formData={selectedSubTask} setFormData={setNewSubTask} isEditing={isEditingSubTask} qkey={"creator"} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 w-28">Created At</span>
                  <div className="py-2 px-3 text-sm text-gray-700 bg-gray-100 rounded">
                    {formatDateSub(selectedSubTask?.created_at)}
                  </div>
                </div>
                {isEditingSubTask &&
                  <div className="flex justify-end space-x-4 mt-4 p-5">
                    <button
                      onClick={cancelEdit}
                      className="flex items-center space-x-1 text-gray-600"
                    >
                      <FiXCircle className="text-xl" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={saveChangeSubTask}
                      className="flex items-center space-x-1 text-white bg-purple-600 px-4 py-2 rounded"
                    >
                      <FiCheckCircle className="text-xl" />
                      <span>Save</span>
                    </button>
                  </div>
                }
              </div>
            </div>

          </div>
        </ResizableDiv>
      }
    </div>

  );
};

export default Tasks;
