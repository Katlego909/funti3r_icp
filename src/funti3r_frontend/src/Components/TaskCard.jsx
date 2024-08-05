// src/components/TaskCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const TaskCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">All Tasks</Typography>
        <Typography color="textSecondary">Task completion Rate</Typography>
        <Box mt={16}>
          <Typography>Task Done: <span style={{ color: 'green' }}>COMPLETED</span></Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
