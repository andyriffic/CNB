import React from 'react';
import GameTheme from '../themes';
import GlobalStyle from '../GlobalStyle';
import { MatchupLobby } from './screens/matchup-lobby';
import { MatchupProvider } from './contexts/MatchupProvider';

export default () => {
  return (
    <GameTheme>
      <GlobalStyle />
      <MatchupProvider>
        <MatchupLobby />
      </MatchupProvider>
    </GameTheme>
  );
};
