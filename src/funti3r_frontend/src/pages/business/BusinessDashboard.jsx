import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);
//Will edit to resemble accurate data once tasklisting works
const BusinessDashboard = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['Dec 22', 'Jan 23', 'Feb 23', 'Mar 23', 'Apr 23', 'May 23'],
    datasets: [
      {
        label: 'Direct',
        data: [4000, 3000, 5000, 4000, 6000, 2000],
        backgroundColor: '#60A5FA',
      },
      {
        label: 'Indirect',
        data: [7000, 9000, 12000, 11000, 10000, 9000],
        backgroundColor: '#A78BFA',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Sales Cards */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-500 text-sm font-medium">Tasks Completed</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2"></h1>
          <p className="text-green-500 font-medium">+10</p>
          <Line data={lineData} height={80} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-500 text-sm font-medium">Tasks in Progress</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2"></h1>
          <p className="text-green-500 font-medium">+10</p>
          <Line data={lineData} height={80} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-500 text-sm font-medium">Tasks Pending</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2"></h1>
          <p className="text-green-500 font-medium">+10</p>
          <Line data={lineData} height={80} />
        </div>

        {/* Direct vs Indirect */}
        <div className="bg-white shadow-md rounded-lg p-4 col-span-1 sm:col-span-2">
          <h2 className="text-gray-500 text-sm font-medium">Completed VS Incomplete Tasks</h2>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-xl font-bold text-gray-800"></h1>
            <h1 className="text-xl font-bold text-gray-800"></h1>
          </div>
          <Bar data={barData} height={100} />
        </div>

        {/* Real-Time Value */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-500 text-sm font-medium flex items-center">
            Transactions <span className="ml-1 text-xs text-gray-400">i</span>
          </h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2"></h1>
          <p className="text-green-500 font-medium">+7.89%</p>
          <Line data={lineData} height={80} />
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
