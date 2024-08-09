import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddEnable } from '../../../features/task/taskSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [seeAddTaskDiv, setSeeAddTaskDiv] = useState(false);
  const isAddEnable = useSelector((state) => state.task.isAddEnable);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    comment: '',
    deadline: '',
    assign_to: '',
    folder:'',
  });
  const [errors, setErrors] = useState({});
  const statuses = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Canceled']; // Пример статусов
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.assign_to) newErrors.assign_to = 'Assign to is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  };

  const startAddTask = () => {
    dispatch(setIsAddEnable(true))
  }



  const renderHeaderContent = (pathname) => {
    switch (pathname) {
      case '/projects':
        return (
          <>
          </>
        );
      case '/workplace':
        return (
          <>
          </>
        );
      case '/tasks':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
              <button
                onClick={startAddTask}
                className="bg-gray-600 rounded-lg p-2 focus:bg-gray-500 text-white"
              >
                Add Task
              </button>
            </div>

          </>
        );
      default:
        return (
          <>
          </>
        );
    }
  };

  return (
    <header className="bg-white shadow">
      {renderHeaderContent(location.pathname)}
    </header>
  );
};

export default Header;
