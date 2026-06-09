import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'green';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'purple' }) => {
  const styles = {
    purple: { background: '#F5F3FF', color: '#6D28D9', border: '1px solid #DDD6FE' },
    blue: { background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' },
    green: { background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '99px',
      fontSize: '0.75rem',
      fontWeight: 600,
      ...styles[variant]
    }}>
      {children}
    </span>
  );
};

export default Badge;
