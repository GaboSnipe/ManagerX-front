import React, { useEffect, useRef, useState } from 'react';
import UserService from '../services/UserService';

function UserSearchDropDown({ value, isEditing, formData, setFormData, qkey }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [userList, setUserList] = useState([]);
    const [dropdownWidth, setDropdownWidth] = useState('auto');

    const toggleDropdown = async () => {
        if (isEditing && !isOpen) {
            try {
                const response = await UserService.getUserList();
                setUserList(response.data);
            } catch (error) {
                console.error(error);
            }
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownWidth(buttonRef.current.clientWidth);
    }, [isOpen]);

    const changeUser = (user) => {
        setFormData(prevData => ({
            ...prevData,
            [qkey]: user.id
        }));
        setIsOpen(false);
    };

    return (
        <div>
            <button
                ref={buttonRef}
                id="dropdownSearchButton"
                onClick={toggleDropdown}
                className={`focus:outline-none ${isEditing && "focus:bg-gray-300"} font-medium rounded-t-lg text-center inline-flex px-4`}
                type="button"
            >
                <div className='flex items-center pr-2'>
                    <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                        {value.id}
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
                                className="block w-full ps-10 text-sm text-gray-900 rounded-b-lg border-0 border-b-2 border-gray-300"
                                placeholder="Search user"
                            />
                        </div>
                    </div>
                    <ul className="max-h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        {/* Example list items */}
                        {userList.map((user) => (
                            <li key={user.id} className='space-y-2'>
                                <div className='flex items-center pr-2 mt-2'>
                                    <button onClick={() => changeUser(user)} className='flex'>
                                        <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                                            {user.id}
                                        </span>
                                        <span className="text-gray-500 ml-3">{user.email}</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserSearchDropDown;
