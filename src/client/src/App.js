/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import { Router } from "@reach/router"

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import { PlayerSelectionScreen, SpectatorScreen, ResetGameScreen } from './screens'
import DebugOutput from './DebugOutput';
import GlobalStyle from './GlobalStyle';

const App = () => {
  const connectionDetails = useContext(ConnectionDetailsContext);

  return (
    <SocketsConnection>
      <GlobalStyle />
      <Router>
        <SpectatorScreen path="/" />
        <PlayerSelectionScreen path="xian" playerKey={ 'XIAN' } />
        <PlayerSelectionScreen path="melb" playerKey={ 'MELB' } />
        <ResetGameScreen path="reset" />
      </Router>
      <DebugOutput data={connectionDetails} />
    </SocketsConnection>
  );
}

export default App;
