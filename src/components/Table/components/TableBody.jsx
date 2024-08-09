import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFileList, setProject, setProjectSeeResizebleDiv, setSelectedRowId } from '../../../features/project/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { getFilesListThunk } from '../../../features/project/projectThunk';
import { formatDate } from "../../../utils/util.js";


const dataTypes = {
    string: "string",
    date: "date",
    url: "url",
    boolean: "boolean",
    integer: "integer",
    float: "float",
}



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
                        className={`text-gray-700 hover:bg-blue-300 ${selectedRowId === rowId ? 'odd:bg-blue-300 even:bg-blue-300' : 'odd:bg-white even:bg-gray-200'}`}
                    >
                        {data.map((item) => {
                            if (!item['visible'])
                                return null;
                            
                            const tData = item['value'] ?? "——";


                            switch (item?.type) {
                                case dataTypes.date:
                                    return (
                                        <td
                                            key={uuidv4()}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            {formatDate(tData)}
                                        </td>
                                    )

                                case dataTypes.url:
                                    return (
                                        <td
                                            key={uuidv4()}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            <a href={`${tData}`}>
                                                Tap To Open
                                            </a>
                                        </td>
                                    )

                                case dataTypes.boolean:
                                    return (
                                        <td
                                            key={uuidv4()}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            <input checked id="green-checkbox" type="checkbox" value={tData}
                                                   className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"/>

                                        </td>
                                    )

                                default:
                                    return (
                                        <td
                                            key={uuidv4()}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            {tData}
                                        </td>
                                    );

                            }


                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
