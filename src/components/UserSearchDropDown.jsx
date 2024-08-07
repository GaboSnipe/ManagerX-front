import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import React, { useEffect, useRef, useState } from 'react';

const userList = [{ avatar: "KG", email: "Keso@mail.com", id: 1 }, { avatar: "NN", email: "Nino@mail.com", id: 2 }, { avatar: "KG", email: "Keso@mail.com", id: 3 }, { avatar: "NN", email: "Nino@mail.com", id: 4 }, { avatar: "KG", email: "Keso@mail.com", id: 5 }];

function UserSearchDropDown({ value, setValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [dropdownWidth, setDropdownWidth] = useState('auto');
    const toggleDropdown = () => setIsOpen(!isOpen);




    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    const handleOutside = (event) => {
        handleClickOutside(event);
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownWidth(buttonRef.current.clientWidth);
    }, [isOpen, value, buttonRef]);

    return (
        <div>
            <button
                ref={buttonRef}
                id="dropdownSearchButton"
                onClick={toggleDropdown}
                className="focus:outline-none focus:bg-gray-300 font-medium rounded-t-lg text-center inline-flex px-4"
                type="button"
            >
                <div className='flex items-center pr-2'>
                    <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                        {value.avatar}
                    </span>
                    <span className="text-gray-500 ml-3">{value.email}</span>
                </div>
            </button>

            {isOpen && (
                <div ref={dropdownRef}
                    id="dropdownSearch"
                    className="z-50 absolute bg-white rounded-lg shadow overflow-hidden"
                    style={{ width: `${dropdownWidth}px` }}
                >
                    <div className="">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400 m-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="input-group-search"
                                className="block w-full ps-10 text-sm text-gray-900 rounded-b-lg border-0 border-b-2 border-gray-300 "
                                placeholder="Search user"
                            />
                        </div>
                    </div>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        {/* Example list items */}
                        <li className='space-y-2'>
                            {userList.map((user)=>
                                <div key={user.id} className='flex items-center pr-2 mt-2'>
                                <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                                    {user.avatar}
                                </span>
                                <span className="text-gray-500 ml-3 ">{user.email}</span>
                            </div>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserSearchDropDown;
