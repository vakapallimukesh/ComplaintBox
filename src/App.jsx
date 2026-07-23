import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ComplaintPortal from './pages/ComplaintPortal';
import RaiseComplaint from './pages/RaiseComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetails from './pages/ComplaintDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import AdminUpdate from './pages/AdminUpdate';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout isLanding={true}><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/complaint-portal" element={<Layout><ComplaintPortal /></Layout>} />
        <Route path="/raise-complaint" element={<Layout><RaiseComplaint /></Layout>} />
        <Route path="/my-complaints" element={<Layout><MyComplaints /></Layout>} />
        <Route path="/complaint/:id" element={<Layout><ComplaintDetails /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Layout isAdmin={true}><AdminDashboard /></Layout>} />
        <Route path="/admin/complaints" element={<Layout isAdmin={true}><AdminComplaints /></Layout>} />
        <Route path="/admin/update/:id" element={<Layout isAdmin={true}><AdminUpdate /></Layout>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
