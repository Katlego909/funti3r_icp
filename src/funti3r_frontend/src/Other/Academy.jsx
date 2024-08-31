import React from 'react';
import { Container, Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import '../App.css'; 
import UserSidebar from './UserSidebar'; 

const courses = [
  {
    id: 1,
    title: 'Course 1',
    description: 'Learn the basics of programming',
    imageUrl: '/images/Course1.png',
    enrollLink: 'https://example.com/enroll-course1'
  },
  {
    id: 2,
    title: 'Course 2',
    description: 'Advanced topics in web development',
    imageUrl: '/images/Course2.png',
    enrollLink: 'https://example.com/enroll-course2'
  },
  {
    id: 3,
    title: 'Course 3',
    description: 'Introduction to data science',
    imageUrl: '/images/Course3.png',
    enrollLink: 'https://example.com/enroll-course3'
  },
  {
    id: 4,
    title: 'Course 4',
    description: 'Mastering machine learning',
    imageUrl: '/images/Course4.png',
    enrollLink: 'https://example.com/enroll-course4'
  },
];

// Main functional component for the Academy page
function Academy() {
  return (
    <Box display="flex">
      <UserSidebar />
      <Box padding={2} flexGrow={1}>
        <Container>
          <Typography variant="h4" component="div" gutterBottom>
            Academy
          </Typography>
          {/* Display courses */}
          <Box display="flex" flexDirection="column" gap={2}>
            {courses.map(course => (
              <Card key={course.id} sx={{ display: 'flex', mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 240, height: 160 }}  // Adjust width and height here
                  image={course.imageUrl}
                  alt={course.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                    <Button
                      size="small"
                      color="primary"
                      href={course.enrollLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll Now
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Academy;
