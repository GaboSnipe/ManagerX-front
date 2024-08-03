import React, { useEffect, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addTaskThunk, getTaskListThunk } from '../features/task/taskThunk';
import { useDispatch, useSelector } from 'react-redux';

const formatDeadline = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);

  const diffTime = deadlineDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 0) return 'Overdue';
  return deadlineDate.toLocaleDateString();
};
const statuses = ["TODO", "INPROGRESS", "DONE", "REJECTED", "UNCERTAIN"];

const usersList = [
  {
    email: "test@gmail.com",
    id: 2,
    userName: 'test'
  },
  {
    email: "test2@gmail.com",
    id: 2,
    userName: 'test2'
  },
  {
    email: "test3@gmail.com",
    id: 2,
    userName: 'test3'
  },
  {
    email: "test4@gmail.com",
    id: 2,
    userName: 'test4'
  },
];

const Tasks = () => {
  const dispatch = useDispatch();
  const loading = useAuthCheck();
  const [seeAddDiv, setSeeAddDiv] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    status: "",
    comment: "",
    deadline: "",
    assign_to: ""
  });
  const tasks = useSelector((state) => state.task.taskList);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getTaskListThunk()).unwrap();
      } catch (err) {
        console.error('Failed to get task list:', err);
      }
    };
    getData();
  }, [dispatch]);

  const closeAddDiv = () => {
    setSeeAddDiv(false);
  };

  const showAddDiv = () => {
    setSeeAddDiv(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const confirmAddFile = () => {
    dispatch(addTaskThunk(formState));
    closeAddDiv();
  };
  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="sm:px-6 w-full">
            <div className="px-4 md:px-10 py-4 md:py-7">
              <div className="flex items-center justify-between">
                <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                  <p>Sort By:</p>
                  <select
                    aria-label="select"
                    className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                  >
                    <option className="text-sm text-indigo-800">Latest</option>
                    <option className="text-sm text-indigo-800">Oldest</option>
                    <option className="text-sm text-indigo-800">Latest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="sm:flex items-center justify-between">
                <div className="flex items-center">
                  {statuses.map((item, index) => (
                    <a
                      key={index}
                      className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4"
                      href="#"
                    >
                      <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p>{item}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  onClick={showAddDiv}
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Task
                  </p>
                </button>
              </div>

              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {tasks?.map((task, index) => (
                      <tr
                        key={index}
                        tabIndex="0"
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                      >
                        <td>
                          <div className="ml-5">
                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                              <input
                                placeholder="checkbox"
                                type="checkbox"
                                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="">
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {task.title}
                            </p>
                          </div>
                        </td>

                        <td className="pl-5">
                          <button className="py-3 px-3 text-sm focus:outline-none leading-none bg-green-300 rounded">
                            Due {formatDeadline(task.deadline)}
                          </button>
                        </td>

                        <td className="pl-4">
                          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                            View
                          </button>
                        </td>

                        <td>
                          <div className="relative px-5 pt-2">
                            <button
                              className="focus:ring-2 rounded-md focus:outline-none"
                              onClick={(e) => dropdownFunction(e.target)}
                              role="button"
                              aria-label="option"
                            >
                              <svg
                                className="dropbtn"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                                  stroke="#9CA3AF"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                                  stroke="#9CA3AF"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                                  stroke="#9CA3AF"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                            </button>
                            <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                              <div
                                tabIndex="0"
                                className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                              >
                                <p>Edit</p>
                              </div>
                              <div
                                tabIndex="0"
                                className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                              >
                                <p>Delete</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {seeAddDiv && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeAddDiv}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative">
            <button
          className="m-2 bg-red-600 p-1 rounded-full hover:bg-gray-200 ml-auto"
          onClick={closeAddDiv}
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
              <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleFormChange}
                placeholder="Enter task title"
                className="p-2 rounded mb-4 w-full"
              />
              <select
                name="status"
                value={formState.status}
                onChange={handleFormChange}
                className="p-2 rounded mb-4 w-full"
              >
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <textarea
                name="comment"
                value={formState.comment}
                onChange={handleFormChange}
                placeholder="Enter comments"
                className="p-2 rounded mb-4 w-full"
              ></textarea>
              <input
                type="date"
                name="deadline"
                value={formState.deadline}
                onChange={handleFormChange}
                className="p-2 rounded mb-4 w-full"
              />
              <select
                name="assign_to"
                value={formState.assign_to}
                onChange={handleFormChange}
                className="p-2 rounded mb-4 w-full"
              >
                {usersList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
              <button
                onClick={confirmAddFile}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Add Task
              </button>
            </div>
          </div>
        </>
      )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
