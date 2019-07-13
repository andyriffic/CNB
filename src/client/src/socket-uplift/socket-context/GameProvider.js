import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const GameContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/games`
);

const useSocket = setGame => {
  useEffect(() => {
    socket.on('MATCHUP_GAME_VIEW', game => {
      console.log('Is the the game you want?', game);
      setGame(game);
    });
  }, []);
};

const startNewGame = matchupId => {
  console.log('Try to start game', matchupId);
  socket.emit('START_GAME_FOR_MATCHUP', matchupId);
  socket.emit('WATCH_GAME_FOR_MATCHUP', matchupId);
};

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState();

  useSocket(setGame);

  return (
    <GameContext.Provider value={{ game, startNewGame }}>
      {children}
    </GameContext.Provider>
  );
};
