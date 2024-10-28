import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faCogs, faSignOutAlt, faTasks, faStickyNote, faList, faBell, faUserCircle, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../../authentication/use-auth-client';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Importing useNavigate
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing user data, tokens, etc.)
    // After logout, navigate to the login page
  
    logout()
      navigate('/'); // Redirect to Login page
  };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr]">
      {/* Sidebar */}
      <div className={`w-64 bg-funBlack h-screen shadow-lg overflow-y-hidden border-r border-gray-400 fixed top-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0`}>
        <div className="flex items-center justify-between p-5 mb-2 bg-funBlack">
          <div className="flex items-center gap-2 text-3xl font-bold text-white">
            <span>Funti3r</span>
            <img src={Logo} alt="Logo" className="h-12" /> 
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-grow flex flex-col px-5">
            <div className="text-xl my-2 text-white font-bold">
              Business Navigation
            </div>
            <ul className="list-none p-0 flex-grow">
              <li className="my-4">
                <Link
                  to="/business/dashboard"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/dashboard') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="text-white text-lg" /> Dashboard
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/business/profile"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/profile') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faBriefcase} className="text-white text-lg" /> Business Profile
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/business/create-task"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/create-task') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faTasks} className="text-white text-lg" /> Create Task
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/business/my-listed-tasks"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/my-listed-tasks') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faList} className="text-white text-lg" /> My Listed Tasks
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/business/notes"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/notes') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faStickyNote} className="text-white text-lg" /> Notes
                </Link>
              </li>
              <li className="my-4">
                <Link
                  to="/business/settings"
                  className={`flex items-center gap-3 px-5 py-3 text-base font-medium text-white rounded-md transition-all ${
                    isActive('/business/settings') ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={faCogs} className="text-white text-lg" /> Applications
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
                  <li className="px-4 py-2 font-bold border-b border-gray-200">
                    User Name
                    <p className="text-xs font-normal">Account Type</p>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <details>
                      <summary>Applications</summary>
                      <ul className="ml-4">
                        <li className="py-1 hover:text-gray-600 text-xs">
                          <Link to="/edit_profile">Edit Profile</Link>
                        </li>
                        <li className="py-1 hover:text-gray-600 text-xs">Change Password</li>
                      </ul>
                    </details>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 text-xs">
                    <Link to="/help">Help</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 text-xs">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;
