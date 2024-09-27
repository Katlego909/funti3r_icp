import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faCogs, faSignOutAlt, faTasks, faStickyNote, faList, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button for mobile devices */}
      <button
        className="sm:hidden p-3 text-purple-800 fixed top-0 left-0 z-20"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-white h-screen shadow-lg overflow-y-auto border-r border-gray-400 fixed top-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0`}>
        <div className="flex items-center justify-between p-5 mb-2 bg-white">
          <div className="flex items-center gap-2 mt-3 text-lg font-bold text-purple-800">
            <span>Funti3r</span>
            <img src={Logo} alt="Logo" className="h-8" />
          </div>
        </div>
        <div className="flex flex-col px-5">
          <div className="text-xs my-2 text-black">Business Navigation</div>
          <ul className="list-none p-0">
            <li className="my-4">
              <Link to="/business/dashboard" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faTachometerAlt} className="text-purple-800 text-lg" /> Dashboard
              </Link>
            </li>
            <li className="my-4">
              <Link to="/business/profile" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faBriefcase} className="text-purple-800 text-lg" /> Business Profile
              </Link>
            </li>
            <li className="my-4">
              <Link to="/business/create-task" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faTasks} className="text-purple-800 text-lg" /> Create Task
              </Link>
            </li>
            <li className="my-4">
              <Link to="/business/my-listed-tasks" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faList} className="text-purple-800 text-lg" /> My Listed Tasks
              </Link>
            </li>
            <li className="my-4">
              <Link to="/business/notes" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faStickyNote} className="text-purple-800 text-lg" /> Notes
              </Link>
            </li>
            <li className="my-4">
              <Link to="/business/settings" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faCogs} className="text-purple-800 text-lg" /> Settings
              </Link>
            </li>
            <li className="my-4">
              <Link to="/other/logout" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-black rounded-md hover:bg-gray-100 hover:text-purple-800 transition-all">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-purple-800 text-lg" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-black opacity-50 z-0" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
