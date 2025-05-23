import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';
import { FaExclamationTriangle, FaUser } from 'react-icons/fa';
import backgroundImage from '../../assets/feature4.jpg'; // Ensure this is the correct path
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userProfile, fetchUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await fetchUserProfile();
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError('Failed to fetch user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [fetchUserProfile]);

  return (
    <div className="min-h-screen">
      {/* Background image */}
      <div
        className="relative w-full h-64 sm:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(5px)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Main content */}
      <div className="p-4 sm:p-6 bg-white relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            User Profile: {userProfile ? userProfile.name : 'Loading...'}
          </h2>

          {/* Loading and error messages */}
          {loading && (
            <p className="text-black flex items-center justify-center mt-4">
              <FaUser className="mr-2" /> Loading...
            </p>
          )}
          {error && (
            <p className="text-red-600 mb-4 flex items-center justify-center">
              <FaExclamationTriangle className="mr-2" /> {error}
            </p>
          )}
        </div>

        {/* User information */}
        <div className="grid grid-cols-1 gap-6 my-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">User Information</h2>
            <div className="text-base text-gray-600 space-y-2">
              <p><strong>Name:</strong> {userProfile ? userProfile.name : 'N/A'}</p>
              <p><strong>Email:</strong> {userProfile ? userProfile.email : 'N/A'}</p>
              <p><strong>Phone:</strong> {userProfile ? userProfile.phone : 'N/A'}</p>
              <p><strong>Location:</strong> {userProfile ? userProfile.location : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
