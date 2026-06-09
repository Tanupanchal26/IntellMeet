import { useEffect, useState } from 'react';
import { getSocket } from '../utils/socket';

export const useMeeting = (roomId: string) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.emit('meeting:join', { roomId });

    socket.on('meeting:participants', (list: any[]) => {
      setParticipants(list);
    });

    socket.on('meeting:speaker', (speakerId: string) => {
      setActiveSpeaker(speakerId);
    });

    return () => {
      socket.emit('meeting:leave', { roomId });
      socket.off('meeting:participants');
      socket.off('meeting:speaker');
    };
  }, [roomId]);

  return {
    participants,
    activeSpeaker,
    isMuted,
    isVideoOff,
    setIsMuted,
    setIsVideoOff
  };
};

export default useMeeting;
