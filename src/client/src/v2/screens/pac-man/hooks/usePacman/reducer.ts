import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../../uplift/utils/player';
import { Player } from '../../../../providers/PlayersProvider';
import {
  PacManBoard,
  PacManCharacter,
  PacManPlayer,
  PacManPlayerStatus,
} from '../../types';

const MIN_PACMAN_MOVES = 3;

type GameUiStatus =
  | 'loading'
  | 'ready'
  | 'moving-players'
  | 'moving-players-done'
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
    offset: 0,
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
  const pacManPlayer = allPlayers.find(p => p.id === 'mc_settings_face');

  const initialState: PacManUiState = {
    allPacPlayers: eligiblePlayers.map(createPacManPlayer),
    status: 'ready',
    board,
    pacMan: {
      movesRemaining: 0,
      pathIndex: pacManPlayer
        ? getPlayerIntegerAttributeValue(pacManPlayer.tags, 'pac_square', 0)
        : 0,
      status: '',
    },
  };

  return initialState.allPacPlayers.reduce(
    setPlayerPositionOffset,
    initialState
  );
}

type StartMovingPlayersAction = {
  type: 'MOVE_PLAYERS';
};

type StartMovePacManAction = {
  type: 'START_MOVE_PACMAN';
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
    | StartMovePacManAction
    | ReleasePlayersFromJailAction
): PacManUiState {
  switch (action.type) {
    case 'MOVE_PLAYERS': {
      return autoMovePlayer(state);
      // return pipe(
      //   state,
      //   autoMovePlayer
      // );
    }
    case 'START_MOVE_PACMAN': {
      return setGameUiStatus('moving-pacman')(initialisePacmanMoves(state));
      // return pipe(
      //   state,
      //   initialisePacmanMoves,
      //   setGameUiStatus('moving-pacman')
      // );
    }
    case 'MOVE_PACMAN': {
      return sendPlayersToJail(movePacmanOneSquare(state));
      // return pipe(
      //   state,
      //   movePacmanOneSquare,
      //   sendPlayersToJail
      // );
    }
    case 'RELEASE_PLAYERS_FROM_JAIL': {
      return setGameUiStatus('moving-players')(
        reduceJailCountForPlayers(state)
      );
      // return pipe(
      //   state,
      //   reduceJailCountForPlayers,
      //   setGameUiStatus('moving-players')
      // );
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
  const nextPlayer = state.allPacPlayers
    .filter(playerNotInJail)
    .find(p => p.movesRemaining > 0);

  if (!nextPlayer) {
    return setGameUiStatus('moving-players-done')(state);
    // return pipe(
    //   state,
    //   setGameUiStatus('moving-players-done')
    // );
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
    return setPlayerPositionOffset(
      updatePlayer({ ...pacPlayer, status: '' }, state),
      pacPlayer
    );
  }

  return updatePlayer(
    {
      ...pacPlayer,
      offset: 0,
      movesRemaining: pacPlayer.movesRemaining - 1,
      pathIndex: pacPlayer.pathIndex + 1,
    },
    state
  );
}

function setPlayerStatus(
  player: PacManPlayer,
  status: PacManPlayerStatus
): PacManPlayer {
  return { ...player, status };
}

function setPlayerPositionOffset(
  state: PacManUiState,
  player: PacManPlayer
): PacManUiState {
  const updatedPlayers = state.allPacPlayers
    .filter(p => p.pathIndex === player.pathIndex && p.jailTurnsCount === 0)
    .map<PacManPlayer>((p, i) => ({ ...p, offset: i }));

  return updatePlayers(updatedPlayers)(state);

  // return pipe(
  //   state.allPacPlayers,
  //   A.filter(p => p.pathIndex === player.pathIndex && p.jailTurnsCount === 0),
  //   A.mapWithIndex<PacManPlayer, PacManPlayer>((index, player) => ({
  //     ...player,
  //     offset: index,
  //   })),
  //   updatePlayers
  // )(state);
}

function initialisePacmanMoves(state: PacManUiState): PacManUiState {
  const allPlayersInJail = state.allPacPlayers.filter(playerInJail);
  const totalMovesForPlayersInJail = allPlayersInJail
    .map<number>(p => p.movesRemaining)
    .reduce((acc, v) => acc + v, 0);

  return {
    ...updatePlayers(allPlayersInJail.map(resetPlayersMoves))(state),
    pacMan: {
      ...state.pacMan,
      movesRemaining: Math.max(totalMovesForPlayersInJail, MIN_PACMAN_MOVES),
    },
  };
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
  const updatedPlayersInJail = state.allPacPlayers
    .filter(playerInJail)
    .map(reducePlayerJailCount);

  // const playersInJail = pipe(
  //   state.allPacPlayers,
  //   A.filter(playerInJail),
  //   A.map(reducePlayerJailCount)
  // );

  return updatePlayers(updatedPlayersInJail)(state);
}

function playerNotInJail(player: PacManPlayer): boolean {
  return !playerInJail(player);
}

function playerInJail(player: PacManPlayer): boolean {
  return player.jailTurnsCount > 0;
}

function resetPlayersMoves(player: PacManPlayer): PacManPlayer {
  return {
    ...player,
    movesRemaining: 0,
  };
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
