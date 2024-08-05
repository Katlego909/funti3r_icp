import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
//Return tasks created by the person calling this method
const TasksByOwner = ({ funti3r_backend }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const result = await funti3r_backend.getTasksByOwner();
                setTasks(result);
            } catch (error) {
                console.error('Failed to fetch tasks by owner', error);
            }
        };
        fetchTasks();
    }, [funti3r_backend]);

    return (
        <Box display="flex" >
            <Sidebar />
            <Box flexGrow={1}>
                <Header />
                <Container>
                    <Box padding={3}>
                        <Typography variant="h4" gutterBottom>
                            My Listed Tasks
                        </Typography>
                        <List>
                            {tasks.length > 0 ? (
                                tasks.map(task => (
                                    <ListItem key={task.taskId}>
                                        <ListItemText
                                            primary={task.description}
                                            secondary={`Price: ${task.price}, Posted Date: ${task.postedDate}, Expected Completion Date: ${task.expectedCompletionDate}, Category: ${task.category}`}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body1">You have not listed any tasks yet.</Typography>
                            )}
                        </List>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default TasksByOwner;
