import React from 'react';
import ReactDOM from 'react-dom';

const ModalWindow = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalWindow;
