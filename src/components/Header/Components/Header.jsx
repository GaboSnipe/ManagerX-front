import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getTitle = (pathname) => {
    switch (pathname) {
      case '/projects':
        return 'Projects';
      case '/workplace':
        return 'Work Place';
      case '/tasks':
        return 'Tasks';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{getTitle(location.pathname)}</h1>
      </div>
    </header>
  );
};

export default Header;
