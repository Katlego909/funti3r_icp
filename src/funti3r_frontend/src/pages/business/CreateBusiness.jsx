import React, { useState } from 'react';
import { useAuth } from '../../authentication/use-auth-client'; // Ensure the correct path to your useAuth hook
import backgroundImage from '../../assets/feature4.jpg'; // Ensure this path is correct

const CreateBusiness = () => {
  const { whoamiActor } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    socials: '', // Updated to string for input
    description: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await whoamiActor.createBusiness({
        ...formData,
        socials: formData.socials.split(','),
      });
      setResult(response);
    } catch (error) {
      setError('Failed to create business profile: ' + error.message);
    } finally {
      setLoading(false);
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
          filter: 'blur(8px)', // Adjust the blur amount as needed
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

        {['name', 'email', 'phone', 'location', 'socials', 'description'].map((field, index) => (
          <div key={index} className="mb-4">
            {field !== 'description' ? (
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required={field !== 'socials'} // Make all fields required except socials
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ease-in-out"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {result && <p className="text-center text-green-600 mt-4">Result: {result}</p>}
      </form>
    </div>
  );
};

export default CreateBusiness;
