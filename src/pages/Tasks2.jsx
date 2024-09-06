import React, { useEffect, useRef, useState } from 'react';
import { SubTaskDetails, Task } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/scrollBar.css"
import { getTaskListThunk } from '../features/task/taskThunk';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskList)
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const [seeResizebleDiv, setSeeResizebleDiv] = useState(false);  
  const [selectedSubTask, setSelectedSubTask] = useState({});
  const headerHeight = useSelector((state) => state.workplace.headerHeight);
  const tasklss = useSelector((state) => state.task.taskList);
  const divRef = useRef();
  const [widthRem, setWidthRem] = useState(0);
  const resizableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  
  const screenHeight = window.innerHeight;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getTaskListThunk()).unwrap();
      } catch (err) {
        console.error('Failed to get task list:', err);
      }
    };
    getData();
  }, [dispatch]);


  const getInitialSize = () => {
    const savedSize = localStorage.getItem('resizebleDivSize');
    if (savedSize) {
      return JSON.parse(savedSize);
    }
    return { width: 300 };
  };

  const [size, setSize] = useState(getInitialSize);

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
    const remValue = 2;
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
<div className="flex">
  <div className="flex-1 overflow-y-auto mt-8 content-centerer custom-scrollbar px-2"
       ref={divRef}
       style={{ height: `${dynamicHeight}px` }}
  >
    {tasks.map((task, index) => (
      <Task key={task.uuid} task={task} setSeeResizebleDiv={setSeeResizebleDiv} setSelectedSubTask={setSelectedSubTask} />
    ))}
  </div>
      {seeResizebleDiv && (
        <div
          ref={resizableRef}
          className="relative rounded-l-md shadow-lg overflow-y-auto  mt-8 custom-scrollbar"
          style={{ height: `${dynamicHeight}px`, width: `${size.width}px`, minWidth: '400px', maxWidth: `${widthRem}rem` }}
        >
          <div className="bg-[#F7F5F5] w-full h-full rounded-l-lg shadow-lg"
            style={{
              boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',
            }}
          >
            <SubTaskDetails selectedSubTask={selectedSubTask} setIsOpen={setSeeResizebleDiv}/>
          </div>
        </div>
      )}


    </div>

  );
};

export default Tasks;
