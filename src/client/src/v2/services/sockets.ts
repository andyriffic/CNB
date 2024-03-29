import { io, Socket } from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';

export const createSocket = (endpoint: string): Socket => {
  console.log(`%c[SOCKET][${endpoint}]: creating socket`, 'color: blue;');
  const socket = io(`${SOCKETS_ENDPOINT}/${endpoint}`, {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log(`[SOCKET][${endpoint}]: connected`);
    console.log(`%c[SOCKET][${endpoint}]: connected`, 'color: blue;');
  });

  socket.on('connect_error', (error: any) => {
    console.log(`%c[SOCKET][${endpoint}]: error`, 'color: blue;', error);
  });

  socket.connect();

  return socket;
};
