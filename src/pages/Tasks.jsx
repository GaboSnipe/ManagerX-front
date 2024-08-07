import React, { useEffect, useRef, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addTaskThunk, getTaskListThunk } from '../features/task/taskThunk';
import { setSeeResizebleDiv } from '../features/task/taskSlice';

import { useDispatch, useSelector } from 'react-redux';
import { ExpandableTable, ResizableDiv } from '../components';
import Quill from 'quill/core';


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
  const [formState, setFormState] = useState({
    title: "",
    status: "",
    comment: "",
    deadline: "",
    assign_to: ""
  });
  // const tasks = useSelector((state) => state.task.taskList);
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


  const [tasks, setTasks] = useState([
    {
      "uuid": "981e0f35-dce1-4513-a0c8-d0961b04c88e",
      "title": "test",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-08-03T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T17:06:57.793805Z",
      "updated_at": "2024-07-14T17:06:57.793818Z",
      "creator": 1,
      "assign_to": 2
    },
    {
      "uuid": "c37b848d-4c17-4760-93c5-64fc329b0624",
      "title": "test 1",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-08-04T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:09.401686Z",
      "updated_at": "2024-07-14T19:56:09.401695Z",
      "creator": 1,
      "assign_to": 2
    },
    {
      "uuid": "40d168ae-4ac8-45e1-8346-2ddb3becc08f",
      "title": "test 2",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-08-05T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:13.749116Z",
      "updated_at": "2024-07-14T19:56:13.749127Z",
      "creator": 1,
      "assign_to": 3
    },
    {
      "uuid": "40d168he-4ac8-45e1-8346-2ddb3becc08f",
      "title": "test 3",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-08-06T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:13.749116Z",
      "updated_at": "2024-07-14T19:56:13.749127Z",
      "creator": 1,
      "assign_to": 3
    },
  ])

  const [subtasks, setSubtasks] = useState([
    {
      "uuid": "981e0f35-dce1-4513-a0c8-d0961b04c88e",
      "title": "test",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-07-15T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T17:06:57.793805Z",
      "updated_at": "2024-07-14T17:06:57.793818Z",
      "creator": 1,
      "assign_to": 2
    },
    {
      "uuid": "c37b848d-4c17-4760-93c5-64fc329b0624",
      "title": "test 1",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-07-15T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:09.401686Z",
      "updated_at": "2024-07-14T19:56:09.401695Z",
      "creator": 1,
      "assign_to": 2
    },
    {
      "uuid": "40d168ae-4ac8-45e1-8346-2ddb3becc08f",
      "title": "test 2",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-07-15T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:13.749116Z",
      "updated_at": "2024-07-14T19:56:13.749127Z",
      "creator": 1,
      "assign_to": 3
    },
    {
      "uuid": "ecad825c-cea8-4976-bd0e-6dbae9c59cde",
      "title": "test 4",
      "status": "TODO",
      "comment": "aklsmdlkasdlkmans dlkansdl asmndl kasdl amsdlkasmnd lkasmnd laksmnd laksd laks dnlaksdmlak Lorem Ipaskdna sdakjnd aksjndaksjn dakjsndaksjnd aksjnd akjsnd kajsndaksjn dansdajns dkjan sdkjna sdkjna skdjna skdjn askjndaskjdnaksjdn aksjd aksdjn akjsn dkajsn dkajsn dkasjn dkajsnd kjasndkajnkdnisdfiwqu heiuqheh riuqh",
      "deadline": "2024-07-15T21:03:44.493225Z",
      "sent_to_customer": false,
      "created_at": "2024-07-14T19:56:18.602262Z",
      "updated_at": "2024-07-14T19:56:18.602271Z",
      "creator": 1,
      "assign_to": 3
    },
  ]);

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
          <div className="mt-7 w-full overflow-x-auto text-sm">
            <table className="w-full whitespace-nowrap ">
              <tbody>
                {tasks.map((task) => (

                  <ExpandableTable key={task.uuid} task={task} subtasks={subtasks} />
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

    { seeResizebleDiv &&
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
