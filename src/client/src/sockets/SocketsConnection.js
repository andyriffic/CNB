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
  const [testState, setTestState] = useState('not set');

  const getPowerUpsState = () => {
    return powerUpsState;
  };

  if (scores !== null) {
    // Have to keep subscribing/unsubscribing to event so we get a current score state :(
    const onGameFinished = data => {
      console.log('TEST STATE - game finished start', testState);
      setTestState('state updated?');
      console.log('TEST STATE - game finished updated?', testState);
      const awardedPowerUps = updateScores(scores, data);
      //console.log('GAME_FINISHED', awardedPowerUps);
      powerUpsState.touch(powerUpsState);
      powerUpsState.awardPowerUps(awardedPowerUps);
      console.log('GAME_FINISHED powerup', powerUpsState);
    };
    socket.removeListener('GAME_FINISHED');
    socket.on('GAME_FINISHED', onGameFinished);
  }

  useEffect(() => {
    // set up listeners for message from server
    socket.on('CONNECTION_ESTABLISHED', data => setConnectionDetails(data));
    socket.on('GAME_VIEW', data => {
      console.log('Updating game state...');
      setGameState(data);
    });
    socket.on('GAME_FINISHED_x', () => {
      console.log('TEST STATE - game finished start', testState);
      //setTestState('state updated?');
      powerUpsState.touch();
      //powerUpsState.awardPowerUps({ MELB: ['BONUS'] });
      //console.log('TEST STATE - game finished updated?', testState);
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
