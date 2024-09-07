// SubTask.js
import React from 'react';

const SubTask = ({ subtask }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p>{subtask.title}</p>
        <p className="text-xs text-gray-400">{subtask.assignee}</p>
      </div>
      <span className="text-sm text-gray-600">{subtask.deadline}</span>
    </div>
  );
};

export default SubTask;
