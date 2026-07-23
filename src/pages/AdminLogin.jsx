import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { loginAdmin, resetAppData } from '../api/auth';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const { admin } = await loginAdmin({ email, password });
            localStorage.setItem('complaintAdmin', JSON.stringify(admin));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-gray)', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--primary-blue)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Admin Portal</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Secure access for system administrators</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Admin Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                    <input
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="admin@college.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', backgroundColor: 'var(--primary-blue)', color: 'var(--text-dark)' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Access Dashboard'}
                    </button>
                </form>

                {error && (
                    <div style={{ marginTop: '1rem', color: '#dc2626', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <button
                    type="button"
                    className="btn btn-outline"
                    style={{ width: '100%', marginTop: '1rem' }}
                    onClick={async () => {
                        setError('');
                        try {
                            localStorage.removeItem('complaintUser');
                            localStorage.removeItem('complaintAdmin');
                            await resetAppData();
                            alert('All stored data cleared. You can register and login again.');
                            navigate('/login');
                        } catch (err) {
                            setError(err.message);
                        }
                    }}
                >
                    Clear all stored data
                </button>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/login" style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Back to Student Login</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
