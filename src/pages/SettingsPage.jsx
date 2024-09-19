import React, { useEffect, useState } from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';
import ProjectsService from '../services/ProjectsService';

const SettingsPage = () => {
  const loading = useAuthCheck();
  const [customfieldName, setCustomFieldName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Define the list of types
  const typeList = ["string", "url", "date", "boolean", "integer", "float"];

  // Function to handle creating custom fields
  const createCustomFields = () => {
    if (customfieldName && selectedType) {
      const data = { name: customfieldName, data_type: selectedType };
      ProjectsService.createCustomFields(data)
        .then((response) => {
          // Handle successful response (e.g., show success message)
          console.log('Custom field created:', response.data);
        })
        .catch((error) => {
          // Handle error (e.g., show error message)
          console.error('Error creating custom field:', error);
        });
    } else {
      // Handle validation error (e.g., show validation message)
      console.error('Custom field name and type are required.');
    }
  };

  return (
    <div className=" h-full w-full flex items-center justify-center bg-[#fcfcfc] relative">
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
          <option value="">Select data type</option>
          {typeList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          onClick={createCustomFields}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Custom Field
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
