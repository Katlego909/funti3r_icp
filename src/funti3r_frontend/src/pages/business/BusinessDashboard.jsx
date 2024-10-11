import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBell, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/feature1.jpg';
import { useAuth } from '../../authentication/use-auth-client'; // Import the auth hook

const BusinessDashboard = () => {
  const { businessProfile, fetchBusinessProfile } = useAuth(); // Fetch the business profile
  const totalTasks = 0;
  const pendingApplications = 0;
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchBusinessProfile();
      if (businessProfile) {
        setBusinessName(businessProfile.name); // Set the business name
      }
    };
    fetchProfile();
  }, [fetchBusinessProfile, businessProfile]);

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
            Welcome to Your {businessName ? businessName : 'Business'} Dashboard
          </Typography>
          <Typography variant="body1">
            Manage tasks, view notifications, and more.
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
                  <FontAwesomeIcon icon={faTasks} className="mr-2" />
                  Total Tasks
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

          {/* Pending Applications Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card" style={{ backgroundColor: 'white', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  Pending Applications
                </Typography>
                <Typography variant="h2" className="font-bold">
                  {pendingApplications}
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
                  Review Applications
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Notifications Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card" style={{ backgroundColor: 'white', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Notifications
                </Typography>
                <Typography variant="h2" className="font-bold">
                  0
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

export default BusinessDashboard;
