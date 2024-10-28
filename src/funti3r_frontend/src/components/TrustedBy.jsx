import React from 'react';
import logo1 from '../assets/images/suncash.png';
import logo2 from '../assets/images/iexperience.png';
import logo3 from '../assets/images/ayoba.png';
import logo4 from '../assets/images/fonbnk.svg';

const TrustedBy = () => {
  const logos = [logo1, logo2, logo3, logo4];

  return (
    <section id="trusted-by" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold-200 text-left mb-8">Trusted by</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-start">
              <img
                src={logo}
                alt={`Trusted company logo ${index + 1}`}
                className="w-24 object-contain" // Reduced the height for smaller logos
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
