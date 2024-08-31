import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../use-auth-client';  // Ensure the correct path to your useAuth hook
import '../App.css';  // Ensure this path is correct

const CreateBusiness = () => {
  const navigate = useNavigate();
  const { createBusinessProfile } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    socials: [], // This is an array, consider how you'll handle adding multiple socials
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
    <form onSubmit={handleSubmit}>
      <h2>Create Business Profile</h2>
      {/* Add form fields as necessary */}
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
      />
      {/* Add dropdown for subscription */}
      <select name="subscription" value={form.subscription} onChange={handleChange}>
        <option value="none">None</option>
        <option value="premium">Premium</option>
        <option value="enterprise">Enterprise</option>
      </select>

      {/* Submit button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CreateBusiness;
