import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserCheck, Building } from 'lucide-react';
import { registerUser } from '../api/auth';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        rollNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await registerUser(formData);
            alert('Registration successful! Redirecting to login...');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-gray)', padding: '2rem 1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-light)' }}>Join the Smart Complaint Management System</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="text"
                                    name="fullName"
                                    className="input-field"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="John Doe"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Roll Number</label>
                            <div style={{ position: 'relative' }}>
                                <UserCheck size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="text"
                                    name="rollNumber"
                                    className="input-field"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="20XX-XXX"
                                    required
                                    value={formData.rollNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="email@college.edu"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Hostel / Department</label>
                        <div style={{ position: 'relative' }}>
                            <Building size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', zIndex: 1 }} />
                            <select
                                name="department"
                                className="input-field"
                                style={{ paddingLeft: '40px', appearance: 'none', backgroundColor: '#111111' }}
                                required
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option value="">Select Hostel/Dept</option>
                                <option value="Hostel A">Hostel A</option>
                                <option value="Hostel B">Hostel B</option>
                                <option value="CSE Dept">CSE Dept</option>
                                <option value="ECE Dept">ECE Dept</option>
                                <option value="Library">Library</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="password"
                                name="password"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="password"
                                name="confirmPassword"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {error && (
                    <div style={{ marginTop: '1rem', color: '#dc2626', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
                    <p style={{ color: 'var(--text-light)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
