import React, { useEffect, useRef, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addTaskThunk, getTaskListThunk } from '../features/task/taskThunk';
import { setSeeResizebleDiv } from '../features/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandableTable, ResizableDiv } from '../components';


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


const usersList = [
  { email: "test@gmail.com", id: 2, userName: 'test' },
  { email: "test2@gmail.com", id: 2, userName: 'test2' },
  { email: "test3@gmail.com", id: 2, userName: 'test3' },
  { email: "test4@gmail.com", id: 2, userName: 'test4' },
];


const Tasks = () => {
  const dispatch = useDispatch();
  const loading = useAuthCheck();
  const [seeAddDiv, setSeeAddDiv] = useState(false);
  const [seeDiv, setSeeDiv] = useState(false);
  const selectedSubTask = useSelector((state) => state.task.selectedSubtask);
  const seeResizebleDiv = useSelector((state) => state.task.seeResizebleDiv);
  const [tasks, setTasks] = useState([])
  const [formState, setFormState] = useState({
    title: "",
    status: "",
    comment: "",
    deadline: "",
    assign_to: ""
  });


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getTaskListThunk()).unwrap();
        setTasks(response);
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

  const closeResDiv = () => {
    setSeeDiv(false);
  };

  const makediv = (task) => {
    setSeeDiv(true);
  };

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef();

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "", assignee: "", priority: "", dueDate: "" }]);
  };

  const handleResizebleDivToggle = () => {
    dispatch(setSeeResizebleDiv(false));
  };

  return (
    <div className="flex">
      <div className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:px-6 max-w-full">
          <div className="mt-7 w-full text-sm">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {tasks.map((task) => (
                  <ExpandableTable key={task.uuid} task={task} setTasks={setTasks} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {seeResizebleDiv &&
        <ResizableDiv setSeeResizebleDiv={handleResizebleDivToggle}>
          <div className="text-white p-4">
            uuid : {selectedSubTask.uuid}
          </div>
        </ResizableDiv>
      }
    </div>
  );
};

export default Tasks;
