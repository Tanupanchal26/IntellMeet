import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Card;
