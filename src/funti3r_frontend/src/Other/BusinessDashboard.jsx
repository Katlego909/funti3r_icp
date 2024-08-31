import React, { useEffect } from 'react';
import { useAuth } from '../use-auth-client';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure the correct path to Sidebar

const BusinessDashboard = () => {
  const { businessProfile, fetchBusinessProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchBusinessProfile();
    };

    fetchProfile();
  }, [fetchBusinessProfile]);

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar /> {/* Sidebar included here */}

      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <h1 style={styles.headerName}>Welcome</h1>
            <h2 style={styles.userName}>{businessProfile?.name || 'Loading...'}</h2>
          
          </div>
        </header>

        <main style={styles.dashboardContent}>
          {businessProfile ? (
            <div style={styles.profileDetails}>
              <h2 style={styles.profileName}>{businessProfile.name}</h2>
              <div style={styles.profileInfo}>
                <p><strong>Email:</strong> {businessProfile.email}</p>
                <p><strong>Phone:</strong> {businessProfile.phone}</p>
                <p><strong>Location:</strong> {businessProfile.location}</p>
                <p><strong>Description:</strong> {businessProfile.description}</p>
              </div>

              <button onClick={() => navigate("/dashboard/business/mytasks")} style={styles.button}>
                Create Task
              </button>
            </div>
          ) : (
            <p style={styles.loadingText}>Loading Business profile...</p>
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
    marginLeft: '250px', // Same as the width of the sidebar
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
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ffa500', // Orange color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default BusinessDashboard;
