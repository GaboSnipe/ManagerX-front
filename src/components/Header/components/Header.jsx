import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [limit, setLimit] = useState(() => localStorage.getItem('limit') || 10);
  const location = useLocation();

  const handleChange = (event) => {
    const value = event.target.value;
    setLimit(value);
    localStorage.setItem('limit', value);
  };

  useEffect(() => {
    localStorage.setItem('limit', limit);
  }, [limit]);


  const renderHeaderContent = (pathname) => {
    switch (pathname) {
      case '/projects':
        return (
          <>
            <div className="lg:flex lg:items-center lg:justify-between w-full">
              <div className="min-w-auto flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Projects
                </h2>
              </div>


              <div className="mt-5 lg:ml-4 lg:mt-0 w-1/2">
                <form className="max-w-md mx-auto w-full">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                  </div>
                </form>
              </div>


              <div className="mt-5 lg:ml-4 lg:mt-0">
                <select
                  value={limit}
                  onChange={handleChange}
                  className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none ml-2 p-2"
                >
                  <option value="10">Name</option>
                  <option value="20">Date Created</option>
                  <option value="50">Status</option>
                  <option value="100">Customer</option>
                </select>
              </div>


              <div className="mt-5 lg:ml-4 lg:mt-0">
                <select
                  value={limit}
                  onChange={handleChange}
                  className="border-2 border-gray-300 bg-white h-10 pl-2 rounded-lg text-sm focus:outline-none"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </>
        );
      case '/workplace':
        return (
          <div className="pt-2">
                          <div className="min-w-auto flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                workplace
                </h2>
              </div>
          </div>
        );
      case '/tasks':
        return (
          <div className="pt-2">
                          <div className="min-w-auto flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                tasks
                </h2>
              </div>
          </div>
        );
      default:
        return (
          <div className="pt-2">
                          <div className="min-w-auto flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  dashboard
                </h2>
              </div>
          </div>
        );
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
        {renderHeaderContent(location.pathname)}
      </div>
    </header>
  );
};

export default Header;
