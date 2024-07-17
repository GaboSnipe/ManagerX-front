import { NavLink } from "react-router-dom";

const Navigation = ({ navigation, classNames, isActive }) => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => classNames(
              isActive? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )} 
            end={true}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
