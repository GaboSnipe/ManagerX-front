import React from "react";

function dropdownFunction(element) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  let list =
    element.parentElement.parentElement.getElementsByClassName(
      "dropdown-content"
    )[0];
  list.classList.toggle("hidden");
  for (i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i] !== list) {
      dropdowns[i].classList.add("hidden");
    }
  }
}

const statuses = ["To Do", "In Progress", "Done", "Blocked"];

const tasks = [
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
  {
    title: 'Marketing Keynote Presentation',
    due: 'Today',
  },
];

const Tasks = () => {
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
                      className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 ml-4"
                      href="#"
                    >
                      <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p>{item}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => popuphandler(true)}
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
                    {tasks.map((task, index) => (
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
                          <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                            Due {task.due}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
