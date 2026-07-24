import React, { useEffect, useState } from 'react';
import { ClipboardList, Clock, CheckCircle, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserComplaints } from '../api/auth';

const StatCard = ({ title, count, icon, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${color}` }}>
        <div style={{ backgroundColor: `${color}15`, padding: '1rem', borderRadius: '12px', color: color }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500' }}>{title}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{count}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Student');
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('complaintUser');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setUserName(parsed.name || parsed.fullName || 'Student');
            loadUserStats(parsed.id);
        }
    }, []);

    const loadUserStats = async (userId) => {
        try {
            const data = await getUserComplaints(userId);
            const complaints = data.complaints || [];
            
            setStats({
                total: complaints.length,
                pending: complaints.filter(c => c.status === 'Pending').length,
                inProgress: complaints.filter(c => c.status === 'In Progress').length,
                resolved: complaints.filter(c => c.status === 'Resolved').length
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Welcome back, {userName}</h2>
                    <p style={{ color: 'var(--text-light)' }}>Here's what's happening with your complaints.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/complaint-portal')}
                >
                    <PlusCircle size={20} /> Raise New Complaint
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard title="Total Complaints" count={stats.total} icon={<ClipboardList size={24} />} color="var(--primary-blue)" />
                <StatCard title="Pending" count={stats.pending} icon={<Clock size={24} />} color="var(--warning)" />
                <StatCard title="In Progress" count={stats.inProgress} icon={<Clock size={24} />} color="var(--primary-blue)" />
                <StatCard title="Resolved" count={stats.resolved} icon={<CheckCircle size={24} />} color="var(--success)" />
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: '700' }}>Recent Activity</h3>
                    <button
                        style={{ color: 'var(--primary-blue)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('/my-complaints')}
                    >
                        View All
                    </button>
                </div>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    {stats.total === 0 ? (
                        <>
                            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>You haven't submitted any complaints yet.</p>
                            <button className="btn btn-primary" onClick={() => navigate('/complaint-portal')}>Raise Your First Complaint</button>
                        </>
                    ) : (
                        <>
                            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>View all your complaints and their current status.</p>
                            <button className="btn btn-outline" onClick={() => navigate('/my-complaints')}>Go to My Complaints</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
