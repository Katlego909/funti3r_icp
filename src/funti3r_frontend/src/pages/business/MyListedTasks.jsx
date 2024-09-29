import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';
import { FaExclamationTriangle, FaTasks, FaPlus } from 'react-icons/fa';

const MyListedTasks = () => {
  const { isAuthenticated, fetchTaskByOwner } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTaskByOwner()
        .then((fetchedTasks) => {
          console.log(fetchedTasks)
          setTasks(fetchedTasks || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching tasks:', err);
          setError('Failed to fetch tasks.');
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen bg-purple-50 p-4 sm:p-6">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 text-white py-10 sm:py-16 px-4 sm:px-8 rounded-lg mb-8 overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-40">
          <img src="/static/assets/images/banner.jpg" alt="Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">Manage Your Tasks Efficiently</h1>
          <p className="text-md sm:text-lg mb-4">Organize, track, and manage your tasks seamlessly.</p>
          <p className="text-sm sm:text-md">Get a clear view of your listed tasks and their statuses in one place.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-800 mb-6">My Listed Tasks</h2>

        {loading && <p className="text-gray-500 flex items-center"><FaPlus className="mr-2" />Loading...</p>}
        {error && <p className="text-red-600 mb-4 flex items-center"><FaExclamationTriangle className="mr-2" />{error}</p>}

        {!loading && tasks.length === 0 && (
          <p className="text-gray-500 flex items-center"><FaTasks className="mr-2" />No tasks available</p>
        )}

        <ul className="space-y-6 w-full max-w-2xl sm:max-w-4xl">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="p-4 sm:p-6 border border-purple-200 rounded-lg shadow-lg bg-white flex flex-col sm:flex-row items-start sm:items-center"
            >
              <img 
                src={task.image || '/static/assets/images/default-task.jpg'} 
                alt={task.category} 
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-4 sm:mb-0 mr-0 sm:mr-6" 
              />
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-purple-700 mb-2">{task.category}</h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4">{task.description}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Price: <span className="font-semibold text-purple-600">{task.price}</span> | Status: {task.completed ? 'Completed' : 'Pending'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyListedTasks;
