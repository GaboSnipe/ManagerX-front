import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header, MobileMenu, Navigation, UserMenu } from './components' 
import { navigation } from "../../globalEnv"
import { API_URL } from '../../http'
import { useEffect } from 'react'
import { toast, Slide, cssTransition } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationsThunk } from '../../features/notifications/notificationsThunk'
import { setUnseenNotificationsCount } from '../../features/notifications/notificationsSlice'



const Main = () => {
  const dispatch = useDispatch();
  const unseenNotificationsCount = useSelector((state) => state.notifications.unseenNotificationsCount);
  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  
  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    let url = `ws://127.0.0.1:8000/ws/notify/?token=${localStorage.getItem("token")}`;
    const socket = new WebSocket(url);

    socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      let sountArr = ["[appsgolem.com][00-14-06][00-14-12]__.mp3",
                      "HEHEHEHAclashroyal.mp3",
                      "Amongussussoundeffect.mp3",
                      "EmotionalDamage(Meme Sound Effect)(HD).mp3"];
      const randomIndex = Math.floor(Math.random() * sountArr.length);
      const audio = new Audio(`/sound/${sountArr[randomIndex]}`);
      audio.play();
      toast(`${data.message}`, {
        autoClose: false,
        closeOnClick: true,  
        draggable: true,
        transition: Slide,
        pauseOnHover: true,
        hideProgressBar: true,
        containerId : "notification",
      });
      dispatch(setUnseenNotificationsCount(unseenNotificationsCount+1))
    };

    return () => {
      socket.close()
    };
  }, []);

  useEffect(()=>{
    dispatch(getNotificationsThunk());
  },[])

  useEffect(()=>{
    dispatch(setUnseenNotificationsCount());
  },[])

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-auto">
                  <img src="/images/logo.svg" />
                </div>
              </div>
              <Navigation navigation={navigation} classNames={classNames} />
            </div>
            <div className="hidden md:block">
              <UserMenu user={user} userNavigation={userNavigation} />
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <MobileMenu navigation={navigation} user={user} userNavigation={userNavigation} classNames={classNames} />
      </Disclosure>
      <Header />
    </>
  );
}

export default Main;