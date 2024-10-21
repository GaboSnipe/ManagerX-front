import React, { useState, useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor, ModalWindow, TextEditor } from './';
import "../styles/scrollBar.css"
import UserService from '../services/UserService';

import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import FileService from '../services/FileService';
import { addSubTAsk, addTaskThunk, editSubTaskThunk, editTaskThunk } from '../features/task/taskThunk';
import { useDispatch, useSelector } from 'react-redux';
import { addFolderThunk } from '../features/workplace/workplaceThunk';
import TaskService from '../services/TaskService';
import { toast } from 'react-toastify';

const CustomDataInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
        className="custom-datepicker-input border px-7 py-2 bg-white text-gray-500 rounded-xl flex items-center"
        onClick={onClick}
        ref={ref}
    >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            {/* SVG Path */}
            <path d="M9.33333 1.16699V3.50033M4.66667 1.16699V3.50033M1.75 5.83366H12.25M2.91667 2.33366H11.0833C11.7277 2.33366 12.25 2.85599 12.25 3.50033V11.667C12.25 12.3113 11.7277 12.8337 11.0833 12.8337H2.91667C2.27233 12.8337 1.75 12.3113 1.75 11.667V3.50033C1.75 2.85599 2.27233 2.33366 2.91667 2.33366Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="paint0_linear_149_1772" x1="7" y1="1.16699" x2="7" y2="12.8337" gradientUnits="userSpaceOnUse">
                    <stop offset="1" />
                </linearGradient>
            </defs>

        </svg>
        <div className="flex text-gray-500 text-xs min-w-20 py-0.5 rounded-full text-center">
            {value || "  "}
        </div>
    </button>
));

CustomDataInput.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
};

CustomDataInput.defaultProps = {
    value: '',
    onClick: () => { },
};



