import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/use-auth-client';
import Logo from '../assets/logo.svg'; // Example logo image
import heroBgImage from '../assets/feature1.jpg'; // Example background image
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import DriveSuccess from '../components/DriveSuccess'
import TheBenefits from '../components/TheBenefits'
import WhyChooseUs from '../components/WhyChooseUs'
import TheDifference from '../components/TheDifference'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, fetchProfileType } = useAuth();
  
  const [selectedSection, setSelectedSection] = useState('about'); // Default selected section

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

  const handleScroll = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSelectedSection(section);
    }
  };

  return (
    <div>
      <NavBar />
      <Hero />
      <TrustedBy />
      <DriveSuccess />
      <TheBenefits />
      <WhyChooseUs />
      <TheDifference />
      <CTA />
      <Footer />
    </div>
    // <div className="min-h-screen bg-white">
    //   {/* Header Section with Navigation Tabs */}
    //   <header className="w-full bg-black text-white px-6 py-4 fixed top-0 z-20" style={{ backgroundColor: '#0e0e0e' }}>
    //     <div className="max-w-7xl mx-auto flex justify-between items-center">
    //       <div className="flex items-center">
    //         <img src={Logo} alt="Funti3r Logo" className="h-12 w-12" />
    //         <h1 className="ml-3 text-2xl font-semibold">Funti3r</h1>
    //       </div>
    //       <nav className="space-x-6">
    //         <a
    //           onClick={() => handleScroll('about')}
    //           className={`cursor-pointer hover:text-gray-300 transition text-base ${selectedSection === 'about' ? 'underline' : ''}`}
    //         >
    //           About Us
    //         </a>
    //         <a
    //           onClick={() => handleScroll('services')}
    //           className={`cursor-pointer hover:text-gray-300 transition text-base ${selectedSection === 'services' ? 'underline' : ''}`}
    //         >
    //           Services
    //         </a>
    //         <a
    //           onClick={() => handleScroll('how-it-works')}
    //           className={`cursor-pointer hover:text-gray-300 transition text-base ${selectedSection === 'how-it-works' ? 'underline' : ''}`}
    //         >
    //           How It Works
    //         </a>
    //         <a
    //           onClick={() => handleScroll('testimonials')}
    //           className={`cursor-pointer hover:text-gray-300 transition text-base ${selectedSection === 'testimonials' ? 'underline' : ''}`}
    //         >
    //           Testimonials
    //         </a>
    //       </nav>
    //     </div>
    //   </header>

    //   {/* Hero Section with Background Image */}
    //   <section
    //     className="relative bg-cover bg-center text-center h-screen flex flex-col justify-center items-center text-white"
    //     style={{ backgroundImage: `url(${heroBgImage})` }}
    //   >
    //     {/* Overlay */}
    //     <div className="absolute inset-0 bg-black opacity-60"></div>

    //     {/* Hero Content */}
    //     <div className="relative z-10">
    //       <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Empowering Entrepreneurs with Funti3r</h1>
    //       <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-10">
    //         Streamline operations and enhance productivity by connecting with skilled microtaskers across various sectors.
    //       </p>
    //       <button
    //         onClick={handleLogin}
    //         className="px-6 py-3 bg-gray-800 text-white text-lg rounded-md hover:bg-gray-700 transition"
    //       >
    //         Login with Wallet
    //       </button>
    //     </div>
    //   </section>

    //   {/* About Us Section (White Background) */}
    //   <section id="about" className="py-20 bg-white">
    //     <div className="max-w-7xl mx-auto px-6 text-center">
    //       <h2 className="text-3xl font-bold text-gray-800 mb-8">About Funti3r</h2>
    //       <p className="text-lg text-gray-600 max-w-4xl mx-auto">
    //         Funti3r is dedicated to helping entrepreneurs thrive by connecting them with skilled microtaskers from various sectors.
    //         Our platform streamlines operations, improves productivity, and allows businesses to grow by matching them with the 
    //         right talent.
    //       </p>
    //     </div>
    //   </section>

    //   {/* Services Section */}
    //   <section id="services" className="py-20 bg-white">
    //     <div className="max-w-7xl mx-auto px-6 text-center">
    //       <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    //           <h3 className="text-2xl font-semibold text-gray-800 mb-2">Task Management</h3>
    //           <p className="text-gray-600">Efficiently manage tasks and projects with Funti3r’s smart tasking system.</p>
    //         </div>
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    //           <h3 className="text-2xl font-semibold text-gray-800 mb-2">Collaboration Tools</h3>
    //           <p className="text-gray-600">Seamlessly collaborate with teams and microtaskers using our communication tools.</p>
    //         </div>
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    //           <h3 className="text-2xl font-semibold text-gray-800 mb-2">Real-time Monitoring</h3>
    //           <p className="text-gray-600">Track progress and get real-time updates on all your projects and tasks.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* How It Works Section */}
    //   <section id="how-it-works" className="py-20 bg-white">
    //     <div className="max-w-7xl mx-auto px-6 text-center">
    //       <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         <div className="p-6">
    //           <div className="text-gray-800 mb-4">
    //             <span className="block text-4xl font-bold">1</span>
    //             <h3 className="text-2xl font-semibold">Sign Up</h3>
    //           </div>
    //           <p className="text-gray-600">Create an account and explore Funti3r's features tailored to entrepreneurs and microtaskers.</p>
    //         </div>
    //         <div className="p-6">
    //           <div className="text-gray-800 mb-4">
    //             <span className="block text-4xl font-bold">2</span>
    //             <h3 className="text-2xl font-semibold">Post Tasks</h3>
    //           </div>
    //           <p className="text-gray-600">Post tasks or projects and get connected to the right microtaskers in your sector.</p>
    //         </div>
    //         <div className="p-6">
    //           <div className="text-gray-800 mb-4">
    //             <span className="block text-4xl font-bold">3</span>
    //             <h3 className="text-2xl font-semibold">Track & Complete</h3>
    //           </div>
    //           <p className="text-gray-600">Track your task’s progress in real-time and complete projects seamlessly.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Testimonials Section */}
    //   <section id="testimonials" className="py-20 bg-white">
    //     <div className="max-w-7xl mx-auto px-6 text-center">
    //       <h2 className="text-3xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
    //       <div className="flex space-x-6 overflow-x-auto">
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
    //           <p className="text-gray-600 mb-4">
    //             "Funti3r has transformed the way we manage projects. Their task management system is intuitive and easy to use."
    //           </p>
    //           <h4 className="font-semibold">- John Doe</h4>
    //         </div>
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
    //           <p className="text-gray-600 mb-4">
    //             "The collaboration tools have made remote work so much easier. I can connect with my team in real time!"
    //           </p>
    //           <h4 className="font-semibold">- Jane Smith</h4>
    //         </div>
    //         <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
    //           <p className="text-gray-600 mb-4">
    //             "Funti3r helped us find skilled microtaskers quickly. Our productivity has significantly increased!"
    //           </p>
    //           <h4 className="font-semibold">- Mark Johnson</h4>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Footer Section */}
    //   <footer className="bg-black text-white py-6 mt-12" style={{ backgroundColor: '#0e0e0e' }}>
    //     <div className="max-w-7xl mx-auto text-center">
    //       <p className='text-base' >&copy; {new Date().getFullYear()} Funti3r. All rights reserved.</p>
    //     </div>
    //   </footer>
    // </div>

  );
};

export default LandingPage;
