import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client'; // Ensure the correct path to your useAuth hook

const CreateBusiness = () => {
  const navigate = useNavigate();
  const { createBusinessProfile } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    socials: [],
    description: '',
    applications: [],
    subscription: 'none' // Default subscription
  });

  const [error, setError] = useState(''); // State for error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading state during submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validates form fields before submission
  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.location) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error messages

    if (!validateForm()) return; // Validate before proceeding

    setIsSubmitting(true);
    try {
      await createBusinessProfile(form, navigate);
    } catch (error) {
      setError('Failed to create user profile. Please try again.');
      console.error('Failed to create user profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">Create Business Profile</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Business Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="mb-4">
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="mb-4">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Business Description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="mb-4">
        <select
          name="subscription"
          value={form.subscription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="none">None</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CreateBusiness;
