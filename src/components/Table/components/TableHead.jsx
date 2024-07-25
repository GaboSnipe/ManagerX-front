import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr className="text-sm font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
        {columns.map(({ label, accessor, sortable }) => {
          const isActive = sortField === accessor;
          const icon = sortable
            ? isActive && order === "asc"
              ? faSortUp
              : isActive && order === "desc"
              ? faSortDown
              : faSort
            : null;
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={"px-4 py-3 cursor-pointer"}
            >
              <span className="flex items-center justify-center">
                {label}
                {sortable && <FontAwesomeIcon icon={icon} className="ml-2" />}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
