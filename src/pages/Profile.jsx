import React, { useEffect, useState } from 'react';
import { User, Mail, Building, Phone, Calendar, Key, Save } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'Guest',
        rollNo: '',
        email: '',
        dept: '',
        hostel: '',
        phone: '',
        joined: ''
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('complaintUser');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setUser({
                name: parsed.name || parsed.fullName || 'Guest',
                rollNo: parsed.rollNo || '',
                email: parsed.email || '',
                dept: parsed.dept || '',
                hostel: parsed.hostel || '',
                phone: parsed.phone || '',
                joined: parsed.joined || ''
            });
        }
    }, []);

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Profile Settings</h2>
                <p style={{ color: 'var(--text-light)' }}>Manage your account information and preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Left Side - Profile Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-gray)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--primary-blue)',
                            border: '4px solid #27272a',
                            boxShadow: 'var(--shadow)'
                        }}>
                            <User size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{user.name}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Roll No: {user.rollNo}</p>

                        <div style={{ borderTop: '1px solid #27272a', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Mail size={16} color="var(--text-light)" />
                                <span style={{ fontSize: '0.875rem' }}>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Calendar size={16} color="var(--text-light)" />
                                <span style={{ fontSize: '0.875rem' }}>Joined {user.joined}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h4 style={{ fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Key size={18} /> Password
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>Update your password to keep your account secure.</p>
                        <button className="btn btn-outline" style={{ width: '100%' }}>Change Password</button>
                    </div>
                </div>

                {/* Right Side - Information Form */}
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem' }}>Personal Information</h3>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Full Name</label>
                                <input type="text" className="input-field" defaultValue={user.name} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Roll Number</label>
                                <input type="text" className="input-field" defaultValue={user.rollNo} disabled />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Email Address</label>
                            <input type="email" className="input-field" defaultValue={user.email} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Department</label>
                                <input type="text" className="input-field" defaultValue={user.dept} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Phone Number</label>
                                <input type="text" className="input-field" defaultValue={user.phone} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Hostel Detail</label>
                            <input type="text" className="input-field" defaultValue={user.hostel} />
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}>
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
