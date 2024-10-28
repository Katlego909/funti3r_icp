import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

// Reusable feature component for each benefit
const BenefitFeature = ({ title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <FaCheckCircle className="text-4xl text-green-500" />
      <div>
        <h3 className="text-lg font-semibold-200 mb-2">{title}</h3>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

const TheBenefits = () => {
  return (
    <section id="empowering-talent" className="py-20 bg-gray-50">
      <div className="container mx-auto px-2">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-semibold mb-6">Empowering Talent</h2>
              <p className="text-gray-800 mb-6">
                At Funti3r, we don’t just connect talent to projects—we help you grow.
                Here’s what you can expect when you join our platform:
              </p>
              <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-gray-400 transition duration-300 self-start">
                Get Started
              </button>
            </div>
          </div>

          {/* Right side - Benefits/Features */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitFeature
              title="Start Working Sooner"
              description="You’ll gain quick access to a wide network of global businesses."
            />
            <BenefitFeature
              title="Learn and Earn"
              description="We believe in professional growth while earning competitive pay."
            />
            <BenefitFeature
              title="Top Employers"
              description="Collaborate with leading employers who value your skills."
            />
            <BenefitFeature
              title="Boost Your Prospects"
              description="By working with industry leaders and gaining hands-on experience."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheBenefits;
