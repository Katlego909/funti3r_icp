import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBell, faUserCheck } from '@fortawesome/free-solid-svg-icons'; // Import the new icon
import backgroundImage from '../../assets/feature3.jpg'; // Use a relevant background image
import { useAuth } from '../../authentication/use-auth-client';

const UserDashboard = () => {
  const { userProfile, fetchUserProfile } = useAuth(); // Fetch the user profile
  const [totalTasks, setTotalTasks] = useState(0); // Replace with actual task count
  const [pendingNotifications, setPendingNotifications] = useState(0); // Replace with actual notification count
  const [profileCompletion, setProfileCompletion] = useState(0); // New state for profile completion
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile();
      if (userProfile) {
        setUserName(userProfile.name); // Set the user name
        // Here, you can fetch tasks and notifications if needed
        setProfileCompletion(userProfile.completion || 0); // Assuming you have a completion percentage in the profile
      }
    };

    fetchProfile();
  }, [fetchUserProfile, userProfile]);

  return (
    <div className="dashboard-container">
      {/* Section with background image and blur */}
      <div className="background-section">
        <div className="content">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            style={{ fontWeight: 'bold' }}
          >
            Welcome to Your Dashboard, {userName || 'User'} 
          </Typography>
          <Typography variant="body1">
            Manage your tasks, view notifications, and stay updated.
          </Typography>
        </div>
      </div>

      <div className="p-6">
        <Grid container spacing={4} className="mt-4">
          {/* Total Tasks Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card" style={{ backgroundColor: 'white', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <FontAwesomeIcon icon={faTasks} style={{ marginRight: '8px' }} />
                  Completed Tasks
                </Typography>
                <Typography variant="h2" className="font-bold">
                  {totalTasks}
                </Typography>
                <Button
                  variant="contained"
                  className="mt-3"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  View Tasks
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Notifications Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card" style={{ backgroundColor: 'white', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <FontAwesomeIcon icon={faBell} style={{ marginRight: '8px' }} />
                  Pending Applications
                </Typography>
                <Typography variant="h2" className="font-bold">
                  {pendingNotifications}
                </Typography>
                <Button
                  variant="contained"
                  className="mt-3"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  View Notifications
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Completion Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card" style={{ backgroundColor: 'white', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <FontAwesomeIcon icon={faUserCheck} style={{ marginRight: '8px' }} />
                  Profile Completion
                </Typography>
                <Typography variant="h2" className="font-bold">
                  {profileCompletion}%
                </Typography>
                <Button
                  variant="contained"
                  className="mt-3"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Hover Effect Styles */}
      <style>
        {`
          .background-section {
            position: relative;
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: black;
          }

          .background-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: inherit;
            background-size: inherit;
            background-position: inherit;
            filter: blur(10px); /* Apply blur only to the background */
            z-index: 1;
          }

          .content {
            position: relative;
            z-index: 2; /* Bring text above the blur */
            color: white;
          }

          .dashboard-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default UserDashboard;
