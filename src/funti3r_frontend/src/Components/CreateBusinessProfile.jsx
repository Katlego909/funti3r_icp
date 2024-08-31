// CreateBusinessProfile.js
import React, { useState } from 'react';
import { useAuth } from '../use-auth-client';

const CreateBusinessProfile = () => {
  const { whoamiActor } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    socials: '',
    description: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await whoamiActor.createBusiness({
      ...formData,
      socials: formData.socials.split(','),
    });
    setResult(response);
  };

  return (
    <div>
      <h2>Create Business Profile</h2>
      {/* Form fields */}
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <input name="socials" value={formData.socials} onChange={handleChange} placeholder="Socials (comma-separated)" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default CreateBusinessProfile;
