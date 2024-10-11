import React, { useEffect } from 'react';
import { useAuth } from '../../authentication/use-auth-client';

const BusinessProfile = () => {
  const { businessProfile, fetchBusinessProfile } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchBusinessProfile();
    };

    fetchProfile();
  }, [fetchBusinessProfile]);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg h-screen flex flex-col">
      {businessProfile ? (
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
            {/* Circular Placeholder for Profile Picture */}
            <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-semibold text-purple-800">{businessProfile.name}</h1>
              <p className="text-base text-gray-600">{businessProfile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-700 mb-2">Business Information</h2> {/* Increased font size */}
              <div className="text-base text-gray-600 space-y-2">
                <p><strong>Name:</strong> {businessProfile.name}</p>
                <p><strong>Email:</strong> {businessProfile.email}</p>
                <p><strong>Phone:</strong> {businessProfile.phone}</p>
                <p><strong>Location:</strong> {businessProfile.location}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium text-gray-700 mb-2">Business Description</h2> {/* Increased font size */}
              <p className="text-base text-gray-600">{businessProfile.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-purple-700">Loading Business profile...</p>
      )}
    </div>
  );
};

export default BusinessProfile;
