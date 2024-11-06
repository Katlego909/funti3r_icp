import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';
import { FaExclamationTriangle, FaTasks, FaPlus } from 'react-icons/fa';
import backgroundImage from '../../assets/feature4.jpg'; 

const TaskMarketPlace = () => {
  const { isAuthenticated, fetchAllListedTasks, proposeTask, fetchBusinessProfile, whoamiActor, principal } = useAuth(); 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const flattenTasks = (arr) => {
    let flatTasks = [];
    arr.forEach(item => {
      if (Array.isArray(item)) {
        flatTasks = flatTasks.concat(flattenTasks(item)); // Recursively flatten arrays
      } else if (item.hasOwnProperty('taskId')) {
        flatTasks.push(item); // If it's a task, add it to the flat array
      }
    });
    return flatTasks;
  };

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await fetchAllListedTasks();
      console.log("Fetched tasks:", fetchedTasks);

      const flatTasks = flattenTasks(fetchedTasks); // Flatten the tasks
      setTasks(flatTasks || []); // Set the flattened tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
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


  const proposeToComplete = (taskId) => {
    const natTaskId = BigInt(taskId);  // Convert taskId to BigInt for Nat compatibility

    proposeTask(natTaskId)
      .then((response) => {
        if (response.success) {
          console.log(`Proposed successfully for task: ${natTaskId}`);
          alert('Proposal was submitted successfully!');
        } else {
          console.error(`Failed to propose task with ID: ${natTaskId}`, response.error);
          alert('Failed to submit the proposal. Please try again.');  // Show an error message if the proposal fails
        }
      })
      .catch((error) => {
        console.error(`Error proposing task with ID: ${natTaskId}`, error);
        alert('An error occurred while submitting the proposal.');  // Handle any network or unexpected errors
      });
  };



  return (
    <div className="min-h-screen">
      <div className="relative w-full h-64 sm:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="p-4 sm:p-6 bg-white relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            All Listed Tasks
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

        {/* Display tasks in square boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between" style={{ height: '200px' }}>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">{task.category || 'No Category'}</h3>
                  <p className="text-black text-sm mb-1">{task.description || 'No description provided.'}</p>
                  <p className="text-black text-sm"><strong>Posted Date:</strong> {task.postedDate ? new Date(task.postedDate).toLocaleDateString() : 'N/A'}</p>
                  <p className="text-black text-sm"><strong>Expected Completion:</strong> {task.expectedCompletionDate ? new Date(task.expectedCompletionDate).toLocaleDateString() : 'N/A'}</p>
                  <p className="text-xs text-black">
                    Price: <span className="font-semibold">{task.price !== undefined ? `${task.price} ICP` : 'N/A'}</span> |
                     </p>
                </div>
                <div className="mt-auto">
                
                  <p className="text-gray-700 mb-2 text-sm">
                    <strong>Status:</strong>
                    <span
                      className={
                        task.completed
                          ? 'text-green-600'
                          : task.inProgress
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }
                    >
                      {task.completed ? 'Completed' : task.inProgress ? 'In Progress' : 'Pending'}
                    </span>
                  </p>

                  {/* Conditionally render the button if the task is pending */}
                  {!task.inProgress && (
                    <button
                      onClick={() => proposeToComplete(task.taskId)}
                      className="mt-2 bg-black hover:bg-gray-800 text-white font-bold py-1 px-2 text-sm rounded"
                    >
                      Propose to Complete
                    </button>
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

export default TaskMarketPlace;
