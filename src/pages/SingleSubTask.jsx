import { useNavigate, useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { FaDownload, FaFile, FaTasks } from "react-icons/fa";

import React, { useEffect, useRef, useState } from 'react';
import TextEditor from '../components/TextEditor.jsx';
import { useDispatch } from 'react-redux';
import { Blocks } from 'react-loader-spinner'
import { CommentSection } from 'react-comments-section';
import { useSelector } from 'react-redux';
import { MultipleFileUploadBasic } from '../components/FileUploader.jsx';
import { setSelectedSubtask } from '../features/task/taskSlice.js';
import { MdDelete } from 'react-icons/md';
import FileService from '../services/FileService.js';
import { getSubTaskThunk } from '../features/task/taskThunk.js';
import TaskEdit from '../components/TaskEdit.jsx';
import { BackgroundImage } from '@patternfly/react-core';

const SingleSubTask = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);
  const { uuid } = useParams();
  const subTask = useSelector((state) => state.task.selectedSubtask);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [comments, setComments] = useState([]);

  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const [isRotated, setIsRotated] = useState(false);
  const [isEditing, setIsEditing] = useState(false)

  const [dynamicHeight, setDynamicHeight] = useState(null);
  const headerHeight = useSelector((state) => state.workplace.headerHeight);
  const screenHeight = window.innerHeight;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [widthRem, setWidthRem] = useState(0);


  const divRef = useRef();


  useEffect(() => {
    if (uuid) {
      dispatch(getSubTaskThunk(uuid)).then(() => {
        setLoading(false);
      });
    }
  }, [uuid, navigate]);
  

  useEffect(() => {
    const formattedComments = subTask?.comments?.map((com) => {
      const data = {
        userId: com.creator.id,
        comId: com.uuid,
        fullName: `${com.creator.first_name} ${com.creator.last_name}`,
        avatarUrl: `${com.creator.avatar ? com.creator.avatar : baseAvatarUrl}`,
        text: com.content,
        replies: com.replies ? com.replies.map((subcom) => ({
          userId: subcom.creator.id,
          comId: subcom.uuid,
          fullName: `${subcom.creator.first_name} ${subcom.creator.last_name}`,
          avatarUrl: `${subcom.creator.avatar ? subcom.creator.avatar : baseAvatarUrl}`,
          text: subcom.content,
        })) : []
      };

      return data;
    });

    setComments(formattedComments);
  }, [subTask?.comments]);

  const handleDelete = async (fileUuid) => {
    try {
      await FileService.deleteAttachment(fileUuid);
      dispatch(getSubTaskThunk(subTask?.uuid))
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };



  useEffect(() => {
    const remValue = 8;
    const remInPixels = remValue * baseFontSize;
    const calculatedHeight = screenHeight - headerHeight - remInPixels;
    setDynamicHeight(calculatedHeight);
  }, [headerHeight, divRef?.current?.offsetHeight]);


  const defaultComment = `{"ops":[{"attributes":{"color":"#bbbbbb","size":"normal"},"insert":"This task does not have a description."},{"insert":"\\n"}]}`;

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const handleClick = () => {
    navigate('/tasks');
  };


  const compareTime = (time) => {
    const now = new Date();
    const [year, month, day] = time?.split('-').map(Number);
    const target = new Date(year, month - 1, day);
    const timeDiff = target - now;
    return timeDiff < 0;
  }

  const getTimeStatus = (targetDateStr) => {
    const now = new Date();
    const [year, month, day] = targetDateStr?.split('-').map(Number);
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
    const [year, month, day] = date?.split('-').map(Number);
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

  useEffect(() => {
    const updateWidth = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const screenWidthPx = window.innerWidth;
      const screenWidthRem = screenWidthPx / rootFontSize;
      setWidthRem(screenWidthRem - 59);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;



  const getOverdueTaskStyle = (date) => {
    const now = new Date();
    const [year, month, day] = date?.split('-').map(Number);
    const target = new Date(year, month - 1, day);
    const timeDiff = target - now;

    if (timeDiff < 0) {
      return "bg-[rgba(255,127,127,0.2)]";
    } else {
      return "bg-white";
    }
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


  const getInitialSize = () => {
    const savedSize = localStorage.getItem('resizebleDivSize');
    if (savedSize) {
      return JSON.parse(savedSize);
    }
    return { width: 300 };
  };


  const [size, setSize] = useState(getInitialSize());



  useEffect(() => {
    const formattedComments = subTask?.comments?.map((com) => {
      const data = {
        userId: com.creator.id,
        comId: com.uuid,
        fullName: `${com.creator.first_name} ${com.creator.last_name}`,
        avatarUrl: `${com.creator.avatar ? com.creator.avatar : baseAvatarUrl}`,
        text: com.content,
        replies: com.replies ? com.replies.map((subcom) => ({
          userId: subcom.creator.id,
          comId: subcom.uuid,
          fullName: `${subcom.creator.first_name} ${subcom.creator.last_name}`,
          avatarUrl: `${subcom.creator.avatar ? subcom.creator.avatar : baseAvatarUrl}`,
          text: subcom.content,
        })) : []
      };

      return data;
    });

    setComments(formattedComments);
  }, [subTask?.comments]);


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

  const onSubmitAction = (data) => {
    TaskService.createComment(data.text, subTask?.uuid)
    dispatch(getSubTaskThunk(subTask?.uuid))


  };

  const customNoComment = () => <div className='no-com'>No comments, wohoooo!</div>;
  const onReplyAction = (data) => {
    TaskService.createComment(data.text, subTask?.uuid, data.parentOfRepliedCommentId ? data.parentOfRepliedCommentId : data.repliedToCommentId)
    dispatch(getSubTaskThunk(subTask?.uuid))

  };
  const onDeleteAction = (data) => {
    TaskService.deletecomment(data.comIdToDelete)
    dispatch(getSubTaskThunk(subTask?.uuid))

  };






  return (
    <div className="flex relative">
      <div className="flex-1 overflow-y-auto mt-8 px-2">
        <div className="flex flex-wrap gap-2 p-4">
          {loading ? 
          (<div className="flex justify-center items-center w-full h-96">
            <Blocks
              height="40"
              width="40"
              color="#630044"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>) : (

            <div className={`bg-[#F7F5F5] max-w-[112rem] min-w-[56rem]  custom-scrollbar  overflow-y-auto  rounded-md mb-8 shadow-lg mx-auto relative  ${getOverdueTaskStyle(subTask?.deadline_to)}`}
              ref={divRef}
              style={{
                height: `${dynamicHeight}px`,
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


                  <>  {/*TITLE */}
                    <p className="font-extrabold not-italic font-roboto text-lg tracking-wide overflow-hidden text-ellipsis ml-3 text-gray-700" title={subTask?.title}>
                      {subTask?.title}
                    </p>
                  </>


                  <>  {/*DEADLINE */}
                    <div className="flex items-center ml-10">
                      <div className="bg-[#C2BDAD] text-white px-2.5 w-24 text-center py-0.5 rounded-full text-xs">
                        {subTask?.deadline_from}
                      </div>
                      <div className="w-4 h-px bg-[#C2BDAD]" />
                      <div className="bg-[#C2BDAD] text-white px-2.5 w-24 text-center py-0.5 rounded-full text-xs">
                        {subTask?.deadline_to}

                      </div>
                    </div>
                  </>


                  <>  {/*STATUS */}
                    <div className="items-center ml-8">
                      <div className={`text-white text-xs  w-32 min-w-32 py-0.5 rounded-full text-center ${getStatusStyles(subTask?.status)}`}>
                        {getStatusLabel(subTask?.status)}
                      </div>
                    </div>
                  </>


                  <>  {/*FOLDER */}
                    <div className="items-center ml-4 flex border rounded-full border-[#D8D4D4] border-px px-2">
                      <FaTasks className='text-xs text-[#727272]' />
                      <div className=' text-[#727272] max-w-32 overflow-hidden text-ellipsis text-xs rounded-full ml-2 text-center  mx-2' title={subTask?.task?.title}>
                        {subTask?.task?.title}
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
                      <img src={subTask?.assign_to?.avatar ? subTask?.assign_to?.avatar : baseAvatarUrl} title={subTask?.assign_to?.email} className="absolute inset-0 object-cover w-full h-full" />
                    </div>
                    <p className='font-roboto'>-მ</p>
                    <div className='relative w-5 h-5 overflow-hidden rounded-full'>
                      <img src={subTask?.creator?.avatar ? subTask?.creator?.avatar : baseAvatarUrl} title={subTask?.creator?.email} className="absolute inset-0 object-cover w-full h-full" />
                    </div>
                    <p className='font-roboto'>-ს</p>
                  </div>
                  <div className='rounded-md border border-[#C8C2C2] ml-9'>
                    <button onClick={openTaskEdit} className='h-0 px-4 py-1 text-xs text-[#3F3F46] bg-transparent border-none'> პროექტის შეცვლა </button>

                  </div>
                  {compareTime(subTask?.deadline_from) &&
                    <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center h-5 mt-1 ml-8 ${getDateStyle(subTask?.deadline_to)}`}>
                      {getTimeStatus(subTask?.deadline_to)}
                    </div>
                  }
                </div>
              </div>

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
                      defaultValue={subTask?.comment || defaultComment}
                      isEditing={isEditing}
                    />
                  </div>
                </>
              </>

              <>
                <div className='ml-5'>
                  <div className="pt-4 w-full pr-4">
                    <MultipleFileUploadBasic />
                  </div>

                  <div className='space-y-3 mt-6'>
                    {subTask?.attachments?.map((file) => {
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

                </div>
              </>


              <>
                <>
                  <div className="pt-4 w-full p-2 pb-24 overflow-hidden">
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

                </>
              </>

            </div>
          )}
        </div>
      </div>
      {isEditing && <TaskEdit isEditing={true} closeWindow={closeAddTaskWindow} isTask={false} subTask={subTask} />}

    </div>


  );
};

export default SingleSubTask;
