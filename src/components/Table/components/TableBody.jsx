import { useDispatch, useSelector } from 'react-redux';

const TableBody = ({ tableData, columns }) => {
    const dispatch = useDispatch();
    const selectedRowId = useSelector((state) => state.project.selectedRowId);



    const setSeeResizebleDiv = () => ({
        type: 'SET_PROJECT_SEE_RESIZEBLEDIV',
        payload: true,
    });

    const setSelectedRowId = (id) => ({
        type: 'SET_SELECTED_ROW_ID',
        payload: id,
    });

    const setProject = (project) => ({
        type: 'SET_PROJECT',
        payload: project,
    });

    const handleClick = (data) => {
        dispatch(setSeeResizebleDiv());
        dispatch(setProject(data));
        dispatch(setSelectedRowId(data.id)); // Исправлено: `dispatch` вместо `useDispatch`
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
