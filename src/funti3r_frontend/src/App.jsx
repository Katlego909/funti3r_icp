import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './use-auth-client';

import ProfileSelection from './Other/ProfileSelection';
import CreateUser from './Other/CreateUser';
import CreateBusiness from './Other/CreateBusiness';
import UserDashboard from './Other/UserDashboard';
import BusinessDashboard from './Other/BusinessDashboard';
import Notes from './Other/Notes';
import Login from './Other/Login';
import MyListedTasks from './Other/MyListedTasks';
import TaskMarketplace from './Other/TaskMarketPlace';
import Academy from './Other/Academy';


import Dashboard from './Components/Dashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <UserSidebar/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/onboard" element={<Onboard />} /> */}
          <Route path="/onboard/create-profile" element={<ProfileSelection />} />
          {/* //User */}
          <Route path="/onboard/user" element={<CreateUser />} />
          <Route path="/dashboard/user" element={<Dashboard />} />
          <Route path="/dashboard/task-marketplace" element={<TaskMarketplace />} />
          <Route path="/dashboard/academy" element={<Academy />} />
          <Route path="/dashboard/notes" element={<Notes />} />
          <Route path="/dashboard/user/profile" element={<UserDashboard />} />
          {/* <Route path="/dashboard/Settings" element={<UserSetting />} /> */}
          {/* Business */}
          <Route path="/onboard/business" element={<CreateBusiness />} />        
          <Route path="/dashboard/business" element={<BusinessDashboard />} />
          <Route path="/dashboard/business/mytasks" element={<MyListedTasks />} />
          <Route path="/dashboard/business/notes" element={<Notes />} />
          {/* <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute element={UserDashboard} allowedProfileType="user" />
            }
          />
          <Route
            path="/dashboard/business"
            element={
              <ProtectedRoute element={BusinessDashboard} allowedProfileType="business" />
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
