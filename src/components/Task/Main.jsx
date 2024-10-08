// MainPage.js
import React, { useEffect, useRef, useState } from 'react';
import { TaskCard, TaskDetails } from "./Components"
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';
import TextEditor from '../TextEditor';
import { useSelector } from 'react-redux';
import TaskEdit from '../TaskEdit';
import { useDispatch } from 'react-redux';
import { getSubTaskThunk } from '../../features/task/taskThunk';

const Task = ({ task, setSeeResizebleDiv }) => {
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const [isRotated, setIsRotated] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingTasq, setIsAddingTasq] = useState(false)

    const closeIsAddingTasq = () => {
        setIsAddingTasq(false)
    }

    const openIsAddingTasq = () => {
        setIsAddingTasq(true)
    }

    const defaultComment = `{"ops":[{"attributes":{"color":"#bbbbbb","size":"normal"},"insert":"This task does not have a description."},{"insert":"\\n"}]}`;

    const toggleRotation = () => {
        setIsRotated(!isRotated);
    };

    const handleClick = () => {
        navigate('/workplace');
    };


    const compareTime = (time) => {
        const now = new Date();
        const [year, month, day] = time.split('-').map(Number);
        const target = new Date(year, month - 1, day);
        const timeDiff = target - now;
        return timeDiff < 0;
    }

    const getTimeStatus = (targetDateStr) => {
        const now = new Date();
        const [year, month, day] = targetDateStr.split('-').map(Number);
        const target = new Date(year, month - 1, day);
        const timeDiff = target - now;

        if (timeDiff < 0) {
            return "Overdue";
        } else {
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysLeft === 1) {
                return "Due Today";
            }
        }
    }

    const getDateStyle = (date) => {
        const now = new Date();
        const [year, month, day] = date.split('-').map(Number);
        const target = new Date(year, month - 1, day);
        const timeDiff = target - now;

        if (timeDiff < 0) {
            return "bg-[#B22222]";
        } else {
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysLeft === 1) {
                return "bg-[#FFBF00]";
            }
        }
    }

    const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;


    const getOverdueTaskStyle = (date) => {
        const now = new Date();
        const [year, month, day] = date.split('-').map(Number);
        const target = new Date(year, month - 1, day);
        const timeDiff = target - now;

        if (timeDiff < 0) {
            return "bg-[rgba(255,127,127,0.2)]";
        } else {
            return "bg-white";
        }
    }

    const selectSubTask = (subTask) => {
        dispatch(getSubTaskThunk(subTask.uuid));
        setSeeResizebleDiv(true)
    }

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

    const openTaskEdit = () => {
        setIsEditing(true)
    }

    const closeAddTaskWindow = () => {
        setIsEditing(false)
    }


    return (

        <div className={`bg-[#F7F5F5] max-w-[112rem] min-w-[56rem]  rounded-md mb-8 shadow-lg mx-auto  ${getOverdueTaskStyle(task.deadline_to)}`}
            style={{
                boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',
            }}
        >

            <div
                className='p-4'
                onClick={toggleRotation}
                style={{
                    cursor: 'pointer',
                }}>
                <div className="flex items-center">


                    <>  {/*TOGGLE ICON */}
                        <svg
                            className="ml-4"
                            width="20"
                            height="20"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <g clipPath="url(#clip0_79_286)">
                                <path
                                    d="M0 7C0 3.13401 3.1865 0 7.05249 0C10.9185 0 14.105 3.13401 14.105 7C14.105 10.866 10.9185 14 7.05249 14C3.1865 14 0 10.866 0 7Z"
                                    fill="#E9E0E0"
                                />
                            </g>
                            <path
                                d="M4.27393 5.86768L6.83847 8.13238L9.40301 5.86768"
                                stroke="#1E1E1E"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </>


                    <>  {/*TITLE */}
                        <p className="font-extrabold not-italic font-roboto text-lg tracking-wide overflow-hidden text-ellipsis ml-3 text-gray-700" title={task?.title}>
                            {task?.title}
                        </p>
                    </>


                    <>  {/*DEADLINE */}
                        <div className="flex items-center ml-10">
                            <div className="bg-[#C2BDAD] text-white px-2.5 w-24 text-center py-0.5 rounded-full text-xs">
                                {task?.deadline_from}
                            </div>
                            <div className="w-4 h-px bg-[#C2BDAD]" />
                            <div className="bg-[#C2BDAD] text-white px-2.5 w-24 text-center py-0.5 rounded-full text-xs">
                                {task?.deadline_to}

                            </div>
                        </div>
                    </>


                    <>  {/*STATUS */}
                        <div className="items-center ml-8">
                            <div className={`text-white text-xs  w-32 min-w-32 py-0.5 rounded-full text-center ${getStatusStyles(task?.status)}`}>
                                {getStatusLabel(task?.status)}
                            </div>
                        </div>
                    </>


                    <>  {/*FOLDER */}
                        <div className="items-center ml-4 flex border rounded-full border-[#D8D4D4] border-px px-2">
                            <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_79_505)">
                                    <path d="M8.25 7.125C8.25 7.32391 8.17098 7.51468 8.03033 7.65533C7.88968 7.79598 7.69891 7.875 7.5 7.875H1.5C1.30109 7.875 1.11032 7.79598 0.96967 7.65533C0.829018 7.51468 0.75 7.32391 0.75 7.125V1.875C0.75 1.67609 0.829018 1.48532 0.96967 1.34467C1.11032 1.20402 1.30109 1.125 1.5 1.125H3.375L4.125 2.25H7.5C7.69891 2.25 7.88968 2.32902 8.03033 2.46967C8.17098 2.61032 8.25 2.80109 8.25 3V7.125Z" stroke="#727272" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <div className=' text-[#727272] text-xs rounded-full ml-2 text-center  mx-2'>
                                {task?.drive_folder_path?.split("სამუშაო გარემო/")[1]}
                            </div>
                            <div className='h-4 w-px bg-[#D8D4D4] ' />
                            <button onClick={handleClick} className='group'>
                                <svg
                                    width="15"
                                    height="16"
                                    viewBox="0 0 8 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-[#727272] group-hover:stroke-[#0000EE]"
                                >
                                    <path
                                        d="M3.2085 8.5L7.79183 3.5M7.79183 3.5H3.2085M7.79183 3.5V8.5"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </>
                </div>
                <div className='flex mt-1 content-center'>
                    {/*ASSIGNED */}
                    <div className='flex items-center text-xs text-[#727272] ml-12 space-x-1'>
                        <p className='font-roboto'>დაავალა</p>
                        <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                            <img src={task?.assign_to?.avatar ? task?.assign_to?.avatar : baseAvatarUrl} title={task?.assign_to?.email} className="absolute inset-0 object-cover w-full h-full" />
                        </div>
                        <p className='font-roboto'>-მ</p>
                        <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                            <img src={task?.creator?.avatar ? task?.creator?.avatar : baseAvatarUrl}  title={task?.creator?.email} className="absolute inset-0 object-cover w-full h-full" />
                        </div>
                        <p className='font-roboto'>-ს</p>
                    </div>
                    <div className='rounded-md border border-[#C8C2C2] ml-9'>
                        <button onClick={openTaskEdit} className='h-0 px-4 py-1 text-xs text-[#3F3F46] bg-transparent border-none'> პროექტის შეცვლა </button>

                    </div>
                    <div className='rounded-md border border-[#C8C2C2] ml-9'>
                        <button onClick={openIsAddingTasq} className='h-0 px-4 py-1 text-xs text-[#3F3F46] bg-transparent border-none'> დავალების დამატება </button>

                    </div>
                    {compareTime(task.deadline_from) &&
                        <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center h-5 mt-1 ml-8 ${getDateStyle(task.deadline_to)}`}>
                            {getTimeStatus(task.deadline_to)}
                        </div>
                    }
                </div>
            </div>

            {isRotated &&
                <>
                    <>
                        <div className='pl-16 pr-10 pt-3'>
                            {/* Description */}
                            <div>
                                <p className='text-sm font-roboto not-italic tracking-wide leading-[150%]'>აღწერა:</p>
                            </div>
                            <div className="w-full h-px bg-[#E0E0E0]" />
                        </div>
                        <div className='pl-12 pr-10 '>
                            <TextEditor
                                defaultValue={task?.comment || defaultComment}
                                isEditing={isEditing}
                            />
                        </div>
                    </>



                    <div className='pl-16 pb-10 pr-10 mt-10'>
                        {task.subtasks && task.subtasks.length > 0 ? (
                            task?.subtasks?.map((subtask, index) => (
                                <div key={subtask.uuid} className={`h-[1.85rem] border relative hover:bg-gray-100 border-[rgba(0,0,0,0.21)] rounded-md flex items-center px-2 shadow-lg mb-px w-full   ${getOverdueTaskStyle(subtask.deadline_to)}`}
                                    style={{
                                        boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',

                                        cursor: 'pointer',
                                    }}
                                    onClick={() => selectSubTask(subtask)}
                                >
                                    <input
                                        type="checkbox"
                                        id={`subtask-${subtask.uuid}`}
                                        className="mr-2 w-3 h-3 rounded border-[#C9C9C9] bg-[#C9C9C9] checked:bg-[#7993d0] checked:border-[#7993d0] focus:ring-0"
                                    />
                                    <p className="font-[600] not-italic font-roboto text-[0.65rem] whitespace-nowrap overflow-hidden max-w-full tracking-wide leading-[150%] text-ellipsis text-black" title={subtask.title}>
                                        {subtask.title}
                                    </p>
                                    <div className="flex items-center ml-auto">
                                        {compareTime(subtask.deadline_from) &&
                                            <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center mr-4 ${getDateStyle(subtask.deadline_to)}`}>
                                                {getTimeStatus(subtask.deadline_to)}
                                            </div>
                                        }
                                        <div className='flex text-[0.6rem] text-[#727272] space-x-2 mr-5 items-center'>
                                            <p className='font-roboto'>დაავალა</p>
                                            <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                                                <img src={subtask.creator.avatar ? subtask.creator.avatar : baseAvatarUrl}   title={task?.creator?.email}  className="absolute inset-0 object-cover w-full h-full" />
                                            </div>
                                            <p className='font-roboto'>-მ</p>

                                            <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                                                <img src={subtask.assign_to.avatar ? subtask.assign_to.avatar : baseAvatarUrl}   title={task?.assign_to?.email}  className="absolute inset-0 object-cover w-full h-full" />
                                            </div>
                                            <p className='font-roboto'>-ს</p>
                                        </div>
                                        <div className="flex items-center mr-5">
                                            <div className="bg-[#C2BDAD] text-white w-24 px-2.5 text-center py-0.5 rounded-full text-xs">
                                                {subtask.deadline_from}
                                            </div>
                                            <div className="w-4 h-px bg-[#C2BDAD]" />
                                            <div className="bg-[#C2BDAD] text-white w-24 text-center px-2.5 py-0.5 rounded-full text-xs">
                                                {subtask.deadline_to}
                                            </div>
                                        </div>
                                        <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center mr-4 ${getStatusStyles(subtask.status)}`}>
                                            {getStatusLabel(subtask.status)}
                                        </div>

                                    </div>




                                </div>
                            ))
                        ) : (
                            <span className='text-gray-400 font-medium w-full text-lg'>
                                This task does not have a Subtasks.
                            </span>
                        )}

                    </div>
                </>

            }
            {isAddingTasq &&
                <TaskEdit isEditing={false} closeWindow={closeIsAddingTasq} isTask={false} task={task}/>
            
            }
            {isEditing &&
                <TaskEdit isEditing={true} closeWindow={closeAddTaskWindow} isTask={true} task={task} />
            }
        </div>

    );
};

export default Task;

