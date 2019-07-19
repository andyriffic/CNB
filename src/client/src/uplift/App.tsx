import React from 'react';
import GameTheme from '../themes';
import GlobalStyle from '../GlobalStyle';
import { MatchupLobby } from './screens/matchup-lobby';

export default () => {
  return (
    <GameTheme>
      <GlobalStyle />
      <MatchupLobby />
    </GameTheme>
  );
};
