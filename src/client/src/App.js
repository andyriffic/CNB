/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import { Router } from "@reach/router"

import SocketsConnection from './sockets/SocketsConnection';
import ConnectionDetailsContext from './contexts/ConnectionDetailsContext';
import { PlayerSelectionScreen, SpectatorScreen } from './screens'
import GlobalStyle from './GlobalStyle';

//todo querystring param
const debug = true;

const App = () => {
  const connectionDetails = useContext(ConnectionDetailsContext);

  return (
    <SocketsConnection>
      <GlobalStyle />
      <h1>Cowboy/Ninja/Bear</h1>
      <Router>
        <SpectatorScreen path="/" />
        <PlayerSelectionScreen path="xian" playerKey={ 'XIAN' } />
        <PlayerSelectionScreen path="melb" playerKey={ 'MELB' } />
      </Router>
      { debug && (
          <React.Fragment>
            <h2>Client connection</h2>
            <pre>
              { JSON.stringify(connectionDetails) }
            </pre>
          </React.Fragment>
        )
      }
    </SocketsConnection>
  );
}

export default App;
