// MainPage.js
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskDetails from './TaskDetails';

const MainPage = () => {
  const [tasks, setTasks] = useState([
    {
      title: 'Some Task for new customer’s case',
      description: 'Objective: Develop a innovative, data-driven marketing strategy...',
      status: 'In Progress',
      subtasks: [
        { title: 'Some subtask title for gabo', assignee: 'Gabo', deadline: '15/08/2023' },
        { title: 'Some subtask title for gabo', assignee: 'Gabo', deadline: '16/08/2023' },
      ],
      creator: 'John Doe',
      assignee: 'Gabo',
      deadline: '20/08/2023',
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {tasks.map((task, index) => (
          <div key={index}>
            <TaskCard task={task} />
            <TaskDetails task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
