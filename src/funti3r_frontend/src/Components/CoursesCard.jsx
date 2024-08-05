// src/components/CoursesCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CoursesCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Enrolled Courses</Typography>
        <Typography color="textSecondary">Course completion Rate</Typography>
        <Box mt={16}>
          <Typography style={{ color: 'green' }}>COMPLETED</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoursesCard;
