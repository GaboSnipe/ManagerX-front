// src/components/TableBody.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      {tableData.map((data) => (
        <tr
          key={data.id}
          onClick={() => handleClick(data)}
          className={`text-gray-700 ${selectedRowId === data.id ? 'odd:bg-blue-300 even:bg-blue-300' : 'odd:bg-white even:bg-gray-200'}`}
        >
          {columns.map(({ accessor }) => {
            const tData = data[accessor] ?? "——";
            return (
              <td
                key={accessor}
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
};

export default TableBody;
