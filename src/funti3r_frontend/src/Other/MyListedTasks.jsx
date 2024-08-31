import React, { useState, useEffect } from 'react';
import { useAuth } from '../use-auth-client';
import Sidebar from './Sidebar'; // Ensure the correct path to Sidebar
import '../App.css';

const MyListedTasks = () => {
  const { isAuthenticated, createTask, fetchTaskByOwner, principal, businessProfile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    taskId: 0,
    owner: principal,
    price: 0,
    postedDate: '',
    expectedCompletionDate: '',
    category: '',
    description: '',
    completed: false,
    completionStatus: 0.0,
    promisor: null,
    inProgress: false,
    promisors: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTaskByOwner()
        .then(fetchedTasks => setTasks(fetchedTasks || []))
        .catch(err => {
          console.error("Error fetching tasks:", err);
          setError("Failed to fetch tasks.");
        });
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const result = await createTask({
        ...taskDetails,
        price: BigInt(taskDetails.price),
      });

      if (result.Ok) {
        setTasks([...tasks, result.Ok]);
        setTaskDetails({
          taskId: 0,
          owner: principal,
          price: 0,
          postedDate: "",
          expectedCompletionDate: "",
          category: "",
          description: "",
          completed: false,
          completionStatus: 0.0,
          promisor: null,
          inProgress: false,
          promisors: [],
        });
        setError(null);
      } else {
        setError(result.Err);
      }
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task.");
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar /> {/* Sidebar included */}

      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <h1 style={styles.headerName}>Welcome</h1>
            <h2 style={styles.userName}>{businessProfile?.name || 'Loading...'}</h2>
          </div>
        </header>

        <div>
          <h2>Task Management</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleCreateTask}>
            <input
              type="number"
              name="price"
              value={taskDetails.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <input
              type="text"
              name="postedDate"
              value={taskDetails.postedDate}
              onChange={handleChange}
              placeholder="Posted Date (e.g., 29/08/2024)"
              required
            />
            <input
              type="text"
              name="expectedCompletionDate"
              value={taskDetails.expectedCompletionDate}
              onChange={handleChange}
              placeholder="Expected Completion Date (e.g., 31/08/2024)"
              required
            />
            <input
              type="text"
              name="category"
              value={taskDetails.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
            <textarea
              name="description"
              value={taskDetails.description}
              onChange={handleChange}
              placeholder="Task Description"
              required
            />
            <button type="submit">Create Task</button>
          </form>

          <h3>Listed Tasks</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.category}</strong> - {task.description}
                <br />
                Price: {task.price} | Status: {task.completed ? "Completed" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  mainContent: {
    flex: 1,
    marginLeft: '250px', // Same as the width of the sidebar
    padding: '20px',
    color: '#4a004e',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerName: {
    fontSize: '1.8rem',
    color: '#4a004e',
    marginBottom: '5px',
  },
  userName: {
    fontSize: '1.3rem',
    color: '#ffa500',
  },
};

export default MyListedTasks;
