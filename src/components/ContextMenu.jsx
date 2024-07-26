import React, { useRef, useEffect, useState } from 'react';

const ContextMenu = ({ x, y }) => {
    const handleClose = () => {
        setContextMenu(null);
      };  
    return (
        <div 
        className='bg-zinc-800 p-4 rounded-lg'
        style={{ position: 'absolute', top: y, left: x, zIndex: 1000 }}>
          <ul>
            <li className='text-yellow-600 font-bold'  onClick={handleClose}>Rename</li>
            <li className='text-red-600 font-bold' onClick={handleClose}>Delete</li>
            <li className='text-green-600 font-bold' onClick={handleClose}>kide ragac</li>
          </ul>
        </div>
      );
};

export default ContextMenu;
