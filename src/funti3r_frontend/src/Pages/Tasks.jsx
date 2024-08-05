import React, { useState } from 'react';
import { Container, Grid, Box, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

// I have a list of tasks here for demonstration(demo data)
const tasks = [
  {
    id: 1,
    title: 'Task 1',
    shortDescription: 'Complete the survey',
    category: 'Surveys',
    imageUrl: '/images/Course1.png',
    companyLogo: '/images/companyLogo1.jpg',
    createdBy: 'user1'
  },
  {
    id: 2,
    title: 'Task 2',
    shortDescription: 'Write a blog post',
    category: 'Writing',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo2.jpg',
    createdBy: 'user2'
  },
  {
    id: 3,
    title: 'Task 3',
    shortDescription: 'Create a logo design',
    category: 'Design',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo3.jpg',
    createdBy: 'user3'
  },
  {
    id: 4,
    title: 'Task 4',
    shortDescription: 'Develop a website',
    category: 'Development',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo4.jpg',
    createdBy: 'user4'
  },
  {
    id: 5,
    title: 'Task 5',
    shortDescription: 'Test mobile application',
    category: 'Testing',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo5.jpg',
    createdBy: 'user5'
  },
  {
    id: 6,
    title: 'Task 6',
    shortDescription: 'Write a marketing plan',
    category: 'Marketing',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo6.jpg',
    createdBy: 'user6'
  },
  {
    id: 7,
    title: 'Task 7',
    shortDescription: 'Create a video tutorial',
    category: 'Video Production',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo7.jpg',
    createdBy: 'user7'
  },
  {
    id: 8,
    title: 'Task 8',
    shortDescription: 'Set up social media profiles',
    category: 'Social Media',
    imageUrl:  '/images/Course1.png',
    companyLogo: '/images/companyLogo8.jpg',
    createdBy: 'user8'
  },
];

function Tasks() {
  // I use state to manage the search term
  const [searchTerm, setSearchTerm] = useState('');

 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // This function handles the search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
  
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
         
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" component="div" gutterBottom>
                Recent Tasks
              </Typography>
              <Button variant="contained" color="primary" href="/course-list">
                Funtier Academy
              </Button>
            </Box>

            {/* Search form for tasks, im not sure if its neccesary */}
            <Box mb={3}>
              <form id="search-form" onSubmit={handleSearchSubmit}>
                <TextField
                  label="Search Short Description"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search for your task"
                />
                <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 10 }}>
                  Search
                </Button>
              </form>
            </Box>

            {/* Display tasks based on the search criteria */}
            <Grid container spacing={2}>
              {tasks.filter(task => task.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())).map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={task.title}
                      height="140"
                      image={task.imageUrl}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.shortDescription.length > 50 ? `${task.shortDescription.slice(0, 50)}...` : task.shortDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" href={`/task-detail/${task.id}`}>
                        View More
                      </Button>
                      <Button size="small" color="secondary">
                        {task.createdBy === 'currentUser' ? 'Edit' : 'Add to Favorites'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination controls */}
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button variant="outlined" style={{ margin: 5 }}>
                First
              </Button>
              <Button variant="outlined" style={{ margin: 5 }}>
                Prev
              </Button>
              <Typography variant="body2" style={{ margin: 5 }}>
                Page 1 of 1
              </Typography>
              <Button variant="outlined" style={{ margin: 5 }}>
                Next
              </Button>
              <Button variant="outlined" style={{ margin: 5 }}>
                Last
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Tasks;
