import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../../uplift/utils/player';
import { Player } from '../../../../providers/PlayersProvider';
import { PacManBoard, PacManCharacter, PacManPlayer } from '../../types';

export type PacManUiState = {
  allPacPlayers: PacManPlayer[];
  pacMan: PacManCharacter;
  board: PacManBoard;
  status:
    | 'loading'
    | 'ready'
    | 'moving-players'
    | 'moving-pacman'
    | 'game-over';
};

function createPacManPlayer(player: Player): PacManPlayer {
  return {
    player,
    status: '',
    movesRemaining: getPlayerIntegerAttributeValue(player.tags, 'pac_moves', 0),
    pathIndex: getPlayerIntegerAttributeValue(player.tags, 'pac_square', 0),
    color: getPlayerAttributeValue(player.tags, 'rt_color', 'red'),
    jailTurnsCount: 0,
  };
}

export function createInitialState({
  allPlayers,
  board,
}: {
  allPlayers: Player[];
  board: PacManBoard;
}): PacManUiState {
  const eligiblePlayers = allPlayers.filter(p => p.tags.includes('pac_player'));

  return {
    allPacPlayers: eligiblePlayers.map(createPacManPlayer),
    status: 'ready',
    board,
    pacMan: {
      movesRemaining: board.pacManPath.length - 1,
      pathIndex: 0,
      status: '',
    },
  };
}

type StartMovingPlayersAction = {
  type: 'MOVE_PLAYERS';
};

type MovePacManAction = {
  type: 'MOVE_PACMAN';
};

export function reducer(
  state: PacManUiState,
  action: StartMovingPlayersAction | MovePacManAction
): PacManUiState {
  switch (action.type) {
    case 'MOVE_PLAYERS': {
      return autoMovePlayer(state);
    }
    case 'MOVE_PACMAN': {
      return movePacmanOneSquare(state);
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
      status: 'moving-pacman',
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
      pathIndex: pacPlayer.pathIndex + 1,
    },
    state
  );
}

function movePacmanOneSquare(state: PacManUiState): PacManUiState {
  if (state.pacMan.movesRemaining === 0) {
    return {
      ...state,
      status: 'game-over',
    };
  }

  const newPathIndex =
    state.pacMan.pathIndex + 1 >= state.board.pacManPath.length
      ? 0
      : state.pacMan.pathIndex + 1;

  return {
    ...state,
    pacMan: {
      ...state.pacMan,
      movesRemaining: state.pacMan.movesRemaining - 1,
      pathIndex: newPathIndex,
    },
  };
}

function sendPlayersToJail(state: PacManUiState): PacManUiState {
  const pacManCoords =
    state.board.pacManPath[state.pacMan.pathIndex].coordinates;
  const playersGoingToJail = state.allPacPlayers
    .filter(p => {
      const playerCoords = state.board.playerPath[p.pathIndex].coordinates;

      return (
        p.jailTurnsCount === 0 &&
        playerCoords.x === pacManCoords.x &&
        playerCoords.y === pacManCoords.y
      );
    })
    .map(p => ({ ...p, jailTurnsCount: 3 }));

  return updatePlayers(playersGoingToJail, state);
}

function updatePlayers(
  pacPlayers: PacManPlayer[],
  state: PacManUiState
): PacManUiState {
  return {
    ...state,
    allPacPlayers: state.allPacPlayers.map(p => {
      const updatedPlayer = pacPlayers.find(up => up.player.id === p.player.id);
      return updatedPlayer ? updatedPlayer : p;
    }),
  };
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
