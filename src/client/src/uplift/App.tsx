import React from 'react';
import { Router } from '@reach/router';
import GameTheme from '../themes';
import GlobalStyle from './GlobalStyle';
import { MatchupLobby } from './screens/matchup-lobby';
import { MatchupProvider } from './contexts/MatchupProvider';
import { MatchupView } from './screens/matchup-view';
import { Theme } from './contexts/ThemeProvider';

export default () => {
  return (
    <Theme>
      <GameTheme>
        <GlobalStyle />
        <MatchupProvider>
          <Router>
            <MatchupLobby path="/" />
            <MatchupView path="/matchup/:matchupId" />
          </Router>
        </MatchupProvider>
      </GameTheme>
    </Theme>
  );
};
