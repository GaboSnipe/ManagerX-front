import React, { useEffect, useRef, useState } from 'react';
import { ModalWindow, Paginations, SubTaskDetails, Task } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/scrollBar.css"
import { getTaskListThunk } from '../features/task/taskThunk';
import { setFolderSharePersonUuid, setSharedFolderPath, setIsOpenFolderShareQuestion, setSeeResizebleDiv } from '../features/task/taskSlice';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import FileService from '../services/FileService';


const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskList);
  const itemsCount = useSelector((state) => state.task.tasksCount);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const seeResizebleDiv = useSelector((state) => state.task.seeResizebleDiv)
  const selectedSubTask = useSelector((state) => state.task.selectedSubtask);
  const headerHeight = useSelector((state) => state.workplace.headerHeight);
  const isOpenFolderShareQuestion = useSelector((state) => state.task.isOpenFolderShareQuestion);
  const folderSharePersonUuid = useSelector((state) => state.task.folderSharePersonUuid);
  const sharedFolderPath = useSelector((state) => state.task.sharedFolderPath);
  const divRef = useRef();
  const [widthRem, setWidthRem] = useState(0);
  const resizableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const screenHeight = window.innerHeight;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [paginationsParams, setPaginationsParams] = useState("limit=5&offset=0");


  const handleOpenModal = () => {
    dispatch(setIsOpenFolderShareQuestion(true));
  };

  const handleCloseQuestionModal = () => {
    dispatch(setIsOpenFolderShareQuestion(false));
    dispatch(setFolderSharePersonUuid(null));
    dispatch(setSharedFolderPath(null));
  };



  const [params, setParams] = useState([
    { access: "შესასრულებელი", key: "TODO", isEnabled: true },
    { access: "მიმდინარე", key: "INPROGRESS", isEnabled: true },
    { access: "შესრულებული", key: "DONE", isEnabled: false },
    { access: "უარყოფილი", key: "REJECTED", isEnabled: false },
    { access: "გაურკვეველი", key: "UNCERTAIN", isEnabled: false },
    { access: "დამევალა (პროექტი)", key: "assign_to", isEnabled: false },
    { access: "დავავალე (პროექტი)", key: "creator", isEnabled: false },
    { access: "დამევალა (დავალება)", key: "subtask_assign_to", isEnabled: false },
    { access: "დავავალე (დავალება)", key: "subtask_assigned_by_user", isEnabled: false },
  ]);
  const statusKeys = ["TODO", "INPROGRESS", "DONE", "REJECTED", "UNCERTAIN"];


  const handleStatusClick = (key) => {
    setParams(prevParams =>
      prevParams.map(status =>
        status.key === key ? { ...status, isEnabled: !status.isEnabled } : status
      )
    );
  };

  const shareFolder  = () => {
    const settings = {
      folder_path: sharedFolderPath,
      user_id: folderSharePersonUuid
    }
    FileService.shareFolder(settings)
    handleCloseQuestionModal();
  }  
  const notShareFolder  = () => {
    handleCloseQuestionModal();
  }


  useEffect(() => {
    const getData = async () => {
      const queryParams = {
        status: [],
        assign_to: "",
        creator: "",
        subAssigneToMy: "",
        subAssigne: "",
      };

      params.forEach((status) => {
        if (statusKeys.includes(status.key) && status.isEnabled) {
          queryParams.status.push(status.key);
        }
        else if (status.key == "assign_to" && status.isEnabled) {
          queryParams.assign_to = userInfo.id;
        }
        else if (status.key == "creator" && status.isEnabled) {
          queryParams.creator = userInfo.id;
        }
        else if (status.key == "subtask_assign_to" && status.isEnabled) {
          queryParams.subAssigneToMy = userInfo.id;
        }
        else if (status.key == "subtask_assigned_by_user" && status.isEnabled) {
          queryParams.subAssigne = userInfo.id;
        }
      });

      const tempstatusparams = queryParams.status.length ? `&status=${queryParams.status.join(',')}` : "";
      const assigneTo = queryParams.assign_to ? `&assign_to=${queryParams.assign_to}` : "";
      const creator = queryParams.creator ? `&creator=${queryParams.creator}` : "";
      const subAssigneToMy = queryParams.subAssigneToMy ? `&subtask_assign_to=${queryParams.subAssigneToMy}` : "";
      const subAssigne = queryParams.subAssigne ? `&subtask_assigned_by_user=${queryParams.subAssigne}` : "";

      const query = `?ordering=-created_at${tempstatusparams}${assigneTo}${creator}${subAssigneToMy}${subAssigne}&${paginationsParams}`;

      try {
        await dispatch(getTaskListThunk(query)).unwrap();
      } catch (err) {
        console.error('Failed to get task list:', err);
      }
    };

    getData();
  }, [params, dispatch, userInfo?.id, paginationsParams]);

  const closeResizableDiv = (par) => {
    dispatch(setSeeResizebleDiv(par))
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
    localStorage.setItem('resizebleDivSize', JSON.stringify(size));
  }, [size]);

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startWidth.current = size.width;

    const handleMouseMove = (e) => {
      const newWidth = startWidth.current + (startX.current - e.clientX);
      const constrainedWidth = Math.max(400, Math.min(newWidth, widthRem * baseFontSize));
      setSize({ width: constrainedWidth });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const resizableDiv = resizableRef.current;
    if (resizableDiv) {
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "w-2 h-full absolute left-0 top-0 cursor-col-resize select-none";
      resizeHandle.style.width = "20px";
      resizeHandle.style.height = "100%";
      resizeHandle.style.position = "absolute";
      resizeHandle.style.left = "-10px";
      resizeHandle.style.top = "0";
      resizeHandle.style.cursor = "col-resize";
      resizeHandle.style.transform = "translateX(50%)";

      resizeHandle.addEventListener("mousedown", handleMouseDown);

      resizableDiv.appendChild(resizeHandle);

      return () => {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
        resizableDiv.removeChild(resizeHandle);
      };
    }
  }, [size, resizableRef.current, seeResizebleDiv]);

  useEffect(() => {
    const remValue = 3;
    const remInPixels = remValue * baseFontSize;
    const calculatedHeight = screenHeight - headerHeight - remInPixels;
    setDynamicHeight(calculatedHeight);
  }, [headerHeight, divRef?.current?.offsetHeight]);

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

  return (
    <>
      <div className="flex">
        <div className="flex-1 overflow-y-auto mt-8 custom-scrollbar px-2" ref={divRef} style={{ height: `${dynamicHeight}px` }}>
          <div className="flex flex-wrap gap-2 p-4">
            {params.map((status) => (
              <button
                key={status.key}
                onClick={() => handleStatusClick(status.key)}
                className={`px-4 py-2 rounded-md border ${status.isEnabled ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
              >
                {status.access}
              </button>
            ))}
          </div>
          {tasks?.map((task) => (
            <Task key={task.uuid} task={task} setSeeResizebleDiv={closeResizableDiv} />
          ))}
          <div className="flex justify-center h-24">
            <Paginations refreshData={setPaginationsParams} itemsCount={itemsCount} limit={5} />
          </div>
        </div>
        {seeResizebleDiv && (
          <div ref={resizableRef} className="relative rounded-l-md shadow-lg overflow-y-auto mt-8 custom-scrollbar h-full" style={{ height: `${dynamicHeight}px`, width: `${size.width}px`, minWidth: '400px', maxWidth: `${widthRem}rem` }}>
            <div className="bg-[#F7F5F5] w-full rounded-l-lg shadow-lg" style={{ boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)' }}>
              <SubTaskDetails resizableDivWidth={size.width} setIsOpen={closeResizableDiv} />
            </div>
          </div>
        )}
      </div>
      <>
        {isOpenFolderShareQuestion && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F7F5F5] rounded-lg shadow-lg p-6 mx-4 overflow-y-auto max-w-md w-full">
              <div className="flex justify-between items-center">
                <button
                  className="text-gray-600 ml-auto hover:text-gray-800 focus:outline-none"
                  onClick={handleCloseQuestionModal}
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <span className="block text-gray-700 text-base mb-4">
                  გსურთ გაუზიაროთ ფოლდერი?
                </span>
                <div className='flex justify-center space-x-4'>
                  <button onClick={shareFolder} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                    კი
                  </button>
                  <button onClick={notShareFolder} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200">
                    არა
                  </button>
                </div>
              </div>
            </div>
          </div>

        )}
      </>
    </>
  );
};

export default Tasks;
