import React from 'react';
import View from './View';
import { MatchupView } from './MatchupView';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';
import { MatchupProvider } from '../socket-context/MatchupProvider';

export default () => {
  return (
    <React.Fragment>
      <MatchupProvider>
        {/* <GameServiceProvider> */}
          {/* <View /> */}
          <MatchupView />
        {/* </GameServiceProvider> */}
      </MatchupProvider>
    </React.Fragment>
  );
};
