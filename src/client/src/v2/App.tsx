import React from 'react';
import { Router } from '@reach/router';
import GlobalStyle from '../uplift/GlobalStyle';
import { MoveThemeProvider } from './providers/MoveThemeProvider';
import { InvitationsProvider } from './providers/InvitationsProvider';
import { PlayersProvider } from './providers/PlayersProvider';
import { MatchupProvider } from './providers/MatchupProvider';
import { ScreenWithMatchup } from './screens/spectator';
import { ChoosePlayerScreen } from './screens/choose-players';
import { SnakesAndLaddersScreen } from './screens/snakes-and-ladders';
import {
  SelectPlayerScreen,
  SelectMatchupScreen,
  PlayMatchupScreen,
} from './screens/play';
import { GameSettingsProvider } from './providers/GameSettingsProvider';
import { ThemedUi } from './components/ui/Theme';

export default () => {
  return (
    <MoveThemeProvider>
      <GlobalStyle />
      <MatchupProvider>
        <PlayersProvider>
          <InvitationsProvider>
            <GameSettingsProvider>
              <ThemedUi>
                <Router>
                  <ChoosePlayerScreen path="/v2" />
                  <ScreenWithMatchup
                    path="/v2/spectator/:matchupId"
                    matchupId=""
                  />
                  <SnakesAndLaddersScreen path="/v2/snakes-and-ladders" />
                  <SelectPlayerScreen path="/v2/play" />
                  <SelectMatchupScreen path="/v2/play/:playerId" />
                  <PlayMatchupScreen path="/v2/play/:playerId/matchup/:matchupId" />
                </Router>
              </ThemedUi>
            </GameSettingsProvider>
          </InvitationsProvider>
        </PlayersProvider>
      </MatchupProvider>
    </MoveThemeProvider>
  );
};
