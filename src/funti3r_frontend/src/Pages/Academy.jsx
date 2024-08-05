// src/Pages/Academy.jsx

import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import CourseCard from '../Components/CourseCard';

// Here I'm defining some sample course data that we'll display on the page.
const courses = [
  {
    id: 1,
    title: 'Course 1',
    description: 'Learn the basics of programming',
    imageUrl: 'Course1.png',
    enrollLink: 'https://example.com/enroll-course1'
  },
  {
    id: 2,
    title: 'Course 2',
    description: 'Advanced topics in web development',
    imageUrl: 'Course2.png',
    enrollLink: 'https://example.com/enroll-course2'
  },
  {
    id: 3,
    title: 'Course 3',
    description: 'Introduction to data science',
    imageUrl: 'Course3.png',
    enrollLink: 'https://example.com/enroll-course3'
  },
  {
    id: 4,
    title: 'Course 4',
    description: 'Mastering machine learning',
    imageUrl: 'Course4.png',
    enrollLink: 'https://example.com/enroll-course4'
  },
];

// This is the main functional component for the Academy page.
function Academy() {
  return (
    <Box display="flex">
      {/* The Sidebar component is included here, which provides navigation options. */}
      <Sidebar />
      
      <Box flexGrow={1}>
        {/* The Header component is included here to show the top navigation or title bar. */}
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
            {/* Displaying the main title for the Academy page */}
            <Typography variant="h4" component="div" gutterBottom>
              Academy
            </Typography>
            {/* Here I create a container to display a vertical list of courses */}
            <Box>
              {/* I map over the courses array to create a CourseCard for each course */}
              {courses.map(course => (
                <Box key={course.id} mb={2}>
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                    enrollLink={course.enrollLink}
                  />
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Academy;
