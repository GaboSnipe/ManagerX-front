import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFileList, setProject, setProjectSeeResizebleDiv, setSelectedRowId } from '../../../features/project/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { getFilesListThunk } from '../../../features/project/projectThunk';

const TableBody = ({ tableData, columns }) => {
    const dispatch = useDispatch();
    const selectedRowId = useSelector((state) => state.project.selectedRowId);

    const fetchData = async (uuid) => {
        try {
            await dispatch(getFilesListThunk({ uuid })).unwrap();
        } catch (error) {
            console.error('error:', error);
        }
    };

    const handleClick = (data) => {
        const uuidValue = data.find(obj => obj.accessor === 'uuid')?.value;
        dispatch(setProjectSeeResizebleDiv(true));
        dispatch(setProject(data));
        fetchData(uuidValue);
        dispatch(setSelectedRowId(uuidValue));
    };

    return (
        <tbody className="bg-white">
            {tableData.map((data, index) => {
                const rowId = data.find(obj => obj.accessor === 'uuid')?.value;

                return (
                    <tr key={rowId}
                        onClick={() => handleClick(data)}
                        className={`text-gray-700 ${selectedRowId === rowId ? 'odd:bg-blue-300 even:bg-blue-300' : 'odd:bg-white even:bg-gray-200'}`}
                    >
                        {data.map((item) => {
                            if (!item['visible'])
                                return null;
                            
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
                );
            })}
        </tbody>
    );
};

export default TableBody;
