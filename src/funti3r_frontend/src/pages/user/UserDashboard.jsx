import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authentication/use-auth-client';

const UserDashboard = () => {
  const { userProfile, fetchUserProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set to true to open the sidebar by default

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUserProfile();
    };

    fetchProfile();
  }, [fetchUserProfile]);

  // Toggles the sidebar open/closed state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Render sidebar if it's open */}


      {/* Main content area */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="flex items-center justify-center border-b border-gray-300 pb-4 mb-5 bg-purple-900 shadow-md rounded-lg">
          {/* Menu icon to toggle the sidebar */}
          <div className="cursor-pointer text-white" onClick={toggleSidebar}>
            <i className="fa fa-bars text-2xl"></i>
          </div>
          <div className="flex flex-col items-center text-white ml-4">
            <h1 className="text-2xl mb-1">Welcome</h1>
            <h2 className="text-xl text-orange-400">{userProfile?.name || 'Loading...'}</h2>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="bg-white p-8 rounded-lg shadow-lg">
          {userProfile ? (
            <div className="p-5">
              <h2 className="text-3xl mb-4">{userProfile.name}</h2>
              <div className="text-lg space-y-2">
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Phone:</strong> {userProfile.phone}</p>
                <p><strong>Location:</strong> {userProfile.location}</p>
                <p><strong>Description:</strong> {userProfile.description}</p>
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

export default UserDashboard;
