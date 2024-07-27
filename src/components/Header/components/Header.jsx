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
            <div className="pt-2">
                <div className="min-w-auto flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                workplace
                </h2>
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
