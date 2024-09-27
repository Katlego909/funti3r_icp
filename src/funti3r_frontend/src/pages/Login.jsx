import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/use-auth-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, fetchProfileType, profileType } = useAuth();

  // Check if the user is already authenticated and redirect to the respective dashboard
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthenticated) {
        const profileType = await fetchProfileType();

        if (profileType === 'user') {
          navigate('/user/dashboard', { replace: true });
        } else if (profileType === 'business') {
          navigate('/business/dashboard', { replace: true });
        } else {
          navigate('/create-profile', { replace: true });
        }
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, fetchProfileType, navigate]);

  const handleLogin = async () => {
    try {
      await login();
      // After login, the effect will trigger the navigation
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="bg-[#4a004e] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 sm:w-20 h-auto" />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="px-3 sm:px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
          >
            {isAuthenticated ? 'Get Started' : 'Login with Wallet'}
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#4a004e] to-[#3c2b63] text-white p-6 sm:p-10 rounded-lg text-center">
          <h5 className="text-2xl sm:text-3xl font-bold underline mb-2">Explore Micro-tasking</h5>
          <h1 className="text-3xl sm:text-4xl mb-3">Maximize Efficiency, Empower Teams.</h1>
          <p className="text-base sm:text-lg mb-4">
            Our innovative micro-tasking application is designed to unlock unprecedented efficiency.
          </p>

          {/* Search Bar */}
          <div className="mt-5">
            <form method="get" action="/home" className="flex flex-col sm:flex-row items-center justify-center">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for tasks..."
                className="p-2 rounded-l-md w-full sm:w-3/4 border-none"
              />
              <button
                type="submit"
                value="Filter"
                className="mt-2 sm:mt-0 p-2 bg-orange-500 text-white rounded-md sm:rounded-r-md hover:bg-orange-600 transition-colors w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="mt-5">
            <p className="text-lg mb-2">Popular categories:</p>
            <div className="flex flex-wrap justify-center">
              <button className="bg-[#4a004e] text-white py-2 px-4 rounded-md m-2 hover:bg-[#3c2b63] transition-colors">
                <FontAwesomeIcon icon={faStar} className="mr-2" /> Top Rated
              </button>
              {/* Add more categories as needed */}
            </div>
          </div>
        </div>

        {/* Top Tasks Section */}
        <div className="mt-10 p-5 bg-gray-100 rounded-lg">
          <h2 className="text-2xl mb-4">Top Tasks</h2>
          <div className="flex flex-wrap gap-5">
            {/* Example task card */}
            <div className="bg-white p-5 rounded-lg shadow-md w-full sm:w-[45%] lg:w-[30%]">
              <h3 className="text-lg mb-2">Task Name</h3>
              <p className="text-sm mb-4">Brief description of the task.</p>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                Apply Now
              </button>
            </div>
            {/* Repeat task cards as needed */}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-10 p-5 bg-gray-100 rounded-lg">
          <h2 className="text-2xl mb-4">What Our Users Say</h2>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="italic mb-2">“Funti3r has revolutionized the way I manage tasks. It's efficient and user-friendly!”</p>
            <p className="text-sm text-gray-600">- Anonymous</p>
          </div>
          {/* Add more testimonials as needed */}
        </div>

        {/* Footer */}
        <footer className="bg-[#4a004e] text-white p-5 mt-10 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between flex-wrap">
            <div className="flex-1 mb-5">
              <h3 className="text-lg mb-2">About Funti3r</h3>
              <p className="text-sm">Information about Funti3r and its mission.</p>
            </div>
            <div className="flex-1 mb-5">
              <h3 className="text-lg mb-2">Contact Us</h3>
              <p className="text-sm">Email: contact@funti3r.com</p>
              <p className="text-sm">Phone: +1-234-567-890</p>
            </div>
            <div className="flex-1 mb-5">
              <h3 className="text-lg mb-2">Follow Us</h3>
              <p className="text-sm">
                <a href="#" className="text-orange-500">Facebook</a> | <a href="#" className="text-orange-500">Twitter</a> | <a href="#" className="text-orange-500">Instagram</a>
              </p>
            </div>
          </div>
          <div className="border-t border-white pt-4 text-center">
            <p className="text-sm">&copy; 2024 Funti3r. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
