import React, { useState } from 'react';
import successImage from '../assets/images/hero-img.jpg';
import img2 from '../assets/images/img2.png';
import { ChevronDownIcon, UserGroupIcon, GlobeAltIcon, CheckCircleIcon } from '@heroicons/react/24/solid'; // Icons
import { GrGroup, GrGlobe, GrInherit  } from "react-icons/gr";

const TheDifference = () => {
  return (
    <section id="drive-success" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch">
          
          {/* Left side - Image */}
          <ImageSection />

          {/* Right side - Text content */}
          <ContentSection />
        </div>
      </div>
    </section>
  );
};

// Static image without hover effect
const ImageSection = () => (
  <div className="lg:w-1/2 flex mb-6 lg:mb-0">
    <img 
      src={img2} 
      alt="Drive Success" 
      className="w-full h-full object-cover object-center rounded-lg" // Set a fixed height
    />
  </div>
);

// Content section with accordion features
const ContentSection = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track the currently open accordion

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open index
  };

  return (
    <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0 flex flex-col justify-between">
      <header>
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">What Makes Us Different</h2>
      </header>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <FeatureAccordion
            key={index}
            icon={feature.icon}  // Icon passed to FeatureAccordion
            title={feature.title}
            description={feature.description}
            isOpen={openIndex === index} // Check if this accordion is open
            toggleAccordion={() => toggleAccordion(index)} // Pass the toggle function
          />
        ))}
      </div>

      {/* Solid button (no gradients) */}
      <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

// Accordion feature item with icon
const FeatureAccordion = ({ icon: Icon, title, description, isOpen, toggleAccordion }) => (
  <div className="border border-gray-200 rounded-lg">
    <header
      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
      onClick={toggleAccordion}
    >
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-4" />
        <h3 className="text-md font-semibold-100 text-gray-900">{title}</h3>
      </div>
      <ChevronDownIcon
        className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </header>
    {isOpen && (
      <div className="p-4 bg-white">
        <p className="text-gray-600">{description}</p>
      </div>
    )}
  </div>
);

// Features with icons
const features = [
  {
    icon: GrGroup, // Icon for the first feature
    title: 'Top-Tier Talent Ready for Action',
    description:
      'Our platform boasts a pool of highly skilled professionals ready to jump into impactful projects. Whether you need short-term assistance or long-term partnerships, Funti3r ensures that businesses find the best talent to meet their needs.',
  },
  {
    icon: GrGlobe, // Icon for the second feature
    title: 'Pan-African Footprint, Global Reach',
    description:
      'Funti3r has established strong partner networks across Africa, giving businesses access to talent from diverse emerging markets. While our reach is pan-African, our vision is global—we provide access to the best talent from developing countries worldwide.',
  },
  {
    icon: GrInherit , // Icon for the third feature
    title: 'Accurate Project Matchmaking',
    description:
      'With our intelligent matchmaking system, we guarantee that the right talent is paired with the right projects. Our approach considers both skillsets and specific business needs to ensure optimal results, every time.',
  },
];

export default TheDifference;
