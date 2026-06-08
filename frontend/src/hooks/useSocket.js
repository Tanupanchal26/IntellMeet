import { useEffect, useRef } from 'react';
import { getSocket } from '../services/socketService';

/**
 * Subscribe to a socket event and auto-clean on unmount.
 * @param {string} event
 * @param {Function} handler
 */
const useSocket = (event, handler) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const socket = getSocket();
    const listener = (...args) => handlerRef.current(...args);
    socket.on(event, listener);
    return () => socket.off(event, listener);
  }, [event]);
};

export default useSocket;
