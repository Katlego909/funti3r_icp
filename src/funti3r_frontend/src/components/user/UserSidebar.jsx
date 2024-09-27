import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faCogs, faSignOutAlt, faStickyNote, faList, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.svg'

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-purple-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed lg:static lg:w-64 bg-white h-screen shadow-md border-r border-gray-300 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-5 mb-2 bg-white">
          <div className="flex items-center gap-3 text-2xl font-bold mt-4">
            <span className="text-purple-800">Funti3r</span>
            <img src={Logo} alt="Logo" className="h-10" />
          </div>
        </div>
        <div className="flex flex-col p-5">
          <div className="text-sm my-2 text-black">User Navigation</div>
          <ul className="list-none p-0">
            <li className="my-4">
              <Link to="/user/dashboard" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faTachometerAlt} className="text-purple-800 text-lg" /> Dashboard
              </Link>
            </li>
            <li className="my-4">
              <Link to="/user/task-marketplace" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faList} className="text-purple-800 text-lg" /> Task Marketplace
              </Link>
            </li>
            <li className="my-4">
              <Link to="/user/academy" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faBriefcase} className="text-purple-800 text-lg" /> Academy
              </Link>
            </li>
            <li className="my-4">
              <Link to="/user/notes" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faStickyNote} className="text-purple-800 text-lg" /> Notes
              </Link>
            </li>
            <li className="my-4">
              <Link to="/user/profile" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faBriefcase} className="text-purple-800 text-lg" /> User Profile
              </Link>
            </li>
            <li className="my-4">
              <Link to="/user/settings" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faCogs} className="text-purple-800 text-lg" /> Settings
              </Link>
            </li>
            <li className="my-4">
              <Link to="/other/logout" className="flex items-center gap-4 p-3 text-black text-base font-medium hover:bg-purple-100 rounded transition-all">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-purple-800 text-lg" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile when Sidebar is open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default UserSidebar;
