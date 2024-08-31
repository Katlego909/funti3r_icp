import React, { useEffect, useState } from 'react';
import { funti3r_backend } from 'declarations/funti3r_backend';
import '../App.css';
import UserSidebar from './UserSidebar';

const TaskMarketplace = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await funti3r_backend.getAllListedTasks();
        setTasks(taskList);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="main-container">
      <div className="sidebar">
        <UserSidebar />
      </div>
      <div className="content">
        <h1 className="main-title">All Listed Tasks</h1>
        {tasks.length === 0 ? (
          <div>No tasks available</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <h2 className="task-title">{task.title}</h2>
                <p className="task-description">{task.description}</p>
                <p className="task-details">Price: {task.price}</p>
                <p className="task-details">Posted Date: {task.postedDate}</p>
                <p className="task-details">Expected Completion Date: {task.expectedCompletionDate}</p>
                <p className="task-details">Category: {task.category}</p>
                <p className="task-details">Completion Status: {task.completionStatus}%</p>
                <p className="task-details">In Progress: {task.inProgress ? 'Yes' : 'No'}</p>
                <p className="task-details">Completed: {task.completed ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskMarketplace;
