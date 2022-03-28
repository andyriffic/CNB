import { useReducer } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import { PacManBoard } from '../../types';
import { createInitialState, PacManUiState, reducer } from './reducer';

export type UsePacMan = {
  uiState: PacManUiState;
  startGame: () => void;
  movePlayer: () => void;
  startMovePacman: () => void;
  movePacmanOneSquare: () => void;
};

export function usePacMan(allPlayers: Player[], board: PacManBoard): UsePacMan {
  const [state, dispatch] = useReducer(
    reducer,
    { allPlayers, board },
    createInitialState
  );

  return {
    uiState: state,
    movePlayer: () => dispatch({ type: 'MOVE_PLAYERS' }),
    startMovePacman: () => dispatch({ type: 'START_MOVE_PACMAN' }),
    movePacmanOneSquare: () => dispatch({ type: 'MOVE_PACMAN' }),
    startGame: () => dispatch({ type: 'RELEASE_PLAYERS_FROM_JAIL' }),
  };
}
