import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getUserComplaints } from '../api/auth';

const MyComplaints = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {
        try {
            const savedUser = localStorage.getItem('complaintUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                const data = await getUserComplaints(user.id);
                setComplaints(data.complaints || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <span className="badge badge-pending">Pending</span>;
            case 'In Progress': return <span className="badge badge-in-progress">In Progress</span>;
            case 'Resolved': return <span className="badge badge-resolved">Resolved</span>;
            case 'Rejected': return <span className="badge badge-rejected">Rejected</span>;
            default: return <span className="badge">{status}</span>;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} color="#92400e" />;
            case 'In Progress': return <AlertCircle size={16} color="#b91c1c" />;
            case 'Resolved': return <CheckCircle size={16} color="#065f46" />;
            case 'Rejected': return <XCircle size={16} color="#991b1b" />;
            default: return null;
        }
    };

    const filteredComplaints = complaints.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>My Complaints</h2>
                    <p style={{ color: 'var(--text-light)' }}>View and track the status of your reported issues.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            className="input-field"
                            style={{ paddingLeft: '40px', width: '250px' }}
                            placeholder="Search by ID or Title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
                        Loading complaints...
                    </div>
                ) : complaints.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>You haven't submitted any complaints yet.</p>
                        <button className="btn btn-primary" onClick={() => window.location.href = '/complaint-portal'}>
                            Raise Your First Complaint
                        </button>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#111111', borderBottom: '1px solid #27272a' }}>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-light)' }}>Complaint ID</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-light)' }}>Title</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-light)' }}>Category</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-light)' }}>Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-light)' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.map((complaint) => (
                                <tr key={complaint.id} style={{ borderBottom: '1px solid #27272a', transition: 'background 0.2s' }} className="table-row-hover">
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--primary-blue)' }}>{complaint.id}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>{complaint.title}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ backgroundColor: 'var(--bg-gray)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8125rem' }}>
                                            {complaint.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>{complaint.date}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {getStatusIcon(complaint.status)}
                                            {getStatusBadge(complaint.status)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <style>{`
        .table-row-hover:hover {
          background-color: #1a1a1a;
        }
      `}</style>
        </div>
    );
};

export default MyComplaints;
