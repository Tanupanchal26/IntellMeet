import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const Lobby: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error opening video devices: ', err);
      }
    }
    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleToggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const handleToggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleJoin = () => {
    // Navigate to the MeetingRoom page with URL params
    const roomCode = id || 'ROOM-XYZ';
    navigate(ROUTES.MEETING.replace(':id', roomCode));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0F172A', color: '#ffffff', padding: '24px', boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Join Meeting Room</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '6px' }}>Check your camera and audio settings before joining</p>
        </div>

        {/* Video Preview */}
        <div style={{
          position: 'relative', background: '#1E293B', borderRadius: '12px', overflow: 'hidden',
          aspectRatio: '16/9', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {localStream && !isVideoOff ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ color: '#94A3B8', fontSize: '1.1rem' }}>Camera is turned off</div>
          )}

          <div style={{
            position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '12px', background: 'rgba(15, 23, 42, 0.6)', padding: '8px 16px',
            borderRadius: '99px', backdropFilter: 'blur(4px)'
          }}>
            <button
              onClick={handleToggleMute}
              style={{
                background: isMuted ? '#EF4444' : 'transparent', border: 'none', color: '#fff',
                fontSize: '1.2rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%'
              }}
            >
              {isMuted ? '🔇' : '🎙️'}
            </button>
            <button
              onClick={handleToggleVideo}
              style={{
                background: isVideoOff ? '#EF4444' : 'transparent', border: 'none', color: '#fff',
                fontSize: '1.2rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%'
              }}
            >
              {isVideoOff ? '📷' : '📹'}
            </button>
          </div>
        </div>

        <Button variant="primary" size="lg" onClick={handleJoin} style={{ width: '100%' }}>
          Enter Meeting Room
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
