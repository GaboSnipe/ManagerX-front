import React, { useEffect, useRef, useState } from "react";
import "../../styles/global.css"
import { ExpandableDetails, TextEditor } from "./components/"
import SubTasks from "./components/SubTasks";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import TaskService from "../../services/TaskService"
import { FaRegEdit } from "react-icons/fa";
import { editTaskThunk } from "../../features/task/taskThunk";


const statuses = {
  "TODO": "To Do",
  "INPROGRESS": "In Progress",
  "DONE": "Done",
  "REJECTED": "Rejected",
  "UNCERTAIN": "Uncertain"
};
const statusStyles = {
  "TODO": "bg-yellow-500",
  "INPROGRESS": "bg-blue-500",
  "DONE": "bg-green-500",
  "REJECTED": "bg-gray-500",
  "UNCERTAIN": "bg-purple-500"
};


const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const ExpandableTable = ({ task, setTasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const motherRef = useRef();
  const [fullTask, setFullTask] = useState(task);
  const [saveSubTasks, setSaveSubTasks] = useState(task);
  const quillRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(task);
  const getDeadlineStyles = (deadline) => {
    const deadlineStatus = formatDeadline(deadline);
    switch (deadlineStatus) {
      case "Overdue":
        return "text-red-700 bg-red-100";
      case "Today":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-green-700 bg-green-100";
    }
  };


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

  const toggleRow = async () => {
    try {

      if (!isExpanded) {
        
        const response = await TaskService.getTask(task.uuid);

        setFullTask(response.data);
      }
      setIsExpanded(!isExpanded);
    } catch (error) {
      console.error(error);
    }
  };

  

  const startEdit = () => {
    setIsEditing(true);
  }

  const saveEdit = () => {
    setIsEditing(false);
  }

  const canselEdit = () => {
    setFormData(fullTask)
    setIsEditing(false);
  }

  useEffect(() => {
    setFormData(task || {});
  }, [task]);

  const handleInputChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      title: e.target.value
    }));
  };


  const saveNewTask = () => {
    const newFormData = {};

    setSaveSubTasks(!saveSubTasks);

    if (formData.assign_to !== undefined && formData.assign_to !== fullTask.assign_to) {
      newFormData.assign_to = formData.assign_to;
    }
    if (formData.title !== undefined && formData.title !== fullTask.title) {
      newFormData.title = formData.title;
    }
    if (formData.status !== undefined && formData.status !== fullTask.status) {
      newFormData.status = formData.status;
    }
    if (formData.comment !== undefined && formData.comment !== fullTask.comment) {
      newFormData.comment = formData.comment;
    }
    if (formData.deadline !== undefined && formData.deadline !== fullTask.deadline) {
      const formattedDate = formatDate(formData.deadline);
      newFormData.deadline = formattedDate;
    }
    if (formData.creator !== undefined && formData.creator !== fullTask.creator) {
      newFormData.creator = formData.creator;
    }
    if (formData.folder !== undefined && formData.folder !== fullTask.folder) {
      newFormData.folder = formData.folder;
    }

    if (Object.keys(newFormData).length > 0) {
  
      TaskService.editTask(task.uuid, newFormData)
        .then(response => {
          TaskService.getTask(task.uuid)
            .then(response => {
              setFullTask(response.data)
            })
        })
        .catch(error => {
          console.error(error);
        });
    } else {
    }

    setIsEditing(false)

  };

  

  return (
    <React.Fragment>
    <tr className="relative h-16 border border-gray-100 rounded">
      {/* Checkbox Column */}

      <td className="overflow-x-auto">
        <div className=" whitespace-nowrap">
          <div className="flex items-center justify-center space-x-3 ml-5">
            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
              <input
                type="checkbox"
                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
              />
              <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                <svg
                  className="icon icon-tabler icon-tabler-check"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* Task Title */}
      <td>
      <div className="flex items-center pl-5 space-x-2">
      <input
          type="text"
          value={formData.title}
          readOnly={!isEditing}
          onChange={handleInputChange}
        />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
              stroke="#3B82F6"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
              stroke="#3B82F6"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg> */}
        </div>
      </td>


      <td>
      <span className={`${statusStyles[formData.status]} text-white px-2 py-1 rounded`}>
                    {statuses[formData.status]}
                  </span>
      </td>

      {/* Deadline Button */}
      <td className="pl-5">
        <button
          className={`py-3 px-3 text-sm focus:outline-none leading-none ${getDeadlineStyles(
            formData.deadline? formData.deadline : task.deadline
          )} rounded`}
        >
          Due {formatDeadline(formData.deadline? formData.deadline : task.deadline)}
        </button>
      </td>

      {/* Expand/Collapse Button */}
      <td>
        <button
          onClick={toggleRow}
          disabled={isEditing}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isExpanded ? "Collapse" : "Expand"}
          <svg
            className={`transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </td>
    </tr>

    {isExpanded && (
      <tr className="overflow-x-auto">
        <td
          className="overflow-hidden focus:outline-none border border-gray-100 rounded p-5"
          colSpan={5}
        >
          <div className="relative w-full shadow-md sm:rounded-lg">
            <ExpandableDetails
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              task={fullTask}
              formData={formData}
              setFormData={setFormData}
            />
            <TextEditor isEditing={isEditing} defaultValue={fullTask.comment} quillRef={quillRef} formData={formData} setFormData={setFormData}/>
            <section ref={motherRef} className="w-auto p-5 relative">
              <p className="text-start text-gray-700 text-2xl mb-4">Subtasks:</p>
              <div className="p-4 bg-white shadow-md rounded-lg">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-600">Name</th>
                      <th className="text-left text-gray-600">Assignee</th>
                      <th className="text-left text-gray-600">Due date</th>
                      <th className="text-left text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullTask.subtasks.map((subtask, index) => (
                      <SubTasks
                        isEditing={isEditing} 
                        motherRef={motherRef}
                        subtask={subtask}
                        index={index}
                        key={subtask.uuid}
                        saveSubTasks={saveSubTasks}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Editing Controls */}
            {isEditing && (
              <div className="flex justify-end space-x-4 mt-4 p-5">
                <button
                  onClick={canselEdit}
                  className="flex items-center space-x-1 text-gray-600"
                >
                  <FiXCircle className="text-xl" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={saveNewTask}
                  className="flex items-center space-x-1 text-white bg-purple-600 px-4 py-2 rounded"
                >
                  <FiCheckCircle className="text-xl" />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>

  );
};


export default ExpandableTable;