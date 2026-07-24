import React, { useEffect, useState } from 'react';
import {
    Users,
    ClipboardCheck,
    AlertTriangle,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';
import { getAdminMetrics, resetAppData } from '../api/auth';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        activeComplaints: 0,
        inProgress: 0,
        resolvedMonthly: 0,
        alerts: 0,
        totalComplaints: 0
    });

    const stats = [
        { title: 'Total Registered Users', countKey: 'totalUsers', icon: <Users />, color: 'var(--primary-blue)' },
        { title: 'Active Complaints', countKey: 'activeComplaints', icon: <AlertTriangle />, color: '#f59e0b' },
        { title: 'In Progress', countKey: 'inProgress', icon: <TrendingUp />, color: 'var(--primary-blue)' },
        { title: 'Resolved', countKey: 'resolvedMonthly', icon: <CheckCircle2 />, color: '#10b981' },
    ];

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {
        try {
            const data = await getAdminMetrics();
            setMetrics(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to clear all data? This will delete all users and complaints.')) {
            return;
        }
        
        try {
            await resetAppData();
            setMetrics({
                totalUsers: 0,
                activeComplaints: 0,
                inProgress: 0,
                resolvedMonthly: 0,
                alerts: 0,
                totalComplaints: 0
            });
            alert('All data cleared successfully.');
        } catch (error) {
            console.error(error);
            alert(error.message || 'Failed to reset data.');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Admin Overview</h2>
                    <p style={{ color: 'var(--text-light)' }}>System-wide complaint statistics and activity.</p>
                </div>
                <button className="btn btn-outline" onClick={handleReset} style={{ whiteSpace: 'nowrap' }}>
                    Clear all data
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: `${stat.color}15`, padding: '1rem', borderRadius: '12px', color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500' }}>{stat.title}</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{metrics[stat.countKey]}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                    System Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#111111', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Total Complaints:</span>
                        <span style={{ fontWeight: '700' }}>{metrics.totalComplaints}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#111111', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Pending Complaints:</span>
                        <span style={{ fontWeight: '700', color: '#f59e0b' }}>{metrics.activeComplaints - metrics.inProgress}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#111111', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-light)' }}>In Progress:</span>
                        <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>{metrics.inProgress}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#111111', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Resolved:</span>
                        <span style={{ fontWeight: '700', color: '#10b981' }}>{metrics.resolvedMonthly}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
