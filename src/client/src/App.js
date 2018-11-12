/* @flow */
import React from 'react';
import { Router } from "@reach/router"

import { PlayerSelectionScreen, SpectatorScreen } from './screens'
import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <h1>Cowboy/Ninja/Bear</h1>
      <Router>
        <SpectatorScreen path="/" />
        <PlayerSelectionScreen path="xian" playerKey={ 'XIAN' } />
        <PlayerSelectionScreen path="melb" playerKey={ 'MELB' } />
      </Router>
    </React.Fragment>
  );
}

export default App;
