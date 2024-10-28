import React from 'react';

const CTA = () => {
  return (
    <section className="bg-blue-600 py-16 text-center">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-4xl text-white font-semibold mb-6">
          Join Funti3r today!
        </h1>
        
        {/* Description */}
        <p className="max-w-lg mx-auto text-xl text-white mb-4">
          Whether you're a business looking for exceptional talent or a professional seeking new opportunities, Funti3r is the platform for you.
        </p>

        <p className="max-w-lg mx-auto md:text-xl font-semibold text-white">
          {/* <span className="block md:text-xl">Empower your business. Elevate your career.</span> */}
        </p>

        {/* Button */}
        <div className="mt-8">
          <a 
            href="#get-started" 
            className="inline-block px-8 py-3 bg-cyan-500 text-white rounded-md hover:bg-red-600 transition duration-300">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
