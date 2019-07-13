import React, { useContext } from 'react';
import { DebugView } from './DebugView';
import { MatchupContext } from '../socket-context/MatchupProvider';
import { GameView } from './GameView';
import { GameProvider } from '../socket-context/GameProvider';

export const MatchupView = () => {
  const { currentMatchup } = useContext(MatchupContext);
  if (!currentMatchup) {
    return <div>No matchup selected</div>;
  }

  return (
    <div>
      <DebugView title={`GAME: ${currentMatchup.id}`} value={currentMatchup} />
      <GameProvider>
        <GameView matchupId={currentMatchup.id} />
      </GameProvider>
    </div>
  );
};
