import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import "../styles/global.css";

const Paginations = ({ items, refreshData, itemsCount }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemsCount;
    setItemOffset(newOffset);
    refreshData(`limit=${itemsPerPage}&offset=${newOffset}`);
  };
  

  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  return (
    <ReactPaginate
      previousLabel={<><ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous</>}
      nextLabel={<> Next<ArrowRightIcon strokeWidth={2} className="h-4 w-4" /></>}
      breakLabel="..."
      pageCount={pageCount}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      className="flex items-center gap-4 rounded unselectable font-bold text-gray-900"
      containerClassName="flex items-center gap-4"
      pageClassName="w-8 h-8 flex items-center justify-center"
      previousLinkClassName="flex items-center gap-2 active:bg-gray-300 py-2 px-4 rounded focus:shadow-outline"
      nextLinkClassName="flex items-center gap-2 active:bg-gray-300 py-2 px-4 rounded focus:shadow-outline"
      disabledClassName="pointer-events-none"
      activeClassName="bg-gray-900 text-white text-center flex items-center justify-center rounded-lg"
    />
  );
};

export default Paginations;
