/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Router } from "@reach/router"

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import { PlayerSelectionScreen, SpectatorScreen, ResetGameScreen } from './screens'
import DebugOutput from './DebugOutput';
import GlobalStyle from './GlobalStyle';
import ScoreboardApi from './scoreboard/ScoreboardApi';
import GameSettings from './game-settings';
import SoundContext from './sounds/View';

import { IS_PRODUCTION } from './environment';

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`;

const EnvironmentBanner = styled.div`
  position: fixed;
  bottom: 0;
  height: 2%;
  background-color: ${props => props.isProduction ? 'green': 'red' };
  color: white;
  font-size: .5rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => {
  const connectionDetails = useContext(ConnectionDetailsContext);

  useEffect(() => {
    let envPostfix = '(Staging)';
    if (IS_PRODUCTION) {
      envPostfix = '(Production)';
    }

    document.title = `Cowboy/Ninja/Bear - ${envPostfix}`;
  }, [])

  return (
    <SoundContext>
      <GameSettings>
        <ScoreboardApi>
          <SocketsConnection>
            <GlobalStyle />
            <FullScreen>
              <Router>
                <SpectatorScreen path="/" />
                <PlayerSelectionScreen path="xian" playerKey={ 'XIAN' } />
                <PlayerSelectionScreen path="melb" playerKey={ 'MELB' } />
                <ResetGameScreen path="reset" />
              </Router>
              <DebugOutput data={connectionDetails} />
              <EnvironmentBanner isProduction={IS_PRODUCTION}>
                {
                  IS_PRODUCTION ? 'Production' : 'Test'
                }
              </EnvironmentBanner>
            </FullScreen>
          </SocketsConnection>
        </ScoreboardApi>
      </GameSettings>
    </SoundContext>
  );
};

export default App;
