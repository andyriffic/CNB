import { useReducer } from 'react';
import { Player } from '../../../../providers/PlayersProvider';
import { createInitialState, PacManUiState, reducer } from './reducer';

export type UsePacMan = {
  uiState: PacManUiState;
  movePlayer: () => void;
};

export function usePacMan(allPlayers: Player[]): UsePacMan {
  const [state, dispatch] = useReducer(reducer, allPlayers, createInitialState);

  return {
    uiState: state,
    movePlayer: () => dispatch({ type: 'MOVE_PLAYERS' }),
  };
}
