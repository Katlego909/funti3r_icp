import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authentication/use-auth-client';

const UserProfile = () => {
  const { userProfile, fetchUserProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default on mobile

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile();
    };

    fetchProfile();
  }, [fetchUserProfile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar (conditionally rendered on larger screens or if opened) */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden sm:block'
        } fixed sm:relative z-10 sm:w-64 w-3/4 h-full bg-purple-900 p-5 shadow-lg transition-all duration-300`}
      >
        <div className="text-white">
          <h2 className="text-xl mb-4">Sidebar Content</h2>
          {/* Sidebar content goes here */}
        </div>
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-3/4 sm:ml-64' : 'ml-0'
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-300 pb-4 mb-5 bg-purple-900 shadow-md rounded-lg">
          {/* Menu icon to toggle the sidebar */}
          <div className="cursor-pointer text-white" onClick={toggleSidebar}>
            <i className="fa fa-bars text-2xl"></i>
          </div>
          <div className="flex flex-col items-center text-white">
            <h1 className="text-xl sm:text-2xl mb-1">User Profile</h1>
            <h2 className="text-lg sm:text-xl text-orange-400">
              {userProfile?.name || 'Loading...'}
            </h2>
          </div>
        </header>

        {/* Main profile content */}
        <main className="bg-white p-5 sm:p-8 rounded-lg shadow-lg">
          {userProfile ? (
            <div>
              <h2 className="text-2xl sm:text-3xl mb-4">{userProfile.name}</h2>
              <div className="text-base sm:text-lg space-y-2">
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userProfile.phone}
                </p>
                <p>
                  <strong>Location:</strong> {userProfile.location}
                </p>
                <p>
                  <strong>Description:</strong> {userProfile.description}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-lg text-purple-900">Loading user profile...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
