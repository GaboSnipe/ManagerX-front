import React, { useRef, useEffect, useState } from 'react';

const ResizableDiv = ({ children, setSeeResizebleDiv }) => {
  const resizableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);


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
      const newWidth = Math.max(startWidth.current + (startX.current - e.clientX), 200); // 200px is the minimum width
      setSize({ width: newWidth });
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
      className="bg-[#f9f9f9] relative rounded-l-lg shadow-lg"
      style={{ width: `${size.width}px`, minWidth: '200px' }}
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
