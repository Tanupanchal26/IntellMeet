import { useEffect, useRef, useState } from 'react';
import { createPeerConnection } from '../utils/webrtc';

export const useWebRTC = (roomId: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const peerConnectionsRef = useRef<Record<string, RTCPeerConnection>>({});

  useEffect(() => {
    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (err) {
        console.error('Failed to get local media stream', err);
      }
    }
    startMedia();

    return () => {
      // Cleanup peer connections and local stream tracks
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      peerConnectionsRef.current = {};
    };
  }, [roomId]);

  const addPeer = (peerId: string) => {
    const pc = createPeerConnection(
      (event) => {
        if (event.candidate) {
          // Send ICE Candidate via websocket signalling channel
        }
      },
      (event) => {
        const stream = event.streams[0];
        if (stream) {
          setRemoteStreams((prev) => ({ ...prev, [peerId]: stream }));
        }
      }
    );

    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    peerConnectionsRef.current[peerId] = pc;
    return pc;
  };

  const removePeer = (peerId: string) => {
    const pc = peerConnectionsRef.current[peerId];
    if (pc) {
      pc.close();
      delete peerConnectionsRef.current[peerId];
    }
    setRemoteStreams((prev) => {
      const copy = { ...prev };
      delete copy[peerId];
      return copy;
    });
  };

  return { localStream, remoteStreams, addPeer, removePeer };
};

export default useWebRTC;
