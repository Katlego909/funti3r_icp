// ProfileSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this file contains any global styles or imports

const ProfileSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (profileType) => {
    navigate(`/onboard/${profileType}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select Profile Type</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => handleSelect('user')} style={styles.button}>
          Create User Profile
        </button>
        <button onClick={() => handleSelect('business')} style={styles.button}>
          Create Business Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4', // Light background color
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4a004e', // Dark purple text color
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ffa500', // Orange color for buttons
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default ProfileSelection;
