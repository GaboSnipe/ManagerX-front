import React, { useEffect, useState } from "react";
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { FileViewer } from "../components";
import { MultipleFileUploadBasic } from "../components/FileUploader"
import TaskService from "../services/TaskService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSubTaskThunk } from "../features/task/taskThunk";
import { setSeeResizebleDiv } from "../features/task/taskSlice";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const [assigneToMy, setAssigneToMy] = useState();
  const [assigneByMy, setAssigneByMy] = useState();

  const getAssigneByMyList = async () => {
    try {
      let settings = `status=TODO&creator=${user?.id}`;
      const response = await TaskService.getSubtaskSettList(settings);
      setAssigneByMy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssigneToMyList = async () => {
    try {
      let settings = `status=TODO&assign_to=${user?.id}`;
      const response = await TaskService.getSubtaskSettList(settings);
      setAssigneToMy(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;
  const getStatusStyles = (status) => {
    switch (status) {
      case "TODO":
        return "bg-[#007BFF]";
      case "INPROGRESS":
        return "bg-[#FFA500]";
      case "DONE":
        return "bg-[#28A745]";
      case "REJECTED":
        return "bg-[#DC3545]";
      case "UNCERTAIN":
        return "bg-[#FFC107]";
      default:
        return "";
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "TODO":
        return "შესასრულებელი";
      case "INPROGRESS":
        return "მიმდინარე";
      case "DONE":
        return "შესრულებული";
      case "REJECTED":
        return "უარყოფილი";
      case "UNCERTAIN":
        return "გაურკვეველი";
      default:
        return "";
    }
  }

  const getOverdueTaskStyle = (date) => {
    const now = new Date();
    const [year, month, day] = date.split('-').map(Number);
    const target = new Date(year, month - 1, day);
    const timeDiff = target - now;

    if (timeDiff < 0) {
      return "bg-[rgba(255,127,127,0.2)]";
    } else {
      return "bg-white";
    }
  }

  const selectSubTask = (subTask) => {
    dispatch(getSubTaskThunk(subTask.uuid));
    dispatch(setSeeResizebleDiv(true));
    navigate('/tasks')
  }



  useEffect(() => {
    getAssigneToMyList();
    getAssigneByMyList();
  }, [])


  return (
    <>
      <div className="min-h-full">
        <div className="py-6 sm:px-6 lg:px-8 w-screen">
          <>
            <div className="flex justify-center w-full">

              <div className="relative rounded-l-md overflow-y-auto mt-8 custom-scrollbar h-full">

                <div className={`bg-[#F7F5F5]  max-w-3xl p-5  rounded-md mb-8 shadow-lg`}
                  style={{
                    boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',
                  }}
                >

                  <div className="mb-4">
                    <span className="text-gray-800 text-xs font-bold">

                      Filter: Assigned to me
                    </span>
                    <div className="my-2 w-full  h-px bg-[#E0E0E0]" />
                  </div>
                  {assigneToMy?.map((subtask, index) => (
                    <div key={subtask.uuid}
                      className={`h-[1.85rem] border hover:bg-gray-100 border-[rgba(0,0,0,0.21)] rounded-md flex items-center px-2 shadow-lg mb-px w-full ${getOverdueTaskStyle(subtask.deadline_to)}`}
                      style={{
                        boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',
                        cursor: 'pointer',
                      }}
                      onClick={() => selectSubTask(subtask)}
                    >
                      <input
                        type="checkbox"
                        id={`subtask-${subtask.uuid}`}
                        className="mr-2 w-3 h-3 rounded border-[#C9C9C9] bg-[#C9C9C9] checked:bg-[#7993d0] checked:border-[#7993d0] focus:ring-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <p className="font-[600] min-w-16 not-italic font-roboto text-[0.65rem] overflow-hidden w-full tracking-wide leading-[150%] text-ellipsis text-black"
                        title={subtask.title}
                      >
                        {subtask.title}
                      </p>
                      <div className="flex items-center ml-auto">
                        <div className="flex items-center mr-5">
                          <div className="bg-[#C2BDAD] text-white w-24 px-2.5 text-center py-0.5 rounded-full text-xs">
                            {subtask.deadline_from}
                          </div>
                          <div className="w-4 h-px bg-[#C2BDAD]" />
                          <div className="bg-[#C2BDAD] text-white w-24 text-center px-2.5 py-0.5 rounded-full text-xs">
                            {subtask.deadline_to}
                          </div>
                        </div>
                        <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center mr-4 ${getStatusStyles(subtask.status)}`}>
                          {getStatusLabel(subtask.status)}
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

              </div>

              <div className="w-16 min-w-2 max-w-16" />

              <div className="relative rounded-l-md overflow-y-auto mt-8 custom-scrollbar h-full">

                <div className={`bg-[#F7F5F5]  max-w-3xl p-5  rounded-md mb-8 shadow-lg`}
                  style={{
                    boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',
                  }}
                >

                  <div className="mb-4">
                    <span className="text-gray-800 text-xs font-bold">

                      Filter: Assigned By Me
                    </span>
                    <div className="my-2 w-full  h-px bg-[#E0E0E0]" />
                  </div>
                  {assigneByMy?.map((subtask, index) => (
                    <div key={subtask.uuid} className={`h-[1.85rem] border hover:bg-gray-100 border-[rgba(0,0,0,0.21)] rounded-md flex items-center px-2 shadow-lg mb-px w-full   ${getOverdueTaskStyle(subtask.deadline_to)}`}
                      style={{
                        boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 0px 4px -2px rgba(0, 0, 0, 0.4)',

                        cursor: 'pointer',
                      }}
                      onClick={() => selectSubTask(subtask)}
                    >
                      <input
                        type="checkbox"
                        id={`subtask-${subtask.uuid}`}
                        className="mr-2 w-3 h-3 rounded border-[#C9C9C9] bg-[#C9C9C9] checked:bg-[#7993d0] checked:border-[#7993d0] focus:ring-0"
                      />
                      <p className="font-[600] min-w-16 not-italic font-roboto text-[0.65rem] overflow-hidden w-full tracking-wide leading-[150%] text-ellipsis text-black"
                        title={subtask.title}
                      >
                        {subtask.title}
                      </p>
                      <div className="flex items-center ml-auto">

                        <div className="flex items-center mr-5">
                          <div className="bg-[#C2BDAD] text-white w-24 px-2.5 text-center py-0.5 rounded-full text-xs">
                            {subtask.deadline_from}
                          </div>
                          <div className="w-4 h-px bg-[#C2BDAD]" />
                          <div className="bg-[#C2BDAD] text-white w-24 text-center px-2.5 py-0.5 rounded-full text-xs">
                            {subtask.deadline_to}
                          </div>
                        </div>
                        <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center mr-4 ${getStatusStyles(subtask.status)}`}>
                          {getStatusLabel(subtask.status)}
                        </div>

                      </div>
                    </div>
                  ))
                  }
                </div>

              </div>
            </div>

          </>
        </div>
      </div>
    </>
  );
}



export default Dashboard;