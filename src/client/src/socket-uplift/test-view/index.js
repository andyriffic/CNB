import React from 'react';
import View from './View';
import { MatchupAdminView } from './MatchupAdminView';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';
import { MatchupProvider } from '../socket-context/MatchupProvider';

export default () => {
  return (
    <React.Fragment>
      <GameServiceProvider>
        <View />
      </GameServiceProvider>
      <MatchupProvider>
        <MatchupAdminView />
      </MatchupProvider>
    </React.Fragment>
  );
};
