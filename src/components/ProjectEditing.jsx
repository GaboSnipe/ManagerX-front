import React, { useState } from 'react';
import 'quill/dist/quill.snow.css';
import "../styles/scrollBar.css"


const ProjectEditing = ({ isEditing, closeWindow, project, headers, onSubmit }) => {
    const [formData, setFormData] = useState(() => {
        return headers.reduce((acc, obj) => {
          const item = project.find(item => item.accessor === `tableHeaders_${obj.id}`);
          
          let value;
          if (item?.type === 'boolean') {
            value = item.value ;
          } else {
            value = item?.value ?? '';
          }
          
          return {
            ...acc,
            [obj.id]: value
          };
        }, {});
      });
      const handleInputChange = (id, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    
      const handleSubmit = () => {
        const data = {
            expertise_data: project.find(item => item.accessor === "uuid")?.value, 
            key_value_pair: Object.entries(formData).map(([key, value]) => ({
              field: Number(key),
              value: value
            }))
          };
          onSubmit(data)

      };


      
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F7F5F5] rounded-lg shadow-lg p-6 mx-4 md:mx-auto max-w-6xl w-full max-h-[80%] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-roboto font-semibold">Edit</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={closeWindow}
                    >
                        ✕
                    </button>
                </div>
                <div className='pt-4 mr-40 content-center'>
      <div className="py-10 w-full">
        <div className="space-y-3">
          <div className='pt-4'>
            <table className="w-full">
              <tbody>
                {headers.map((obj) => (
                  <tr key={obj.id} className='w-full'>
                    <td className="text-right text-base p-2">{obj.name}</td>
                    <td className="p-2">
                      {obj.data_type === 'string' && (
                        <input
                          type="text"
                          className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                          value={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.value)}
                        />
                      )}
                      {obj.data_type === 'url' && (
                        <input
                          type="url"
                          className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                          value={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.value)}
                        />
                      )}
                      {obj.data_type === 'date' && (
                        <input
                          type="date"
                          className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                          value={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.value)}
                        />
                      )}
                      {obj.data_type === 'boolean' && (
                        <input
                          type="checkbox"
                          className="p-1"
                          checked={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.checked)}
                        />
                      )}
                      {obj.data_type === 'integer' && (
                        <input
                          type="number"
                          step="1"
                          className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                          value={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.value)}
                        />
                      )}
                      {obj.data_type === 'float' && (
                        <input
                          type="number"
                          step="0.01"
                          className="w-full max-w-[45rem] p-1 border border-gray-300 rounded-lg"
                          value={formData[obj.id]}
                          onChange={(e) => handleInputChange(obj.id, e.target.value)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
        </div>);
};

export default ProjectEditing;
