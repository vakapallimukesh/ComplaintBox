import React from 'react';
import { ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)',
                color: 'var(--text-dark)',
                padding: '6rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                        Smart Complaint <br /> Management System
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Raise and track your campus issues easily. A transparent and efficient way to handle hostel, department, and facility complaints.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: 'var(--text-dark)' }}>
                            Raise Complaint <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-dark)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                            Track Status
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '5rem 1rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700' }}>How it Works</h2>
                        <p style={{ color: 'var(--text-light)' }}>Simple steps to get your issues resolved</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-gray)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-blue)' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>Register/Login</h3>
                            <p style={{ color: 'var(--text-light)' }}>Securely log in using your student credentials to access the system.</p>
                        </div>

                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-gray)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-blue)' }}>
                                <Clock size={32} />
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>Raise Issues</h3>
                            <p style={{ color: 'var(--text-light)' }}>Fill out a simple form with your complaint details and location.</p>
                        </div>

                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-gray)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-blue)' }}>
                                <CheckCircle size={32} />
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>Get Resolution</h3>
                            <p style={{ color: 'var(--text-light)' }}>Track status in real-time and get notified once your issue is fixed.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
