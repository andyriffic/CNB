import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const MatchupContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/matchups`
);

const useSocket = setMatchups => {
  useEffect(() => {
    socket.on('MATCHUPS_UPDATE', data => {
      console.log('RECEIVED MATCHUPS', data);
      setMatchups(data);
    });
    socket.emit('REQUEST_MATCHUPS');
  }, []);
};

const addMatchup = (team1, team2) => {
  socket.emit('ADD_MATCHUP', [team1, team2]);
};

export const MatchupProvider = ({ children }) => {
  const [matchups, setMatchups] = useState();

  useSocket(setMatchups);

  return (
    <MatchupContext.Provider value={{ matchups, addMatchup }}>
      {children}
    </MatchupContext.Provider>
  );
};
