import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getComplaints } from '../api/auth';

const AdminComplaints = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [allComplaints, setAllComplaints] = useState([]);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {
        try {
            const data = await getComplaints();
            setAllComplaints(data.complaints || []);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Pending': <span className="badge badge-pending">Pending</span>,
            'In Progress': <span className="badge badge-in-progress">In Progress</span>,
            'Resolved': <span className="badge badge-resolved">Resolved</span>,
            'Rejected': <span className="badge badge-rejected">Rejected</span>,
        };
        return badges[status] || <span className="badge">{status}</span>;
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Manage Complaints</h2>
                    <p style={{ color: 'var(--text-light)' }}>Review and update the status of submitted complaints.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                        Total Complaints: <strong>{allComplaints.length}</strong>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            className="input-field"
                            style={{ paddingLeft: '40px' }}
                            placeholder="Search by ID, Student Name, or Title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select className="input-field" style={{ width: '180px' }}>
                        <option>All Categories</option>
                        <option>Hostel</option>
                        <option>Lab</option>
                        <option>Classroom</option>
                    </select>
                    <select className="input-field" style={{ width: '180px' }}>
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                {allComplaints.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                            No complaints submitted yet.
                        </p>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            Complaints will appear here once students start submitting them.
                        </p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem' }}>ID</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Student Name</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Category</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allComplaints.map((complaint) => (
                                <tr key={complaint.id} style={{ borderBottom: '1px solid #27272a' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--primary-blue)' }}>{complaint.id}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>{complaint.student}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>{complaint.category}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-light)' }}>{complaint.date}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>{getStatusBadge(complaint.status)}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem' }} title="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: '0.4rem', backgroundColor: 'var(--primary-blue)' }}
                                                title="Update Status"
                                                onClick={() => navigate(`/admin/update/${complaint.id}`)}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', border: '1px solid var(--danger)', color: 'var(--danger)' }} title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminComplaints;
