import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
    });
  }
  return socket;
};

export const connectSocket = (token) => {
  const s = getSocket();
  if (token) s.auth = { token };
  s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};
