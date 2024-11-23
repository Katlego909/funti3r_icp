import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';
import { FaExclamationTriangle, FaTasks, FaPlus } from 'react-icons/fa';
import backgroundImage from '../../assets/feature4.jpg';
import { useNavigate } from 'react-router-dom';

const MyListedTasks = () => {
  const { isAuthenticated, fetchTaskByOwner, verifyTaskCompletion, businessProfile, fetchBusinessProfile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verifiedTasks, setVerifiedTasks] = useState([]); // State to track verified tasks
  const navigate = useNavigate();

  const flattenTasks = (arr) => {
    let flatTasks = [];
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        flatTasks = flatTasks.concat(flattenTasks(item));
      } else if (item.hasOwnProperty('taskId')) {
        flatTasks.push(item);
      }
    });
    return flatTasks;
  };

  const countPromisors = (promisors) => {
    if (!promisors) return 0;
    let count = 0;
    const flattenArray = (arr) => {
      arr.forEach((item) => {
        if (Array.isArray(item)) {
          flattenArray(item);
        } else if (item._isPrincipal) {
          count += 1;
        }
      });
    };
    flattenArray(promisors);
    return count;
  };

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await fetchTaskByOwner();
      console.log('Fetched tasks:', fetchedTasks);
      const flatTasks = flattenTasks(fetchedTasks);
      setTasks(flatTasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTask = async (taskId, isSuccess) => {
    const result = await verifyTaskCompletion(taskId, isSuccess);
    if (result.success) {
      console.log(`Task ${taskId} verified successfully`);
      setVerifiedTasks((prev) => [...prev, taskId]); // Add task ID to verified tasks
    } else {
      console.error(`Task ${taskId} verification failed: ${result.error}`);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchBusinessProfile();
    };
    fetchProfile();
  }, [fetchBusinessProfile]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen">
      <div
        className="relative w-full h-64 sm:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="p-4 sm:p-6 bg-white relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            Tasks Listed by {businessProfile ? businessProfile.name : 'BusinessName'}
          </h2>
          {loading && (
            <p className="text-black flex items-center justify-center mt-4">
              <FaPlus className="mr-2" /> Loading...
            </p>
          )}
          {error && (
            <p className="text-red-600 mb-4 flex items-center justify-center">
              <FaExclamationTriangle className="mr-2" /> {error}
            </p>
          )}
          {!loading && tasks.length === 0 && (
            <p className="text-black flex items-center justify-center">
              <FaTasks className="mr-2" /> No tasks available
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between cursor-pointer"
                style={{ height: '200px' }}
              >
                <div onClick={() => navigate(`/business/task-details/${task.taskId}`)}>
                  <h3 className="text-lg font-semibold text-black mb-2">{task.category || 'No Category'}</h3>
                  <p className="text-black text-sm mb-1">{task.description || 'No description provided.'}</p>
                  <p className="text-black text-sm">
                    <strong>Posted Date:</strong>{' '}
                    {task.postedDate ? new Date(task.postedDate).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-black text-sm">
                    <strong>Expected Completion:</strong>{' '}
                    {task.expectedCompletionDate ? new Date(task.expectedCompletionDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs text-black">
                    Price: <span className="font-semibold">{task.price !== undefined ? `${task.price} ICP` : 'N/A'}</span> |{' '}
                    Status: <span className={task.completed ? 'text-green-600' : 'text-red-600'}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </p>
                  {!task.completed && (
                    <p className="text-sm text-black mt-1">
                      <strong>Number of Promisors:</strong> {countPromisors(task.promisors)}
                    </p>
                  )}
                  {task.completed && (
                    <div className="flex gap-2 mt-2">
                      {verifiedTasks.includes(task.taskId) ? (
                        <p className="text-green-500 font-bold">SUCCESS</p>
                      ) : (
                        <>
                          <button
  onClick={() => verifyTaskCompletion(task.taskId, true)}
  className="w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
>
  Verify Success
</button>
<button
  onClick={() => verifyTaskCompletion(task.taskId, false)}
  className="w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
>
  Verify Failure
</button>

                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListedTasks;
