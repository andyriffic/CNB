import React, { useContext } from 'react';
import { GameServiceContext } from '../socket-context/GameServiceProvider';
import { GameStateView } from './GameStateView';

const View = () => {
  const gameService = useContext(GameServiceContext);

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
