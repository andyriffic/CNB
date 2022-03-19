import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../../uplift/utils/player';
import { Player } from '../../../../providers/PlayersProvider';
import { PacManBoard, PacManCharacter, PacManPlayer } from '../../types';
import { pipe, A } from '@mobily/ts-belt';

type GameUiStatus =
  | 'loading'
  | 'ready'
  | 'moving-players'
  | 'moving-pacman'
  | 'game-over';

export type PacManUiState = {
  allPacPlayers: PacManPlayer[];
  pacMan: PacManCharacter;
  board: PacManBoard;
  status: GameUiStatus;
};

function createPacManPlayer(player: Player): PacManPlayer {
  return {
    player,
    status: '',
    movesRemaining: getPlayerIntegerAttributeValue(player.tags, 'pac_moves', 0),
    pathIndex: getPlayerIntegerAttributeValue(player.tags, 'pac_square', 0),
    color: getPlayerAttributeValue(player.tags, 'rt_color', 'red'),
    jailTurnsCount: getPlayerIntegerAttributeValue(player.tags, 'pac_jail', 0),
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

type ReleasePlayersFromJailAction = {
  type: 'RELEASE_PLAYERS_FROM_JAIL';
};

export function reducer(
  state: PacManUiState,
  action:
    | StartMovingPlayersAction
    | MovePacManAction
    | ReleasePlayersFromJailAction
): PacManUiState {
  switch (action.type) {
    case 'MOVE_PLAYERS': {
      return pipe(
        state,
        autoMovePlayer
      );
    }
    case 'MOVE_PACMAN': {
      return pipe(
        state,
        movePacmanOneSquare,
        sendPlayersToJail
      );
    }
    case 'RELEASE_PLAYERS_FROM_JAIL': {
      return pipe(
        state,
        reduceJailCountForPlayers,
        setGameUiStatus('moving-players')
      );
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

function reduceJailCountForPlayers(state: PacManUiState): PacManUiState {
  const playersInJail = pipe(
    state.allPacPlayers,
    A.filter(playerInJail),
    A.map(reducePlayerJailCount)
  );

  return updatePlayers(playersInJail)(state);
}

function playerInJail(player: PacManPlayer): boolean {
  return player.jailTurnsCount > 0;
}

function reducePlayerJailCount(player: PacManPlayer): PacManPlayer {
  return {
    ...player,
    jailTurnsCount: player.jailTurnsCount - 1,
  };
}

function setGameUiStatus(
  status: GameUiStatus
): (state: PacManUiState) => PacManUiState {
  return state => {
    return {
      ...state,
      status,
    };
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

  return updatePlayers(playersGoingToJail)(state);
}

function updatePlayers(
  pacPlayers: readonly PacManPlayer[]
): (state: PacManUiState) => PacManUiState {
  return state => {
    return {
      ...state,
      allPacPlayers: state.allPacPlayers.map(p => {
        const updatedPlayer = pacPlayers.find(
          up => up.player.id === p.player.id
        );
        return updatedPlayer ? updatedPlayer : p;
      }),
    };
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
