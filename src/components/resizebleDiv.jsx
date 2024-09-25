import React, { useRef, useEffect, useState } from 'react';
import { setresizabledivwidth } from '../features/project/projectSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ResizableDiv = ({ children, setSeeResizebleDiv }) => {
  const resizableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const dispatch = useDispatch();
  const headerHeight = useSelector((state) => state.workplace.headerHeight);
  const screenHeight = window.innerHeight;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const [widthRem, setWidthRem] = useState(0);


  useEffect(() => {
    const remValue = 2;
    const remInPixels = remValue * baseFontSize;
    const calculatedHeight = screenHeight - headerHeight - remInPixels;
    setDynamicHeight(calculatedHeight);
  }, [headerHeight]);


  const getInitialSize = () => {
    const savedSize = localStorage.getItem('resizebleDivSize');
    if (savedSize) {
      return JSON.parse(savedSize);
    }
    return { width: 300 };
  };

  const [size, setSize] = useState(getInitialSize);

  useEffect(() => {
    dispatch(setresizabledivwidth(size));
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

  useEffect(() => {
    const resizableDiv = resizableRef.current;
    if (resizableDiv) {
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "w-2 h-full absolute left-0 top-0 cursor-col-resize select-none";
      resizeHandle.style.width = "10px";
      resizeHandle.style.height = "100%";
      resizeHandle.style.position = "absolute";
      resizeHandle.style.left = "0";
      resizeHandle.style.top = "0";
      resizeHandle.style.cursor = "col-resize";

      resizeHandle.addEventListener("mousedown", handleMouseDown);

      resizableDiv.appendChild(resizeHandle);

      return () => {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
        resizableDiv.removeChild(resizeHandle);
      };
    }
  }, [size]);

  return (
    <div
      ref={resizableRef}
      className="bg-[#f9f9f9] relative ml-auto rounded-l-md shadow-lg overflow-y-auto mt-8 custom-scrollbar h-full"
      style={{  width: `${size.width}px`, minWidth: '400px', maxWidth: `${widthRem}rem`, height: `${dynamicHeight}px` }}
    >
      <div className='flex'>
        {/*<h2 className="text-white text-xl p-3">*/}
        {/*  Content: */}
        {/*</h2>*/}
        <button
          className="m-2 bg-white p-1 rounded-full hover:bg-gray-200 ml-auto"
          onClick={() => setSeeResizebleDiv(false)}
        >
          <svg
            className="h-6 w-6 text-black"
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
      </div>
      {children}
    </div>
  );
};

export default ResizableDiv;
