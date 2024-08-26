// TaskDetails.js
import React from 'react';
import { SubTask } from "./"

const TaskDetails = ({ task }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="font-semibold text-xl mb-2">{task.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{task.description}</p>

      <div className="text-sm text-gray-500">
        <p><strong>Created by:</strong> {task.creator}</p>
        <p><strong>Assigned to:</strong> {task.assignee}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Subtasks:</h4>
        {task.subtasks.map((subtask, index) => (
          <SubTask key={index} subtask={subtask} />
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
