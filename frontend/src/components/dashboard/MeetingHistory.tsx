import React from 'react';

interface MeetingRecord {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  code: string;
}

interface MeetingHistoryProps {
  history?: MeetingRecord[];
  onSelectMeeting?: (id: string) => void;
}

const MeetingHistory: React.FC<MeetingHistoryProps> = ({ history = [], onSelectMeeting }) => {
  const defaultHistory: MeetingRecord[] = [
    { id: '1', title: 'Weekly Product Align', date: '2026-06-08', duration: '55 mins', participants: 6, code: 'ZMK-TRS' },
    { id: '2', title: 'Tech Architecture Review', date: '2026-06-05', duration: '1h 15m', participants: 4, code: 'TPL-GHS' },
    { id: '3', title: 'Sales Demo - Client X', date: '2026-06-04', duration: '30 mins', participants: 3, code: 'XSD-WER' },
    { id: '4', title: 'Design Sync', date: '2026-06-02', duration: '45 mins', participants: 5, code: 'DES-SYN' }
  ];

  const displayHistory = history.length > 0 ? history : defaultHistory;

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Meeting History</h3>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Access summaries and details of past sessions</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
        {displayHistory.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelectMeeting && onSelectMeeting(m.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px', border: '1px solid #F3F4F6', borderRadius: '12px',
              cursor: onSelectMeeting ? 'pointer' : 'default',
              transition: 'all 0.2s',
              hover: { borderColor: '#DDD6FE', background: '#FDFDFD' }
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <strong style={{ fontSize: '0.95rem', color: '#111827' }}>{m.title}</strong>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#6B7280' }}>
                <span>📅 {m.date}</span>
                <span>⏱️ {m.duration}</span>
                <span>👥 {m.participants} participants</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.8rem', background: '#F3F4F6',
                padding: '4px 8px', borderRadius: '4px', color: '#4B5563'
              }}>{m.code}</span>
              {onSelectMeeting && (
                <span style={{ color: '#6D28D9', fontWeight: 600, fontSize: '0.8rem' }}>View AI Report &rarr;</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingHistory;
