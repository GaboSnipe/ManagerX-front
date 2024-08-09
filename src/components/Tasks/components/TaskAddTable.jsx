import React, { useEffect, useRef, useState } from 'react'
import ExpandableDetails from './ExpandableDetails';
import TextEditor from './TextEditor';
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import DatePicker from 'react-datepicker';
import CustomDataInput from './CustomDataInput';
import { FaFolder } from 'react-icons/fa';
import FileService from '../../../services/FileService';
import UserSearchDropDown from '../../UserSearchDropDown';
import UserService from '../../../services/UserService';
import TaskService from '../../../services/TaskService';
import { setIsAddEnable } from '../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


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

const TaskAddTable = ({setTasks, tasks}) => {
    const [formData, setFormData] = useState({
        title: "Title",
        status: "TODO",
        deadline: new Date(),
        comment: "",
        assign_to: "",
        folder: "",
    });
    
  const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(true)
    const [folderList, setFolderList] = useState([]);
    const [isDropdownFolder, setIsDropdownFolder] = useState(false);
    const [folder, setLocalFolder] = useState({});
    const [assignTo, setAssignTo] = useState({});
    const [isExpanded, setIsExpanded] = useState(true);
    const motherRef = useRef();
    const dropdownRef = useRef(null);
    const dropdownFolderRef = useRef(null);


    const canselEdit = () => {
        dispatch(setIsAddEnable(false))
      }
    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const getDeadlineStyles = (deadline) => {
        const deadlineStatus = formatDeadline(deadline);
        switch (deadlineStatus) {
            case "Overdue":
                return "text-red-700 bg-red-100";
            case "Today":
                return "text-yellow-700 bg-yellow-100";
            default:
                return "text-green-700 bg-green-100";
        }
    };

    const chooseFolder = (folder) => {
        setFormData(prevData => ({
            ...prevData,
            folder: folder.uuid
        }));
        setLocalFolder(folder)
        setIsDropdownFolder(false)
    }

    const changeStatus = (statusKey) => {
        setFormData(prevData => ({
            ...prevData,
            status: statusKey
        }));
        setIsDropdownOpen(false);
    };
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const setDataForm = (date) => {
        setFormData(prevData => ({
            ...prevData,
            deadline: date
        }));
    };


    const saveNewTask = () => {
        const newFormData = formData;
        const formattedDate = formatDate(formData.deadline);
        newFormData.deadline = formattedDate;

        TaskService.createTask(newFormData)
            .then((response) =>{
                toast.success("Task created successfully");
                setTasks((prevTasks) => [...prevTasks, response.data]);
                canselEdit()
            } 
            )
            .catch((error) => {
                console.error(error);
            });

    };
    const handleClickOutsideFolder = (event) => {
        if (dropdownFolderRef.current && !dropdownFolderRef.current.contains(event.target)) {
            setIsDropdownFolder(false);
        }
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOutside = (event) => {
        handleClickOutsideFolder(event);
        handleClickOutside(event);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
        };
    }, []);

    useEffect(() => {

        const getAssignTo = async () => {
            try {
                if (formData.assign_to) {

                    const response = await UserService.getUserInfo(formData.assign_to);
                    setAssignTo(response.data);

                }
            } catch (error) {
                console.error(error);
            }
        };

        getAssignTo();
    }, [formData.assign_to]);


    return (
        <React.Fragment>

            <tr className="overflow-x-auto">
                <td
                    className="overflow-hidden focus:outline-none border border-gray-100 rounded p-5"
                    colSpan={5}
                >

                    <section className="w-auto p-5 ">
                        <div className="flex items-center pl-5 space-x-2">
                            <p>Title: </p>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-8 p-4">
                                <div className="space-y-5">
                                    <div className="flex items-center space-x-2 relative">
                                        <span className="text-gray-600 w-28">Status</span>
                                        <div className="">
                                            <button
                                                className="font-medium rounded-lg text-xs text-start inline-flex items-center"
                                                onClick={handleDropdownToggle}
                                            >
                                                <span className={`${statusStyles[formData.status]} text-white px-2 py-1 rounded`}>
                                                    {statuses[formData.status]}
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
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Deadline</span>
                                        <div className={`py-2 px-3 text-sm rounded ${getDeadlineStyles(formData.deadline)}`}>

                                            <DatePicker
                                                disabled={!isEditing}
                                                selected={formData.deadline}
                                                onChange={(date) => setDataForm(date)}
                                                customInput={<CustomDataInput />}
                                                minDate={new Date()}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Folder</span>
                                        <div className="flex ">
                                            <button onClick={handleDropdownFolderToggle} className="flex mr-2">
                                                <span className="text-gray-400 flex">
                                                    <FaFolder className="text-yellow-400 text-xl" />
                                                    <p className="px-3">{folder?.title || "Folder"}</p>
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
                                                        {folderList?.map((folder) => (
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
                                <div className="space-y-5">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Reporter</span>
                                        <div className="flex items-center">
                                            <UserSearchDropDown value={assignTo} formData={formData} setFormData={setFormData} isEditing={isEditing} qkey={"assign_to"} />

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>


                    <div className="relative w-full shadow-md sm:rounded-lg">
                        <TextEditor isEditing={true} setFormData={setFormData} />
                        {/* <section ref={motherRef} className="w-auto p-5 relative">
                            <div className='flex w-full'>
                                <p className="text-start text-gray-700 text-2xl mb-4">Subtasks:</p>
                                <button className="ml-auto focus:bg-green-400 bg-green-500 text-white font-medium rounded-lg text-center p-3">
                                    Add SubTask
                                </button>
                            </div>
                            {formData?.Subtasks?.length !== 0 && (
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-left text-gray-600">Name</th>
                                                <th className="text-left text-gray-600">Assignee</th>
                                                <th className="text-left text-gray-600">Due date</th>
                                                <th className="text-left text-gray-600">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             {formData.Subtasks.map((Subtask)=>{

                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </section> */}

                        <div className="flex justify-end space-x-4 mt-4 p-5">
                            <button
                                onClick={canselEdit}
                                className="flex items-center space-x-1 text-gray-600"
                            >
                                <FiXCircle className="text-xl" />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={saveNewTask}
                                className="flex items-center space-x-1 text-white bg-purple-600 px-4 py-2 rounded"
                            >
                                <FiCheckCircle className="text-xl" />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )

};

export default TaskAddTable;