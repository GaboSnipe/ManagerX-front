import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setProject, setProjectSeeResizebleDiv, setSelectedRowId } from '../../../features/project/projectSlice';

const TableBody = ({ tableData, columns }) => {
  const dispatch = useDispatch();
  const selectedRowId = useSelector((state) => state.project.selectedRowId);

  const handleClick = (data) => {
    dispatch(setProjectSeeResizebleDiv(true));
    dispatch(setProject(data));
    dispatch(setSelectedRowId(data.id));
  };

  return (
        <tbody className="bg-white">
            {tableData.map((data, index) => (
                
                <tr key={index}
                    onClick={() => handleClick(index)}
                    className={`text-gray-700 ${selectedRowId === index ? 'odd:bg-blue-300 even:bg-blue-300' : 'odd:bg-white even:bg-gray-200'}`}
                >
                    {data.map((item) => {
                        if (!item['visible'])
                            return;
                        
                        const tData = item['value'] ?? "——";
                        return (
                            <td 
                                key={uuidv4()}
                                className="px-4 py-3 text-sm border"
                            >
                                {tData}
                            </td>
                        );
                    })}

                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;