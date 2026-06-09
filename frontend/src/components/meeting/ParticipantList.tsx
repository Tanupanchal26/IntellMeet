import React from 'react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost?: boolean;
}

interface ParticipantListProps {
  participants: Participant[];
  localUser: { name: string; isHost?: boolean } | null;
  onToggleMuteParticipant?: (id: string) => void;
  onKickParticipant?: (id: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  localUser,
  onToggleMuteParticipant,
  onKickParticipant
}) => {
  return (
    <div style={{
      width: '300px',
      background: '#ffffff',
      borderLeft: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>
          Participants ({participants.length + (localUser ? 1 : 0)})
        </h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {/* Local user item */}
        {localUser && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', borderRadius: '6px', background: '#F9FAFB', marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#6D28D9',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '0.9rem'
              }}>
                {localUser.name.charAt(0)}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{localUser.name} (You)</span>
            </div>
            {localUser.isHost && (
              <span style={{ fontSize: '0.75rem', background: '#EEF2F6', color: '#4F46E5', padding: '2px 6px', borderRadius: '4px' }}>Host</span>
            )}
          </div>
        )}

        {/* Remote users list */}
        {participants.map((p) => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', borderRadius: '6px', hover: { background: '#F9FAFB' }
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#4B5563',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '0.9rem'
              }}>
                {p.name.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', color: '#1F2937', fontWeight: 500 }}>{p.name}</span>
                {p.isHost && <span style={{ fontSize: '0.7rem', color: '#4F46E5' }}>Host</span>}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>{p.isMuted ? '🔇' : '🎙️'}</span>
              <span style={{ fontSize: '1rem' }}>{p.isVideoOff ? '📷' : '📹'}</span>

              {localUser?.isHost && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  {onToggleMuteParticipant && (
                    <button
                      onClick={() => onToggleMuteParticipant(p.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      title="Mute/Unmute"
                    >
                      🔇
                    </button>
                  )}
                  {onKickParticipant && (
                    <button
                      onClick={() => onKickParticipant(p.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      title="Remove from meeting"
                    >
                      ❌
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;
