import React, { useEffect, useState } from 'react';
import { useAuth } from '../use-auth-client';
import UserSidebar from './UserSidebar'; // Ensure this is the correct import

const UserDashboard = () => {
  const { userProfile, fetchUserProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set to true to open the sidebar by default

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile();
    };

    fetchProfile();
  }, [fetchUserProfile]);

  // Toggles the sidebar open/closed state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Adjusts the margin of the main content based on the sidebar's open state
  const mainContentStyle = {
    ...styles.mainContent,
    marginLeft: isSidebarOpen ? '250px' : '0px', // Dynamically change margin based on sidebar state
    transition: 'margin-left 0.3s ease', // Smooth transition effect
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Render sidebar if it's open */}
      {isSidebarOpen && <UserSidebar />}

      {/* Main content area */}
      <div style={mainContentStyle}>
        <header style={styles.header}>
          {/* Menu icon to toggle the sidebar */}
          <div style={styles.menuIcon} onClick={toggleSidebar}>
            <span>
              <i className="fa fa-bars" style={{ fontSize: '28px' }}></i>
            </span>
          </div>
          <div style={styles.headerTitle}>
            <h1 style={styles.headerName}>Welcome</h1>
            <h2 style={styles.userName}>{userProfile?.name || 'Loading...'}</h2>
          </div>
        </header>

        {/* Main dashboard content */}
        <main style={styles.dashboardContent}>
          {userProfile ? (
            <div style={styles.profileDetails}>
              <h2 style={styles.profileName}>{userProfile.name}</h2>
              <div style={styles.profileInfo}>
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userProfile.phone}
                </p>
                <p>
                  <strong>Location:</strong> {userProfile.location}
                </p>
                <p>
                  <strong>Description:</strong> {userProfile.description}
                </p>
              </div>
            </div>
          ) : (
            <p style={styles.loadingText}>Loading user profile...</p>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff', // White background
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    color: '#4a004e', // Dark purple text color
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '20px',
    backgroundColor: '#4a004e', // Dark purple background for header
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffffff', // White text color for header title
  },
  headerName: {
    fontSize: '1.8rem',
    marginBottom: '5px',
  },
  userName: {
    fontSize: '1.3rem',
    color: '#ffa500', // Orange color for username
  },
  dashboardContent: {
    backgroundColor: '#ffffff', // White background
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  profileDetails: {
    padding: '20px',
  },
  profileName: {
    fontSize: '2.2rem',
    marginBottom: '15px',
  },
  profileInfo: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#4a004e', // Dark purple text color
  },
};

export default UserDashboard;