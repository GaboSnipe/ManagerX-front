import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [seeAddTaskDiv, setSeeAddTaskDiv] = useState(false);
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
                onClick={(() => setSeeAddTaskDiv(true))}
                className="bg-gray-600 rounded-lg p-2 focus:bg-gray-500 text-white"
              >
                Add Task
              </button>

              {seeAddTaskDiv && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={(() => setSeeAddTaskDiv(false))}  
                  >
                    <div
                      className="fixed inset-0 flex items-center justify-center z-50"
                    >
                      <div className="bg-white p-6 rounded-lg shadow-lg  z-50">
                        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-lg  z-50">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title*</label>
                            <input
                              id="title"
                              name="title"
                              type="text"
                              value={formData.title}
                              onChange={handleChange}
                              maxLength={255}
                              minLength={1}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                          </div>

                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status*</label>
                            <select
                              id="status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="">Select a status</option>
                              {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                            {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
                          </div>

                          <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea
                              id="comment"
                              name="comment"
                              value={formData.comment}
                              onChange={handleChange}
                              maxLength={5000}
                              rows={4}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input
                              id="deadline"
                              name="deadline"
                              type="datetime-local"
                              value={formData.deadline}
                              onChange={handleChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="assign_to" className="block text-sm font-medium text-gray-700">Assign to*</label>
                            <input
                              id="assign_to"
                              name="assign_to"
                              type="number"
                              value={formData.assign_to}
                              onChange={handleChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.assign_to && <p className="text-red-600 text-sm">{errors.assign_to}</p>}
                          </div>

                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
              )}
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
