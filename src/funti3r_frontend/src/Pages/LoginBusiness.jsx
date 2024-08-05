import React from 'react';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
//Not sure if page is neccesary
const LoginBusiness = ({ funti3r_backend }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await funti3r_backend.loginBusiness();
            alert('Business logged in successfully');
        } catch (error) {
            console.error('Failed to log in business', error);
            alert('Failed to log in business');
        }
    };

    return (
        <Box display="flex" >
            <Sidebar />
            <Box flexGrow={1}>
                <Header />
                <Container>
                    <Box padding={3}>
                        <Typography variant="h4" gutterBottom>
                            Login as Business
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box mb={2}>
                                <TextField
                                    label="Business Email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LoginBusiness;
