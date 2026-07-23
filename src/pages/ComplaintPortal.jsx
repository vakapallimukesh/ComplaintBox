import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Monitor,
    Home,
    Map,
    BookOpen,
    UserCircle
} from 'lucide-react';

const ComplaintPortal = () => {
    const navigate = useNavigate();

    const modules = [
        {
            id: 'classroom',
            title: 'Classroom Issues',
            description: 'Fan, lights, projector, furniture, or cleaning issues in halls.',
            icon: <Monitor size={32} />,
            color: 'var(--primary-blue)'
        },
        {
            id: 'hostel',
            title: 'Hostel Issues',
            description: 'Water, electricity, room maintenance, or hostel surroundings.',
            icon: <Home size={32} />,
            color: '#10B981'
        },
        {
            id: 'campus',
            title: 'Campus Issues',
            description: 'Roads, street lights, canteen, or general facilities.',
            icon: <Map size={32} />,
            color: '#F59E0B'
        },
        {
            id: 'department',
            title: 'Department Issues',
            description: 'Lab equipment, departmental library, or specific block issues.',
            icon: <BookOpen size={32} />,
            color: 'var(--primary-blue)'
        },
        {
            id: 'personal',
            title: 'Personal Issues',
            description: 'Scholarships, certificates, or student-specific grievances.',
            icon: <UserCircle size={32} />,
            color: '#EF4444'
        },
    ];

    const handleModuleClick = (moduleId) => {
        navigate(`/raise-complaint?category=${moduleId}`);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-blue)' }}>Complaint Portal</h2>
                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Select a category to raise your concern</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className="card"
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            textAlign: 'center',
                            padding: '2.5rem 1.5rem',
                            borderTop: `5px solid ${module.color}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                        onClick={() => handleModuleClick(module.id)}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow)';
                        }}
                    >
                        <div style={{
                            backgroundColor: `${module.color}15`,
                            color: module.color,
                            padding: '1.25rem',
                            borderRadius: '50%',
                            marginBottom: '0.5rem'
                        }}>
                            {module.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{module.title}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            {module.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplaintPortal;
