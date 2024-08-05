import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const CreateProfile = ({ funti3r_backend }) => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        qualifications: '',
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
            await funti3r_backend.createUserProfile(details);
            alert('User profile created successfully');
        } catch (error) {
            console.error('Failed to create user profile', error);
        }
    };

    return (
        <Container>
            <Header />
            <Box display="flex"  >
                <Sidebar />
                <Box flex={1} p={3} >
                    <Typography variant="h4" gutterBottom>
                        Create User Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Name"
                            name="name"
                            value={details.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={details.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Phone"
                            name="phone"
                            value={details.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Location"
                            name="location"
                            value={details.location}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Qualifications"
                            name="qualifications"
                            value={details.qualifications}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Socials"
                            name="socials"
                            value={details.socials}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Description"
                            name="description"
                            value={details.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Create Profile
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateProfile;
