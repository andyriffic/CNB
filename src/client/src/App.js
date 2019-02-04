/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import {
  PlayerSelectionScreen,
  SpectatorScreen,
  ResetGameScreen,
  PageLayoutScreen,
} from './screens';
import DebugOutput from './DebugOutput';
import GlobalStyle from './GlobalStyle';
import ScoreboardApi from './scoreboard/ScoreboardApi';
import GameTheme from './themes';

import { IS_PRODUCTION } from './environment';

const App = () => {
  const connectionDetails = useContext(ConnectionDetailsContext);

  useEffect(() => {
    let envPostfix = '(Staging)';
    if (IS_PRODUCTION) {
      envPostfix = '(Production)';
    }

    document.title = `Cowboy/Ninja/Bear - ${envPostfix}`;
  }, []);

  return (
    <GameTheme>
      <ScoreboardApi>
        <SocketsConnection>
          <GlobalStyle />
          <Router>
            <SpectatorScreen path="/" />
            <PageLayoutScreen path="layouttest" />
            <PlayerSelectionScreen path="nz" playerKey={'NZ'} />
            <PlayerSelectionScreen path="melb" playerKey={'AUS'} />
            <ResetGameScreen path="reset" />
          </Router>
          <DebugOutput data={connectionDetails} />
        </SocketsConnection>
      </ScoreboardApi>
    </GameTheme>
  );
};

export default App;
