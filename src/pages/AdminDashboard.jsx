import React, { useEffect, useState } from 'react';
import {
    Users,
    ClipboardCheck,
    AlertTriangle,
    CheckCircle2,
    PieChart as PieChartIcon,
    TrendingUp
} from 'lucide-react';
import { getAdminMetrics, resetAppData } from '../api/auth';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

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
        { title: 'Resolved (Monthly)', countKey: 'resolvedMonthly', icon: <CheckCircle2 />, color: '#10b981' },
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
            alert('All admin data cleared. Registered users and complaints are reset.');
        } catch (error) {
            console.error(error);
            alert(error.message || 'Failed to reset data.');
        }
    };

    const pieData = [
        { name: 'Hostel', value: 45 },
        { name: 'Lab', value: 25 },
        { name: 'Classroom', value: 20 },
        { name: 'Other', value: 10 },
    ];

    const barData = [
        { name: 'Mon', count: 12 },
        { name: 'Tue', count: 19 },
        { name: 'Wed', count: 15 },
        { name: 'Thu', count: 22 },
        { name: 'Fri', count: 30 },
        { name: 'Sat', count: 8 },
        { name: 'Sun', count: 5 },
    ];

    const COLORS = ['#b91c1c', '#000000', '#10b981', '#f59e0b', '#ef4444'];

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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Complaints by Category */}
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PieChartIcon size={20} /> Complaints by Category
                    </h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Trend */}
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={20} /> Weekly Activity
                    </h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
