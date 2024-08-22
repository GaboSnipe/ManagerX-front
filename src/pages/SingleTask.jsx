import { useNavigate, useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import React, { useEffect, useState } from 'react';
import { ExpandableTable } from '../components';
import useAuthCheck from '../utils/hooks/useAuthCheck';

const SingleTask = () => {
  const loadinsg = useAuthCheck();
  const navigate = useNavigate();
    const { uuid } = useParams();
    const [task, setTask] = useState();
    const [loading, setLoading] = useState();
    const [err, setErr] = useState();

    useEffect(() => {
      if (uuid) {
          TaskService.getTask(uuid)
              .then((response) => {
                  setTask(response.data);
                  setLoading(true);
              })
              .catch((err)=>{
                  setErr(true);
              });
      } else {
          navigate("/404");
      }
  }, [uuid, navigate]);
  


    return (
        <div className="flex">
        <div className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="sm:px-6 max-w-full">
            <div className="mt-7 w-full text-sm">
  
                
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {loading &&
                    <ExpandableTable task={task} isDisable={true} isExpandedDefault={true}/>
                  }
                  {err && 
                    <span>Task Not Found</span>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>


    );
};

export default SingleTask;
