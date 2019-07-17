import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const MatchupContext = React.createContext();

const socket = socketIOClient(
  `${process.env.REACT_APP_SERVER_ENDPOINT || ''}/matchups`
);

const useSocket = (
  setMatchups,
  setCurrentMatchup,
  setGame,
  setPlayerMatchups
) => {
  useEffect(() => {
    socket.on('MATCHUPS_UPDATE', data => {
      console.log('RECEIVED MATCHUPS', data);
      setMatchups(data);
    });
    socket.on('MATCHUP_VIEW', matchup => {
      console.log('Is the the matchup you want?', matchup);
      setCurrentMatchup(matchup);
    });
    socket.on('PLAYER_MATCHUP_VIEW', matchups => {
      console.log('Are these the player matchups you want', matchups);
      // setCurrentMatchup(matchup);
    });
    socket.on('MATCHUP_GAME_VIEW', game => {
      console.log('Is the the game you want?', game);
      setGame(game);
    });
    socket.on('PLAYER_MATCHUP_VIEW', matchups => {
      console.log('Are these the current matchups for this player?', matchups);
      setPlayerMatchups(matchups);
    });
    socket.emit('REQUEST_MATCHUPS');
    // socket.emit('REQUEST_MATCHUPS_FOR_PLAYER', 'andy');
  }, []);

  return id => {
    console.log('Try to watch matchup', id);
    socket.emit('WATCH_MATCHUP', id);
  };
};

const addMatchup = (team1, team2) => {
  socket.emit('ADD_MATCHUP', [team1, team2]);
};

const watchMatchupGame = matchupId => {
  socket.emit('WATCH_GAME_FOR_MATCHUP', matchupId);
};

const requestMatchupsForPlayer = playerId => {
  console.log('Requestiong matchups for', playerId);
  socket.emit('REQUEST_MATCHUPS_FOR_PLAYER', playerId);
};

const makeMove = (matchupId, team, move) => {
  console.log('Gonna make a move', matchupId, team, move);
  socket.emit('MAKE_MATCHUP_MOVE', matchupId, team, move);
};

const startNewGame = matchupId => {
  console.log('Try to start game', matchupId);
  socket.emit('START_GAME_FOR_MATCHUP', matchupId);
};

export const MatchupProvider = ({ children }) => {
  const [matchups, setMatchups] = useState([]);
  const [currentMatchup, setCurrentMatchup] = useState();
  const [game, setGame] = useState();
  const [playerMatchups, setPlayerMatchups] = useState();

  const watchMatchup = useSocket(
    setMatchups,
    setCurrentMatchup,
    setGame,
    setPlayerMatchups
  );

  return (
    <MatchupContext.Provider
      value={{
        matchups,
        addMatchup,
        currentMatchup,
        watchMatchup,
        game,
        watchMatchupGame,
        startNewGame,
        requestMatchupsForPlayer,
        playerMatchups,
        makeMove,
      }}
    >
      {children}
    </MatchupContext.Provider>
  );
};
