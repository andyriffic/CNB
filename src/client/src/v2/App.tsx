import React from 'react';
import { Router } from '@reach/router';
import GlobalStyle from '../uplift/GlobalStyle';
import { MatchupProvider } from '../uplift/contexts/MatchupProvider';
import { PlayersProvider } from '../uplift/contexts/PlayersProvider';
import { MoveThemeProvider } from './providers/MoveThemeProvider';
import { InvitationsProvider } from '../uplift/contexts/InvitationsProvider';
import { ScreenWithMatchup } from './screens/spectator';
import { ChoosePlayerScreen } from './screens/choose-players';

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
            </Router>
          </InvitationsProvider>
        </PlayersProvider>
      </MatchupProvider>
    </MoveThemeProvider>
  );
};
