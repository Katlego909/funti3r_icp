import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://example.com/your-background-image.jpg")' }}>
      <div className="text-center bg-white bg-opacity-80 p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6 text-gray-800">Welcome to the Platform</h1>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
