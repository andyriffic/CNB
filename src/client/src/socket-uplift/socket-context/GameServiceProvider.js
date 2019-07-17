import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const GameServiceContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/game`,
  { autoConnect: false }
);

const useSocket = (setTheme, setPlayers) => {
  useEffect(() => {
    console.log('LOADED');
    // socket.on('GAME_VIEW', data => {
    //   setGame(data);
    // });
    socket.on('THEME_UPDATE', data => {
      setTheme(data);
    });
    socket.on('PLAYERS_UPDATE', data => {
      setPlayers(data);
    });
    socket.open();
    socket.emit('GET_GAME_VIEW', { type: 'GET_GAME_VIEW' });
  }, []);
};

export const GameServiceProvider = ({ children }) => {
  // const [game, setGame] = useState({});
  const [theme, setTheme] = useState({});
  const [players, setPlayers] = useState([]);

  useSocket(setTheme, setPlayers);

  return (
    <GameServiceContext.Provider value={{ theme, players }}>
      {children}
    </GameServiceContext.Provider>
  );
};
