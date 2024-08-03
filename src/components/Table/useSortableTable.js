import { useState, useEffect } from "react";

export const useSortableTable = (data, columns) => {
  const [tableData, setTableData] = useState(data);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSorting = (sortField, sortOrder) => {
    const column = columns.find(col => col.accessor === sortField);
    if (!column) return;

    const sortedData = [...tableData];

    const compare = (a, b) => {
      const aValue = a.find(item => item.accessor === sortField)?.value;
      const bValue = b.find(item => item.accessor === sortField)?.value;

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      switch (column.type) {
        case 'string':
          return aValue.localeCompare(bValue);
        case 'integer':
        case 'number':
          return aValue - bValue;
        case 'date':
          return new Date(aValue) - new Date(bValue);
        default:
          return 0;
      }
    };

    sortedData.sort((a, b) => (sortOrder === "asc" ? compare(a, b) : compare(b, a)));

    setTableData(sortedData);
    setSortField(sortField);
    setOrder(sortOrder);
  };

  return [tableData, handleSorting];
};
