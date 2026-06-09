import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullPage = false }) => {
  const sizeMap = {
    sm: '16px',
    md: '32px',
    lg: '64px'
  };

  const spinner = (
    <div style={{
      width: sizeMap[size],
      height: sizeMap[size],
      border: '3px solid #E2E8F0',
      borderTopColor: '#6D28D9',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#ffffff', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999
      }}>
        {spinner}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px' }}>
      {spinner}
    </div>
  );
};

export default Loader;
