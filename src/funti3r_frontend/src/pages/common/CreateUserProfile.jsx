import React, { useState } from 'react';
import { useAuth } from '../../authentication/use-auth-client';

const CreateUserProfile = () => {
  const { whoamiActor } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    qualifications: '',
    socials: '',
    description: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await whoamiActor.createUserProfile({
      ...formData,
      socials: formData.socials.split(','),
    });
    setResult(response);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-8">Create User Profile</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Location" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Qualifications</label>
          <input 
            name="qualifications" 
            value={formData.qualifications} 
            onChange={handleChange} 
            placeholder="Qualifications" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Socials (comma-separated)</label>
          <input 
            name="socials" 
            value={formData.socials} 
            onChange={handleChange} 
            placeholder="Socials" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Description" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <button 
          onClick={handleSubmit} 
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Submit
        </button>

        {result && (
          <p className="text-center text-green-600 mt-4">Result: {result}</p>
        )}
      </div>
    </div>
  );
};

export default CreateUserProfile;
