import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Monitor,
    ClipboardList,
    User,
    Settings,
    ShieldCheck
} from 'lucide-react';

const Sidebar = ({ isOpen, isAdmin = false }) => {
    const menuItems = isAdmin ? [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { title: 'All Complaints', icon: <ClipboardList size={20} />, path: '/admin/complaints' },
        { title: 'Users', icon: <User size={20} />, path: '/admin/users' },
    ] : [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { title: 'Complaint Portal', icon: <Monitor size={20} />, path: '/complaint-portal' },
        { title: 'My Complaints', icon: <ClipboardList size={20} />, path: '/my-complaints' },
        { title: 'Profile', icon: <User size={20} />, path: '/profile' },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{
            width: isOpen ? '260px' : '0',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            zIndex: 999,
            paddingTop: '80px'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.875rem 1rem',
                            borderRadius: 'var(--radius)',
                            color: 'var(--text-dark)',
                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                            whiteSpace: 'nowrap'
                        })}
                    >
                        {item.icon}
                        <span style={{ fontWeight: '500' }}>{item.title}</span>
                    </NavLink>
                ))}

                {isAdmin && (
                    <div style={{ marginTop: '2rem', padding: '0 1rem' }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.5rem' }}>System</p>
                        <NavLink
                            to="/settings"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                color: 'white',
                                opacity: 0.8,
                                textDecoration: 'none',
                                padding: '0.5rem 0'
                            }}
                        >
                            <Settings size={18} />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                )}
            </div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '1rem',
                right: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                borderRadius: 'var(--radius)',
                display: isOpen ? 'block' : 'none'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={20} color="#fbbf24" />
                    <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Secure System</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
