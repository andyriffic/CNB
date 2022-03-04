import { useReducer } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import { PacManBoard } from '../../types';
import { createInitialState, PacManUiState, reducer } from './reducer';

export type UsePacMan = {
  uiState: PacManUiState;
  movePlayer: () => void;
  movePacman: () => void;
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
    movePacman: () => dispatch({ type: 'MOVE_PACMAN' }),
  };
}
