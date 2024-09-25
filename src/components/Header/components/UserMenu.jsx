import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getNotificationsThunk } from '../../../features/notifications/notificationsThunk';

const UserMenu = ({ user, userNavigation }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const notificationsList = useSelector((state) => state.notifications.notificationsList);
  const unseenNotificationsCount = useSelector((state) => state.notifications.unseenNotificationsCount);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    dispatch(getNotificationsThunk());
    setIsOpen(!isOpen);
  };



  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  function timeElapsed(pastDate) {
    const pastDateTime = new Date(pastDate);
    const now = new Date();
    const diffInMs = now - pastDateTime;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} d ago`;
    } else if (hours > 0) {
      return `${hours} h ago`;
    } else if (minutes > 0) {
      return `${minutes} min ago`;
    } else {
      return `${seconds} sec ago`;
    }
  }
  const baseAvatarUrl = `images/defUserImg.jpg`

  const getBoxStyles = () => {

  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="ml-4 flex items-center md:ml-6">
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={toggleMenu}
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="false" className="h-7 w-7" />
          {unseenNotificationsCount > 0 && 
          <span className="absolute inset-0 object-right-top -mr-6">
            <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-gray-800 rounded-full text-xs font-semibold leading-4 bg-white text-gray-800">
              {unseenNotificationsCount}
            </div>
          </span>
          }
        </button>

        {isOpen && (
            <div className='absolute block right-0 shadow-lg bg-white py-4 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto mt-2'>
              <div className="flex items-center justify-between px-4 mb-4">
                <p className="text-xs text-blue-600 cursor-pointer">Clear all</p>
                <p className="text-xs text-blue-600 cursor-pointer">Mark as read</p>
              </div>

              <ul className="divide-y">

                {notificationsList.map((notification) => (
                    <li key={notification.uuid} className='p-4 flex items-center hover:bg-gray-50 cursor-pointer'>
                      <img alt={'user'} src="https://readymadeui.com/profile_2.webp" className="w-12 h-12 rounded-full shrink-0"/>

                      <div className="ml-6">
                        <h3 className="text-sm text-[#333] font-semibold">{notification.title}</h3>
                        <p className="text-xs text-gray-500 mt-2">{notification.message}</p>
                        <p className="text-xs text-blue-600 leading-3 mt-2"> {timeElapsed(notification.created_at)}</p>
                      </div>
                    </li>
                ))}
              </ul>

              <p className="text-xs px-4 mt-6 mb-4 inline-block text-blue-600 cursor-pointer">View all
                Notifications</p>
            </div>

        )}

      </div>

      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton
              className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"/>
            <span className="sr-only">Open user menu</span>
            <img alt="" src={user.avatar ? user.avatar : baseAvatarUrl} className="h-8 w-8 rounded-full"/>
          </MenuButton>

        </div>
        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <NavLink
                    to={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  {item.name}
                </NavLink>
              </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}

export default UserMenu;