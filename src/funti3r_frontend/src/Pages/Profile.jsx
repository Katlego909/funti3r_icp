import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent, CardMedia, CardActions, Grid } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

// I create a demo user object with profile details, enrolled courses, tasks, and completed tasks.
// This data will be dynamically populated in a real application.
const user = {
  id: 1,
  name: 'User Name',
  email: 'User Email',
  profilePicture: '/images/profilePicture.jpg',
  bio: 'User Bio.',
  enrolledCourses: [
    { id: 1, title: 'React Basics', description: 'Learn the fundamentals of React.' },
    { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript ES6+ features.' }
  ],
  tasks: [
    { id: 1, title: 'Task 1', shortDescription: 'Complete the survey', category: 'Surveys', imageUrl: '/images/Course1.png' },
    { id: 2, title: 'Task 2', shortDescription: 'Write a blog post', category: 'Writing', imageUrl: '/images/Course2.png' }
  ],
  completedTasks: [
    { id: 3, title: 'Task 3', shortDescription: 'Create a logo design', category: 'Design', imageUrl: '/images/Course3.png' }
  ]
};

function Profile() {
  return (
    <Box display="flex" >
    
      <Sidebar />
      <Box flexGrow={1}>
       
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
            {/* Profile Picture and Info */}
            <Box display="flex" alignItems="center" mb={3}>
              <Box 
                sx={{ 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  border: '5px solid #ccc', 
                  marginRight: 3 
                }}>
                <img 
                  src={user.profilePicture || 'default-profile-pic.png'} // Default image if user hasn't uploaded one
                  alt="Profile"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
              <Box>
                <Typography variant="h4" component="div">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  {user.bio || 'No bio available'}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Update Profile
                </Button>
              </Box>
            </Box>

            {/* Enrolled Courses Section */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Enrolled Courses
              </Typography>
              {user.enrolledCourses.map(course => (
                <Card key={course.id} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* My Tasks Section */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                My Tasks
              </Typography>
              <Grid container spacing={2}>
                {user.tasks.map(task => (
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
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Completed Tasks Section */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Completed Tasks
              </Typography>
              <Grid container spacing={2}>
                {user.completedTasks.map(task => (
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
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
