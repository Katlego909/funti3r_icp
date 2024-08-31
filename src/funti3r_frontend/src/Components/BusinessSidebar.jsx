import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  active: {
    backgroundColor: '#FF7F50', 
    borderRadius: '4px',
  },
  inactive: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const menuItems = [
  { text: 'Business Profile', path: '/business-profile', icon: <i className="fa fa-building" /> },
  
  { text: 'List Task', path: '/list-task', icon: <i className="fa fa-list" /> },
  { text: 'Task By Owner', path: '/task-by-owner', icon: <i className="fa fa-user" /> },
];

const BusinessSidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <aside id="sidebar" className={isSidebarOpen ? 'open' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <span style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}>
            Funti3r
          </span>
        </div>
        <span>
          <img className="close" src="path/to/x.svg" onClick={closeSidebar} alt="Close Sidebar" />
        </span>
      </div>

      <nav>
        <ul className="navbar-links">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              style={({ isActive }) => ({
                ...styles.inactive,
                ...(isActive ? styles.active : {}),
              })}
              end
            >
              <li className="nav-link">
                <span>{item.icon} {item.text}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>

      <div className="upgrade">
        <h4>Upgrade to PRO</h4>
      </div>
    </aside>
  );
};

export default BusinessSidebar;
