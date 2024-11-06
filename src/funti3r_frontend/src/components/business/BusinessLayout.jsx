import React from 'react';
import { Outlet } from 'react-router-dom';
import BusinessSidebar from './BusinessSidebar';

const BusinessLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar on the left */}
      <div className="w-64 h-screen fixed z-20"> {/* Fixed sidebar with high z-index */}
        <BusinessSidebar />
      </div>

      {/* Main Content Area with top margin */}
      <div className="flex-1 flex flex-col ml-64"> {/* Keeps content aligned to the left, with no side margin */}
        <main className="flex-1 p-6 mt-16"> {/* Adds top margin to push content below the header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;
