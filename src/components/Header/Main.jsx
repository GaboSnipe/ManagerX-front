import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Header, MobileMenu, Navigation, UserMenu } from './components';
import { navigation } from "../../globalEnv";
import { useEffect, useRef } from 'react';
import { toast, Slide } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsThunk } from '../../features/notifications/notificationsThunk';
import { setUnseenNotificationsCount } from '../../features/notifications/notificationsSlice';
import { setHeaderHeight } from '../../features/workplace/workplaceSlice';
import { ModalWindow } from "../";
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const unseenNotificationsCount = useSelector((state) => state.notifications.unseenNotificationsCount);
    const headerRef = useRef();
    const user = useSelector((state) => state.auth.userInfo);

    const userNavigation = [
        { name: 'პარამეტრები', href: '/settings' },
        { name: 'notes', href: '/notes' },
        { name: 'გამოსვლა', href: '/' },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    useEffect(() => {
        const url = `${import.meta.env.VITE_NOTIFICATION_API_URL}ws/notify/?token=${localStorage.getItem("token")}`;
        const socket = new WebSocket(url);

        socket.onmessage = (e) => {
            try {
                let data = JSON.parse(e.data);
                const audio = new Audio(`/sound/mixkit-long-pop-2358.wav`);
                audio.play();

                const toastOptions = {
                    autoClose: false,
                    closeOnClick: true,
                    draggable: true,
                    transition: Slide,
                    pauseOnHover: true,
                    hideProgressBar: true,
                    containerId: "notification",
                };

                switch (data.level) {
                    case "error":
                        toast.error(`${data.message}`, toastOptions);
                        break;
                    case "success":
                        toast.success(`${data.message}`, toastOptions);
                        break;
                    case "warning":
                        toast.warning(`${data.message}`, toastOptions);
                        break;
                    default:
                        toast.info(`${data.message}`, toastOptions);
                        break;
                }

                dispatch(getNotificationsThunk());
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        return () => {
            socket.close();
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNotificationsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (headerRef.current) {
            dispatch(setHeaderHeight(headerRef.current.offsetHeight));
        }
    }, [headerRef]);

    const navigateToDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <div ref={headerRef}>
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-center">
                        <div className="flex-1 flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <button onClick={navigateToDashboard} className="h-8 w-auto cursor-pointer">
                                    <img alt="logo" src="/images/logo.svg" />
                                </button>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
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
                </div>
                <MobileMenu navigation={navigation} user={user} userNavigation={userNavigation} classNames={classNames} />
            </Disclosure>
            <Header />
        </div>
    );
}

export default Main;
