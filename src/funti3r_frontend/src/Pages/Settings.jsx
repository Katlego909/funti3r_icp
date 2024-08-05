import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Switch, FormControlLabel, Divider } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

function Settings() {
 // const [darkMode, setDarkMode] = useState(false); No longer neccesary
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileName, setProfileName] = useState('User Name');
  const [profileEmail, setProfileEmail] = useState('user@example.com');
  const [bio, setBio] = useState('User Bio');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

 

  const handleEmailNotificationsToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleSaveChanges = () => {
    // Save changes logic
    console.log('Changes saved');
  };

  const handleChangePassword = () => {
    // Handle password change logic
    console.log('Password changed');
  };

  return (
    <Box display="flex" >
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
            <Typography variant="h4" component="div" gutterBottom>
              Settings
            </Typography>

            {/* Profile Settings Section */}
            <Box mb={5}>
              <Typography variant="h6" component="div" gutterBottom>
                Profile Settings
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Box>

            <Divider />

            {/* Change Password Section */}
            <Box mt={3} mb={5}>
              <Typography variant="h6" component="div" gutterBottom>
                Change Password
              </Typography>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Box>

            <Divider />

            {/* Account Settings Section */}
            <Box mt={3} mb={5}>
              <Typography variant="h6" component="div" gutterBottom>
                Account Settings
              </Typography>
             
              <FormControlLabel
                control={<Switch checked={emailNotifications} onChange={handleEmailNotificationsToggle} />}
                label="Email Notifications"
              />
            </Box>

            {/* Save Changes Button */}
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
