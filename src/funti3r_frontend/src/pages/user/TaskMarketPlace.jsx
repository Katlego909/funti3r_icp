import React, { useEffect, useState } from 'react';
import { funti3r_backend } from 'declarations/funti3r_backend';
import { FaExclamationTriangle, FaTasks, FaPlus } from 'react-icons/fa';
import backgroundImage from '../../assets/feature4.jpg'; // Ensure this is the correct path

const TaskMarketplace = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await funti3r_backend.getAllListedTasks();
        
        // Ensure taskList is an array
        if (Array.isArray(taskList)) {
          setTasks(taskList);
        } else {
          setTasks([]); // Set to an empty array if the response is not an array
          console.error('Unexpected response type:', taskList);
          setError('Unexpected response type from server.'); // Set a relevant error message
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top half with blurred background image */}
      <div
        className="relative w-full h-64 sm:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}
      >
        {/* Overlay to make the text readable */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Bottom half with tasks content */}
      <div className="p-4 sm:p-6 bg-white relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">All Listed Tasks</h2>

          {loading && (
            <p className="text-black flex items-center justify-center mt-4">
              <FaPlus className="mr-2" /> Loading...
            </p>
          )}
          {error && (
            <p className="text-red-600 mb-4 flex items-center justify-center">
              <FaExclamationTriangle className="mr-2" />
              {error}
            </p>
          )}
          {!loading && tasks.length === 0 && (
            <p className="text-black flex items-center justify-center">
              
            </p>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
              style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
                  {task.category || 'No Category'}
                </h3>
                <p className="text-black text-sm sm:text-base mb-4">
                  {task.description || 'No description provided.'}
                </p>
                <p className="text-black text-sm sm:text-base mb-2">
                  <strong>Posted Date:</strong> {task.postedDate ? new Date(task.postedDate).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-black text-sm sm:text-base mb-2">
                  <strong>Expected Completion Date:</strong> {task.expectedCompletionDate ? new Date(task.expectedCompletionDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-black">
                Price: <span className="font-semibold text-black">{task.price !== undefined ? `$${task.price}` : 'N/A'}</span> | Status: <span className={task.completed ? 'text-green-600' : 'text-red-600'}>{task.completed ? 'Completed' : 'Pending'}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskMarketplace;
