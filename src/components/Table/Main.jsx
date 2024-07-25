import { TableBody, TableHead } from "./components";
import { useSortableTable } from "./useSortableTable";

const Table = ({columns, data, setData}) => {
    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
            <table className="w-full whitespace-nowrap">
                <TableHead columns={columns} handleSorting={handleSorting} />
                <TableBody columns={columns} tableData={tableData} />
            </table>
        </>
    );
};
export default Table;
