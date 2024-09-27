import React, { useEffect, useState } from 'react';
import { funti3r_backend } from 'declarations/funti3r_backend';

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
    return <div className="loading text-center text-lg p-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="main-container flex flex-col sm:flex-row sm:gap-6 p-4 sm:p-8">
      {/* Sidebar */}
      <div className="sidebar hidden sm:block sm:w-1/4 bg-gray-200 p-4 rounded-lg">
        {/* Add sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="content flex-grow sm:w-3/4">
        <h1 className="main-title text-2xl sm:text-3xl font-bold mb-6 text-gray-800">All Listed Tasks</h1>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks available</div>
        ) : (
          <ul className="task-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="task-item bg-white p-6 shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-all"
              >
                <h2 className="task-title text-xl font-semibold mb-2">{task.title}</h2>
                <p className="task-description text-gray-700 mb-2">{task.description}</p>
                <p className="task-details text-gray-600">Price: {task.price}</p>
                <p className="task-details text-gray-600">Posted Date: {task.postedDate}</p>
                <p className="task-details text-gray-600">Expected Completion Date: {task.expectedCompletionDate}</p>
                <p className="task-details text-gray-600">Category: {task.category}</p>
                <p className="task-details text-gray-600">Completion Status: {task.completionStatus}%</p>
                <p className="task-details text-gray-600">In Progress: {task.inProgress ? 'Yes' : 'No'}</p>
                <p className="task-details text-gray-600">Completed: {task.completed ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskMarketplace;
