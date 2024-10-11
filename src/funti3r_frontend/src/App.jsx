import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth} from '../src/authentication/use-auth-client';

// Business imports
import BusinessLayout from './components/business/BusinessLayout';
import BusinessDashboard from './pages/business/BusinessDashboard';
import BusinessProfile from './pages/business/Businessprofile';
import CreateTask from './pages/business/CreateTask';
import MyListedTasks from './pages/business/MyListedTasks';
import BusinessNotes from './pages/business/Notes';
import CreateBusiness from "./pages/business/CreateBusiness"

// User imports
import UserLayout from './components/user/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import UserTaskMarketPlace from './pages/user/TaskMarketPlace';
import UserProfile from './pages/user/UserProfile';
import UserNotes from './pages/user/Notes';
import CreateUser from './pages/user/CreateUser';

// Other
import Login from './pages/Login';


import ProfileSelection from './pages/common/ProfileSelection';

const App = () => {
  //  const isAuthenticated = true; // This should be updated based on your auth logic
  //  const profileType = 'business';  // Either 'user' or 'business' based on the logged-in user
 const { isAuthenticated, profileType } = useAuth(); // Access isAuthenticated and profileType from the context


  return (
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />
          <Route path="/create-profile" element={<ProfileSelection />} />
          <Route path="/create-profile/user" element={<CreateUser />} />
          <Route path="/create-profile/business" element={<CreateBusiness />} />
          
        
          {/* User Routes */}
          {isAuthenticated && profileType === 'user' && (
            <Route path="/user" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="task-marketplace" element={<UserTaskMarketPlace />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="notes" element={<UserNotes />} />
            </Route>
          )}

          {/* Business Routes */}
          {isAuthenticated && profileType === 'business' && (
            <Route path="/business" element={<BusinessLayout />}>
              <Route path="dashboard" element={<BusinessDashboard />} />
              <Route path="profile" element={<BusinessProfile />} />
              <Route path="create-task" element={<CreateTask />} />
              <Route path="my-listed-tasks" element={<MyListedTasks />} />
              <Route path="notes" element={<BusinessNotes />} />
            </Route>
          )}

          {/* Fallback to Business layout for any other unspecified paths */}
          <Route path="*" element={<Navigate to={isAuthenticated ? `/${profileType}/dashboard` : '/'} />} />
        </Routes>
      </Router>
  );
};


export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
