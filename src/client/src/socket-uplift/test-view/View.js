import React, { useContext } from 'react';
import { GameServiceContext } from '../socket-context/GameServiceProvider';

const View = () => {
  const gameService = useContext(GameServiceContext);

  return (
    <React.Fragment>
      <h1>TEST</h1>
      <p>{JSON.stringify(gameService.game)}</p>
      <p>{JSON.stringify(gameService.theme)}</p>
      <p>{JSON.stringify(gameService.players)}</p>
    </React.Fragment>
  );
};

export default View;
