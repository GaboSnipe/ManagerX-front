const TableBody = ({ tableData, columns }) => {
    return (
        <tbody className="bg-white">
            {tableData.map((data) => {
               return (
                <tr key={data.id} className="text-gray-700 odd:bg-white even:bg-gray-200">
                       {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "——";
                            return <td key={accessor} className="px-4 py-3 text-sm border">{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;


