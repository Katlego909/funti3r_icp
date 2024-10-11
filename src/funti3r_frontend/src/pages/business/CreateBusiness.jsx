import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/use-auth-client';
import backgroundImage from '../../assets/feature4.jpg'; // Ensure this path is correct

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

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createBusinessProfile(form, navigate);
    } catch (error) {
      setError('Failed to create business profile. Please try again.');
      console.error('Failed to create business profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen relative items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      ></div>

      {/* Optional Dim Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative max-w-lg mx-auto p-6 sm:p-8 bg-white shadow-md rounded-lg z-10 mt-6 sm:mt-12"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">Create Business Profile</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {['name', 'email', 'phone', 'location', 'description'].map((field, index) => (
          <div key={index} className="mb-4">
            {field !== 'description' ? (
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <textarea
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder="Business Description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <select
            name="subscription"
            value={form.subscription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ease-in-out"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateBusiness;
