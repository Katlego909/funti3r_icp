import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client';

const CreateTask = () => {
  const navigate = useNavigate();
  const { createTask, principal } = useAuth();
  const [form, setForm] = useState({
    price: "6000000000",
    postedDate: "",
    expectedCompletionDate: "",
    category: "",
    description: ""
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

    const taskId = BigInt(1);


    const priceValue = form.price ? Number(form.price) : 0;

    const taskData = {
      ...form,
      taskId: taskId,
      owner: principal || 'defaultOwner',
      price: BigInt(priceValue),
      completed: false,
      completionStatus: 0.0,
      inProgress: false,
      promisor: null,
      promisors: [],
    };

    try {
      const result = await createTask(taskData);
      if ("ok" in result) {
        navigate('/business/my-listed-tasks');
      } else {
        setError(result.rrr || 'Failed to create task.');
      }
    } catch (error) {
      setError('Failed to create task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg sm:p-8 md:p-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple-800">Create New Task</h2>

      {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
          Category
        </label>
        <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Category"  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
          Task Description
        </label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Task Description"  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-xs font-medium text-gray-700 mb-1">
          Price
        </label>
        <input id="price"name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price"  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="postedDate" className="block text-xs font-medium text-gray-700 mb-1">
          Posted Date
        </label>
        <input id="postedDate" name="postedDate" type="date" value={form.postedDate} onChange={handleChange}  defaultValue={"2024/09/11"} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="expectedCompletionDate" className="block text-xs font-medium text-gray-700 mb-1">
          Expected Completion Date
        </label>
        <input
          id="expectedCompletionDate"
          name="expectedCompletionDate"
          type="date"
          value={form.expectedCompletionDate}
          onChange={handleChange}
          defaultValue={"2024/09/11"}
          
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
        />
      </div>

      <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm">
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default CreateTask;
