import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (profileType) => {
    navigate(`/create-profile/${profileType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl sm:text-3xl mb-8 text-purple-900 text-center">Select Profile Type</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <button
          onClick={() => handleSelect('user')}
          className="w-full px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300"
        >
          Create User Profile
        </button>
        <button
          onClick={() => handleSelect('business')}
          className="w-full px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300"
        >
          Create Business Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSelection;
