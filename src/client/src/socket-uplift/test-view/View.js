import React from 'react';
import { GameStateView } from './GameStateView';

const View = () => {
  return (
    <React.Fragment>
      <h1>TEST</h1>
      <GameStateView />
      {/* <p>{JSON.stringify(gameService.theme)}</p>
      <p>{JSON.stringify(gameService.players)}</p> */}
    </React.Fragment>
  );
};

export default View;
