import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const MatchupContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/matchups`
);

const useSocket = (setMatchups, setCurrentMatchup) => {
  useEffect(() => {
    socket.on('MATCHUPS_UPDATE', data => {
      console.log('RECEIVED MATCHUPS', data);
      setMatchups(data);
    });
    socket.on('MATCHUP_VIEW', matchup => {
      console.log('Is the the matchup you want?', matchup);
    });
    socket.emit('REQUEST_MATCHUPS');
  }, []);

  return id => {
    console.log('Try to watch matchup', id);
    socket.emit('WATCH_MATCHUP', id);
  };
};

const addMatchup = (team1, team2) => {
  socket.emit('ADD_MATCHUP', [team1, team2]);
};

export const MatchupProvider = ({ children }) => {
  const [matchups, setMatchups] = useState();
  const [currentMatchup, setCurrentMatchup] = useState();

  const watchMatchup = useSocket(setMatchups, setCurrentMatchup);

  return (
    <MatchupContext.Provider
      value={{ matchups, addMatchup, currentMatchup, watchMatchup }}
    >
      {children}
    </MatchupContext.Provider>
  );
};
