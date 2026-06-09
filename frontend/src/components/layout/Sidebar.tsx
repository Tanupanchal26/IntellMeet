import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const Sidebar: React.FC = () => {
  const links = [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: '📊' },
    { to: ROUTES.LOBBY, label: 'Lobby', icon: '🚪' },
    { to: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
  ];

  return (
    <aside style={{
      width: '240px', background: '#ffffff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - 68px)',
      padding: '24px 16px', position: 'sticky', top: '68px', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '8px', color: isActive ? '#6D28D9' : '#4B5563',
              background: isActive ? '#F5F3FF' : 'transparent', textDecoration: 'none',
              fontWeight: isActive ? 600 : 500, transition: 'all 0.2s ease'
            })}
          >
            <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '16px 0', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
            color: '#ffffff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 'bold'
          }}>U</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>User Profile</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>user@intellmeet.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
