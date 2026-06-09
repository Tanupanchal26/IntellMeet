import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import MeetingHistory from '../components/dashboard/MeetingHistory';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { generateMeetingCode } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

const Dashboard: React.FC = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [meetingCodeInput, setMeetingCodeInput] = useState('');
  const navigate = useNavigate();

  const handleCreateMeeting = () => {
    const newCode = generateMeetingCode();
    // Redirect user to meeting room with this code
    navigate(ROUTES.MEETING.replace(':id', newCode));
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingCodeInput.trim()) {
      navigate(ROUTES.MEETING.replace(':id', meetingCodeInput.trim().toUpperCase()));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
        borderRadius: '16px', padding: '32px', color: '#ffffff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>Hello, User!</h2>
          <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '0.95rem' }}>
            Ready for your next productive meeting? IntellMeet is listening.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="white" size="lg" onClick={handleCreateMeeting} style={{ color: '#6D28D9', fontWeight: 600 }}>
            🚀 Instant Meeting
          </Button>
          <Button variant="outline" size="lg" onClick={() => setIsJoinOpen(true)} style={{ color: '#ffffff', borderColor: '#ffffff' }}>
            🚪 Enter Code
          </Button>
        </div>
      </div>

      {/* Grid of Analytics and History */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        <AnalyticsChart />
        <MeetingHistory onSelectMeeting={(id) => alert(`Displaying Report for Meeting #${id}`)} />
      </div>

      {/* Join Meeting Modal */}
      <Modal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} title="Join a Meeting">
        <form onSubmit={handleJoinMeeting} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Meeting Code
            </label>
            <input
              type="text"
              required
              value={meetingCodeInput}
              onChange={(e) => setMeetingCodeInput(e.target.value)}
              placeholder="e.g. ABC-DEF"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '1rem',
                textTransform: 'uppercase', fontFamily: 'monospace', boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <Button variant="outline" type="button" onClick={() => setIsJoinOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Join Room
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
