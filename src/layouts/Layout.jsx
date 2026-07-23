import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children, isLanding = false, isAdmin = false }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const adminData = localStorage.getItem('complaintAdmin');
        const studentData = localStorage.getItem('complaintUser');

        if (isAdmin && adminData) {
            setCurrentUser(JSON.parse(adminData));
        } else if (!isAdmin && studentData) {
            setCurrentUser(JSON.parse(studentData));
        } else {
            setCurrentUser(null);
        }
    }, [location.pathname, isAdmin]);

    return (
        <div className="layout" style={{ minHeight: '100vh', display: 'flex' }}>
            {!isLanding && (
                <Sidebar isOpen={isSidebarOpen} isAdmin={isAdmin} />
            )}

            <div style={{
                flex: 1,
                marginLeft: !isLanding ? (isSidebarOpen ? '260px' : '0') : '0',
                transition: 'margin-left 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Navbar toggleSidebar={toggleSidebar} isLanding={isLanding} isAdmin={isAdmin} user={currentUser} />

                <main style={{
                    marginTop: '64px',
                    padding: isLanding ? '0' : '2rem',
                    flex: 1
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
