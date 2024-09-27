import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEnvelope, faBell, faUserCircle, faDashboard } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const openSidebar = () => {
    // Add your openSidebar function logic here
  };

  return (
    <header className="bg-violet-800 shadow-lg w-full px-4 py-3 md:px-6 md:py-4 flex items-center justify-between text-white">
      {/* Logo Section */}
      <div className="menu-icon cursor-pointer" onClick={openSidebar}>
        <span>
          <FontAwesomeIcon icon={faDashboard} className="text-2xl" />
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-2 md:mx-4 hidden sm:flex">
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-2 pl-10 pr-4 bg-violet-900 rounded-full text-xs md:text-sm text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {/* Notification and Profile Section */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <span className="text-sm md:text-base">
          <a href="#" className="hover:text-violet-300">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </span>
        <span className="text-sm md:text-base">
          <a href="notifications.html" className="hover:text-violet-300">
            <FontAwesomeIcon icon={faBell} />
          </a>
        </span>

        {/* User Profile Dropdown */}
        <span className="text-sm md:text-base">
          <div className="dropdown">
            <details className="relative">
              <summary className="flex items-center cursor-pointer">
                <FontAwesomeIcon icon={faUserCircle} className="mr-1 text-xl md:text-2xl" /> User
              </summary>
              <ul className="absolute right-0 mt-2 bg-white text-violet-800 w-48 shadow-lg rounded-md text-sm">
                <li className="px-4 py-2 font-bold border-b border-gray-200">
                  User Name
                  <p className="text-xs font-normal">Account Type</p>
                </li>
                <li className="px-4 py-2 border-t border-gray-200 hover:bg-violet-100">
                  <a href="profile.html">Profile</a>
                </li>
                <li className="px-4 py-2 hover:bg-violet-100">
                  <details>
                    <summary>Settings</summary>
                    <ul className="ml-4">
                      <li className="py-1 hover:text-violet-600 text-xs"><a href="edit_profile.html">Edit Profile</a></li>
                      <li className="py-1 hover:text-violet-600 text-xs">Change password</li>
                    </ul>
                  </details>
                </li>
                <li className="px-4 py-2 hover:bg-violet-100 text-xs"><a href="help.html">Help</a></li>
                <li className="px-4 py-2 hover:bg-violet-100 text-xs"><a href="logout.html">Logout</a></li>
              </ul>
            </details>
          </div>
        </span>
      </div>
    </header>
  );
};

export default Header;
