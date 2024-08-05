// src/Components/CourseCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

// Import images from the image folder
import Course1 from '/images/Course1.png'; 
import Course2 from '/images/Course2.png';
import Course3 from '/images/Course3.png';
import Course4 from '/images/Course4.png';

function CourseCard({ title, description, imageUrl, enrollLink }) {
 
  const imageMap = {
    'Course1.png': Course1,
    'Course2.png': Course2,
    'Course3.png': Course3,
    'Course4.png': Course4,
  };

  const imageSrc = imageMap[imageUrl] || imageUrl; // incase url is not found

  return (
    <Card>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={imageSrc}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={enrollLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 10 }}
        >
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
