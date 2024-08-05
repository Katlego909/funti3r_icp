import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';

function TasksCard({ title, description, reward, imageUrl, viewMoreLink }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" component="div">
          Reward: {reward}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Accept Task
        </Button>
        <Link href={viewMoreLink} target="_blank" rel="noopener" style={{ display: 'block', marginTop: '10px' }}>
          View More
        </Link>
      </CardContent>
    </Card>
  );
}

export default TasksCard;
