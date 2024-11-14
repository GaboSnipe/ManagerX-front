import React, { useEffect, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import ProjectsService from '../services/ProjectsService';
import { getProjectHeadersThunk } from '../features/project/projectThunk';
import { useDispatch } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const [customfieldName, setCustomFieldName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const response_headers = useSelector((state) => state.project.projectHeaders);
  const typeList = [
    { key: "string", value: "text" },
    { key: "date", value: "iis" },
    { key: "boolean", value: "aae" },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [changedNames, setChangedNames] = useState({});

  useEffect(() => {
    dispatch(getProjectHeadersThunk()).unwrap();
  }, [dispatch]);

  const createCustomFields = () => {
    if (customfieldName && selectedType) {
      const data = { name: customfieldName, data_type: selectedType };
      ProjectsService.createCustomFields(data)
        .then((response) => {
          dispatch(getProjectHeadersThunk()).unwrap();
        })
        .catch((error) => {
          console.error('Error creating custom field:', error);
        });
    } else {
      console.error('Custom field name and type are required.');
    }
  };

  const changeItemName = (id, newName) => {
    setChangedNames((prev) => ({
      ...prev,
      [id]: newName,
    }));
  };

  const applyChanges = () => {
    setIsEditing(false);
    setChangedNames({});
  };

  return (
    <>
      <div className="h-full w-full flex items-center justify-center bg-[#fcfcfc] relative">
        <div className="content flex gap-5 p-4 bg-white shadow-lg rounded-md">
          {/* Input field for custom field name */}
          <input
            type="text"
            value={customfieldName}
            onChange={(e) => setCustomFieldName(e.target.value)}
            placeholder="Enter custom field name"
            className="border border-gray-300 rounded-md p-2"
          />

          {/* Dropdown for selecting data type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value=""></option>
            {typeList.map((type) => (
              <option key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}

          </select>

          <button
            onClick={createCustomFields}
            disabled={!customfieldName || !selectedType}
            className={`p-2 rounded-md ${customfieldName && selectedType ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
          >
            Create Custom Field
          </button>

        </div>
      </div>
      <div className='space-y-1 max-w-screen-2xl px-8 min-w-96 mx-auto mt-8'>
        {response_headers.map((item) => (
          <div
            className='bg-gray-100 flex items-center justify-between rounded-lg text-sm border border-gray-200 p-2'
            key={item.id}
            role="article"
            aria-label={item.name}
          >

            <input
              className='text-gray-500 ml-4 bg-transparent border-none cursor-default mr-2'
              value={changedNames[item.id] || item.name}
              onChange={(e) => changeItemName(item.id, e.target.value)}
              disabled={!isEditing}
            />
            {isEditing ?
              (
                <>

                  <button onClick={applyChanges}>
                    <IoCheckmarkDoneCircle className='text-green-400 text-xl font-extrabold ml-8' />
                  </button>
                </>
              ) :
              (
                <>
                  <button onClick={() => setIsEditing(true)}>
                    <CiEdit className='text-orange-400 text-xl font-extrabold ml-8' />
                  </button>
                </>
              )
            }
            <p className='text-gray-500 ml-auto mr-8'>{` type : ${item.data_type}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SettingsPage;
