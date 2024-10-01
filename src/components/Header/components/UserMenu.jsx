import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteCurrentNotificationThunk, getNotificationsThunk, patchCurrentNotificationThunk } from '../../../features/notifications/notificationsThunk';
import { MdClose } from "react-icons/md";
import { setUnseenNotificationsCount } from '../../../features/notifications/notificationsSlice';


const UserMenu = ({ user, userNavigation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const notificationsList = useSelector((state) => state.notifications.notificationsList);
  const unseenNotificationsCount = useSelector((state) => state.notifications.unseenNotificationsCount);
  const menuRef = useRef(null);


  const toggleMenu = async () => {
    let formData = {
        unread: false 
    };

    if (!isOpen) {
        try {
            await dispatch(getNotificationsThunk());
            
            for (const notification of notificationsList) {
                if (notification.unread) {
                    await dispatch(patchCurrentNotificationThunk({ uuid: notification.uuid, formData }));
                }
            }
            await dispatch(setUnseenNotificationsCount(0));
        } catch (err) {
            console.error("Error updating notifications:", err);
        }
    }

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
  const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;

  const deleteNotification = (uuid) => {
    dispatch(deleteCurrentNotificationThunk(uuid))
  }

  const deleteAllNotifications = () => {
    notificationsList.map((notificat) => {
      deleteNotification(notificat.uuid)
    })
  }

  const navigateToNotificationsPage = () => {
    navigate("/notifications")
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
          <div className='absolute block right-0 shadow-lg bg-white py-4 z-[1000] min-w-full rounded-lg w-[410px] max-w-[410px] max-h-[500px] overflow-auto mt-2 custom-scrollbar'>
            <div className="flex items-center px-4 mb-4">
              
              <button onClick={deleteAllNotifications} className="text-xs text-blue-600 ml-4">Clear all</button>
              <button onClick={navigateToNotificationsPage} className="text-xs text-blue-600 mr-4 ml-auto">View all Notifications</button>

            </div>

            <ul className="divide-y">
              {notificationsList.length < 1 ? (
                <p className="text-sm font-bold text-ellipsis text-gray-400 text-center mb-4 mt-8">notifications are empty</p>
              ):
              (
                notificationsList.map((notification) => (
                  <li key={notification.uuid} className='relative p-4 flex hover:bg-gray-50 cursor-pointer'>
  
                    <button onClick={() => { deleteNotification(notification.uuid) }} className='absolute text-gray-500 text-sm right-4'>
                      <MdClose />
                    </button>
  
                    <img alt={'user'} src={notification?.initiator?.avatar || baseAvatarUrl} className="w-12 h-12 rounded-full shrink-0" />
  
                    <div className="ml-6  max-w-[260px]">
                      <h3 className="text-sm text-[#333] font-semibold overflow-hidden text-nowrap whitespace-nowrap text-ellipsis" title={notification.title}>
                        {notification.title}
                      </h3>
  
                      <p className="text-xs text-gray-500 max-h-[60px] mt-2 overflow-hidden text-ellipsis line-clamp-3" title={notification.message}>
                        {notification.message}
                      </p>
  
                      <p className="text-xs text-blue-600 leading-3 mt-2"> {timeElapsed(notification.created_at)}</p>
                    </div>
                  </li>
                ))
              )}

            </ul>


          </div>

        )}

      </div>

      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton
            className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img alt="" src={user?.avatar ? user?.avatar : baseAvatarUrl} className="h-8 w-8 rounded-full" />
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