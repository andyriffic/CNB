/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import {
  PlayerSelectionScreen,
  SpectatorScreen,
  SpectatorScreenAlternate,
  ResetGameScreen,
  PageLayoutScreen,
} from './screens';
import DebugOutput from './DebugOutput';
import GlobalStyle from './GlobalStyle';
import ScoreboardApi from './scoreboard/ScoreboardApi';
import GameTheme from './themes';
import { isFeatureEnabled, FEATURE_ANIMATED } from './featureToggle';

import { IS_PRODUCTION } from './environment';
import PowerUpProvider from './power-ups/PowerUpProvider';

const SpectatorView = isFeatureEnabled(FEATURE_ANIMATED)
  ? SpectatorScreenAlternate
  : SpectatorScreen;

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
        <PowerUpProvider>
          <SocketsConnection>
            <GlobalStyle />
            <Router>
              <SpectatorView path="/" />
              <PageLayoutScreen path="layouttest" />
              <PlayerSelectionScreen path="xian" playerKey={'XIAN'} />
              <PlayerSelectionScreen path="melb" playerKey={'MELB'} />
              <ResetGameScreen path="reset" />
            </Router>
            <DebugOutput data={connectionDetails} />
          </SocketsConnection>
        </PowerUpProvider>
      </ScoreboardApi>
    </GameTheme>
  );
};

export default App;
