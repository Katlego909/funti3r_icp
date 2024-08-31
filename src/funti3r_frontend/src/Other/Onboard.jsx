import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../use-auth-client';

const Onboard = () => {
  const navigate = useNavigate();
  const { fetchProfileType } = useAuth(); // Access fetchProfileType from the context
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false); // To avoid multiple redirects

  useEffect(() => {
    const checkProfile = async () => {
      if (redirecting) return; // Avoid further execution if already redirecting
      setRedirecting(true); // Indicate that navigation is in progress

      try {
        // Fetch the profile type using the function from the auth context
        const profileType = await fetchProfileType();

        // Navigate based on the fetched profileType
        if (profileType === 'user') {
          navigate('/dashboard/user', { replace: true });
        } else if (profileType === 'business') {
          navigate('/dashboard/business', { replace: true });
        } 

        // console.log(`Profile type fetched: ${profileType}`);
      } catch (error) {
        console.error('Failed to fetch profile type:', error);
        navigate('/onboard/create-profile', { replace: true });
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
        setRedirecting(false); // Reset redirecting state
      }
    };

    checkProfile();
  }, [navigate, fetchProfileType, redirecting]);

  if (loading) {
    return <div>Loading...</div>;
  }
};

export default Onboard;
