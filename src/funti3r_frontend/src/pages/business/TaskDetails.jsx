import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client';

const TaskDetails = () => {
  const { taskId } = useParams(); // Get taskId from route params
  const { fetchTaskById } = useAuth(); // Assume you have a function to fetch task by ID
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const fetchedTask = await fetchTaskById(taskId);
        setTask(fetchedTask);
      } catch (err) {
        console.error("Error fetching task details:", err);
        setError('Failed to fetch task details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId, fetchTaskById]);

  if (loading) {
    return <p className="text-center">Loading task details...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!task) {
    return <p className="text-center">No task found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{task.category || 'No Category'}</h2>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {task.description || 'No description provided.'}</p>
      <p className="text-gray-700 mb-2"><strong>Posted Date:</strong> {task.postedDate ? new Date(task.postedDate).toLocaleDateString() : 'N/A'}</p>
      <p className="text-gray-700 mb-2"><strong>Expected Completion Date:</strong> {task.expectedCompletionDate ? new Date(task.expectedCompletionDate).toLocaleDateString() : 'N/A'}</p>
      <p className="text-gray-700 mb-2"><strong>Price:</strong> {task.price !== undefined ? `${task.price} ICP` : 'N/A'}</p>
      <p className="text-gray-700 mb-2"><strong>Status:</strong> <span className={task.completed ? 'text-green-600' : 'text-red-600'}>{task.completed ? 'Completed' : 'Pending'}</span></p>
      <p className="text-gray-700 mb-2"><strong>Number of Promisors:</strong> {task.promisors ? task.promisors.length : 0}</p>

      <button 
        onClick={() => navigate('/business/my-listed-tasks')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Back to My Listed Tasks
      </button>
    </div>
  );
};

export default TaskDetails;
