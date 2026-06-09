import React from 'react';

interface ControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isSharing: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleShare: () => void;
  onLeave: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isMuted,
  isVideoOff,
  isSharing,
  onToggleMute,
  onToggleVideo,
  onToggleShare,
  onLeave
}) => {
  return (
    <div style={{
      height: '80px',
      background: '#1F2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '0 24px',
      borderTop: '1px solid #374151'
    }}>
      {/* Audio Button */}
      <button
        onClick={onToggleMute}
        style={{
          width: '48px', height: '48px', borderRadius: '50%', border: 'none',
          background: isMuted ? '#EF4444' : '#374151', color: '#ffffff',
          fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
        title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
      >
        {isMuted ? '🔇' : '🎙️'}
      </button>

      {/* Video Button */}
      <button
        onClick={onToggleVideo}
        style={{
          width: '48px', height: '48px', borderRadius: '50%', border: 'none',
          background: isVideoOff ? '#EF4444' : '#374151', color: '#ffffff',
          fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
        title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
      >
        {isVideoOff ? '📷' : '📹'}
      </button>

      {/* Screen Share Button */}
      <button
        onClick={onToggleShare}
        style={{
          width: '48px', height: '48px', borderRadius: '50%', border: 'none',
          background: isSharing ? '#10B981' : '#374151', color: '#ffffff',
          fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
        title={isSharing ? 'Stop Screen Share' : 'Share Screen'}
      >
        🖥️
      </button>

      {/* Spacer */}
      <div style={{ width: '24px' }} />

      {/* Leave Button */}
      <button
        onClick={onLeave}
        style={{
          padding: '0 24px', height: '48px', borderRadius: '24px', border: 'none',
          background: '#EF4444', color: '#ffffff', fontWeight: 600,
          fontSize: '0.95rem', cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: '8px', transition: 'all 0.2s'
        }}
      >
        <span>End / Leave</span>
      </button>
    </div>
  );
};

export default Controls;