const TaskEdit = ({ isEditing, closeWindow, isTask, task, subTask }) => {
    const dispatch = useDispatch();
    const valueOpenRef = useRef();
    const AssigneToRef = useRef();
    const StatusOpenRef = useRef();
    const folderOpenRef = useRef();
    const myUser = useSelector(state => state.auth.userInfo);
    const [isOpenValueType, setIsOpenValueType] = useState(false);
    const [isOpenAssigneTo, setIsOpenAssigneTo] = useState(false);
    const [isOpenStatusStyle, setIsOpenStatusStyle] = useState(false);
    const [isOpenFolder, setIsOpenFolder] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})
    const [selectedFolder, setSelectedFolder] = useState({})
    const [Comment, setComment] = useState(task ? task.comment : (subTask ? subTask.comment : ''));
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedDataFrom, setSelectedDataFrom] = useState(new Date())
    const [selectedDataTo, setSelectedDataTo] = useState(selectedDataFrom || new Date())
    const [selectedStatus, setSelectedStatu] = useState("TODO")
    const [userList, setUserList] = useState([]);
    const [summary, setSummary] = useState("");
    const [folderList, setFolderList] = useState([]);
    const [patchName, setPatchName] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [selectedOption, setSelectedOption] = useState({
        value: "Sub Task", label: "Sub Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    });

    useEffect(() => {
        if (!isTask && !isEditing) {
            setSelectedTask(task)
        }
    }, [])

    const statusList = ["TODO", "INPROGRESS", "DONE", "REJECTED", "UNCERTAIN"];

    useEffect(() => {
        if (isEditing) {
            if (isTask) {

                const name = task?.drive_folder_path?.split("სამუშაო გარემო/")[1];
                setSummary(task?.title)
                setComment(task?.comment)
                setSelectedUser(task?.assign_to)
                setSelectedStatu(task?.status)
                setSelectedDataFrom(task?.deadline_from)
                setSelectedDataTo(task?.deadline_to)
                setSelectedFolder({
                    Name: name,
                    Patch: task?.drive_folder_path
                })
                setSelectedOption({
                    value: "Task", label: "Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                })
            } else {
                setSummary(subTask?.title)
                setComment(subTask?.comment)
                setSelectedUser(subTask?.assign_to)
                setSelectedStatu(subTask?.status)
                setSelectedDataFrom(subTask?.deadline_from)
                setSelectedDataTo(subTask?.deadline_to)
                setSelectedTask(subTask?.task)
                setSelectedOption({
                    value: "Sub Task", label: "Sub Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                })
            }
        }
    }, [task, subTask])


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
                return "შესასრულებელი";
            case "INPROGRESS":
                return "მიმდინარე";
            case "DONE":
                return "შესრულებული";
            case "REJECTED":
                return "უარყოფილი";
            case "UNCERTAIN":
                return "გაურკვეველი";
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
        const defaultSettings = {
            "fs": "GoogleDrive:",
            "remote": "სამუშაო გარემო",
        }
        try {
            const response = await FileService.getSincFolderList(defaultSettings);
            setFolderList(response.data.list)
        } catch (e) {
            console.error(e)
        }
    };


    const fetchTaskList = async () => {
        try {
            const response = await TaskService.getTaskList("?ordering=-created_at&&status=TODO,INPROGRESS");
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


    const isFormValid = () => {
        const isSummaryValid = summary.trim() !== '';
        const isStatusValid = Boolean(selectedStatus);
        const isUserValid = Boolean(selectedUser);

        const isDatesValid = formatDDate(selectedDataFrom) && formatDDate(selectedDataTo);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDataToDate = new Date(selectedDataTo);
        selectedDataToDate.setHours(0, 0, 0, 0);

        let isDateNowValid = true;
        if (selectedOption.label === "Task") {
            if (selectedDataTo !== task?.deadline_to) {
                isDateNowValid = selectedDataToDate >= today;
            }
        } else if (selectedOption.label === "Sub Task") {
            if (selectedDataTo !== subTask?.deadline_to) {
                isDateNowValid = selectedDataToDate >= today;
            }
        }

        if (!isDateNowValid) {
            toast.warning("The deadline cannot be in the past", {
                containerId: "error",
            });
        }

        const isOptionValid = (selectedOption.label === "Task" && Boolean(selectedFolder)) ||
            (selectedOption.label === "Sub Task" && Boolean(selectedTask));

        return isSummaryValid && isStatusValid && isDatesValid && isUserValid && isOptionValid && isDateNowValid;
    };

    const fetchData = () => {
        if (isFormValid()) {
            if (isEditing) {
                if (selectedOption.label === "Task") {
                    const formData = {
                        title: summary,
                        status: selectedStatus,
                        comment: Comment?.comment,
                        ...(selectedDataFrom !== task?.deadline_from && {
                            deadline_from: formatDDate(selectedDataFrom),
                        }),
                        ...(selectedDataTo !== task?.deadline_to && {
                            deadline_to: formatDDate(selectedDataTo),
                        }),
                        assign_to: selectedUser.pk,
                        drive_folder_path: selectedFolder.Path
                    };

                    dispatch(editTaskThunk({ uuid: task.uuid, formData: formData }));
                    closeWindow();
                }
                else if (selectedOption.label === "Sub Task") {
                    const formData = {
                        assign_to: selectedUser.pk,
                        title: summary,
                        comment: Comment?.comment,
                        status: selectedStatus,
                        ...(selectedDataFrom !== subTask?.deadline_from && {
                            deadline_from: formatDDate(selectedDataFrom),
                        }),
                        ...(selectedDataTo !== subTask?.deadline_to && {
                            deadline_to: formatDDate(selectedDataTo),
                        }),
                        task: selectedTask.uuid
                    };
                    dispatch(editSubTaskThunk({ uuid: subTask.uuid, formData: formData }));
                    closeWindow();
                }
            } else {
                if (selectedOption.label === "Task") {
                    const formData = {
                        title: summary,
                        status: selectedStatus,
                        comment: Comment?.comment,
                        deadline_from: formatDDate(selectedDataFrom),
                        deadline_to: formatDDate(selectedDataTo),
                        assign_to: selectedUser.pk,
                        drive_folder_path: selectedFolder.Path
                    };
                    const response  = dispatch(addTaskThunk(formData));
                    closeWindow();
                } else if (selectedOption.label === "Sub Task") {
                    const formData = {
                        assign_to: selectedUser.pk,
                        title: summary,
                        comment: Comment?.comment,
                        status: selectedStatus,
                        deadline_from: formatDDate(selectedDataFrom),
                        deadline_to: formatDDate(selectedDataTo),
                        task: selectedTask.uuid
                    };
                    dispatch(addSubTAsk(formData));
                    closeWindow();
                }
            }
        } else {
        }
    };

    const openUserList = () => {
        setIsOpenAssigneTo(!isOpenAssigneTo)
        fetchUserList()
    }
    const openfolderList = () => {
        setIsOpenFolder(!isOpenFolder)
        fetchFolderList()
    }
    const makeAssigneMy = () => {
        let user = {
            email: myUser.email,
            first_name: myUser.first_name,
            last_name: myUser.last_name,
            pk: myUser.id,
            username: myUser.username
        }
        setSelectedUser(user);
    }

    const createNewFolderHandle = () => {
        setIsModalOpen(true);
    }

    const CancelCreating = () => {
        setPatchName('')
        setIsModalOpen(false);

    }


    const createFolder = async (folderName) => {
        FileService.rcMkdir("GoogleDrive:", folderName);
    };


    const handleSubmitFolder = (event) => {
        event.preventDefault();
        try {
            createFolder(`სამუშაო გარემო/${patchName}`)
            toast.success("Folder Created", {
                containerId: "error"
            })
            setPatchName("")
            setIsModalOpen(false);
        } catch (err) {
            console.error(err)
            toast.warning(err, {
                containerId: "error"
            });
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (valueOpenRef.current && !valueOpenRef.current.contains(event.target)) {
                setIsOpenValueType(false);
            }
            if (AssigneToRef.current && !AssigneToRef.current.contains(event.target)) {
                setIsOpenAssigneTo(false);
            }
            if (StatusOpenRef.current && !StatusOpenRef.current.contains(event.target)) {
                setIsOpenStatusStyle(false);
            }
            if (folderOpenRef.current && !folderOpenRef.current.contains(event.target)) {
                setIsOpenFolder(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F7F5F5] rounded-lg shadow-lg p-6 mx-4 md:mx-auto max-w-6xl w-full max-h-[80%] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-roboto font-semibold">{isEditing ? "შეცვლა" : "შექმნა"}</h2>
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
                                {!isEditing &&
                                    <>
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
                                                <div ref={valueOpenRef} className='ml-[4.2rem] text-sm '>
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
                                    </>
                                }
                                <div className='ml-20 pt-4'>
                                    <table className="w-full">
                                        <tbody>
                                            {/* Summary */}
                                            <tr className="">
                                                <td className="text-right text-base p-2">სათაური</td>
                                                <td className="p-2">
                                                    <input
                                                        value={summary}
                                                        onChange={(e) => setSummary(e.target.value)}
                                                        type="text"
                                                        id="summary"
                                                        className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Description */}
                                            <tr className="">
                                                <td className="text-right text-base p-2">აღწერა:</td>
                                                <td className="p-2">
                                                    <div className="border border-gray-300 rounded-md p-2 max-w-[45rem] min-h-80 bg-white">
                                                        <TextEditor
                                                            defaultValue={Comment}
                                                            isEditing={true}
                                                            setFormData={setComment}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Assignee */}
                                            <tr className="">
                                                <td className="text-right text-base p-2 pt-3 align-text-top">შემსრულებელი:</td>
                                                <td className="p-2 relative">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={openUserList}
                                                            className="inline-flex w-full max-w-[32rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <div className="ml-2 mr-1">
                                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11.6668 12.25V11.0833C11.6668 10.4645 11.421 9.871 10.9834 9.43342C10.5458 8.99583 9.95233 8.75 9.3335 8.75H4.66683C4.04799 8.75 3.4545 8.99583 3.01691 9.43342C2.57933 9.871 2.3335 10.4645 2.3335 11.0833V12.25M9.3335 4.08333C9.3335 5.372 8.28883 6.41667 7.00016 6.41667C5.7115 6.41667 4.66683 5.372 4.66683 4.08333C4.66683 2.79467 5.7115 1.75 7.00016 1.75C8.28883 1.75 9.3335 2.79467 9.3335 4.08333Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-gray-500">{selectedUser?.email}</span>
                                                            </div>
                                                            <svg
                                                                className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenAssigneTo ? "rotate-180" : "rotate-0"}`}
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
                                                        <div ref={AssigneToRef} className="absolute z-10 bg-white border border-gray-300 rounded-xl shadow-lg">
                                                            <ul className="text-sm">
                                                                {userList.map((user) => (
                                                                    <li
                                                                        key={user.pk}
                                                                        onClick={() => handleAssigneToClick(user)}
                                                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                    >
                                                                        <span className="text-gray-400">{user.email}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    <button type="button" onClick={makeAssigneMy} className="text-blue-500 text-xs font-medium">Assign to me</button>
                                                </td>
                                            </tr>

                                            {/* Status */}
                                            <tr className="">
                                                <td className="text-right text-base p-2">სტატუსი:</td>
                                                <td className="p-2 relative">
                                                    <div className="flex items-center text-sm w-full">
                                                        <button
                                                            onClick={() => setIsOpenStatusStyle(!isOpenStatusStyle)}
                                                            className="inline-flex w-full max-w-[10rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                        >
                                                            <div className="items-center">
                                                                <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center ${getStatusStyles(selectedStatus)}`}>
                                                                    {getStatusLabel(selectedStatus)}
                                                                </div>
                                                            </div>
                                                            <svg
                                                                className={`w-3 h-3 ml-auto mr-1 transform transition-transform duration-200 ${isOpenStatusStyle ? "rotate-180" : "rotate-0"}`}
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
                                                        <div ref={StatusOpenRef} className="absolute z-10 mt-1 w-full max-w-[10rem] bg-white border border-gray-300 rounded-xl shadow-lg">
                                                            <ul className="text-sm">
                                                                {statusList.map((status) => (
                                                                    <li
                                                                        key={status}
                                                                        onClick={() => handleStatusToCLick(status)}
                                                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                    >
                                                                        <div className="items-center">
                                                                            <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center ${getStatusStyles(status)}`}>
                                                                                {getStatusLabel(status)}
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>

                                            {/* Dates */}
                                            <tr className="">
                                                <td className="text-right text-base p-2">თარიღები:</td>
                                                <td className="p-2">
                                                    <div className="flex items-center text-sm w-full">
                                                        <div className="flex items-center">
                                                            <DatePicker
                                                                selected={selectedDataFrom}
                                                                onChange={date => setSelectedDataFrom(date)}
                                                                customInput={<CustomDataInput />}
                                                                minDate={new Date()}
                                                                dateFormat="yyyy-MM-dd"
                                                            />
                                                            <div className="w-8 h-px bg-gray-200" />
                                                            <DatePicker
                                                                selected={selectedDataTo}
                                                                onChange={date => setSelectedDataTo(date)}
                                                                customInput={<CustomDataInput />}
                                                                minDate={selectedDataFrom}
                                                                dateFormat="yyyy-MM-dd"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Folder/Task */}
                                            <tr className="">
                                                <td className="text-right text-base p-2 pt-3 align-text-top">
                                                    <p>{selectedOption.label === "Task" ? "ფოლდერი:" : "დავალება:"}</p>
                                                </td>
                                                <td className="p-2 relative">
                                                    <div className="flex items-center text-sm w-full">
                                                        <button
                                                            onClick={openfolderList}
                                                            className="inline-flex w-full max-w-[32rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <div className="ml-2 mr-1">
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 4H4C2.895 4 2 4.895 2 6V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V8L14 4H10Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-gray-500">
                                                                    {selectedOption.label === "Task" ? selectedFolder?.Name : selectedTask?.title}
                                                                </span>
                                                            </div>
                                                            <svg
                                                                className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-200 ${isOpenFolder ? "rotate-180" : "rotate-0"}`}
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
                                                        <div ref={folderOpenRef} className="absolute z-50 mt-1 text-sm">
                                                            <ul className="w-80 bg-white border border-gray-300 rounded-xl shadow-lg">
                                                                {selectedOption.label === "Task" ? (
                                                                    folderList?.map((obj) => (
                                                                        obj.IsDir && (
                                                                            <li
                                                                                key={obj.ID}
                                                                                onClick={() => handleFolderToClick(obj)}
                                                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                            >
                                                                                <span className="text-gray-400">{obj.Name}</span>
                                                                            </li>
                                                                        )
                                                                    ))

                                                                ) : (
                                                                    taskList?.map((obj) => (
                                                                        <li
                                                                            key={obj.uuid}
                                                                            onClick={() => handleTaskToClick(obj)}
                                                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                        >
                                                                            <span className="text-gray-400">{obj.title}</span>
                                                                        </li>
                                                                    ))
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {selectedOption.label === "Task" && <button type="button" onClick={createNewFolderHandle} className="text-blue-500 text-xs font-medium">create new folder</button>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>


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
            <ModalWindow
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Folder Create"
            >
                <form className="max-w-md mx-auto pt-4" onSubmit={handleSubmitFolder}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="title"
                            value={patchName}
                            onChange={(e) => setPatchName(e.target.value)}
                            required
                            id="floating_title"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_title"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Title
                        </label>
                    </div>

                    <div className="w-full flex justify-end space-x-4">
                        <button
                            onClick={CancelCreating}
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </ModalWindow>
        </div>);
};

export default TaskEdit;
