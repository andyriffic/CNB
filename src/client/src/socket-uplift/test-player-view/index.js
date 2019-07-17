import React, { useState } from 'react';
import { SelectPlayerView } from './SelectPlayerView';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';
import { PlayerMatchupsView } from './PlayerMatchupsView';
import { MatchupProvider } from '../socket-context/MatchupProvider';
import { PlayerPlayView } from './PlayerPlayView';

export default () => {
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedMatchup, setSelectedMatchup] = useState();

  if (!selectedPlayer) {
    return (
      <React.Fragment>
        <GameServiceProvider>
          <SelectPlayerView setSelectedPlayer={setSelectedPlayer} />
        </GameServiceProvider>
      </React.Fragment>
    );
  }

  if (!selectedMatchup) {
    return (
      <React.Fragment>
        <MatchupProvider>
          <PlayerMatchupsView
            playerId={selectedPlayer}
            selectMatchup={setSelectedMatchup}
          />
        </MatchupProvider>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <MatchupProvider>
        <PlayerPlayView playerId={selectedPlayer} matchup={selectedMatchup} />
      </MatchupProvider>
    </React.Fragment>
  );
};
