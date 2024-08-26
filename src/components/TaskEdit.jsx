import React, { useState, useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor, TextEditor } from './';
import "../styles/scrollBar.css"
import UserService from '../services/UserService';

import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import FileService from '../services/FileService';
import { addSubTAsk, addTaskThunk } from '../features/task/taskThunk';
import { useDispatch } from 'react-redux';
import TaskService from '../services/TaskService';

const CustomDataInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
        className="custom-datepicker-input border px-7 py-2 bg-white text-gray-500 rounded-xl flex items-center"
        onClick={onClick}
        ref={ref}
    >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <g opacity="0.1" clipPath="url(#clip0_149_1771)">
                <path d="M9.33333 1.16699V3.50033M4.66667 1.16699V3.50033M1.75 5.83366H12.25M2.91667 2.33366H11.0833C11.7277 2.33366 12.25 2.85599 12.25 3.50033V11.667C12.25 12.3113 11.7277 12.8337 11.0833 12.8337H2.91667C2.27233 12.8337 1.75 12.3113 1.75 11.667V3.50033C1.75 2.85599 2.27233 2.33366 2.91667 2.33366Z" stroke="url(#paint0_linear_149_1771)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <linearGradient id="paint0_linear_149_1771" x1="7" y1="1.16699" x2="7" y2="12.8337" gradientUnits="userSpaceOnUse">
                    <stop offset="1" />
                </linearGradient>
                <clipPath id="clip0_149_1771">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
        <div className="flex text-gray-500 text-xs min-w-20 py-0.5 rounded-full text-center">
            {value ? value : "  "}
        </div>
    </button>

));

CustomDataInput.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


