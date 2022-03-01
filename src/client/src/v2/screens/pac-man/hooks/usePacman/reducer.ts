import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../../uplift/utils/player';
import { Player } from '../../../../providers/PlayersProvider';
import { PacManPlayer } from '../../types';

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

export function createInitialState(allPlayers: Player[]): PacManUiState {
  const eligiblePlayers = allPlayers.filter(p => p.tags.includes('pac_player'));

  return {
    allPacPlayers: eligiblePlayers.map(createPacManPlayer),
    status: 'ready',
  };
}

type StartMovingPlayersAction = {
  type: 'MOVE_PLAYERS';
};

export function reducer(
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
    : movePlayer(movingPlayer, state);
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
    { ...nextPlayer, status: 'moving' },
    { ...state, status: 'moving-players' }
  );
}

function movePlayer(
  pacPlayer: PacManPlayer,
  state: PacManUiState
): PacManUiState {
  if (pacPlayer.movesRemaining === 0) {
    return updatePlayer({ ...pacPlayer, status: '' }, state);
  }

  return updatePlayer(
    {
      ...pacPlayer,
      movesRemaining: pacPlayer.movesRemaining - 1,
      squareIndex: pacPlayer.squareIndex + 1,
    },
    state
  );
}

function updatePlayer(
  pacPlayer: PacManPlayer,
  state: PacManUiState
): PacManUiState {
  return {
    ...state,
    allPacPlayers: state.allPacPlayers.map(p =>
      p.player.id === pacPlayer.player.id ? pacPlayer : p
    ),
  };
}
