import React from 'react'
import { CurrencyDollarIcon, UserGroupIcon, AdjustmentsHorizontalIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import { GrMoney , GrGlobe, GrBarChart, GrUser  } from "react-icons/gr";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Cost Reduction",
      description: "Cut down on operational costs without compromising on quality. Funti3r's talent solutions help businesses maintain a high standard while staying budget-conscious.",
      icon: <GrMoney  className="h-12 w-12 mb-4" />
    },
    {
      title: "Skilled Talent Pool",
      description: "Access a diverse pool of skilled professionals ready to tackle your projects. Our rigorous vetting process ensures you get top-tier talent for your specific needs.",
      icon: <GrUser className="h-12 w-12 mb-4" />
    },
    {
      title: "Flexibility",
      description: "Scale your workforce up or down based on your project requirements. Our flexible engagement models adapt to your business needs, providing agility in resource management.",
      icon: <GrBarChart  className="h-12 w-12 mb-4" />
    },
    {
      title: "Global Reach",
      description: "Tap into a worldwide network of talent. Funti3r connects you with professionals across different time zones, enabling round-the-clock productivity and diverse perspectives.",
      icon: <GrGlobe className="h-12 w-12 mb-4" />
    }
  ]

  return (
    <section id="why-us" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start mb-12">
          <h2 className="text-4xl font-semibold mb-4 md:mb-0 md:w-1/2">Why Choose Funti3r</h2>
          <p className="text-base md:w-1/2 leading-relaxed ">
            We deliver tangible value to businesses looking for talent and to professionals looking for meaningful work.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col">
              {reason.icon}
              <h3 className="text-xl font-semibold-200 mb-3">{reason.title}</h3>
              <p className="leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
