/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

import type { Node } from 'react';

import ServerMessagesContext from '../contexts/ServerMessagesContext';
import GameStateContext from '../contexts/GameStateContext';
import ConnectionDetailsContext from '../contexts/ConnectionDetailsContext';

import generateServerMessagesService from './generateServerMessagesService';

const socket = socketIOClient(process.env.REACT_APP_SERVER_ENDPOINT || null);

type Props = {
  children: Node,
};

const SocketsConnection = ({ children }: Props) => {
  const [gameState, setGameState] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);

  useEffect(()=> {

    //set up listeners for message from server
    socket.on("CONNECTION_ESTABLISHED", data => setConnectionDetails(data ));
    socket.on("GAME_VIEW", data => setGameState(data));

    console.log('connected to socket', socket);

    return () => console.log('unmounting....');

  }, []);

  const msgSvc = generateServerMessagesService(socket);

  return (
    <ServerMessagesContext.Provider value={msgSvc}>
      <GameStateContext.Provider value={gameState}>
        <ConnectionDetailsContext.Provider value={connectionDetails}>
          {children}
        </ConnectionDetailsContext.Provider>
      </GameStateContext.Provider>
    </ServerMessagesContext.Provider>
  );
}

export default SocketsConnection;
