import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteCurrentNotificationThunk,
  getNotificationsThunk,
  patchCurrentNotificationThunk,
} from '../features/notifications/notificationsThunk';
import { MdClose } from 'react-icons/md';
import { setUnseenNotificationsCount } from '../features/notifications/notificationsSlice';

const NotificationsList = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const notificationsList = useSelector((state) => state.notifications.notificationsList);
  const unseenNotificationsCount = useSelector((state) => state.notifications.unseenNotificationsCount);
  const menuRef = useRef(null);

  const toggleMenu = async () => {
    let formData = { unread: false };

    if (!isOpen) {
      dispatch(getNotificationsThunk());

      try {
        const updatePromises = notificationsList.map((notification) => {
          if (notification.unread) {
            return dispatch(patchCurrentNotificationThunk({ uuid: notification.uuid, formData }));
          }
          return Promise.resolve();
        });

        await Promise.all(updatePromises);
        dispatch(setUnseenNotificationsCount(0));
      } catch (err) {
        console.error(err);
      }
    }

    setIsOpen(!isOpen);
  };

  const baseAvatarUrl = `${import.meta.env.BASE_URL}images/defUserImg.jpg`;



  useEffect(() => {
    toggleMenu();
  }, []);

  const deleteNotification = useCallback((uuid) => {
    dispatch(deleteCurrentNotificationThunk(uuid));
  }, [dispatch]);

  const deleteAllNotifications = useCallback(() => {
    notificationsList.forEach((notification) => {
      deleteNotification(notification.uuid);
    });
  }, [notificationsList, deleteNotification]);

  function timeElapsed(pastDate) {
    const pastDateTime = new Date(pastDate);
    const now = new Date();
    const diffInMs = now - pastDateTime;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} დღის წინ`;
    } else if (hours > 0) {
      return `${hours} საათის წინ`;
    } else if (minutes > 0) {
      return `${minutes} წუთის წინ`;
    } else {
      return `${seconds} წამის წინ`;
    }
  }

  return (
<div className='w-full flex justify-center'>
  <div
    className='shadow-lg bg-white py-4 max-w-screen-lg rounded-lg w-full mt-8 mb-8'
  >
    <div className="flex items-center px-4 mb-4">
      <button onClick={deleteAllNotifications} className="text-xs text-blue-600 ml-4">
        ყველას წაშლა
      </button>
    </div>

    <ul className="divide-y">
      {notificationsList.length < 1 ? (
        <p className="text-sm font-bold text-ellipsis text-gray-400 text-center mb-4 mt-8">
          შეტყობინებები ცარიელია
        </p>
      ) : (
        notificationsList.map((notification) => (
          <li key={notification.uuid} className='relative p-4 flex hover:bg-gray-50 cursor-pointer'>
            <button
              aria-label="Delete notification"
              onClick={() => deleteNotification(notification.uuid)}
              className='absolute text-gray-500 text-sm right-4'
            >
              <MdClose />
            </button>

            <img
              alt='user'
              src={notification?.initiator?.avatar || baseAvatarUrl}
              className="w-12 h-12 rounded-full shrink-0"
            />

            <div className="ml-6 max-w-full">
              <h3
                className="text-sm text-[#333] font-semibold overflow-hidden text-ellipsis"
                title={notification.title}
              >
                {notification.title}
              </h3>

              <p
                className="text-xs text-gray-500 max-h-full mt-2 overflow-hidden text-ellipsis"
                title={notification.message}
              >
                {notification.message}
              </p>

              <p className="text-xs text-blue-600 leading-3 mt-2">
                {timeElapsed(notification.created_at)}
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

  );
};

export default NotificationsList;
