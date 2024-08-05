import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardActions, Button, TextField, Modal, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import TransferIcon from '@mui/icons-material/TransferWithinAStation';
import WithdrawIcon from '@mui/icons-material/MonetizationOn';

const earningsData = [
  { month: 'January', earnings: 1200 },
  { month: 'February', earnings: 850 },
  { month: 'March', earnings: 950 },
  // More months will be added as the populate 
];

// Demo data of the completed tasks with their earnings
const completedTasks = [
  { id: 1, title: 'Task 1', earnings: 50 },
  { id: 2, title: 'Task 2', earnings: 75 },
  { id: 3, title: 'Task 3', earnings: 100 },
  // More tasks will be added as the populate
];

// Sample current balance
const currentBalance = 3000;

function MyEarnings() {
  
  const [openModal, setOpenModal] = useState(false);
  // Manage transaction type (Transfer or Withdraw)
  const [transactionType, setTransactionType] = useState('');
  // State to manage transaction amount
  const [amount, setAmount] = useState('');
  // State to manage selected month for filtering
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Function to open the modal with the specified transaction type
  const handleOpenModal = (type) => {
    setTransactionType(type);
    setOpenModal(true);
  };

  // Function to close the modal and reset amount
  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount('');
  };

  // Handle the transaction (Transfer/Withdraw)
  const handleTransaction = () => {
    // Add transaction handling logic here
    console.log(`${transactionType} ${amount}`);
    handleCloseModal();
  };

  // Handle month selection for filtering
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Here I am filtering the earnings based on the selected month
  const filteredEarnings = selectedMonth === 'All'
    ? earningsData
    : earningsData.filter(item => item.month === selectedMonth);

  return (
    <Box display="flex" padding={3}
    sx={{ marginLeft: '248px' }} >
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Box padding={2} marginLeft={30}>
          <Container>
            {/* Header with Balance and Buttons, i might change the design */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h4" component="div">
                My Earnings
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component="div" sx={{ marginRight: 2 }}>
                  Current Balance: R {currentBalance}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<TransferIcon />}
                  sx={{ marginRight: 1 }}
                  onClick={() => handleOpenModal('Transfer')}
                >
                  Transfer
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<WithdrawIcon />}
                  onClick={() => handleOpenModal('Withdraw')}
                >
                  Withdraw
                </Button>
              </Box>
            </Box>

           
            <Box mb={3} display="flex" justifyContent="flex-start">
              <FormControl sx={{ width: 150 }}>
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Month"
                >
                  <MenuItem value="All">All</MenuItem>
                  {earningsData.map((item) => (
                    <MenuItem key={item.month} value={item.month}>
                      {item.month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Earnings Per Month Section */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Earnings Per Month
              </Typography>
              {filteredEarnings.map((item, index) => (
                <Card key={index} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.month}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Earnings: R {item.earnings}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Completed Tasks Section */}
            <Box mb={5}>
              <Typography variant="h5" component="div" gutterBottom>
                Completed Tasks
              </Typography>
              {completedTasks.map(task => (
                <Card key={task.id} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {task.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Earnings: R {task.earnings}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Transfer/Withdraw */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography id="modal-title" variant="h6" component="h2">
                  {transactionType} Funds
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button variant="contained" color="primary" onClick={handleTransaction}>
                    {transactionType}
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default MyEarnings;
