import { useEffect, useReducer } from 'react';
import { GasGame } from '../../../../providers/GasProvider';

type GameStatus = 'uninitialised' | 'error' | 'waiting-card-selection';

type GasGameState = {
  status: GameStatus;
};

type InitAction = {
  type: 'UPDATE_STATUS';
  game: GasGame;
};

type ReducerActions = InitAction;

function reducer(state: GasGameState, action: ReducerActions): GasGameState {
  switch (action.type) {
    case 'UPDATE_STATUS': {
      return {
        ...state,
        status: getGameStatus(action.game),
      };
    }
    default: {
      return state;
    }
  }
}

function getGameStatus(game: GasGame): GameStatus {
  if (!!game.currentPlayer.cardPlayed) {
    return 'waiting-card-selection';
  }

  return 'error';
}

export function useGasGameState(game: GasGame | undefined): GasGameState {
  const [state, dispatch] = useReducer(reducer, { status: 'uninitialised' });

  useEffect(() => {
    if (game) {
      dispatch({ type: 'UPDATE_STATUS', game });
    }
  }, [game, state.status]);

  return state;
}
