import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, MapPin, Send, AlertCircle, ArrowLeft, Building2 } from 'lucide-react';
import { submitComplaint } from '../api/auth';

const RaiseComplaint = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        branch: '',
        locationDetail: '',
        description: '',
        image: null
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) {
            setCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
        } else {
            navigate('/complaint-portal');
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const savedUser = localStorage.getItem('complaintUser');
            if (!savedUser) {
                setError('User not found. Please login again.');
                setIsSubmitting(false);
                return;
            }

            const user = JSON.parse(savedUser);

            const complaintData = {
                userId: user.id,
                title: formData.title,
                branch: formData.branch,
                locationDetail: formData.locationDetail,
                description: formData.description,
                category: category
            };

            await submitComplaint(complaintData);
            setIsSubmitted(true);
            setTimeout(() => {
                navigate('/my-complaints');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to submit complaint');
            setIsSubmitting(false);
        }
    };

    const branches = [
        'Computer Science (CSE)',
        'Electronics (ECE)',
        'Mechanical (ME)',
        'Civil (CE)',
        'Information Technology (IT)',
        'Electrical (EEE)',
        'Other'
    ];

    if (isSubmitted) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'var(--success)', color: 'white', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <Send size={48} />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Complaint Submitted!</h2>
                <p style={{ color: 'var(--text-light)', maxWidth: '400px' }}>Your {category} complaint has been successfully registered. Our team will look into it shortly.</p>
                <p style={{ marginTop: '1rem', fontWeight: '500', color: 'var(--primary-blue)' }}>Redirecting...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/complaint-portal')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '500' }}
            >
                <ArrowLeft size={20} /> Back to Portal
            </button>

            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Raise {category} Complaint</h2>
                <p style={{ color: 'var(--text-light)' }}>Provide details about the issue in the {category} module.</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Complaint Title</label>
                        <input
                            type="text"
                            name="title"
                            className="input-field"
                            placeholder={`e.g., ${category === 'Classroom' ? 'Broken fan in Room 302' : 'Issue in ' + category}`}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Branch / Dept</label>
                            <div style={{ position: 'relative' }}>
                                <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', zIndex: 1 }} />
                                <select
                                    name="branch"
                                    className="input-field"
                                    style={{ paddingLeft: '40px', appearance: 'none', backgroundColor: '#111111' }}
                                    required
                                    onChange={handleChange}
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Specific Location</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="text"
                                    name="locationDetail"
                                    className="input-field"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="e.g., Lab 2, 3rd Floor"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Detailed Description</label>
                        <textarea
                            name="description"
                            className="input-field"
                            style={{ minHeight: '150px', resize: 'vertical' }}
                            placeholder="Please describe your problem in detail..."
                            required
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Attach Photo (Recommended)</label>
                        <label style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            border: '2px dashed #4b5563',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s',
                            backgroundColor: '#111111'
                        }}>
                            <Upload size={32} style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }} />
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                                {formData.image ? formData.image.name : 'Click to upload photo of the problem'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>PNG, JPG up to 10MB</span>
                            <input type="file" name="image" style={{ display: 'none' }} onChange={handleChange} accept="image/*" />
                        </label>
                        {formData.image && (
                            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--success)', fontWeight: '500' }}>
                                Photo attached successfully!
                            </p>
                        )}
                    </div>

                    <div style={{ backgroundColor: '#1f1f1f', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '0.75rem', border: '1px solid #27272a' }}>
                        <AlertCircle size={20} color="var(--primary-blue)" />
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            Submitting this will notify the {category} department administrator immediately.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/complaint-portal')} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: 'var(--danger)', fontSize: '0.9rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RaiseComplaint;
