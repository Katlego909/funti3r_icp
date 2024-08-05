// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import { Dashboard, Store, School, Note, AccountBox, AttachMoney, Settings, Upcoming } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box
      width={200}
      bgcolor="#f8f9fa"
      padding={2}
      height="100vh"
      position="fixed"
    >
      <Box display="flex" alignItems="center" mb={2}>
        <img src="/image.png" alt="Logo" style={{ height: 30, marginRight: 8 }} />
        <Typography variant="h6"></Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Store /></ListItemIcon>
          <ListItemText primary="List Task" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><Store /></ListItemIcon>
          <ListItemText primary="Task Marketplace" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="List Course" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="Academy" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Note /></ListItemIcon>
          <ListItemText primary="My Workspace" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Note /></ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccountBox /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="Ny Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AttachMoney /></ListItemIcon>
          <ListItemText primary="My Earnings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
       
      </List>
    </Box>
  );
};

export default Sidebar;
