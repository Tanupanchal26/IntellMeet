import React from 'react';

interface SummaryCardProps {
  title: string;
  date: string;
  summaryPoints: string[];
  sentiment?: string;
  duration?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  date,
  summaryPoints,
  sentiment = 'Positive',
  duration = '45 mins'
}) => {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>{title}</h4>
          <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{date} &bull; {duration}</span>
        </div>
        <div style={{
          fontSize: '0.75rem', background: '#F5F3FF', color: '#6D28D9',
          padding: '4px 10px', borderRadius: '99px', fontWeight: 600
        }}>
          🤖 AI Summary
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>Key Discussion Points:</h5>
        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {summaryPoints.map((pt, idx) => (
            <li key={idx} style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.4 }}>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {sentiment && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#F0FDF4', border: '1px solid #DCFCE7',
          padding: '10px 16px', borderRadius: '8px', marginTop: '4px'
        }}>
          <span style={{ fontSize: '1rem' }}>📈</span>
          <span style={{ fontSize: '0.8rem', color: '#166534' }}>
            Overall Meeting Sentiment: <strong>{sentiment}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
