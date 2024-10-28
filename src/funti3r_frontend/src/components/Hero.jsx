import React from 'react';
import img1 from '../assets/images/img.png';
import { FaChevronRight, FaGithub } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="py-12 md:py-24">
      {/* Flex container */}
      <div className="container flex flex-col-reverse md:flex-row items-center px-2 mx-auto">
        {/* Left item */}
        <div className="flex flex-col mb-8 md:mb-0 space-y-8 md:w-1/2 items-center md:items-start">
          <h1 className="max-w-md text-4xl md:text-5xl font-semibold-100 text-center md:text-left animate-fade-in-up">
            Building a Premium Global Talent Launchpad
          </h1>
          <p className="max-w-sm text-center md:text-left text-gray-700 animate-fade-in-up">
            Funti3r connects businesses with skilled global talent, driving growth through efficient outsourcing and high-quality results.
          </p>

          <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up">
            <a
              href=""
              className="flex items-center gap-2 px-6 py-3 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started <FaChevronRight />
            </a>
            <a
              href=""
              className="flex items-center gap-2 px-6 py-3 text-white font-semibold bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              GitHub <FaGithub />
            </a>
          </div>
        </div>
        {/* Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mb-6">
          <img
            src={img1}
            className="w-full h-auto object-cover rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 animate-fade-in"
            alt="Hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
