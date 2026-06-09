import React from 'react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing?: boolean;
}

interface VideoGridProps {
  participants: Participant[];
  localStream: MediaStream | null;
  remoteStreams: Record<string, MediaStream>;
}

const VideoGrid: React.FC<VideoGridProps> = ({ participants, localStream, remoteStreams }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px',
      flex: 1,
      padding: '16px',
      background: '#111827',
      borderRadius: '12px',
      overflowY: 'auto'
    }}>
      {/* Local Video Card */}
      <div style={{
        position: 'relative',
        background: '#1F2937',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '16/9',
        border: '2px solid #6D28D9'
      }}>
        {localStream ? (
          <video
            ref={(el) => { if (el) el.srcObject = localStream; }}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#9CA3AF', fontSize: '1.2rem', fontWeight: 500
          }}>
            You (Camera Off)
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: '8px', left: '8px',
          background: 'rgba(0,0,0,0.6)', padding: '4px 8px',
          borderRadius: '4px', color: '#fff', fontSize: '0.8rem'
        }}>
          You
        </div>
      </div>

      {/* Remote Videos */}
      {participants.map((p) => {
        const stream = remoteStreams[p.id];
        return (
          <div key={p.id} style={{
            position: 'relative',
            background: '#1F2937',
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '16/9'
          }}>
            {stream && !p.isVideoOff ? (
              <video
                ref={(el) => { if (el) el.srcObject = stream; }}
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', color: '#9CA3AF', gap: '8px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: '#374151', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff'
                }}>
                  {p.name.charAt(0)}
                </div>
                <div style={{ fontSize: '0.9rem' }}>{p.name} {p.isVideoOff && '(Camera Off)'}</div>
              </div>
            )}
            <div style={{
              position: 'absolute', bottom: '8px', left: '8px',
              background: 'rgba(0,0,0,0.6)', padding: '4px 8px',
              borderRadius: '4px', color: '#fff', fontSize: '0.8rem',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <span>{p.name}</span>
              {p.isMuted && <span>🔇</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
