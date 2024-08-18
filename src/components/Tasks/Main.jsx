import React, { useEffect, useRef, useState } from "react";
import "../../styles/global.css"
import { ExpandableDetails, TextEditor, SubTasks } from "./components/"
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import TaskService from "../../services/TaskService"
import { setIsAddEnable } from "../../features/task/taskSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";


const statuses = {
  "TODO": "To Do",
  "INPROGRESS": "In Progress",
  "DONE": "Done",
  "REJECTED": "Rejected",
};
const statusStyles = {
  "TODO": "bg-yellow-500",
  "INPROGRESS": "bg-blue-500",
  "DONE": "bg-green-500",
  "REJECTED": "bg-gray-500",
};


const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const ExpandableTable = ({ task, setTasks, isDisable, isExpandedDefault }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault || false);
  const motherRef = useRef();
  const [fullTask, setFullTask] = useState(task);
  const [saveSubTasks, setSaveSubTasks] = useState(false);
  const quillRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [arrIndex, setArrIndex] = useState({});
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

  useEffect(() => {
    if (!task?.uuid) {

      setIsEditing(true);
      setIsExpanded(true);
    }
  }, [])

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

  const cancelEdit = () => {
    setFormData({})
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      title: e.target.value
    }));
  };

  const handleChanges = () => {
    if (task.uuid) {
      changeTask();
    } else {
      saveNewTask();
    }
  }

  useEffect(() => {
    if (task) {
      setFullTask(task);
    }
    if (!task?.uuid) {
      setFormData(() => ({
        id: nanoid(),
        subtasks: [],
        title: "",
        status: "TODO",
        comment: "",
        deadline: new Date(),
        created_at: new Date(),
        creator: null,
        assign_to: null,
        folder: ""
      }));
    }
  }, [task]);




  const saveNewTask = () => {
    const newFormData = formData;
    const formattedDate = formatDate(formData.deadline);
    newFormData.deadline = formattedDate;

    TaskService.createTask(newFormData)
      .then((response) => {
        toast.success("Task created successfully");
        setTasks((prevTasks) => [...prevTasks, response.data]);
        dispatch(setIsAddEnable(false))
      }
      )
      .catch((error) => {
        console.error(error);
      });

  };



  const changeTask = () => {
    const newFormData = {};

    setSaveSubTasks(true);

    const fieldsToCheck = ['assign_to', 'title', 'status', 'comment', 'deadline', 'creator', 'folder'];

    fieldsToCheck.forEach(field => {
      if (formData[field] !== undefined && formData[field] !== fullTask[field]) {
        if (field === 'deadline') {
          newFormData.deadline = formatDate(formData.deadline);
        } else {
          newFormData[field] = formData[field];
        }
      }
    });

    if (Object.keys(newFormData).length > 0) {
      TaskService.editTask(task.uuid, newFormData)
        .then(response => {
          return TaskService.getTask(task.uuid);
        })
        .then(response => {
          setFullTask(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    setIsEditing(false);
  };

  const addSubTask = () => {
    setIsEditing(true);
    setFormData(prevData => ({
      ...prevData,
      subtasks: [
        ...(prevData.subtasks || fullTask.subtasks),
        {
          assign_to: null,
          deadline: formatDate(new Date()),
          status: "TODO",
          title: "",
        }
      ]
    }));
  };


  const setSubTasks = (newSubTasks) => {
    setFormData((prevData) => ({
      ...prevData,
      subtasks: newSubTasks,
    }));
  };


  const removeSubTask = (indexToRemove) => {
    setFormData(prevFormData => {
      const updatedSubtasks = prevFormData.subtasks.filter((_, index) => index !== indexToRemove);
      return {
        ...prevFormData,
        subtasks: updatedSubtasks
      };
    });
  };

  const handleOpenFullTask = () => {
    if (!isEditing) {
      navigate(`/task/${task.uuid}`);
    }
  }


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
              value={formData?.title || task?.title}
              readOnly={!isEditing}
              onChange={handleInputChange}
              onClick={handleOpenFullTask}
            />

          </div>
        </td>


        <td>
          <span className={`${statusStyles[formData?.status || task?.status]} text-white px-2 py-1 rounded`}>
            {statuses[formData?.status || task?.status]}
          </span>
        </td>

        {/* Deadline Button */}
        <td className="pl-5">
          <button
            className={`py-3 px-3 text-sm focus:outline-none leading-none ${getDeadlineStyles(
              formData?.deadline || task?.deadline
            )} rounded`}
          >
            Due {formatDeadline(formData?.deadline || task?.deadline)}
          </button>
        </td>
        {!isDisable &&
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
        }
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
              <TextEditor isEditing={isEditing} defaultValue={formData?.comment || fullTask?.comment} quillRef={quillRef} setFormData={setFormData} />

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

                      {(formData?.subtasks || fullTask?.subtasks)?.map((subtask, index) => (
                        <SubTasks
                          key={subtask.uuid || subtask.id}
                          isEditing={isEditing}
                          motherRef={motherRef}
                          subtask={subtask}
                          index={index}
                          saveSubTasks={saveSubTasks}
                          setSaveSubTasks={setSaveSubTasks}
                          taskUuid={task.uuid}
                          removeSubTask={removeSubTask}
                          setSubTasks={setSubTasks}
                        />
                      ))}

                      <tr
                        className={`border-t relative rounded-lg`}
                      >
                        <td colSpan={5}>
                          <div className="w-full mt-4 hover:bg-gray-200 rounded-b-xl">
                            <button onClick={addSubTask} className="w-full text-lg m-2">
                              Add Subtask
                            </button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </section>


              {/* Editing Controls */}
              {isEditing && (
                <div className="flex justify-end space-x-4 mt-4 p-5">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center space-x-1 text-gray-600"
                  >
                    <FiXCircle className="text-xl" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleChanges}
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