const TaskEdit = ({ isEditing, closeWindow }) => {
    const dispatch = useDispatch();
    const [isOpenValueType, setIsOpenValueType] = useState(false);
    const [isOpenAssigneTo, setIsOpenAssigneTo] = useState(false);
    const [isOpenStatusStyle, setIsOpenStatusStyle] = useState(false);
    const [isOpenFolder, setIsOpenFolder] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})
    const [selectedFolder, setSelectedFolder] = useState({})
    const [Comment, setComment] = useState({});
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedDataFrom, setSelectedDataFrom] = useState(new Date())
    const [selectedDataTo, setSelectedDataTo] = useState(new Date())
    const [selectedStatus, setSelectedStatu] = useState("TODO")
    const [userList, setUserList] = useState([]);
    const [summary, setSummary] = useState("");
    const [folderList, setFolderList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [selectedOption, setSelectedOption] = useState({
        value: "Sub Task", label: "Sub Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    });

    const statusList = ["TODO", "INPROGRESS", "DONE", "REJECTED", "UNCERTAIN"];


    const getStatusStyles = (status) => {
        switch (status) {
            case "TODO":
                return "bg-[#007BFF]";
            case "INPROGRESS":
                return "bg-[#FFA500]";
            case "DONE":
                return "bg-[#28A745]";
            case "REJECTED":
                return "bg-[#DC3545]";
            case "UNCERTAIN":
                return "bg-[#FFC107]";
            default:
                return "";
        }
    }

    const formatDDate = (isoString) => {
        const date = new Date(isoString);

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        return `${year}-${month}-${day}`;
    }


    const getStatusLabel = (status) => {
        switch (status) {
            case "TODO":
                return "To Do";
            case "INPROGRESS":
                return "In Progress";
            case "DONE":
                return "Done";
            case "REJECTED":
                return "Rejected";
            case "UNCERTAIN":
                return "Uncertain";
            default:
                return "";
        }
    }

    const options = [
        {
            value: "Task", label: "Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            value: "Sub Task", label: "Sub Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
    ];

    const fetchUserList = async () => {
        try {
            const response = await UserService.getUserList();
            setUserList(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchFolderList = async () => {
        try {
            const response = await FileService.getFolderList();
            setFolderList(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchTaskList = async () => {
        try {
            const response = await TaskService.getTaskList();
            setTaskList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchUserList();
        fetchFolderList();
        fetchTaskList();
    }, []);


    console.log()

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenValueType(false);
    };

    const handleAssigneToClick = (option) => {
        setSelectedUser(option);
        setIsOpenAssigneTo(false);
    };

    const handleStatusToCLick = (option) => {
        setSelectedStatu(option);
        setIsOpenStatusStyle(false);
    };

    const handleFolderToClick = (option) => {
        setSelectedFolder(option);
        setIsOpenFolder(false);
    };
    const handleTaskToClick = (option) => {
        setSelectedTask(option);
        setIsOpenFolder(false);
    };

    const fetchData = () => {
        if (selectedOption.label === "Task") {
            const formData = {
                title: summary,
                status: selectedStatus,
                comment: Comment,
                deadline_from: formatDDate(selectedDataFrom),
                deadline_to: formatDDate(selectedDataTo),
                assign_to: selectedUser.pk,
                folder: selectedFolder.uuid
            }
            dispatch(addTaskThunk(formData));
            closeWindow();
        } else if (selectedOption.label === "Sub Task") {
            const formData = {
                assign_to: selectedUser.pk,
                comment: Comment,
                deadline_from: formatDDate(selectedDataFrom),
                deadline_to: formatDDate(selectedDataTo),
                task: selectedTask.uuid
            }
            dispatch(addSubTAsk(formData));
            closeWindow();
        }
    }

    const openUserList = () => {
        setIsOpenAssigneTo(!isOpenAssigneTo)
        fetchUserList()
    }
    const openfolderList = () => {
        setIsOpenFolder(!isOpenFolder)
        fetchFolderList()
    }



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F7F5F5] rounded-lg shadow-lg p-6 mx-4 md:mx-auto max-w-6xl w-full max-h-[80%] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-roboto font-semibold">Create</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={closeWindow}
                    >
                        ✕
                    </button>
                </div>
                <h6 className='text-gray-400 text-sm ml-4 mt-4'>All fields marked with an asterisk (*) are required</h6>

                <div className="mt-4">


                    <div className=" py-10 px-8 w-full">
                        <div className="">
                            <div className="space-y-3">
                                {/* Type */}
                                <div className="relative inline-block text-left ml-32 mb-8">
                                    <div className='flex items-center text-sm '>
                                        <p>Type: </p>
                                        <button
                                            type='button'
                                            onClick={() => setIsOpenValueType(!isOpenValueType)}
                                            className="inline-flex ml-8 w-80 p-1 border border-gray-300 rounded-xl bg-white"
                                        >
                                            <div className='flex items-center space-x-2'>
                                                <span>{selectedOption.icon}</span>
                                                <span>{selectedOption.label}</span>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenValueType ? "rotate-180" : "rotate-0"
                                                    }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    {isOpenValueType && (
                                        <div className='ml-[4.2rem] text-sm '>
                                            <ul className="absolute z-10 mt-1 w-80 bg-white border border-gray-300 rounded-xl shadow-lg">
                                                {options.map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(option)}
                                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        <span className="mr-2">{option.icon}</span>
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className='w-full h-px bg-gray-200' />
                                <div className='ml-20 pt-4'>
                                    {/* Summary */}
                                    <div className='flex items-center'>
                                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mr-8">Summary:</label>
                                        <input
                                            value={summary}
                                            onChange={(e) => setSummary(e.target.value)}
                                            type="text"
                                            id="summary"
                                            className="w-full max-w-[45rem] p-1 border border-gray-300 border-px rounded-lg"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className='flex mt-5 '>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mr-4">Description:</label>
                                        <div className="border border-gray-300 rounded-md p-2 max-w-[45rem]  min-h-80 bg-white">
                                            <TextEditor
                                                isEditing={true}
                                                setFormData={setComment}
                                            />
                                        </div>
                                    </div>

                                    {/* Assignee */}

                                    <div className='mt-5'>
                                        <div className="relative inline-block text-left w-full">
                                            <div className='flex items-center text-sm w-full'>
                                                <p>Assignee: </p>
                                                <button
                                                    onClick={openUserList}
                                                    className="inline-flex ml-8 w-full max-w-[32rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                >
                                                    <div className='flex items-center space-x-2'>
                                                        <div className='ml-2 mr-1'>
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.6668 12.25V11.0833C11.6668 10.4645 11.421 9.871 10.9834 9.43342C10.5458 8.99583 9.95233 8.75 9.3335 8.75H4.66683C4.04799 8.75 3.4545 8.99583 3.01691 9.43342C2.57933 9.871 2.3335 10.4645 2.3335 11.0833V12.25M9.3335 4.08333C9.3335 5.372 8.28883 6.41667 7.00016 6.41667C5.7115 6.41667 4.66683 5.372 4.66683 4.08333C4.66683 2.79467 5.7115 1.75 7.00016 1.75C8.28883 1.75 9.3335 2.79467 9.3335 4.08333Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <span className='text-gray-500'>{selectedUser.email}</span>
                                                    </div>
                                                    <svg
                                                        className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenAssigneTo ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {isOpenAssigneTo && (
                                                <div className='ml-[5.7rem] text-sm '>
                                                    <ul className="absolute z-10 mt-1 w-80 bg-white border border-gray-300 rounded-xl shadow-lg">
                                                        {userList.map((user) => (
                                                            <li
                                                                key={user.pk}
                                                                onClick={() => handleAssigneToClick(user)}
                                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                            >
                                                                <span className='text-gray-400'>{user.email}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button type="button" className="text-blue-500 text-xs font-medium ml-24">Assign to me</button>



                                    {/* Status */}
                                    <div className='mt-5'>
                                        <div className="relative inline-block text-left w-full">
                                            <div className='flex items-center text-sm w-full'>
                                                <p>Status: </p>
                                                <button
                                                    onClick={() => setIsOpenStatusStyle(!isOpenStatusStyle)}
                                                    className="inline-flex ml-12 w-full max-w-[10rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                >
                                                    <div className="items-center">
                                                        <div className={`text-white text-xs w-20 min-w-20 py-0.5 rounded-full text-center ${getStatusStyles(selectedStatus)}`}>
                                                            {getStatusLabel(selectedStatus)}
                                                        </div>
                                                    </div>
                                                    <svg
                                                        className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenStatusStyle ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {isOpenStatusStyle && (
                                                <div className='ml-[5.5rem] text-sm '>
                                                    <ul className="absolute z-10 mt-1 w-full  max-w-[10rem] bg-white border border-gray-300 rounded-xl shadow-lg">
                                                        {statusList.map((status) => (
                                                            <li
                                                                key={status}
                                                                onClick={() => handleStatusToCLick(status)}
                                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                            >
                                                                <div className="items-center">
                                                                    <div className={`text-white text-xs w-20 min-w-20 py-0.5 rounded-full text-center ${getStatusStyles(status)}`}>
                                                                        {getStatusLabel(status)}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className='mt-5'>
                                        <div className="relative inline-block text-left w-full">
                                            <div className='flex items-center text-sm w-full'>
                                                <p>Dates: </p>
                                                <div className='flex ml-14 items-center'>
                                                    <DatePicker
                                                        selected={selectedDataFrom}
                                                        onChange={date => setSelectedDataFrom(date)}
                                                        customInput={<CustomDataInput />}
                                                        minDate={new Date()}
                                                        dateFormat="yyyy-MM-dd"
                                                    />
                                                    <div className='w-8 h-px bg-gray-200' />
                                                    <DatePicker
                                                        selected={selectedDataTo}
                                                        onChange={date => setSelectedDataTo(date)}
                                                        customInput={<CustomDataInput />}
                                                        minDate={new Date()}
                                                        dateFormat="yyyy-MM-dd"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Folder */}

                                    <div className='mt-5'>
                                        <div className="relative inline-block text-left w-full">
                                            <div className='flex items-center text-sm w-full'>
                                                <p>{selectedOption.label === "Task" ? "Folder:" : "Task:"}</p>
                                                <button
                                                    onClick={openfolderList}
                                                    className="inline-flex ml-[3.3rem] w-full max-w-[32rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                >
                                                    <div className='flex items-center space-x-2'>
                                                        <div className='ml-2 mr-1'>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10 4H4C2.895 4 2 4.895 2 6V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V8L14 4H10Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>

                                                        </div>
                                                        <span className='text-gray-500'>{selectedFolder.title}</span>
                                                    </div>
                                                    <svg
                                                        className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenFolder ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {isOpenFolder && (
                                                <div className='ml-[5.7rem] text-sm '>
                                                    <ul className="absolute z-10 mt-1 w-80 bg-white border border-gray-300 rounded-xl shadow-lg">

                                                        {selectedOption.label === "Task" ? (
                                                            folderList?.map((obj) => (
                                                                <li
                                                                    key={obj.uuid}
                                                                    onClick={() => handleFolderToClick(obj)}
                                                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                >
                                                                    <span className='text-gray-400'>{obj.title}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            taskList?.map((obj) => (
                                                                <li
                                                                    key={obj.uuid}
                                                                    onClick={() => handleFolderToClick(obj)}
                                                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                >
                                                                    <span className='text-gray-400'>{obj.title}</span>
                                                                </li>
                                                            ))
                                                        )}

                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button type="button" className="text-blue-500 text-xs font-medium ml-24">Create New Folder</button>
                                    {/* Submit button */}
                                    <div className="text-right">
                                        <button
                                            onClick={fetchData}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default TaskEdit;
