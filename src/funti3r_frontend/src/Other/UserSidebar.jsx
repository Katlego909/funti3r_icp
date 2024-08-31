// UserSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faCogs, faSignOutAlt, faStickyNote, faList } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Ensure this file contains any global styles or imports
import Logo from '../assets/logo.svg'; // Import your SVG logo

const UserSidebar = () => {
  return (
    <div id="sidebar" style={styles.sidebar}>
      <div style={styles.sidebarTitle}>
        <div style={styles.sidebarBrand}>
          <span style={styles.sidebarBrandText}>Funti3r</span>
          <img src={Logo} alt="Logo" style={styles.logo} /> {/* Add SVG logo here */}
        </div>
      </div>
      <div className="navbar-links" style={styles.navbarLinks}>
        <div className="navbar-section" style={styles.navbarSection}>User Navigation</div>
        <ul style={styles.navList}>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/user" style={styles.navLink}>
              <FontAwesomeIcon icon={faTachometerAlt} style={styles.icon} /> Dashboard
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/task-marketplace" style={styles.navLink}>
              <FontAwesomeIcon icon={faList} style={styles.icon} /> Task Marketplace
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/academy" style={styles.navLink}>
              <FontAwesomeIcon icon={faBriefcase} style={styles.icon} /> Academy
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/notes" style={styles.navLink}>
              <FontAwesomeIcon icon={faStickyNote} style={styles.icon} /> Notes
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/user/profile" style={styles.navLink}>
              <FontAwesomeIcon icon={faBriefcase} style={styles.icon} /> User Profile
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/dashboard/settings" style={styles.navLink}>
              <FontAwesomeIcon icon={faCogs} style={styles.icon} /> Settings
            </Link>
          </li>
          <li className="sidebar-list-item" style={styles.navItem}>
            <Link to="/other/logout" style={styles.navLink}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px', // Fixed width for the sidebar
    backgroundColor: '#ffffff', // White background color
    height: '100vh', // Full height of the viewport
    boxShadow: '0 6px 7px -4px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    borderRight: '0.5px solid #6d6d6d', // Slight border for separation
    transition: 'all 0.5s',
    position: 'fixed', // Fixed position to keep it in place
    top: 0,
    left: 0,
  },
  sidebarTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    marginBottom: '10px',
    backgroundColor: '#ffffff', // White background color for header
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '30px',
    fontWeight: '700',
    marginTop: '15px',
  },
  sidebarBrandText: {
    color: '#4a004e', // Purple color for the brand text
  },
  logo: {
    height: '40px', // Adjust the size as needed
  },
  navbarLinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
  },
  navbarSection: {
    fontSize: '14px',
    margin: '10px 0',
    color: '#000000', // Black for section text
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    margin: '15px 0',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px 20px',
    color: '#000000', // Black text color for links
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease-in-out',
    borderRadius: '5px',
  },
  icon: {
    fontSize: '18px',
    color: '#4a004e', // Purple color for icons
  },
};

export default UserSidebar;
