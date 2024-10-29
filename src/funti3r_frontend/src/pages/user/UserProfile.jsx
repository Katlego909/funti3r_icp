import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';
import { FaExclamationTriangle, FaUser, FaTasks } from 'react-icons/fa';
import backgroundImage from '../../assets/feature4.jpg'; // Ensure this is the correct path

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { isAuthenticated, userProfile, fetchUserProfile , fetchMicroTaskerApplications  } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch microtasker applications
  const fetchApplications = async () => {
    try {
      const fetchedApplications = await fetchMicroTaskerApplications(); // Fetch applications from service
      setApplications(fetchedApplications || []); // Set the applications to state
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError('Failed to fetch applications. Please try again later.'); // Capture any errors
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile(); // Fetch the user profile on mount
    };
    fetchProfile();
  }, [fetchUserProfile]);

  // Fetch applications when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen">
      {/* Background image for the top section */}
      <div className="relative w-full h-64 sm:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Main content container */}
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
          {!loading && applications.length === 0 && (
            <p className="text-black flex items-center justify-center">
              <FaTasks className="mr-2" /> No applications available
            </p>
          )}
        </div>

        {/* User information section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">User Information</h2>
            <div className="text-base text-gray-600 space-y-2">
              <p><strong>Name:</strong> {userProfile ? userProfile.name : 'N/A'}</p>
              <p><strong>Email:</strong> {userProfile ? userProfile.email : 'N/A'}</p>
              <p><strong>Phone:</strong> {userProfile ? userProfile.phone : 'N/A'}</p>
              <p><strong>Location:</strong> {userProfile ? userProfile.location : 'N/A'}</p>
            </div>
          </div>

          {/* Applications section */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">My Applications</h2>
            <div className="space-y-2">
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
                    <p><strong>Task:</strong> {app}</p>
                    <p><strong>Status:</strong> {app.status}</p>
                  </div>
                ))
              ) : (
                <p>No applications available to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
