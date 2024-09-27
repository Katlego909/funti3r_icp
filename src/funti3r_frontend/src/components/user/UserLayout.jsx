import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import UserSidebar from './UserSidebar';

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on the left */}
      <div className="w-64"> {/* Ensure the sidebar has a fixed width */}
        <UserSidebar />
      </div>

      {/* Main Content Area on the right */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
