import React, { useEffect, useState } from 'react';
import { funti3r_backend } from 'declarations/funti3r_backend'; 
import '../App.css';
import UserSidebar from '../Other/UserSidebar';

const Dashboard = () => {
  const [allTasks, setAllTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await funti3r_backend.getAllListedTasks();
        const pending = tasks.filter(task => task.status === 'Pending').length;
        const balance = await funti3r_backend.getBalance();

        setAllTasks(tasks.length);
        setPendingTasks(pending);
        setEarnings(balance);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const styles = {
    mainContainer: {
      gridArea: 'main',
      overflowY: 'auto',
      background: '#f4f2ee',
      borderRadius: '5px',
      padding: '10px',
      scrollbarWidth: 'none',
      width: "100%",
      display: 'flex',
      flexDirection: 'column'
    },
    taskItems: {
      display: 'flex',
      flexDirection: 'row',
      // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    taskCard: {
      backgroundColor: '#fff',
      border: '0.2px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: 'var(--box-shadow)',
    },
    mainTitle: {
      display: 'flex',
      flexDirection: "column",
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    mainTitleH1: {
      fontSize: '24px',
    },
    btnSecondary: {
      background: 'var(--color-secondary)',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 15px',
      cursor: 'pointer',
    },
    overview: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    overviewCard: {
      background: '#fff',
      padding: '20px',
      border: '0.2px solid #ccc',
      borderRadius: '10px',
      boxShadow: 'var(--box-shadow)',
    },
    btnPrimary: {
      background: 'var(--color-primary)',
      color: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    dashboardContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#ffffff', // White background
    },
  };

    // Toggles the sidebar open/closed state
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div style={styles.dashboardContainer}>
    {/* Render sidebar if it's open */}
    {isSidebarOpen && <UserSidebar />}
    <main className="main-container" style={styles.mainContainer}>
      <div className="main-title" style={styles.mainTitle}>
        <h1 style={styles.mainTitleH1}>Dashboard</h1>
        <button className="btn-secondary" style={styles.btnSecondary}>Secondary Action</button>
      </div>

      <div className="task-items" style={styles.taskItems}>
        <div className="task-card" style={styles.taskCard}>
          <h3>All Tasks</h3>
          <h1>{allTasks}</h1>
          <hr />
          <p>Task Completion Rate</p>
        </div>

        <div className="task-card" style={styles.taskCard}>
          <h3>Pending Tasks</h3>
          <h1>{pendingTasks}</h1>
          <hr />
          <p>{pendingTasks} Tasks</p>
          <p>{pendingTasks} this week</p>
        </div>

        <div className="task-card" style={styles.taskCard}>
          <h3>My Earnings</h3>
          <h1>{earnings} ICP</h1>
          <hr />
          <p>Earnings Rate</p>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Dashboard;
