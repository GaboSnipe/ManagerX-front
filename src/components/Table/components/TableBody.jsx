import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const TableBody = ({ tableData, columns }) => {
    const dispatch = useDispatch();
    const selectedRowId = useSelector((state) => state.project.selectedRowId);



    const setSeeResizebleDiv = () => ({
        type: 'SET_PROJECT_SEE_RESIZEBLEDIV',
        payload: true,
    });

    const setSelectedRowId = (index) => ({
        type: 'SET_SELECTED_ROW_ID',
        payload: index,
    });

    const setProject = (index) => ({
        type: 'SET_PROJECT',
        payload: tableData[index],
    });

    const handleClick = (index) => {
        dispatch(setSeeResizebleDiv());
        dispatch(setProject(index));
        dispatch(setSelectedRowId(index));
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
};

export default TableBody;
