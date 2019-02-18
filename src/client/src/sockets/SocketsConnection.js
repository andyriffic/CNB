/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';

import type { Node } from 'react';

import ServerMessagesContext from '../contexts/ServerMessagesContext';
import GameStateContext from '../contexts/GameStateContext';
import ConnectionDetailsContext from '../contexts/ConnectionDetailsContext';

import generateServerMessagesService from './generateServerMessagesService';
import ScoreboardContext from '../contexts/ScoreboardContext';
import { updateScores } from '../scoreboard/updateScores';
import PowerUpContext from '../contexts/PowerUpContext';

const socket = socketIOClient(process.env.REACT_APP_SERVER_ENDPOINT || null);

type Props = {
  children: Node,
};

const SocketsConnection = ({ children }: Props) => {
  const [gameState, setGameState] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);
  const scores = useContext(ScoreboardContext);
  const powerUpsState = useContext(PowerUpContext);

  if (scores !== null) {
    // Have to keep subscribing/unsubscribing to event so we get a current score state :(
    const onGameFinished = data => {
      updateScores(scores, data).then(awardedPowerUps => {
        powerUpsState.awardPowerUps(awardedPowerUps);
      });
    };
    socket.removeListener('GAME_FINISHED');
    socket.on('GAME_FINISHED', onGameFinished);
  }

  useEffect(() => {
    // set up listeners for message from server
    socket.on('CONNECTION_ESTABLISHED', data => setConnectionDetails(data));
    socket.on('GAME_VIEW', data => {
      setGameState(data);
    });

    // console.log('TEST STATE - game finished mount', testState);
    // setTestState('mount?');
    // console.log('TEST STATE - game finished mount?', testState);

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
};

export default SocketsConnection;
