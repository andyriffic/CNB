import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const GameServiceContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/game`,
  { autoConnect: false }
);

const useSocket = (setGame, setTheme, setPlayers, setPowerUps) => {
  useEffect(() => {
    console.log('LOADED');
    socket.on('GAME_VIEW', data => {
      setGame(data);
    });
    socket.on('THEME_UPDATE', data => {
      setTheme(data);
    });
    socket.on('PLAYERS_UPDATE', data => {
      setPlayers(data);
    });
    socket.on('POWERUPS_UPDATE', data => {
      setPowerUps(data);
    });
    socket.open();
    socket.emit('GET_GAME_VIEW', { type: 'GET_GAME_VIEW' });
  }, []);
};

export const GameServiceProvider = ({ children }) => {
  const [game, setGame] = useState({});
  const [theme, setTheme] = useState({});
  const [players, setPlayers] = useState({});
  const [powerUps, setPowerUps] = useState({});

  useSocket(setGame, setTheme, setPlayers, setPowerUps);

  return (
    <GameServiceContext.Provider value={{ game, theme, players, powerUps }}>
      {children}
    </GameServiceContext.Provider>
  );
};
