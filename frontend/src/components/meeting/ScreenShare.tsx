import React from 'react';

interface ScreenShareProps {
  shareStream: MediaStream | null;
  sharingUser: string | null;
}

const ScreenShare: React.FC<ScreenShareProps> = ({ shareStream, sharingUser }) => {
  return (
    <div style={{
      flex: 2,
      background: '#000000',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '16/9',
      border: '2px dashed #10B981',
      margin: '16px'
    }}>
      {shareStream ? (
        <video
          ref={(el) => { if (el) el.srcObject = shareStream; }}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <div style={{ color: '#9CA3AF', textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🖥️</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>No screen is currently shared</div>
          <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>Click the screen icon below to share yours</div>
        </div>
      )}

      {sharingUser && (
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(16, 185, 129, 0.9)', padding: '6px 12px',
          borderRadius: '4px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600
        }}>
          🖥️ {sharingUser} is sharing their screen
        </div>
      )}
    </div>
  );
};

export default ScreenShare;
