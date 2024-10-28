import React from 'react';
import successImage from '../assets/images/hero-img.jpg';

const DriveSuccess = () => {
  return (
    <section id="drive-success" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-semibold mb-8">How We Drive Success</h2>
              
              <div className="space-y-6">
                <Feature
                  number="1"
                  title="Skills Development"
                  description="Our talent is equipped with the skills needed to meet both present and future demands. We provide continuous learning opportunities, ensuring that our workforce stays ahead of the curve in a fast-changing global market."
                />
                <Feature
                  number="2"
                  title="Workforce Management"
                  description="We use data-driven insights and best practices to manage talent efficiently. Our management processes ensure that teams are productive, engaged, and consistently delivering high-quality results for every project."
                />
                <Feature
                  number="3"
                  title="Business Solutions"
                  description="Our talent is committed to providing solutions that create real business impact. By aligning the right skills with the right tasks, we ensure that companies achieve their growth objectives while maintaining operational efficiency."
                />
              </div>
            </div>
            
            {/* <button className="mt-8 px-6 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300 self-start">
              Get Started
            </button> */}
          </div>
          
          {/* Right side - Image */}
          <div className="lg:w-1/2 flex">
            <img 
              src={successImage} 
              alt="Drive Success" 
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ number, title, description }) => (
  <div className="relative flex items-start">
    <div className="flex-shrink-0">
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mr-4">
        {number}
      </span>
    </div>
    <div>
      <h3 className="text-xl font-semibold-200 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default DriveSuccess;
