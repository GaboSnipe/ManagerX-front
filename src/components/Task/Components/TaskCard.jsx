// TaskCard.js
import React from 'react';
import { SubTask } from "./"


const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        <span className="bg-gray-200 text-sm py-1 px-2 rounded">
          {task.status}
        </span>
      </div>
      <div className="mt-4">
        {task.subtasks.map((subtask, index) => (
          <SubTask key={index} subtask={subtask} />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
