import React from 'react';
import { Router } from '@reach/router';
import Sound from '../sounds/Provider';
import GameSettings from '../game-settings';
import GameTheme from '../themes';
import GlobalStyle from './GlobalStyle';
import { MatchupLobby } from './screens/matchup-lobby';
import { MatchupProvider } from './contexts/MatchupProvider';
import { MatchupView } from './screens/matchup-view';
import {
  SelectPlayerScreen,
  SelectMatchupScreen,
  PlayMatchupScreen,
} from './screens/play';
import { ComponentTestView } from './screens/_component-test';
import { Theme } from './contexts/ThemeProvider';
import { PlayerListView } from './screens/player-list';
import { TeamsListView } from './screens/teams-list';
import { TournamentInfoView } from './screens/tournament-info';
import { InstantMatchup } from './screens/instant-matchup';
import { PlayerProfileStatsScreen } from './screens/player-profile-stats';
import { PlayerAdminScreen } from './screens/admin/player-admin';
import { LeaderboardScreen } from './screens/leaderboard';
import { GameHistoryScreen } from './screens/game-history';
import { SnakesAndLaddersScreen } from './screens/snakes-ladders-board';
import { SnakesAndLaddersRulesScreen } from './screens/snakes-ladders-rules';
import { FinxFeatureDisplayScreen } from './screens/finx-feature-display';
import { InvitationMatchupScreen } from './screens/invitation-matchup';
import { PlayersProvider } from './contexts/PlayersProvider';
import { InvitationsProvider } from './contexts/InvitationsProvider';

export default () => {
  return (
    <Theme>
      <GameTheme>
        <Sound>
          <GameSettings>
            <GlobalStyle />
            <MatchupProvider>
              <PlayersProvider>
                <InvitationsProvider>
                  <Router>
                    <InstantMatchup path="/" />
                    <InvitationMatchupScreen path="/invitation" />
                    <MatchupLobby path="/lobby" />
                    <MatchupView path="/matchup/:matchupId" />
                    <SelectPlayerScreen path="/play" />
                    <SelectMatchupScreen path="/play/:playerId" />
                    <PlayMatchupScreen path="/play/:playerId/matchup/:matchupId" />
                    <PlayerProfileStatsScreen path="/player/profile" />
                    <PlayerProfileStatsScreen path="/player/profile/:playerName" />
                    <PlayerListView path="/tournament-players" />
                    <TeamsListView path="/teams" />
                    <TournamentInfoView path="tournament-info" />
                    <ComponentTestView path="/component-test" />
                    <PlayerAdminScreen path="/player-admin" />
                    <LeaderboardScreen path="/leaderboard" />
                    <LeaderboardScreen path="/leaderboard/top/:maxPlacing" />
                    <GameHistoryScreen path="/game-history" />
                    <SnakesAndLaddersScreen path="/snakes-and-ladders" />
                    <SnakesAndLaddersRulesScreen path="/snakes-and-ladders-rules" />
                    <FinxFeatureDisplayScreen path="/finx-display" />
                  </Router>
                </InvitationsProvider>
              </PlayersProvider>
            </MatchupProvider>
          </GameSettings>
        </Sound>
      </GameTheme>
    </Theme>
  );
};
