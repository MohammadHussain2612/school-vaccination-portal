import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ManageStudents from './components/ManageStudents';
import ManageDrives from './components/ManageDrives';
import Navbar from './components/Navbar';
import Reports from './components/Reports';

import { useAuth } from './context/AuthContext';
import './styles/App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-students" element={isAuthenticated ? <ManageStudents /> : <Navigate to="/login" />} />
        <Route path="/manage-drives" element={isAuthenticated ? <ManageDrives /> : <Navigate to="/login" />} />
        <Route path="/generate-reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
