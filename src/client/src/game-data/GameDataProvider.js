import React, { useState } from 'react';
import GameDataContext from './GameDataContext';

const View = ({ children }) => {
  // Consider moving gameState object here instead of in SocketsConnection
  // We have combination of server gameState and client-side gameState, should they be combined?
  const [gameData, setGameData] = useState({ autoPlayResult: false });

  return (
    <GameDataContext.Provider
      value={{
        value: gameData,
        set: payload => setGameData({ ...gameData, ...payload }),
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

export default View;
