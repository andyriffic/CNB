import { useEffect, useReducer } from 'react';
import { MobGame } from '../../../../providers/MobProvider';

type UiState =
  | 'waiting-moves'
  | 'ready-to-reveal'
  | 'reveal-moves'
  | 'revealing-moves'
  | 'all-moves-revealed'
  | 'player-won'
  | 'mob-won';

export type UseTimedPlayState = {
  playState: UiState;
  setPlayState: (playState: UiState) => void;
};

function reducer(state: UiState, newState: UiState): UiState {
  return newState;
}

export function useTimedPlayState(mobGame?: MobGame): UseTimedPlayState {
  const [uiState, dispatch] = useReducer(reducer, 'waiting-moves');

  useEffect(() => {
    if (!mobGame) {
      return;
    }

    if (!mobGame.ready) {
      dispatch('waiting-moves');
      return;
    }

    if (mobGame.ready && uiState === 'waiting-moves') {
      dispatch('ready-to-reveal');
      return;
    }

    if (mobGame.resolved && uiState === 'ready-to-reveal') {
      dispatch('revealing-moves');
      return;
    }
  }, [mobGame, uiState]);

  return {
    playState: uiState,
    setPlayState: uiState => dispatch(uiState),
  };
}
