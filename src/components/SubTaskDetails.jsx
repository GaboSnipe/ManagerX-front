import React, { useState } from 'react';
import 'quill/dist/quill.snow.css';
import TaskEdit from './TaskEdit';

const SubTaskDetails = ({ selectedSubTask, setIsOpen }) => {
    const [ isEditing, setIsEditing ] = useState(false);

console.log(selectedSubTask)
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

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
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

    const startEdit = () => {
        setIsEditing(true);
    }


    const close = () => {
        setIsOpen(false);
    }

    const closeAddTaskWindow = () => {
        setIsEditing(false)
    }


    return (
        <>
        <button
          className="m-4 absolute right-0 bg-white p-1 rounded-full hover:bg-gray-200"
          onClick={close}
        >
          <svg
            className="h-4 w-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className='pl-5 pt-8'>
        
            <>  {/*TITLE */}
                <p className="font-extrabold not-italic font-roboto text-lg tracking-wide leading-[150%] ml-3 text-gray-700">
                    {selectedSubTask.title}
                </p>
            </>

            <div className='rounded-md border border-[#C8C2C2] ml-3 mt-2 w-[6.5rem]'>
                <button onClick={startEdit} className='text-xs text-[#3F3F46] px-4'>Edit Subtask</button>
            </div>

            <>  {/*DETAILS */}
                <div className='pl-3 pr-10 pt-8'>
                    <div>
                        <p className='text-sm font-roboto not-italic tracking-wide leading-[150%]'>Details:</p>
                    </div>
                    <div className="w-full h-px bg-[#E0E0E0]" />
                    <div className="pt-4">
                        <table>
                            <colgroup>
                                <col className='w-24' />
                                <col />
                            </colgroup>
                            <tbody className='text-xs font-roboto leading-[150%] not-italic text-black'>
                                <tr className='h-9'>
                                    <td>Task:</td>
                                    <td>{selectedSubTask.task.title}</td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Status:</td>
                                    <td><>  {/*STATUS */}
                                        <div className="items-center">
                                            <div className={`text-white text-xs w-16 min-w-16 py-0.5 rounded-full text-center ${getStatusStyles(selectedSubTask.status)}`}>
                                                {getStatusLabel(selectedSubTask.status)}
                                            </div>
                                        </div>
                                    </></td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Deadline:</td>
                                    <td>
                                        <>  {/*DEADLINE */}
                                            <div className="flex items-center">
                                                <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                    {selectedSubTask.deadline_from}
                                                </div>
                                                <div className="w-4 h-px bg-[#C2BDAD]" />
                                                <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                    {selectedSubTask.deadline_to}

                                                </div>
                                            </div>
                                        </>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Reporter:</td>
                                    <td>
                                        <div className='flex'>
                                            {/*ASSIGNED */}
                                            <div className='flex items-center text-xs text-[#727272] space-x-1'>
                                                <img src={selectedSubTask.creator.avatar} className="w-5 h-5 rounded-full overflow-hidden" />
                                                <p className='font-roboto'>{selectedSubTask.creator.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Assignee:</td>
                                    <td>
                                        <div className='flex'>
                                            {/*ASSIGNED */}
                                            <div className='flex items-center text-xs text-[#727272] space-x-1'>
                                                <img src={selectedSubTask.assign_to.avatar} className="w-5 h-5 rounded-full overflow-hidden" />
                                                <p className='font-roboto'>{selectedSubTask.assign_to.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Created At:</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                {formatDate(selectedSubTask.created_at)}

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Updated At:</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                {formatDate(selectedSubTask.updated_at)}

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                {isEditing && 
            <TaskEdit isEditing={true} closeWindow={closeAddTaskWindow} isTask={false} subTask={selectedSubTask} />
        }
            </>
        </div>
        </>
    );
};

export default SubTaskDetails;
