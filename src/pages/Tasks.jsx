import React, {useEffect, useRef, useState} from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { addTaskThunk, getTaskListThunk } from '../features/task/taskThunk';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {FolderIcon, ResizableDiv} from '../components';
import { setSelectTask } from "../features/task/taskSlice";
import '@preline/collapse';
import 'flowbite/dist/flowbite.min.js';
import Editor from "../components/Editor.jsx";
import Quill from 'quill/core';
import {FiCalendar, FiCheckCircle, FiUserPlus, FiXCircle} from "react-icons/fi";

const Delta = Quill.import('delta');

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
  const selectedTask = useSelector((state) => state.task.selectTask);
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
    dispatch(setSelectTask(task));
    setSeeDiv(true);
  };

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();


  const [tasks, setTasks] = useState([
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

  return (
    <div className="flex min-h-full">
      {/* Main Content Area */}
      <div className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:px-6 max-w-full">

          <div className="mt-7 w-full overflow-x-auto text-sm">
            <table className="w-full whitespace-nowrap">
              <tbody>

              {
                tasks.map((task, index) => (
                    <>
                      <tr key={uuidv4()} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                        <td>
                          <div className="ml-5">
                            <div
                                className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                              <input placeholder="checkbox" type="checkbox"
                                     className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"/>
                              <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                <svg className="icon icon-tabler icon-tabler-check"
                                     xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z"></path>
                                  <path d="M5 12l5 5l10 -10"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="">
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{task?.title}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                 fill="none">
                              <path
                                  d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                                  stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path
                                  d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                                  stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                        </td>
                        <td className="pl-24">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                              <path
                                  d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                                  stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                              <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" strokeWidth="1.25"
                                      strokeLinecap="round" strokeLinejoin="round"></circle>
                            </svg>
                            <p className="text-sm leading-none text-gray-600 ml-2">Urgent</p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                              <path d="M7.5 5H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                              <path d="M7.5 10H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                              <path d="M7.5 15H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                              <path d="M4.16669 5V5.00667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                              <path d="M4.16669 10V10.0067" stroke="#52525B" strokeWidth="1.25"
                                    strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M4.16669 15V15.0067" stroke="#52525B" strokeWidth="1.25"
                                    strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-sm leading-none text-gray-600 ml-2">04/07</p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                              <path
                                  d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z"
                                  stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                              <path d="M10 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                              <path d="M6.66669 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25"
                                    strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M13.3333 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25"
                                    strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p className="text-sm leading-none text-gray-600 ml-2">23</p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                              <path
                                  d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                  stroke="#52525B"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              ></path>
                            </svg>
                            <p className="text-sm leading-none text-gray-600 ml-2">04/07</p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <button
                              className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Due {task.deadline}
                          </button>
                        </td>
                        <td className="pl-4">
                          <button
                              className="hs-collapse-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                              id={`id_${task.uuid}`} aria-expanded="false" aria-controls={`id_${task.uuid}-heading`}
                              data-hs-collapse={`#id_${task.uuid}-heading`}>
                            View
                            <svg className="hs-collapse-open:rotate-180 shrink-0 size-4 text-white"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr key={uuidv4()}>
                        <td key={uuidv4()} id={`id_${task.uuid}-heading`}
                            className="hs-collapse hidden overflow-hidden transition-[height] duration-100 focus:outline-none border border-gray-100 rounded p-5"
                            aria-labelledby={`id_${task.uuid}`}
                            colSpan="8">


                          <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">


                            <div className={'w-full text-sm text-left rtl:text-right'}>

                              <section className={'w-auto p-5'}>
                                <p className={"text-start text-gray-700 text-2xl mb-4"}>Details: </p>
                                <div className={"p-5"}>

                                  <div className="grid grid-cols-2 gap-8 p-4">

                                    <div className="space-y-5">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Status</span>

                                        <button id={`id_${task.uuid}-status-dropdown-button`} data-dropdown-toggle={`id_${task.uuid}-status-dropdown`}
                                                className="font-medium rounded-lg text-xs text-start inline-flex items-center"
                                                type="button">

                                            <span className={'bg-blue-500 text-white px-2 py-1 rounded'}>
                                                    IN PROGRESS
                                            </span>

                                          <svg className="w-2.5 h-2.5 ms-3"
                                               aria-hidden="true"
                                               xmlns="http://www.w3.org/2000/svg"
                                               fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 1 4 4 4-4"/>
                                          </svg>
                                        </button>


                                        <div id={`id_${task.uuid}-status-dropdown`}
                                             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                          <ul className="py-2 text-sm"
                                              aria-labelledby={`id_${task.uuid}-status-dropdown-button`}>
                                            <li>
                                              <a href="#"
                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                  <span className={'bg-yellow-500 text-white px-2 py-1 rounded'}>
                                                    TO DO
                                                  </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#"
                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                  <span className={'bg-blue-500 text-white px-2 py-1 rounded'}>
                                                    IN PROGRESS
                                                  </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#"
                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                  <span className={'bg-green-500 text-white px-2 py-1 rounded'}>
                                                    DONE
                                                  </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#"
                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                  <span className={'bg-gray-500 text-white px-2 py-1 rounded'}>
                                                    REJECTED
                                                  </span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Deadline</span>
                                        <span className="text-gray-400">
                                            <button
                                                className="py-2 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Due
                                              today at 18:00
                                            </button>
                                          </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Folder</span>
                                        <span className="text-gray-400">

                                            <FolderIcon
                                                folders={[
                                                  {uuid: '1238-1231-312-312', title: 'Test Folder'}
                                                ]}
                                                onDoubleClick={() => {
                                                }}
                                                handleSingleClick={() => {
                                                }}
                                                listView={true}
                                            />

                                          </span>
                                      </div>
                                    </div>


                                    <div className="space-y-5">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Reporter</span>
                                        <div className={'flex items-center space-x-2'}>

                                            <span
                                                className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                                              NN
                                            </span>

                                          <span className={'text-gray-500 ml-3'}>
                                              Nino@mail.com
                                            </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <span className="text-gray-600 w-28">Assignee</span>

                                        <div className={'flex items-center space-x-2'}>

                                            <span
                                                className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                                              KG
                                            </span>

                                          <span className={'text-gray-500 ml-3'}>
                                              Keso@mail.com
                                            </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>

                                  </div>


                                </div>
                              </section>

                              <section className={'w-auto p-5'}>
                                <p className={"text-start text-gray-700 text-2xl mb-4"}>Description: </p>
                                <div className={"p-5 border border-gray-300 rounded"}>
                                  <Editor
                                      ref={quillRef}
                                      readOnly={readOnly}
                                      defaultValue={new Delta()
                                          .insert('Hello')
                                          .insert('\n', {header: 1})
                                          .insert('Some ')
                                          .insert('initial', {bold: true})
                                          .insert(' ')
                                          .insert('content', {underline: true})
                                          .insert('\n')}
                                  />
                                </div>
                              </section>

                              <section className={'w-auto p-5'}>
                                <p className={"text-start text-gray-700 text-2xl mb-4"}>Subtasks: </p>
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                  <table className="w-full table-auto">
                                    <thead>
                                    <tr key={uuidv4()}>
                                      <th className="text-left text-gray-600">Name</th>
                                      <th className="text-left text-gray-600">Assignee</th>
                                      <th className="text-left text-gray-600">Due date</th>
                                      <th className="text-left text-gray-600">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subtasks.map((subtask, index) => (
                                        <tr key={uuidv4()} className="border-t">
                                          <td key={uuidv4()} className="py-2">
                                            <div className="flex items-center space-x-2">

                                              <div
                                                  className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative ml-2">
                                                <input placeholder="checkbox" type="checkbox"
                                                       className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"/>
                                                <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                  <svg className="icon icon-tabler icon-tabler-check"
                                                       xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                       viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                       fill="none"
                                                       strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M5 12l5 5l10 -10"></path>
                                                  </svg>
                                                </div>
                                              </div>

                                              <p className={'pl-5'}>{subtask.title}</p>
                                            </div>
                                          </td>
                                          <td key={uuidv4()} className="py-2">
                                            <div className={'flex items-center space-x-2'}>
                                              <FiUserPlus className="text-gray-400"/>
                                              <span
                                                  className="bg-purple-500 text-white rounded-full text-xs w-5 h-5 ml-2 flex items-center justify-center">
                                                KG
                                              </span>

                                              <span className={'text-gray-500 ml-3'}>
                                                Keso@mail.com
                                              </span>
                                            </div>
                                          </td>
                                          <td key={uuidv4()} className="py-2">
                                            <div className={'flex items-center space-x-2'}>
                                              <FiCalendar className="text-gray-400"/>

                                              <button
                                                  className="py-2 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Due
                                                today at 18:00
                                              </button>
                                            </div>
                                          </td>
                                          <td key={uuidv4()}>
                                            <span className={'bg-blue-500 text-white px-2 py-1 rounded'}>
                                                    IN PROGRESS
                                            </span>
                                          </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                  </table>
                                </div>
                              </section>


                              <div className="flex justify-end space-x-4 mt-4 p-5">
                                <button className="flex items-center space-x-1 text-gray-600">
                                  <FiXCircle className="text-xl"/>
                                  <span>Cancel</span>
                                </button>
                                <button
                                    className="flex items-center space-x-1 text-white bg-purple-600 px-4 py-2 rounded">
                                  <FiCheckCircle className="text-xl"/>
                                  <span>Save</span>
                                </button>
                              </div>
                            </div>
                          </div>


                        </td>
                      </tr>
                      <tr key={`${task.uuid}-space`} className="h-3">
                      </tr>
                    </>
                  )
                )
              }
              </tbody>
            </table>


          </div>

        </div>
      </div>

      {/* ResizableDiv */
      }
      {
          seeDiv && (
              <ResizableDiv setSeeResizebleDiv={closeResDiv}>
                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-white">
                    <caption className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800">
                      Comment
                      <p className="mt-1 text-sm font-normal text-gray-400">
                        {selectedTask.comment}
                      </p>
                    </caption>
                    <thead className="w-full text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Property
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Value
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        assign_to:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.assign_to}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        created_at:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.created_at}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        creator:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.creator}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        deadline:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.deadline}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        status:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.status}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        title:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.title}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        updated_at:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.updated_at}
                      </td>
                    </tr>
                    <tr key={uuidv4()} className="w-full border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-white">
                        uuid:
                      </th>

                      <td className="px-6 py-4">
                        {selectedTask.uuid}
                      </td>
                    </tr>


                    </tbody>
                  </table>
                </div>
              </ResizableDiv>
          )}

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
  );
};

export default Tasks;
