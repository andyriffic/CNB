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
import { TeamsListView } from './screens/teams-list';
import { TournamentInfoView } from './screens/tournament-info';
import { InstantMatchup } from './screens/instant-matchup';
import { PlayerProfileStats } from './screens/player-profile-stats';

export default () => {
  return (
    <Theme>
      <GameTheme>
        <Sound>
          <GameSettings>
            <GlobalStyle />
            <MatchupProvider>
              <Router>
                <InstantMatchup path="/" />
                <MatchupLobby path="/lobby" />
                <MatchupView path="/matchup/:matchupId" />
                <PlayView path="/play" />
                <PlayerProfileStats path="/player/profile" />
                <PlayerListView path="/tournament-players" />
                <TeamsListView path="/teams" />
                <TournamentInfoView path="tournament-info" />
                <ComponentTestView path="/component-test" />
              </Router>
            </MatchupProvider>
          </GameSettings>
        </Sound>
      </GameTheme>
    </Theme>
  );
};
