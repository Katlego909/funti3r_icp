import React from 'react';
import { Outlet } from 'react-router-dom';

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
        <header className="bg-black text-white py-4 px-6"> {/* Added Header Styling */}
          <h1 className="text-lg font-bold">User Header</h1>
          {/* You can add more header content here */}
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 mt-4"> {/* Added mt-4 to push content below the header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default UserLayout;
