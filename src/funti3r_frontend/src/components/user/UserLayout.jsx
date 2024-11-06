import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on the left, fixed position */}
      <div className="w-64 h-screen fixed"> {/* Sidebar fixed with a high z-index to stay on top */}
        <UserSidebar />
      </div>

      {/* Main Content Area, pushed down to avoid overlap */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Main content will scroll behind the fixed sidebar */}
        <main className="flex-1 p-6 mt-16"> {/* Ensures content starts below sidebar */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
