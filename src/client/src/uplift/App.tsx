import React from 'react';
import { Router } from '@reach/router';
import Sound from '../sounds/Provider';
import GameSettings from '../game-settings';
import GameTheme from '../themes';
import GlobalStyle from './GlobalStyle';
import { MatchupLobby } from './screens/matchup-lobby';
import { MatchupProvider } from './contexts/MatchupProvider';
import { MatchupView } from './screens/matchup-view';
import { PlayView } from './screens/play';
import { ComponentTestView } from './screens/_component-test';
import { Theme } from './contexts/ThemeProvider';
import { PlayerListView } from './screens/player-list';

export default () => {
  return (
    <Theme>
      <GameTheme>
        <Sound>
          <GameSettings>
            <GlobalStyle />
            <MatchupProvider>
              <Router>
                <MatchupLobby path="/" />
                <MatchupView path="/matchup/:matchupId" />
                <PlayView path="/play" />
                <PlayerListView path="/tournament-players" />
                <ComponentTestView path="/component-test" />
              </Router>
            </MatchupProvider>
          </GameSettings>
        </Sound>
      </GameTheme>
    </Theme>
  );
};
