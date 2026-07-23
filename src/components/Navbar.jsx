import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, Menu, Crown } from 'lucide-react';

const Navbar = ({ toggleSidebar, user = { name: 'Guest' }, isLanding = false, isAdmin = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('complaintUser');
    localStorage.removeItem('complaintAdmin');
    navigate(isAdmin ? '/admin-login' : '/login');
  };

  return (
    <nav className="navbar" style={{
      height: '64px',
      backgroundColor: 'var(--bg-gray)',
      borderBottom: '1px solid #27272a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {!isLanding && (
          <button 
            onClick={toggleSidebar}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-dark)'
            }}
          >
            <Menu size={24} />
          </button>
        )}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontWeight: '700',
          fontSize: '1.25rem',
          color: 'var(--primary-blue)'
        }}>
          <span style={{ 
            backgroundColor: 'var(--primary-blue)', 
            color: 'var(--text-dark)', 
            padding: '2px 8px', 
            borderRadius: '4px' 
          }}>SCMS</span>
          <span className="hidden-mobile">ComplaintBox</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {isLanding ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
          </div>
        ) : (
          <>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
              <Bell size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid #27272a', paddingLeft: '1.5rem' }}>
              <div style={{ textAlign: 'right', lineHeight: '1' }}>
                <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{user?.name || 'Guest'}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{isAdmin ? 'Administrator' : 'Student'}</p>
              </div>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--bg-gray)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)'
              }}>
                <User size={18} />
              </div>
              <button 
                className="btn btn-outline" 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.45rem 0.75rem',
                  color: 'var(--text-dark)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.18)'
                }}
                title="Logout"
                onClick={handleLogout}
              >
                <Crown size={16} />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
