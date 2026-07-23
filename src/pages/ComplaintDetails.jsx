import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, MessageSquare, CheckCircle } from 'lucide-react';

const ComplaintDetails = () => {
    const navigate = useNavigate();
    // In a real app, we'd fetch data using the ID
    const complaint = {
        id: 'C-1002',
        title: 'Water leakage in Washroom',
        category: 'Plumbing',
        location: 'Hostel Block B, 2nd Floor',
        description: 'There is a severe water leakage in the first washroom on the left side of the corridor. The floor is always wet and it might cause someone to slip.',
        status: 'In Progress',
        dateSubmitted: '2026-02-18',
        lastUpdated: '2026-02-19',
        adminResponse: 'A plumber has been assigned to this issue. The work will be completed by tomorrow evening.',
        submittedBy: 'Harshi (20SC-001)'
    };

    const statusColors = {
        'Pending': 'var(--warning)',
        'In Progress': 'var(--primary-blue)',
        'Resolved': 'var(--success)',
        'Rejected': 'var(--danger)'
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/my-complaints')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '500' }}
            >
                <ArrowLeft size={20} /> Back to My Complaints
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{complaint.title}</h2>
                        <span style={{
                            backgroundColor: `${statusColors[complaint.status]}15`,
                            color: statusColors[complaint.status],
                            padding: '0.4rem 1.2rem',
                            borderRadius: '9999px',
                            fontWeight: '700',
                            fontSize: '0.875rem',
                            border: `1px solid ${statusColors[complaint.status]}30`
                        }}>{complaint.status}</span>
                    </div>
                    <p style={{ color: 'var(--text-light)', fontSize: '1rem' }}>ID: <span style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>{complaint.id}</span></p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MessageSquare size={22} color="var(--primary-blue)" /> Description
                        </h3>
                        <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>{complaint.description}</p>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid #27272a', paddingTop: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Attachments</h4>
                            <div style={{ width: '150px', height: '100px', backgroundColor: '#111111', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                                No image uploaded
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CheckCircle size={22} color="var(--primary-blue)" /> Admin Response
                        </h3>
                        {complaint.adminResponse ? (
                            <div>
                                <p style={{ color: 'var(--text-dark)', lineHeight: '1.6', marginBottom: '1rem' }}>{complaint.adminResponse}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Last updated on {complaint.lastUpdated}</p>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>Waiting for administrator to review and respond.</p>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.25rem' }}>Details</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <MapPin size={20} color="var(--text-light)" />
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '500' }}>LOCATION</p>
                                    <p style={{ fontWeight: '600' }}>{complaint.location}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Calendar size={20} color="var(--text-light)" />
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '500' }}>SUBMITTED ON</p>
                                    <p style={{ fontWeight: '600' }}>{complaint.dateSubmitted}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <User size={20} color="var(--text-light)" />
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '500' }}>SUBMITTED BY</p>
                                    <p style={{ fontWeight: '600' }}>{complaint.submittedBy}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--text-dark)' }}>
                        <h4 style={{ fontWeight: '700', marginBottom: '0.75rem' }}>Need Help?</h4>
                        <p style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: '1.5' }}>
                            If you have further questions regarding this complaint, please contact the campus administrator directly.
                        </p>
                        <button className="btn" style={{ width: '100%', marginTop: '1.25rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-dark)' }}>
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
