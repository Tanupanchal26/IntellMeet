import React from 'react';

const AnalyticsChart: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', count: 4, hours: 2.5 },
    { day: 'Tue', count: 6, hours: 4.8 },
    { day: 'Wed', count: 8, hours: 6.2 },
    { day: 'Thu', count: 5, hours: 3.5 },
    { day: 'Fri', count: 7, hours: 5.0 },
    { day: 'Sat', count: 1, hours: 0.5 },
    { day: 'Sun', count: 0, hours: 0.0 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Weekly Meeting Activity</h3>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Total meeting hours hosted over the last 7 days</span>
      </div>

      {/* Grid representing metrics */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
          border: '1px solid #DDD6FE',
          borderRadius: '12px',
          padding: '16px',
          flex: '1 1 140px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#6D28D9' }}>22.5h</div>
          <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600, marginTop: '4px' }}>Total Duration</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          border: '1px solid #A7F3D0',
          borderRadius: '12px',
          padding: '16px',
          flex: '1 1 140px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>31</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: '4px' }}>Meetings Conducted</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border: '1px solid #BFDBFE',
          borderRadius: '12px',
          padding: '16px',
          flex: '1 1 140px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2563EB' }}>94%</div>
          <div style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: 600, marginTop: '4px' }}>On-time Start Rate</div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 0 0 0' }}>
        {weeklyData.map((d) => {
          const heightPercent = maxHours > 0 ? (d.hours / maxHours) * 85 : 0;
          return (
            <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6D28D9' }}>{d.hours}h</div>
              <div style={{
                width: '60%',
                maxHeight: '130px',
                height: `${heightPercent}%`,
                background: 'linear-gradient(180deg, #8B5CF6 0%, #6D28D9 100%)',
                borderRadius: '6px 6px 0 0',
                minHeight: d.hours > 0 ? '6px' : '0px',
                transition: 'height 0.3s ease'
              }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#4B5563' }}>{d.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsChart;
