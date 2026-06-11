import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { useAuthStore } from '../store/auth.store';

let socketInstance: Socket | null = null;

export const useSocket = () => {
  const { token } = useAuthStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL, {
        auth: { token },
        autoConnect: true,
        reconnectionAttempts: 5,
      });
    }
    socketRef.current = socketInstance;
    return () => {};
  }, [token]);

  return socketInstance!;
};
