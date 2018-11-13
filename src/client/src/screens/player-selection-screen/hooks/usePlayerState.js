import { useContext } from 'react';
import GameStateContext from '../../../contexts/GameStateContext';

const usePlayerState = (playerKey) => {
  const gameState = useContext(GameStateContext);

  if (gameState && gameState.player1.name === playerKey) {
    return gameState.player1;
  }

  if (gameState && gameState.player2.name === playerKey) {
    return gameState.player2;
  }

  return null;
};

export default usePlayerState;
