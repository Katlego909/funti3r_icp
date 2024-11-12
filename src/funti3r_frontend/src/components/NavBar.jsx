import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/use-auth-client';
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react";
import { NFIDW } from "@nfid/identitykit";

const NavBar = () => {
  // State to manage mobile menu visibility
  const navigate = useNavigate();
  const { isAuthenticated, login, fetchProfileType } = useAuth();
  
  const [selectedSection, setSelectedSection] = useState('about'); // Default selected section

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
 // Check if the user is already authenticated and redirect to the respective dashboard
//  useEffect(() => {
//   const checkAuthStatus = async () => {
//     if (isAuthenticated) {
//       const profileType = await fetchProfileType();

//       if (profileType === 'user') {
//         navigate('/user/dashboard', { replace: true });
//       } else if (profileType === 'business') {
//         navigate('/business/dashboard', { replace: true });
//       } else {
//         navigate('/create-profile', { replace: true });
//       }
//     }
//   };

//   checkAuthStatus();
// }, [isAuthenticated, fetchProfileType, navigate]);

const handleLogin = async () => {
  try {
    await login();
    // After login, the effect will trigger the navigation
  } catch (error) {
    console.error('Login failed:', error);
  }
};
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="relative container mx-auto pt-4 pb-4">
        {/* Flex container */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex gap-2 p-2">
            <img src={logo} width={150} alt="Funti3r Logo" />
          </div>

          {/* Desktop Menu items */}
          <div className="hidden md:flex space-x-8">
            <a href="#empowering-talent" className="hover:text-blue-500">Features</a>
            <a href="#why-us" className="hover:text-blue-500">Why Us</a>
            <a href="/" className="hover:text-blue-500">Developers</a>
          </div>

          {/* Get started buttons */}
          <div className="hidden md:flex space-x-4">
            <button onClick={handleLogin} className="px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-500">Login</button>
            <a href="#" className="px-6 py-3 font-semibold text-white bg-gray-800 rounded-md hover:bg-blue-500">Plug Wallet</a>
          </div>

          {/* Hamburger Menu Button for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white`}>
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="#" className="text-lg hover:text-blue-500">About</a>
            <a href="#" className="text-lg hover:text-blue-500">Features</a>
            <a href="#" className="text-lg hover:text-blue-500">FAQs</a>
            <a href="#" className="text-lg hover:text-blue-500">Developers</a>
            <button onClick={handleLogin} className="p-3 px-6 text-white bg-red-400 rounded-md hover:bg-blue-500">Login</button>
            <a href="#" className="p-3 px-6 text-white bg-gray-500 rounded-md hover:bg-blue-500">Get Started</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
