import { useReducer } from 'react';
import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../uplift/utils/player';
import { Player } from '../../providers/PlayersProvider';
import { PacManPlayer } from './types';

export type UsePacMan = {
  uiState: PacManUiState;
  movePlayer: () => void;
};

export type PacManUiState = {
  allPacPlayers: PacManPlayer[];
  status: 'loading' | 'ready' | 'moving-players' | 'game-over';
};

function createPacManPlayer(player: Player): PacManPlayer {
  return {
    player,
    status: '',
    movesRemaining: getPlayerIntegerAttributeValue(player.tags, 'pac_moves', 0),
    squareIndex: getPlayerIntegerAttributeValue(player.tags, 'pac_square', 0),
    color: getPlayerAttributeValue(player.tags, 'rt_color', 'red'),
  };
}

function createInitialState(allPlayers: Player[]): PacManUiState {
  const eligiblePlayers = allPlayers.filter(p => p.tags.includes('pac_player'));

  return {
    allPacPlayers: eligiblePlayers.map(createPacManPlayer),
    status: 'ready',
  };
}

type StartMovingPlayersAction = {
  type: 'MOVE_PLAYERS';
};

function reducer(
  state: PacManUiState,
  action: StartMovingPlayersAction
): PacManUiState {
  switch (action.type) {
    case 'MOVE_PLAYERS': {
      return autoMovePlayer(state);
    }
    default: {
      return state;
    }
  }
}

function autoMovePlayer(state: PacManUiState): PacManUiState {
  const movingPlayer = state.allPacPlayers.find(p => p.status === 'moving');

  return !movingPlayer
    ? pickPlayerToMove(state)
    : movePlayer(state, movingPlayer);
}

function pickPlayerToMove(state: PacManUiState): PacManUiState {
  const nextPlayer = state.allPacPlayers.find(p => p.movesRemaining > 0);

  if (!nextPlayer) {
    return {
      ...state,
      status: 'game-over',
    };
  }

  return movePlayer(
    { ...state, status: 'moving-players' },
    { ...nextPlayer, status: 'moving' }
  );
}

function movePlayer(
  state: PacManUiState,
  pacPlayer: PacManPlayer
): PacManUiState {
  if (pacPlayer.movesRemaining === 0) {
    return updatePlayer(state, { ...pacPlayer, status: '' });
  }

  return updatePlayer(state, {
    ...pacPlayer,
    movesRemaining: pacPlayer.movesRemaining - 1,
    squareIndex: pacPlayer.squareIndex + 1,
  });
}

function updatePlayer(
  state: PacManUiState,
  pacPlayer: PacManPlayer
): PacManUiState {
  return {
    ...state,
    allPacPlayers: state.allPacPlayers.map(p =>
      p.player.id === pacPlayer.player.id ? pacPlayer : p
    ),
  };
}

export function usePacMan(allPlayers: Player[]): UsePacMan {
  const [state, dispatch] = useReducer(reducer, allPlayers, createInitialState);

  return {
    uiState: state,
    movePlayer: () => dispatch({ type: 'MOVE_PLAYERS' }),
  };
}
