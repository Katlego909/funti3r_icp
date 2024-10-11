import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faCogs, faSignOutAlt, faStickyNote, faList, faBars, faBell, faUserCircle, faEnvelope, faSearch, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.svg';

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing user data, tokens, etc.)
    // After logout, navigate to the login page
    navigate('/login'); // Redirect to Login page
  };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr]">
      {/* Sidebar Toggle Button for Mobile */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-purple-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-black h-screen shadow-lg overflow-y-hidden border-r border-gray-400 fixed top-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0`}>
        <div className="flex items-center justify-between p-5 mb-2 bg-black">
          <div className="flex items-center gap-2 text-3xl font-bold text-white">
            <span>Funti3r</span>
            <img src={Logo} alt="Logo" className="h-12" /> {/* Increased logo size */}
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-grow flex flex-col px-5">
            <div className="text-xl my-2 text-white font-bold">
              User Navigation
            </div>
            <ul className="list-none p-0 flex-grow">
              <li className="my-4">
                <Link
                  to="/user/dashboard"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/dashboard') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="text-white text-lg" /> Dashboard
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/user/task-marketplace"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/task-marketplace') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faList} className="text-white text-lg" /> Task Marketplace
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/user/academy"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/academy') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faBriefcase} className="text-white text-lg" /> Academy
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/user/notes"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/notes') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faStickyNote} className="text-white text-lg" /> Notes
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/user/profile"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/profile') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-white text-lg" /> User Profile
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/user/tasks" // Updated path for "My Tasks"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/user/tasks') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faClipboardList} className="text-white text-lg" /> My Tasks
                </Link>
              </li>
              {/* Logout button with handleLogout function */}
              <li className="my-4">
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all hover:bg-gray-700 hover:text-gray-200`}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-white text-lg" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Area including header */}
      <div className="flex flex-col flex-grow ml-64">
        {/* Shortened Header */}
        <header className="flex items-center justify-between w-full bg-black text-white py-4 px-6 fixed top-0 left-64 z-20 max-w-[calc(100%-16rem)]">
          {/* Search Bar */}
          <div className="flex-grow mx-2 md:mx-4 hidden sm:flex">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-4 bg-white rounded-full text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>

          {/* Notification and Profile Section */}
          <div className="ml-auto flex items-center gap-6">
            <Link to="/messages" className="text-sm md:text-base hover:text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </Link>
            <Link to="/notifications" className="text-sm md:text-base hover:text-gray-300">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </Link>

            {/* User Profile Dropdown */}
            <div className="dropdown">
              <details className="relative">
                <summary className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                </summary>
                <ul className="absolute right-0 mt-2 bg-white text-gray-800 w-48 shadow-lg rounded-md text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100"><Link to="/user/profile">Profile</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-100"><Link to="/user/settings">Settings</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</li>
                </ul>
              </details>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-grow mt-16 p-6 bg-gray-100">
          {/* Your content goes here */}
        </main>
      </div>
    </div>
  );
};

export default UserSidebar;
