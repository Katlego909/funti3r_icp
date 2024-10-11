import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/feature1.jpg'; // Replace with your actual image path

const ProfileSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (profileType) => {
    navigate(`/create-profile/${profileType}`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(10px)' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl mb-8 text-black text-center font-bold">Select Profile Type</h1>
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => handleSelect('user')}
            className="w-full px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            Create User Profile
          </button>
          <button
            onClick={() => handleSelect('business')}
            className="w-full px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            Create Business Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
