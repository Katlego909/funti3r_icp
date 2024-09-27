import React from 'react';
import '../App.css'; 
import UserSidebar from './UserSidebar'; 

const courses = [
  {
    id: 1,
    title: 'Course 1',
    description: 'Learn the basics of programming',
    imageUrl: '/images/Course1.png',
    enrollLink: 'https://example.com/enroll-course1'
  },
  {
    id: 2,
    title: 'Course 2',
    description: 'Advanced topics in web development',
    imageUrl: '/images/Course2.png',
    enrollLink: 'https://example.com/enroll-course2'
  },
  {
    id: 3,
    title: 'Course 3',
    description: 'Introduction to data science',
    imageUrl: '/images/Course3.png',
    enrollLink: 'https://example.com/enroll-course3'
  },
  {
    id: 4,
    title: 'Course 4',
    description: 'Mastering machine learning',
    imageUrl: '/images/Course4.png',
    enrollLink: 'https://example.com/enroll-course4'
  },
];

// Main functional component for the Academy page
function Academy() {
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Academy</h1>
        {/* Display courses */}
        <div className="flex flex-col gap-4">
          {courses.map(course => (
            <div key={course.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                className="w-full md:w-1/3 object-cover" 
                src={course.imageUrl} 
                alt={course.title} 
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <a 
                    href={course.enrollLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Academy;
