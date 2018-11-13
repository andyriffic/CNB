/* @flow */
import React, { useState, useEffect } from 'react';
import { Router } from "@reach/router"
import socketIOClient from "socket.io-client";

import { PlayerSelectionScreen, SpectatorScreen } from './screens'
import GlobalStyle from './GlobalStyle';

//todo querystring param
const debug = true;

const App = () => {
  const [gameState, setGameState] = useState({});
  const [connectionDetails, setConnectionDetails] = useState({});

  useEffect(()=> {
    const socket = socketIOClient();
    socket.on("CONNECTION_ESTABLISHED", data => setConnectionDetails(data ));
    socket.on("GAME_STATUS", data => setGameState(data));
    console.log('connected to socket', socket);

    return () => console.log('unmounting....');

  }, []);

  return (
    <React.Fragment>
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
            <h2>Game state</h2>
            <pre>
              { JSON.stringify(gameState) }
            </pre>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default App;
