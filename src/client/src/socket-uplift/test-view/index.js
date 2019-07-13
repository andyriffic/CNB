import React from 'react';
import View from './View';
import { MatchupAdminView } from './MatchupAdminView';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';
import { MatchupProvider } from '../socket-context/MatchupProvider';
import { MatchupView } from './MatchupView';

export default () => {
  return (
    <React.Fragment>
      <GameServiceProvider>
        <View />
      </GameServiceProvider>
      <MatchupProvider>
        <MatchupAdminView />
        <MatchupView />
      </MatchupProvider>
    </React.Fragment>
  );
};
