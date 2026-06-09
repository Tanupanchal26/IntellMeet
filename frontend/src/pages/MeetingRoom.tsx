import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoGrid from '../components/meeting/VideoGrid';
import Controls from '../components/meeting/Controls';
import ParticipantList from '../components/meeting/ParticipantList';
import ChatBox from '../components/meeting/ChatBox';
import ScreenShare from '../components/meeting/ScreenShare';
import TranscriptPanel from '../components/ai/TranscriptPanel';
import ActionItems from '../components/ai/ActionItems';
import { ROUTES } from '../utils/constants';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost?: boolean;
}

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: string;
}

interface TranscriptSegment {
  speaker: string;
  text: string;
  time: string;
}

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

const MeetingRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Local settings
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareStream, setShareStream] = useState<MediaStream | null>(null);

  // Panels toggle
  const [activePanel, setActivePanel] = useState<'chat' | 'participants' | 'transcript' | 'actions'>('chat');

  // Dummy State
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'user-1', name: 'Sarah Chen', isMuted: false, isVideoOff: false, isHost: true },
    { id: 'user-2', name: 'Marcus Williams', isMuted: true, isVideoOff: false },
    { id: 'user-3', name: 'Priya Sharma', isMuted: false, isVideoOff: true }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'Sarah Chen', text: 'Hey everyone, let\'s review the layout changes.', timestamp: '11:00 AM' },
    { sender: 'Marcus Williams', text: 'Sure, I can share my screen.', timestamp: '11:01 AM' }
  ]);

  const [transcript, setTranscript] = useState<TranscriptSegment[]>([
    { speaker: 'Sarah Chen', text: 'Okay, let\'s get this review started. Marcus, please share the UI layout.', time: '11:00 AM' },
    { speaker: 'Marcus Williams', text: 'I am launching the screen sharing. Priya, can you see it?', time: '11:01 AM' }
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: 'act-1', task: 'Implement full project folder structure', assignee: 'Developer', dueDate: 'Friday', status: 'Pending' },
    { id: 'act-2', task: 'Review UI layout with product team', assignee: 'Sarah Chen', dueDate: 'Monday', status: 'Pending' }
  ]);

  useEffect(() => {
    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (err) {
        console.error('Error getting media devices: ', err);
      }
    }
    startMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleToggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  const handleToggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsVideoOff(!track.enabled);
      });
    }
  };

  const handleToggleShare = async () => {
    if (isSharing) {
      if (shareStream) {
        shareStream.getTracks().forEach(track => track.stop());
        setShareStream(null);
      }
      setIsSharing(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setShareStream(stream);
        setIsSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsSharing(false);
          setShareStream(null);
        };
      } catch (err) {
        console.error('Error sharing screen: ', err);
      }
    }
  };

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, {
      sender: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleToggleActionStatus = (itemId: string) => {
    setActionItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, status: item.status === 'Completed' ? 'Pending' : 'Completed' } : item
    ));
  };

  const handleLeave = () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
    }
    if (shareStream) {
      shareStream.getTracks().forEach(t => t.stop());
    }
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#111827', overflow: 'hidden' }}>
      {/* Top Header Bar */}
      <div style={{
        height: '60px', borderBottom: '1px solid #1F2937', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff'
      }}>
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Meeting: <strong style={{ color: '#8B5CF6' }}>{id}</strong></span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActivePanel('chat')}
            style={{
              padding: '6px 12px', background: activePanel === 'chat' ? '#374151' : 'transparent',
              color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActivePanel('participants')}
            style={{
              padding: '6px 12px', background: activePanel === 'participants' ? '#374151' : 'transparent',
              color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            👥 People ({participants.length + 1})
          </button>
          <button
            onClick={() => setActivePanel('transcript')}
            style={{
              padding: '6px 12px', background: activePanel === 'transcript' ? '#374151' : 'transparent',
              color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            📝 Transcript
          </button>
          <button
            onClick={() => setActivePanel('actions')}
            style={{
              padding: '6px 12px', background: activePanel === 'actions' ? '#374151' : 'transparent',
              color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            ✅ Actions
          </button>
        </div>
      </div>

      {/* Middle Layout (Streams and Side panel) */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Left pane: Video screens */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {isSharing ? (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
              <ScreenShare shareStream={shareStream} sharingUser="You" />
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                <VideoGrid participants={participants} localStream={localStream} remoteStreams={{}} />
              </div>
            </div>
          ) : (
            <VideoGrid participants={participants} localStream={localStream} remoteStreams={{}} />
          )}
        </div>

        {/* Right pane: Side Panel Drawer */}
        <div style={{
          width: '320px', background: '#ffffff', height: '100%',
          display: 'flex', flexDirection: 'column', borderLeft: '1px solid #1F2937'
        }}>
          {activePanel === 'chat' && (
            <ChatBox messages={messages} onSendMessage={handleSendMessage} />
          )}
          {activePanel === 'participants' && (
            <ParticipantList
              participants={participants}
              localUser={{ name: 'You', isHost: false }}
              onToggleMuteParticipant={(id) => setParticipants(prev => prev.map(p => p.id === id ? { ...p, isMuted: !p.isMuted } : p))}
              onKickParticipant={(id) => setParticipants(prev => prev.filter(p => p.id !== id))}
            />
          )}
          {activePanel === 'transcript' && (
            <TranscriptPanel transcript={transcript} isTranscribing={true} />
          )}
          {activePanel === 'actions' && (
            <div style={{ padding: '16px', overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
              <ActionItems items={actionItems} onToggleStatus={handleToggleActionStatus} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <Controls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isSharing={isSharing}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onToggleShare={handleToggleShare}
        onLeave={handleLeave}
      />
    </div>
  );
};

export default MeetingRoom;
