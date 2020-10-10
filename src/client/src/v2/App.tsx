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
import { SnakesAndLaddersScreen as SnakesAndLaddersScreenV2 } from './screens/snakes-and-ladders-v2';
import {
  SelectPlayerScreen,
  SelectMatchupScreen,
  PlayMatchupScreen,
} from './screens/play';

export default () => {
  return (
    <MoveThemeProvider>
      <GlobalStyle />
      <MatchupProvider>
        <PlayersProvider>
          <InvitationsProvider>
            <Router>
              <ChoosePlayerScreen path="/v2" />
              <ScreenWithMatchup path="/v2/spectator/:matchupId" matchupId="" />
              <SnakesAndLaddersScreen path="/v2/snakes-and-ladders" />
              <SnakesAndLaddersScreenV2 path="/v2/snakes-and-ladders-v2" />
              <SelectPlayerScreen path="/v2/play" />
              <SelectMatchupScreen path="/v2/play/:playerId" />
              <PlayMatchupScreen path="/v2/play/:playerId/matchup/:matchupId" />
            </Router>
          </InvitationsProvider>
        </PlayersProvider>
      </MatchupProvider>
    </MoveThemeProvider>
  );
};
