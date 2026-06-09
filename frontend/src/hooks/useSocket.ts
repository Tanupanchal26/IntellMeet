import { useEffect, useRef } from 'react';
import { getSocket } from '../utils/socket';

/**
 * Subscribe to a socket event and auto-clean on unmount.
 * @param event The event name to listen to
 * @param handler The callback function
 */
export const useSocket = (event: string, handler: (...args: any[]) => void): void => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const socket = getSocket();
    const listener = (...args: any[]) => handlerRef.current(...args);
    socket.on(event, listener);
    return () => {
      socket.off(event, listener);
    };
  }, [event]);
};

export default useSocket;
