import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from '../../assets/feature3.jpg'; // Import the image

const CreateTask = () => {
  const navigate = useNavigate();
  const { createTask, principal } = useAuth();
  const [form, setForm] = useState({
    price: "6000000000",
    postedDate: new Date(),
    expectedCompletionDate: new Date(),
    category: "",
    description: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setForm((prev) => ({ ...prev, [name]: date }));
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
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create New Task</h2>

        {error && <p className="bg-red-100 text-red-800 p-3 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4 w-full"> {/* Set w-full for full width */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm" // Ensure input is 100% wide
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm" // Ensure textarea is 100% wide
              rows={4} // You can specify the number of rows for the textarea
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm" // Ensure input is 100% wide
            />
          </div>

          <div>
            <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700 mb-2">
              Posted Date
            </label>
            <DatePicker
              selected={form.postedDate}
              onChange={(date) => handleDateChange(date, 'postedDate')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm" // Ensure DatePicker is 100% wide
            />
          </div>

          <div>
            <label htmlFor="expectedCompletionDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expected Completion Date
            </label>
            <DatePicker
              selected={form.expectedCompletionDate}
              onChange={(date) => handleDateChange(date, 'expectedCompletionDate')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm" // Ensure DatePicker is 100% wide
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black"
          >
            {loading ? <span className="spinner"></span> : "Create Task"}
          </button>
        </form>
      </div>

      {/* Right Side - Blurred Image */}
      <div className="w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
      </div>
    </div>
  );
};

export default CreateTask;