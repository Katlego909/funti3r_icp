import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import DashboardHeader from '../Components/DashboardHeader';
import TaskCard from '../Components/TaskCard';
import EarningsCard from '../Components/EarningsCard';
import CoursesCard from '../Components/CoursesCard';
import ProBanner from '../Components/ProBanner';

// This is the main functional component for the Dashboard page.
const DashboardPage = () => {
  return (
    <Box display="flex">
      {/* Sidebar component */}
      <Sidebar />
      <Box
        flexGrow={1}
        padding={3}
        sx={{ marginLeft: '248px' }} // Adjust this value based on the sidebar width
      >
        {/* Header component */}
        <Header />
        {/* The DashboardHeader component is included here to show the header or top section of the dashboard. */}
        <DashboardHeader />
        <Container>
          {/* Grid container is used here to organize the layout into a responsive grid system */}
          <Grid container spacing={4}>
            {/* I place the TaskCard component in a grid item that takes up 4 columns on medium screens and full width on smaller screens */}
            <Grid item xs={12} md={4}>
              <TaskCard />
            </Grid>
            {/* I place the EarningsCard component in another grid item with similar responsive behavior */}
            <Grid item xs={12} md={4}>
              <EarningsCard />
            </Grid>
            {/* The CoursesCard component is placed in a third grid item with the same responsive layout */}
            <Grid item xs={12} md={4}>
              <CoursesCard />
            </Grid>
            {/* Lastly, I include the ProBanner component, which spans the full width of the container */}
            <Grid item xs={12}>
              <ProBanner />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
