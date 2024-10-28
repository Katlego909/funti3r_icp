import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo.png';
import logowht from '../assets/logo2.png';
import icpLogo from '../assets/images/icp2.png';  // Assuming you have the ICP logo here

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo Section */}
          <div className="mb-8 md:mb-0 flex items-center space-x-4">
            <img
              src={logowht}
              alt="Funti3r Logo"
              className="h-8 w-full"
            />
          </div>
          
          {/* Links Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-center md:text-left">
            <ul>
              <li className="mb-2">
                <a href="/home" className="hover:text-gray-400">Home</a>
              </li>
              <li className="mb-2">
                <a href="#why-us" className="hover:text-gray-400"></a>
              </li>
              <li className="mb-2">
                <a href="/team" className="hover:text-gray-400">The Team</a>
              </li>
              <li>
                <a href="/resources" className="hover:text-gray-400">Resources</a>
              </li>
            </ul>

            <ul>
              <li className="mb-2">
                <a href="/newsletter" className="hover:text-gray-400">Newsletter</a>
              </li>
              <li className="mb-2">
                <a href="/careers" className="hover:text-gray-400">Career</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-400">FAQ</a>
              </li>
            </ul>

            <ul>
              <li className="mb-2">
                <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          {/* Social and Contact Section */}
          <div className="text-center md:text-left mt-8 md:mt-0">
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://instagram.com" className="text-white-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="text-white-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="mt-4 text-white-400">
              <a href="mailto:explore@funti3r.com">explore@funti3r.com</a>
             
            </div>
          </div>
        </div>

        {/* Copyright and Powered by Section */}
        <div className="border-t border-gray-400 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Funti3r. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-sm">Powered by</span>
              <a href="https://internetcomputer.org/ecosystem" target='_blank' >
              <img src={icpLogo} alt="ICP Logo" className="h-6 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
