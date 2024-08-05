import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const ListTask = ({ funti3r_backend }) => {
    const [task, setTask] = useState({
        price: '',
        postedDate: '',
        expectedCompletionDate: '',
        category: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await funti3r_backend.listTask(task);
            alert('Task listed successfully');
        } catch (error) {
            console.error('Failed to list task', error);
        }
    };

    return (
        <Box display="flex" >
            <Sidebar />
            <Box flexGrow={1} padding={3}>
                <Header />
                <Container>
                    <Typography variant="h4" gutterBottom>
                        List a Task
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Price"
                            name="price"
                            type="text"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Posted Date"
                            name="postedDate"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Expected Completion Date"
                            name="expectedCompletionDate"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Category"
                            name="category"
                            type="text"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            type="text"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            List Task
                        </Button>
                    </form>
                </Container>
            </Box>
        </Box>
    );
};

export default ListTask;
