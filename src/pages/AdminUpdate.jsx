import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, User, MapPin, MessageSquare } from 'lucide-react';
import { getComplaintById, updateComplaintStatus } from '../api/auth';

const AdminUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isUpdating, setIsUpdating] = useState(false);
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Pending');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadComplaint();
    }, [id]);

    const loadComplaint = async () => {
        try {
            const data = await getComplaintById(id);
            setComplaint(data.complaint);
            setStatus(data.complaint.status);
            setResponse(data.complaint.adminResponse || '');
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Complaint not found');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setError('');

        try {
            await updateComplaintStatus(id, status, response);
            alert('Status updated successfully!');
            navigate('/admin/complaints');
        } catch (err) {
            setError(err.message || 'Failed to update complaint');
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                Loading complaint details...
            </div>
        );
    }

    if (error && !complaint) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</p>
                <button className="btn btn-outline" onClick={() => navigate('/admin/complaints')}>
                    Back to Complaints
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/complaints')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '500' }}
            >
                <ArrowLeft size={20} /> Back to All Complaints
            </button>

            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Process Complaint: {complaint.id}</h2>
                <p style={{ color: 'var(--text-light)' }}>Review details and provide an official response.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Complaint Details Card */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-blue)' }}>{complaint.title}</h3>
                            <span className={`badge badge-${complaint.status.toLowerCase().replace(' ', '-')}`} style={{ padding: '0.25rem 1rem' }}>{complaint.status}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description</p>
                                <p style={{ lineHeight: '1.6' }}>{complaint.description}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Submitted By</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={16} />
                                        <span style={{ fontWeight: '500' }}>{complaint.student}</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Location</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={16} />
                                        <span style={{ fontWeight: '500' }}>{complaint.branch} - {complaint.locationDetail}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Section Card */}
                    <div className="card" style={{ borderTop: '4px solid var(--primary-blue)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={22} color="var(--primary-blue)" /> Take Action
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Update Status</label>
                                <select 
                                    className="input-field" 
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Admin Response / Notes</label>
                                <textarea
                                    className="input-field"
                                    style={{ minHeight: '120px', resize: 'vertical' }}
                                    placeholder="Type your response to the student here..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    required
                                ></textarea>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                                    This response will be visible to the student on their dashboard.
                                </p>
                            </div>

                            {error && (
                                <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => navigate('/admin/complaints')} className="btn btn-outline" style={{ flex: 1 }}>Discard</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isUpdating}>
                                    {isUpdating ? 'Updating...' : 'Update & Notify Student'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <div className="card" style={{ backgroundColor: '#111111', border: '1px solid #27272a' }}>
                        <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={18} /> Processing Tips
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-light)', padding: '0', listStyle: 'none' }}>
                            <li>• Inspect the location within 24 hours.</li>
                            <li>• Provide clear timelines for resolution.</li>
                            <li>• For rejected complaints, state a valid reason.</li>
                            <li>• Mark as resolved only after physical verification.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUpdate;
