// src/components/EarningsCard.js
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const EarningsCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">My Earnings</Typography>
        <Typography variant="h4" component="p">R0.00</Typography>
        <Box mt={12} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary">Withdraw</Button>
          <Button variant="contained" color="secondary">Transfer</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
