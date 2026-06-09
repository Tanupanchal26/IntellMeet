import React from 'react';

interface TranscriptSegment {
  speaker: string;
  text: string;
  time: string;
}

interface TranscriptPanelProps {
  transcript: TranscriptSegment[];
  isTranscribing: boolean;
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ transcript, isTranscribing }) => {
  return (
    <div style={{
      width: '320px',
      background: '#ffffff',
      borderLeft: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>AI Transcript</h3>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.75rem', color: isTranscribing ? '#10B981' : '#6B7280', fontWeight: 500
        }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: isTranscribing ? '#10B981' : '#9CA3AF',
            animation: isTranscribing ? 'pulse 1.5s infinite' : 'none'
          }} />
          {isTranscribing ? 'Live' : 'Paused'}
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {transcript.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem', marginTop: '32px' }}>
            {isTranscribing ? 'Listening for speech...' : 'Transcription is not active.'}
          </div>
        ) : (
          transcript.map((t, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#1F2937' }}>{t.speaker}</span>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{t.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>
                {t.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranscriptPanel;
