// src/components/ProBanner.js
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const ProBanner = () => {
  return (
    <Card style={{ backgroundColor: '#ff0000', color: '#fff' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Funti3r Pro</Typography>
          <Typography>Get access to all features</Typography>
          <Button variant="contained" color="primary">Get Pro</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProBanner;
