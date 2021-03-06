import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';

export const GameContext = React.createContext();

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/games`);

const useSocket = setGame => {
  useEffect(() => {
    socket.on('MATCHUP_GAME_VIEW', game => {
      console.log('Is the the game you want?', game);
      setGame(game);
    });
  }, []);
};

const watchMatchupGame = matchupId => {
  socket.emit('WATCH_GAME_FOR_MATCHUP', matchupId);
};

const makeMove = (matchupId, team, move) => {
  console.log('Gonna make a move', matchupId, team, move);
  socket.emit('MAKE_MATCHUP_MOVE', matchupId, team, move);
};

const startNewGame = matchupId => {
  console.log('Try to start game', matchupId);
  socket.emit('START_GAME_FOR_MATCHUP', matchupId);
};

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState();

  useSocket(setGame);

  return (
    <GameContext.Provider
      value={{ game, startNewGame, watchMatchupGame, makeMove }}
    >
      {children}
    </GameContext.Provider>
  );
};
