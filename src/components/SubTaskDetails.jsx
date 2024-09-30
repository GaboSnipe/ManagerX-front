import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import TaskEdit from './TaskEdit';
import { CommentSection } from 'react-comments-section';
import { MultipleFileUploadBasic } from "./FileUploader"
import { FaFile, FaDownload } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import 'react-comments-section/dist/index.css';
import FileService from '../services/FileService';
import TaskService from '../services/TaskService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSubTaskThunk } from '../features/task/taskThunk';
import Editorcopy from './Editorcopy';
import { useNavigate } from 'react-router-dom';

const SubTaskDetails = ({ setIsOpen , resizableDivWidth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const user = useSelector((state) => state.auth.userInfo);
    const selectedSubTask = useSelector((state) => state.task.selectedSubtask);

    const [comments, setComments] = useState([]);

    const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;



    useEffect(() => {
        const formattedComments = selectedSubTask?.comments?.map((com) => {
            const data = {
                userId: com.creator.id,
                comId: com.uuid,
                fullName: `${com.creator.first_name} ${com.creator.last_name}`,
                avatarUrl: `${com.creator.avatar? com.creator.avatar : baseAvatarUrl}`,
                text: com.content,
                replies: com.replies ? com.replies.map((subcom) => ({
                    userId: subcom.creator.id,
                    comId: subcom.uuid,
                    fullName: `${subcom.creator.first_name} ${subcom.creator.last_name}`,
                    avatarUrl: `${subcom.creator.avatar? subcom.creator.avatar : baseAvatarUrl}`,
                    text: subcom.content,
                })) : []
            };

            return data;
        });

        setComments(formattedComments);
    }, [selectedSubTask?.comments]);


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
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
    };
    


    const startEdit = () => {
        setIsEditing(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    const downloadBlob = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleDownload = async (fileUuid, filename) => {
        try {
            const blob = await FileService.downloadAttachment(fileUuid);
            downloadBlob(blob, filename);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const handleDelete = async (fileUuid) => {
        try {
            await FileService.deleteAttachment(fileUuid);
            dispatch(getSubTaskThunk(selectedSubTask?.uuid))
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const closeAddTaskWindow = () => {
        setIsEditing(false);
    };

    // const handleFileChange = (e) => {
    //     setSelectedFiles([...selectedFiles, ...e.target.files]);
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     setSelectedFiles([...selectedFiles, ...e.dataTransfer.files]);
    // };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleSubmit = () => {
    //     const formData = new FormData();
    //     selectedFiles.forEach((file) => {
    //         formData.append("files", file);
    //     });
    //     fetch("/upload", {
    //         method: "POST",
    //         body: formData,
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Handle the response
    //         })
    //         .catch((error) => {
    //             // Handle the error
    //         });
    // };

    const onSubmitAction = (data) => {
        TaskService.createComment(data.text, selectedSubTask?.uuid)
            dispatch(getSubTaskThunk(selectedSubTask?.uuid))


    };

    const customNoComment = () => <div className='no-com'>No comments, wohoooo!</div>;
    const onReplyAction = (data) => {
        TaskService.createComment(data.text, selectedSubTask?.uuid, data.parentOfRepliedCommentId ? data.parentOfRepliedCommentId : data.repliedToCommentId)
        dispatch(getSubTaskThunk(selectedSubTask?.uuid))

    };
    const onDeleteAction = (data) => {
        TaskService.deletecomment(data.comIdToDelete)
        dispatch(getSubTaskThunk(selectedSubTask?.uuid))

    };

    const navigateToSingleSubTask = (uuid) => {
        navigate(`/subtask/${uuid}`)
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
                {/* TITLE */}
                <p className="font-extrabold not-italic font-roboto text-lg truncate tracking-wide leading-[150%] overflow-hidden mr-12 ml-3 hover:text-gray-500 cursor-pointer text-gray-700"
                title={selectedSubTask?.title}
                onClick={() => {navigateToSingleSubTask(selectedSubTask?.uuid)}}
                >
                    {selectedSubTask?.title}
                </p>

                <div className='rounded-md border border-[#C8C2C2] ml-3 mt-2 w-[6.5rem]'>
                    <button onClick={startEdit} className='text-xs text-[#3F3F46] px-4'>დავალების შეცვლა</button>
                </div>

                <div className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-[#252525]">
                  <section className="w-auto p-5 overflow-x-hidden">
                    <p className="text-start text-gray-700 text-2xl mb-4">აღწერა:</p>
                    <div style={{ width: resizableDivWidth - 150 }} className="p-5 border border-gray-300 rounded max-w-full">
                      <Editorcopy
                        defaultValue={selectedSubTask?.comment}
                        readOnly={true}
                      />
                    </div>
                  </section>
                </div>
                {/* DETAILS */}
                {/*DETAILS */}

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
                                    <td>{selectedSubTask?.task?.title}</td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Status:</td>
                                    <td><>  {/*STATUS */}
                                        <div className="items-center">
                                            <div className={`text-white text-xs w-32 min-w-32  py-0.5 rounded-full text-center ${getStatusStyles(selectedSubTask?.status)}`}>
                                                {getStatusLabel(selectedSubTask?.status)}
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
                                                    {selectedSubTask?.deadline_from}
                                                </div>
                                                <div className="w-4 h-px bg-[#C2BDAD]" />
                                                <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                    {selectedSubTask?.deadline_to}

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
                                                <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                                                <img src={selectedSubTask?.creator?.avatar ? selectedSubTask?.creator?.avatar : baseAvatarUrl} className="absolute inset-0 object-cover w-full h-full" />
                                                </div>
                                                <p className='font-roboto'>{selectedSubTask?.creator?.email}</p>
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
                                                <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                                                    <img src={selectedSubTask?.assign_to?.avatar ? selectedSubTask?.assign_to?.avatar : baseAvatarUrl} className="absolute inset-0 object-cover w-full h-full" />
                                                </div>
                                                <p className='font-roboto'>{selectedSubTask?.assign_to?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Created At:</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                {formatDate(selectedSubTask?.created_at)}

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='h-9'>
                                    <td>Updated At:</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="bg-[#C2BDAD] text-white px-2.5 py-0.5 rounded-full text-xs">
                                                {formatDate(selectedSubTask?.updated_at)}

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                {/* ATTACHMENTS */}
                {/* <div className="pt-4">
                    <div
                        className="w-full m-2 border-2 border-gray-300 border-dotted rounded-lg"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="p-6 w-full text-center flex justify-center items-center space-x-2">
                            <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-400"
                            >
                                <path
                                    d="M1.6665 7.99992V13.3333C1.6665 13.6869 1.80698 14.026 2.05703 14.2761C2.30708 14.5261 2.64622 14.6666 2.99984 14.6666H10.9998C11.3535 14.6666 11.6926 14.5261 11.9426 14.2761C12.1927 14.026 12.3332 13.6869 12.3332 13.3333V7.99992M9.6665 3.99992L6.99984 1.33325M6.99984 1.33325L4.33317 3.99992M6.99984 1.33325L6.99984 9.99992"
                                    stroke="#B3B3B3"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-gray-500">Drop files to attach, or </p>
                            <label className="text-blue-500 font-semibold hover:underline cursor-pointer">
                                browse
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                </div> */}

                <div className="pt-4 w-full pr-4">
                    <MultipleFileUploadBasic />
                </div>

                <div className='space-y-3 mt-6'>
                    {selectedSubTask?.attachments?.map((file) => {
                        return <div key={file.uuid} className='flex'>
                            <FaFile className={`text-black 'text-xl'`} />
                            <p className="truncate overflow-hidden whitespace-nowrap mx-4 w-full">{file.title}</p>
                            <div className='text-right flex'>

                                <button className='mr-4' onClick={() => handleDownload(file.uuid, file.title)}><FaDownload className={`text-gray-500 'text-xl'`} /></button>
                                <button className='mr-4' onClick={() => handleDelete(file.uuid)}><MdDelete className={`text-red-500 'text-xl'`} /></button>


                            </div>

                        </div>
                    })}
                </div>


                {/* COMMENTS */}
                <div className="pt-4 w-full p-2 h-full pb-24 ">
                    <CommentSection
                    formStyle={{ backgroundColor: "transparent" }}
                    currentUser={{
                            currentUserId: user.id,
                            currentUserImg: user?.avatar ? user?.avatar : baseAvatarUrl,
                            currentUserFullName: `${user.first_name + " " + user.last_name}`
                        }}
                        commentData={comments}
                        onSubmitAction={onSubmitAction}
                        customNoComment={customNoComment}
                        onReplyAction={onReplyAction}
                        onDeleteAction={onDeleteAction}
                    />
                </div>

            </div>
            {isEditing && <TaskEdit isEditing={true} closeWindow={closeAddTaskWindow} isTask={false} subTask={selectedSubTask} />}

        </>
    );
};

export default SubTaskDetails;
