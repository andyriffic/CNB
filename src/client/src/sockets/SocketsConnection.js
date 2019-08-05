import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';

import ServerMessagesContext from '../contexts/ServerMessagesContext';
import GameStateContext from '../contexts/GameStateContext';
import ConnectionDetailsContext from '../contexts/ConnectionDetailsContext';

import generateServerMessagesService from './generateServerMessagesService';
import ScoreboardContext from '../contexts/ScoreboardContext';
import PowerUpContext from '../contexts/PowerUpContext';
import TrophyPointsContext from '../trophy-points/Context';
import { onGameComplete } from '../onGameComplete';
import GameThemeContext from '../contexts/GameThemeContext';
import { SOCKETS_ENDPOINT } from '../environment';

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/game`);

// TODO: we use this mapping in various places. combine into same place and also try to make usage consistent
const mapPlayerNameToSlot = {
  XIAN: 'player1',
  MELB: 'player2',
};

const saveStats = (
  msgService,
  themeName,
  powerUpAdjustedPointsAssigned,
  awardedPowerUpsByPlayerName,
  trophyWinnerName
) => {
  const mappedTrophyWinner = trophyWinnerName
    ? mapPlayerNameToSlot[trophyWinnerName]
    : null;

  const mappedAwardedPowerUps = {};
  if (awardedPowerUpsByPlayerName.XIAN) {
    mappedAwardedPowerUps.player1 = awardedPowerUpsByPlayerName.XIAN;
  }

  if (awardedPowerUpsByPlayerName.MELB) {
    mappedAwardedPowerUps.player2 = awardedPowerUpsByPlayerName.MELB;
  }

  msgService.saveGameStats(
    themeName,
    powerUpAdjustedPointsAssigned,
    mappedAwardedPowerUps,
    mappedTrophyWinner
  );
};

const SocketsConnection = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);
  const scores = useContext(ScoreboardContext);
  const powerUpsState = useContext(PowerUpContext);
  const trophyPoints = useContext(TrophyPointsContext);
  const theme = useContext(GameThemeContext);

  const [msgSvc] = useState(generateServerMessagesService(socket));

  if (scores !== null) {
    // Have to keep subscribing/unsubscribing to event so we get a current score state :(
    const onGameFinished = gameResult => {
      onGameComplete(
        gameResult,
        gameState,
        scores,
        trophyPoints,
        (
          updatedScores,
          powerUpAdjustedPointsAssigned,
          awardedPowerUps,
          trophyWinner
        ) => {
          saveStats(
            msgSvc,
            theme.name,
            powerUpAdjustedPointsAssigned,
            awardedPowerUps,
            trophyWinner
          );
          msgSvc.awardPowerUps(awardedPowerUps);
          setTimeout(() => {
            scores.set(updatedScores);
          }, 21000); // TODO: don't set timeout here, do it in the view (see how trophy points does it in spectator view)
          trophyPoints.setWinner(trophyPoints, trophyWinner);
        }
      );
      // updateScores(scores, gameResult).then(awardedPowerUps => {
      //   msgSvc.awardPowerUps(awardedPowerUps);
      //   checkTrophyAward(trophyPoints, scores);
      // });
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
    socket.on('AWARDED_POWERUPS', awardedPowerUps => {
      setTimeout(() => {
        powerUpsState.awardPowerUps(awardedPowerUps);
      }, 20000);
    });

    // console.log('TEST STATE - game finished mount', testState);
    // setTestState('mount?');
    // console.log('TEST STATE - game finished mount?', testState);

    console.log('connected to socket', socket);

    return () => console.log('unmounting....');
  }, []);

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
