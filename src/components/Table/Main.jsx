import React from "react";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import { useSortableTable } from "./useSortableTable";

const Table = ({ columns, data }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <table className="whitespace-nowrap">
      <TableHead columns={columns} handleSorting={handleSorting} />
      <TableBody columns={columns} tableData={tableData} />
    </table>
  );
};

export default Table;
