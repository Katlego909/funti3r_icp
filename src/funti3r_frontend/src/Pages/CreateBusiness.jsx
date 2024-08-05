import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const CreateBusiness = ({ funti3r_backend }) => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        socials: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await funti3r_backend.createBusinessProfile(details);
            alert('Business profile created successfully');
        } catch (error) {
            console.error('Failed to create business profile', error);
            alert('Failed to create business profile');
        }
    };

    return (
        <Container>
            <Header />
            <Box display="flex">
                <Sidebar />
                <Box flexGrow={1} p={3}>
                    <Typography variant="h4" gutterBottom>
                        Create Business Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={details.name}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={details.email}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={details.phone}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={details.location}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Socials"
                                name="socials"
                                value={details.socials}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={details.description}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Box>
                        <Button variant="contained" color="primary" type="submit">
                            Create Profile
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateBusiness;
