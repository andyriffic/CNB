import { useContext } from 'react';
import GameStateContext from '../../../contexts/GameStateContext';

const usePlayerState = playerName => {
  const gameState = useContext(GameStateContext);

  if (gameState && gameState.player1.name === playerName) {
    return {
      slot: 'player1',
      player: gameState.player1,
    };
  }

  if (gameState && gameState.player2.name === playerName) {
    return {
      slot: 'player2',
      player: gameState.player2,
    };
  }

  return null;
};

export default usePlayerState;
