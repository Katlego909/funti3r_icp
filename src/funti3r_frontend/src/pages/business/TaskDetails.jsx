import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client';
import backgroundImage from '../../assets/feature4.jpg';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Principal } from '@dfinity/principal'; 

const TaskDetails = () => {
  const { taskId } = useParams();
  const { fetchTaskById, accProposal } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const fetchedTask = await fetchTaskById(BigInt(taskId));
        
        if (fetchedTask.success && fetchedTask.success.length > 0) {
          setTask(fetchedTask.success[0]);
        } else {
          const errorMessage = 'Task not found or failed to fetch task details.';
          setError(errorMessage);
        }
      } catch (err) {
        setError(err.message || 'An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    

    fetchTaskDetails();
  }, [taskId, fetchTaskById]);

  // const accProposal = async

  const handleAcceptPromisor = async (microTasker) => {
    const acceptProposal = await accProposal(BigInt(taskId), microTasker); 
    
    console.log(`Promisor ${acceptProposal} accepted`);
  };
  

  const renderPromisorDetail = (promisorDetail) => {
    if (promisorDetail && promisorDetail._isPrincipal) {
      try {
        const principal = Principal.fromUint8Array(promisorDetail._arr); 
        return <p className="text-gray-800 text-sm">{principal.toText()}</p>;
      } catch (error) {
        console.error("Failed to convert principal:", error);
        return <p className="text-gray-800 text-sm">Invalid Principal</p>;
      }
    }
    return <p className="text-gray-800 text-sm">Unknown User</p>;
  };
  
  const renderAllPromisors = (promisors) => {
    return (
      <div>
        {promisors.map((promisorGroup, index) => (
          <div key={index}>
            {promisorGroup.map((promisor, promIndex) => (
              <div key={promIndex}>
                {renderPromisorDetail(promisor)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  if (loading) {
    return <p className="text-center text-sm">Loading task details...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center text-sm">
        <FaExclamationTriangle className="inline mr-2" /> {error}
      </p>
    );
  }

  if (!task) {
    return <p className="text-center text-sm">No task found.</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-64 sm:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 className="text-2xl font-semibold text-white mb-4">{task.category || 'No Category'}</h2>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-white relative z-10">
        <p className="text-gray-700 mb-2 text-sm">
          <strong>Description:</strong> {task.description || 'No description provided.'}
        </p>
        <p className="text-gray-700 mb-2 text-sm">
          <strong>Posted Date:</strong> {task.postedDate ? new Date(task.postedDate).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-gray-700 mb-2 text-sm">
          <strong>Expected Completion Date:</strong> {task.expectedCompletionDate ? new Date(task.expectedCompletionDate).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-gray-700 mb-2 text-sm">
          <strong>Price:</strong> {task.price !== undefined ? `${task.price} ICP` : 'N/A'}
        </p>
        <p className="text-gray-700 mb-2 text-sm">
          <strong>Status:</strong> <span className={task.completed ? 'text-green-600' : 'text-red-600'}>{task.completed ? 'Completed' : 'Pending'}</span>
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Promisors:</h3>
          {task.promisors.flat().map((promisorGroup, groupIndex) =>
  Array.isArray(promisorGroup) ? (
    promisorGroup.map((promisorDetail, promisorIndex) => (
      <li key={`${groupIndex}-${promisorIndex}`} className="flex justify-between items-center p-2 border border-gray-300 rounded-lg">
        <div className="space-y-1">
          {renderPromisorDetail(promisorDetail)}
        </div>
        <button
          onClick={() => handleAcceptPromisor(promisorDetail)} // Pass the selected promisor detail
          className="px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition text-sm"
        >
          Accept
        </button>
      </li>
    ))
  ) : (
    <li key={groupIndex} className="flex justify-between items-center p-2 border border-gray-300 rounded-lg">
      <div className="space-y-1">
        {renderPromisorDetail(promisorGroup)}
      </div>
      <button
        onClick={() => handleAcceptPromisor(promisorGroup)} // Pass the selected promisor
        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition text-sm"
      >
        Accept
      </button>
    </li>
  )
)}

        </div>

        <button 
          onClick={() => navigate('/business/my-listed-tasks')}
          className="mt-4 px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition text-sm"
        >
          Back to My Listed Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
