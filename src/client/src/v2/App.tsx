import React from 'react';
import { Router } from '@reach/router';
import GlobalStyle from '../uplift/GlobalStyle';
import { MoveThemeProvider } from './providers/MoveThemeProvider';
import { InvitationsProvider } from './providers/InvitationsProvider';
import { PlayersProvider } from './providers/PlayersProvider';
import { MatchupProvider } from './providers/MatchupProvider';
import { GameSettingsProvider } from './providers/GameSettingsProvider';
import { ThemedUi } from './components/ui/Theme';
import { SoundProvider } from './providers/SoundProvider';
import { ScreenWithMatchup } from './screens/spectator';
import { ChoosePlayerScreen } from './screens/choose-players';
import { SnakesAndLaddersScreen } from './screens/snakes-and-ladders';
import {
  SelectPlayerScreen,
  SelectMatchupScreen,
  PlayMatchupScreen,
} from './screens/play';
import { PlayerAdminScreen } from './screens/player-admin';
import { PlayerProfileScreen } from './screens/player-profile';
import { GameHistoryScreen } from './screens/game-history';
import { PlayerChoiceProvider } from './providers/PlayerChoiceProvider';

export default () => {
  return (
    <MoveThemeProvider>
      <GlobalStyle />
      <MatchupProvider>
        <PlayersProvider>
          <InvitationsProvider>
            <GameSettingsProvider>
              <SoundProvider>
                <PlayerChoiceProvider>
                  <ThemedUi>
                    <Router>
                      <ChoosePlayerScreen path="/" />
                      <ScreenWithMatchup
                        path="/spectator/:matchupId"
                        matchupId=""
                      />
                      <SnakesAndLaddersScreen path="/snakes-and-ladders" />
                      <SelectPlayerScreen path="/play" />
                      <SelectMatchupScreen path="/play/:playerId" />
                      <PlayMatchupScreen path="/play/:playerId/matchup/:matchupId" />
                      <PlayerProfileScreen
                        path="/player-profile"
                        playerName=""
                      />
                      <PlayerProfileScreen
                        path="/player-profile/:playerName"
                        playerName=""
                      />
                      <GameHistoryScreen path="/game-history" />
                      <PlayerAdminScreen path="/player-admin" />
                    </Router>
                  </ThemedUi>
                </PlayerChoiceProvider>
              </SoundProvider>
            </GameSettingsProvider>
          </InvitationsProvider>
        </PlayersProvider>
      </MatchupProvider>
    </MoveThemeProvider>
  );
};
