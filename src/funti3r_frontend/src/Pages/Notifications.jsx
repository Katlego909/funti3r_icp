import React, { useState } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Tooltip, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

// I define a list of notifications that will be displayed. Each notification has an ID, a message, and a read status. This is just demo data for demonstration.
const notifications = [
  { id: 1, message: 'Your task "Complete the survey" has been approved.', read: false },
  { id: 2, message: 'You have a new comment on your blog post.', read: true },
  { id: 3, message: 'Your course "React Basics" is about to start tomorrow.', read: false },
  { id: 4, message: 'Congratulations! You completed the "Logo Design" task.', read: true }
];

function Notifications() {
  // useState to keep track of the list of notifications.
  const [notificationList, setNotificationList] = useState(notifications);

  // This function marks a notification as read based on its ID.
  const handleMarkAsRead = (id) => {
    // Updating the list by setting the read status of the selected notification to true.
    setNotificationList(notificationList.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // This function deletes a notification based on its ID.
  const handleDeleteNotification = (id) => {
    // I filter out the notification with the given ID to remove it from the list.
    setNotificationList(notificationList.filter(notification => notification.id !== id));
  };

  return (
    <Box display="flex" >
    
      <Sidebar />
      <Box flexGrow={1}>
       
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
           
            <Typography variant="h4" component="div" gutterBottom>
              Notifications
            </Typography>
            {/* I use a List to display each notification. */}
            <List>
              {notificationList.map(notification => (
                <ListItem
                  key={notification.id}
                  divider
                  // I set the background color based on whether the notification has been read.
                  sx={{ backgroundColor: notification.read ? 'white' : '#f5f5f5' }}
                >
                  <ListItemText
                    primary={notification.message}
                    // Here i am changing the text color depending on whether the notification has been read.
                    primaryTypographyProps={{ color: notification.read ? 'text.secondary' : 'text.primary' }}
                  />
                  {/* This section contains the action buttons for each notification. */}
                  <ListItemSecondaryAction>
                    {/* If the notification has not been read, I provide an option to mark it as read with a tick. */}
                    {!notification.read && (
                      <Tooltip title="Mark as read">
                        <IconButton edge="end" aria-label="mark as read" onClick={() => handleMarkAsRead(notification.id)}>
                          <DoneIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {/* I always provide an option to delete the notification. */}
                    <Tooltip title="Delete">
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(notification.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Notifications;
