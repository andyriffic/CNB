import { io, Socket } from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../environment';

export const createSocket = (endpoint: string): Socket => {
  const socket = io(`${SOCKETS_ENDPOINT}/${endpoint}`, { autoConnect: false });

  socket.on('connect', () => {
    console.log(`[SOCKET][${endpoint}]: connected`);
  });

  socket.on('connect_error', (error: any) => {
    console.log(`%c[SOCKET][${endpoint}]: error`, 'color: red;', error);
  });

  socket.connect();

  return socket;
};
