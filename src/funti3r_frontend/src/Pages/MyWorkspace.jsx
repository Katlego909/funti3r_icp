import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent, CardMedia, CardActions, Grid } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

// I've created some demo data to use in this component.
const user = {
  id: 1,
  enrolledCourses: [
    { id: 1, title: 'React Basics', description: 'Learn the fundamentals of React.' },
    { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript ES6+ features.' }
  ],
  tasks: [
    { id: 1, title: 'Task 1', shortDescription: 'Complete the survey', category: 'Surveys', imageUrl: '/images/Course1.png' },
    { id: 2, title: 'Task 2', shortDescription: 'Write a blog post', category: 'Writing', imageUrl: '/images/Course2.png' }
  ],
  completedCourses: [
    { id: 3, title: 'Design Thinking', description: 'A comprehensive course on design principles.' }
  ],
  pendingTaskApplications: [
    { id: 4, title: 'Application for Task 3', status: 'Pending' },
    { id: 5, title: 'Application for Task 4', status: 'Pending' }
  ],
  pendingCourseApplications: [
    { id: 6, title: 'Application for React Advanced Course', status: 'Pending' },
    { id: 7, title: 'Application for Node.js Bootcamp', status: 'Pending' }
  ]
};

// This is the main component of my workspace.
function MyWorkspace() {
  return (
    <Box display="flex" >
     
      <Sidebar />
      <Box flexGrow={1}>
    
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
           
            <Typography variant="h4" component="div" gutterBottom>
              Welcome to Your Workspace
            </Typography>

            {/* Here, I am displaying the user's enrolled courses. */}
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

            {/* This section displays the tasks assigned to the user. */}
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
                        {/* Here, I provide buttons to view more details or edit the task. */}
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

            {/* This section shows the courses that the user has completed. */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Completed Courses
              </Typography>
              {user.completedCourses.map(course => (
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

            {/* This section lists all pending task applications that the user has. */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Pending Task Applications
              </Typography>
              {user.pendingTaskApplications.map(application => (
                <Card key={application.id} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {application.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {application.status}
                    </Typography>
                    <Button variant="contained" color="error" sx={{ mt: 2 }}>
                      Cancel Application
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* This section shows pending course applications. */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Pending Course Applications
              </Typography>
              {user.pendingCourseApplications.map(application => (
                <Card key={application.id} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {application.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {application.status}
                    </Typography>
                    <Button variant="contained" color="error" sx={{ mt: 2 }}>
                      Cancel Application
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default MyWorkspace;
