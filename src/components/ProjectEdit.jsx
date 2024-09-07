import React, { useState, useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor, ModalWindow, TextEditor } from '.';
import "../styles/scrollBar.css"
import UserService from '../services/UserService';

import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import FileService from '../services/FileService';
import { createNewProjectThunk } from '../features/project/projectThunk';
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



const ProjectEdit = ({ isEditing, closeWindow, project , onSubmit }) => {
    const dispatch = useDispatch();
    const folderOpenRef = useRef();
    const [isOpenFolder, setIsOpenFolder] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [summary, setSummary] = useState("");
    const [folderList, setFolderList] = useState([]);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        if (isEditing) {

            const name = task.drive_folder_path.split("სამუშაო გარემო/")[1];
            setSummary(task?.title)
            setComment(task?.comment.comment)
            setSelectedUser(task?.assign_to)
            setSelectedStatu(task?.status)
            setSelectedDataFrom(task?.deadline_from)
            setSelectedDataTo(task?.deadline_to)
            setSelectedFolder({
                Name: name,
                Patch: task.drive_folder_path
            })
            setSelectedOption({
                value: "Task", label: "Task", icon: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66667 3.95654H12.25M4.66667 7.91306H12.25M4.66667 11.8696H12.25M1.75 3.95654H1.75583M1.75 7.91306H1.75583M1.75 11.8696H1.75583" stroke="#009951" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            })
        }
    }, [project])



    const fetchTaskList = async () => {
        try {
            const response = await TaskService.getTaskList();
            setTaskList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    const handleTaskToClick = (option) => {
        setSelectedTask(option);
        setIsOpenFolder(false);
    };

    const isFormValid = () => {
        const isTaskValid = selectedTask;

        return isTaskValid;
    };
    


    const fetchData = () => {
        if (isFormValid()) {
            if (isEditing) {
                const formData = {
                    conclusionNumber: summary,
                    task: selectedTask.uuid
                };
                dispatch(createNewProjectThunk({ uuid: task.uuid, formData: formData }));
                closeWindow();
            } else {
                dispatch(createNewProjectThunk({ conclusionNumber: summary ? summary : "", task: selectedTask.uuid }))
                .then(() => {
                    onSubmit();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            

                closeWindow();
                
            }
        }}

        const openTaskList = () => {
            setIsOpenFolder(!isOpenFolder)
            fetchTaskList()
        }


        useEffect(() => {
            const handleClickOutside = (event) => {
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
                        <h2 className="text-lg font-roboto font-semibold">{isEditing ? "Edit" : "Create"}</h2>
                        <button
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={closeWindow}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className=" py-10 w-full">
                            <div className="space-y-3">

                                <div className=' pt-4'>
                                    <table className="w-full">
                                        <tbody>
                                            {/* Summary */}
                                            <tr className="">
                                                <td className="text-right text-base p-2 w-60">დასკვნის ნომერი:</td>
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
                                            {/* Folder/Task */}
                                            <tr className="">
                                                <td className="text-right text-base p-2 pt-3 align-text-top w-60">
                                                    <p>Task:</p>
                                                </td>
                                                <td className="p-2 relative">
                                                    <div className="flex items-center text-sm w-full">
                                                        <button
                                                            onClick={openTaskList}
                                                            className="inline-flex w-full max-w-[32rem] p-1 border border-gray-300 rounded-xl bg-white items-center"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <div className="ml-2 mr-1">
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 4H4C2.895 4 2 4.895 2 6V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V8L14 4H10Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-gray-500">
                                                                    {selectedTask?.title}
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
                                                                {taskList?.map((obj) => (
                                                                        <li
                                                                            key={obj.uuid}
                                                                            onClick={() => handleTaskToClick(obj)}
                                                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                                        >
                                                                            <span className="text-gray-400">{obj.title}</span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )}
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
            </div>);
    };

    export default ProjectEdit;
