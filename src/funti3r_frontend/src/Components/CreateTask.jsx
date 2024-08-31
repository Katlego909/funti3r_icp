import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../use-auth-client';
import '../App.css';

const CreateTask = () => {
  const navigate = useNavigate();
  const { listTask } = useAuth(); // Access the listTask function
  const [form, setForm] = useState({
    price: '',
    postedDate: '',
    expectedCompletionDate: '',
    category: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const taskData = {
      ...form,
      price: Number(form.price), 
      completed: false,
      completionStatus: 0,
      inProgress: false,
      promisors: [], // Initially empty list
    };

    try {
      const result = await listTask(taskData);
      if (result.Ok) {
        navigate('/MyListedTasks'); // Redirect to the task by owner page
      } else {
        setError(result.Err || 'Failed to create task.');
      }
    } catch (error) {
      setError('Failed to create task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      {error && <p className="error">{error}</p>}
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="postedDate"
        type="date"
        value={form.postedDate}
        onChange={handleChange}
        placeholder="Posted Date"
        required
      />
      <input
        name="expectedCompletionDate"
        type="date"
        value={form.expectedCompletionDate}
        onChange={handleChange}
        placeholder="Expected Completion Date"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default CreateTask;
