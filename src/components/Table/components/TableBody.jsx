import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFileList, setProject, setProjectSeeResizebleDiv, setSelectedRowId } from '../../../features/project/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { getFilesListThunk } from '../../../features/project/projectThunk';
import { formatDate } from "../../../utils/util.js";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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




    const handleClick = (data) => {
        const uuidValue = data.find(obj => obj.accessor === 'uuid')?.value;
        dispatch(setProjectSeeResizebleDiv(true));
        dispatch(setProject(data));
        dispatch(setSelectedRowId(uuidValue));
    };

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


    
    };

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
                    if (!item['visible']) return null;

                    const tData = item['value'] ?? "——";

                    switch (item?.accessor) {
                        case 'task.status':
                            return (
                                <td key={item.accessor}> {/* STATUS */}
                                    <div className="items-center m-3">
                                        <div className={`text-white text-xs w-32 min-w-32 py-0.5 rounded-full text-center ${getStatusStyles(tData)}`}>
                                            {getStatusLabel(tData)}
                                        </div>
                                    </div>
                                </td>
                            );
                        
                        default:
                            switch (item?.type) {
                                case dataTypes.date:
                                    return (
                                        <td
                                            key={item.accessor}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            {formatDate(tData)}
                                        </td>
                                    );

                                case dataTypes.url:
                                    return (
                                        <td
                                            key={item.accessor}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            <a href={`${tData}`}>
                                                Tap To Open
                                            </a>
                                        </td>
                                    );

                                case dataTypes.boolean:
                                    return (
                                        <td key={item.accessor} className="px-4 py-3 text-sm border">
                                            <div className="flex justify-center items-center">
                                                {tData === true ? (
                                                    <FaCheckCircle className="text-green-500 text-2xl" />
                                                ) : (
                                                    tData === false ? (
                                                    <FaTimesCircle className="text-red-500 text-2xl" />
                                                    ):null
                                                )}
                                            </div>
                                        </td>
                                    );

                                default:
                                    return (
                                        <td
                                            key={item.accessor}
                                            className="px-4 py-3 text-sm border"
                                        >
                                            {tData}
                                        </td>
                                    );
                            }
                    }
                })}
            </tr>
        );
    })}
</tbody>

    );

};

export default TableBody;
