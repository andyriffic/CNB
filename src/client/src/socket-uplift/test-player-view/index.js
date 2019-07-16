import React, { useState } from 'react';
import { GameProvider } from '../socket-context/GameProvider';
import { SelectPlayerView } from './SelectPlayerView';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';

export default () => {
  const [selectedPlayer, setSelectedPlayer] = useState();

  if (!selectedPlayer) {
    return (
      <React.Fragment>
        <GameServiceProvider>
          <SelectPlayerView setSelectedPlayer={setSelectedPlayer} />
        </GameServiceProvider>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h1>select move</h1>
    </React.Fragment>
  );
};
