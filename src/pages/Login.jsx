import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

const Login = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const { user } = await loginUser({ identifier, password });
            localStorage.setItem('complaintUser', JSON.stringify(user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-gray)', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Student Login</h2>
                    <p style={{ color: 'var(--text-light)' }}>Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Roll Number / Email</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter your roll no or email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: '500', fontSize: '0.875rem' }}>Password</label>
                            <Link to="#" style={{ fontSize: '0.8125rem', color: 'var(--primary-blue)' }}>Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                {error && (
                    <div style={{ marginTop: '1rem', color: '#dc2626', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Register here</Link>
                    </p>
                    <div style={{ borderTop: '1px solid #27272a', paddingTop: '1.5rem' }}>
                        <Link to="/admin-login" style={{ color: 'var(--text-light)', fontSize: '0.8125rem' }}>Admin Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
