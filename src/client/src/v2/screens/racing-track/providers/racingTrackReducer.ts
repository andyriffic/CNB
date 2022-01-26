import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../uplift/utils/player';
import { Player } from '../../../providers/PlayersProvider';
import { SoundMap } from '../../../providers/SoundProvider';
import { defaultTrackBehaviour } from '../trackBehaviours';
import {
  RacingCarStyles,
  RacingPlayer,
  RacingTrack,
  RacingTrackPosition,
  RacerHistoryRecord,
  TrackSpecialBehaviour,
  RacingTrackType,
} from '../types';

export enum GAME_PHASE {
  NOT_STARTED = 0,
  MOVING_PLAYERS = 1,
  FINISHED_ROUND = 2,
}

type GameState = {
  gamePhase: GAME_PHASE;
  racingTrack: RacingTrack;
  racers: RacingPlayer[];
  playersToMove: RacingPlayer[];
  movingPlayerId?: string;
  allPlayersMoved: boolean;
  soundEffect?: keyof SoundMap;
  racerHistory: RacerHistoryRecord[];
};

interface BaseAction {
  type: string;
}

interface AutoMovePlayerAction extends BaseAction {
  type: 'AUTO_MOVE_PLAYER';
}

interface SyncDataToServerAction extends BaseAction {
  type: 'SYNC_DATA_TO_SERVER';
  saveData: (racingPlayer: RacingPlayer) => void;
}

interface SyncDataFromServerAction extends BaseAction {
  type: 'SYNC_DATA_FROM_SERVER';
  allPlayers: Player[];
}

const MAX_MOVES = 4;
const DEFAULT_MOVES_PER_SQUARE = 1;
const MOVES_REQUIRED_TO_PASS = 2;

const sortMovesRemaining = (a: RacingPlayer, b: RacingPlayer): 1 | -1 => {
  if (a.movesRemaining === b.movesRemaining) {
    return a.position.sectionIndex <= b.position.sectionIndex ? 1 : -1;
  } else {
    return a.movesRemaining < b.movesRemaining ? 1 : -1;
  }
};

export const createInitialState = ({
  racingTrack,
  participatingPlayers,
}: {
  racingTrack: RacingTrack;
  participatingPlayers: Player[];
}): GameState => {
  const racers = participatingPlayers.map(p =>
    createGamePlayer(p, racingTrack)
  );
  const playersToMove = racers
    .filter(gp => gp.movesRemaining > 0)
    .sort(sortMovesRemaining);

  console.log('SORTED PLAYERS', playersToMove);

  return {
    gamePhase: GAME_PHASE.NOT_STARTED,
    racers,
    playersToMove,
    racingTrack,
    allPlayersMoved: playersToMove.length === 0,
    racerHistory: [],
  };
};

type GamesActions =
  | AutoMovePlayerAction
  | SyncDataToServerAction
  | SyncDataFromServerAction;

function playerEndedTurn(racingPlayer: RacingPlayer): boolean {
  return racingPlayer.movesRemaining === 0 || racingPlayer.blocked;
}

export function reducer(state: GameState, action: GamesActions): GameState {
  switch (action.type) {
    case 'SYNC_DATA_TO_SERVER': {
      state.racers.forEach(action.saveData);
      return state;
    }
    case 'SYNC_DATA_FROM_SERVER': {
      console.log('SYNCING FROM SERVER');

      const updatedRacers = action.allPlayers.map<RacingPlayer>(p => {
        const currentRacingPlayer = state.racers.find(
          rp => rp.player.id === p.id
        )!;
        return {
          ...currentRacingPlayer,
          carColor: getPlayerAttributeValue(p.tags, 'rt_color', 'red'),
          // movesRemaining: getPlayerIntegerAttributeValue(p.tags, 'rt_moves', 0),
        };
      });
      // const playersToMove = updatedRacers.filter(gp => gp.movesRemaining > 0);

      return {
        ...state,
        racers: updatedRacers,
        // playersToMove,
        // allPlayersMoved: playersToMove.length === 0,
        // gamePhase:
        //   playersToMove.length === 0
        //     ? GAME_PHASE.FINISHED_ROUND
        //     : GAME_PHASE.NOT_STARTED,
      };
    }
    case 'AUTO_MOVE_PLAYER': {
      if (state.allPlayersMoved) {
        return {
          ...state,
          gamePhase: GAME_PHASE.FINISHED_ROUND,
        };
      }

      console.log('MOVING PLAYER', state.movingPlayerId, state.playersToMove);

      const playerToMove = state.movingPlayerId
        ? state.racers.find(rp => rp.player.id === state.movingPlayerId)!
        : state.playersToMove[0];

      if (!playerToMove) {
        return {
          ...state,
          gamePhase: GAME_PHASE.FINISHED_ROUND,
          allPlayersMoved: true,
        };
      }

      const movingState: GameState = {
        ...state,
        gamePhase: GAME_PHASE.MOVING_PLAYERS,
        movingPlayerId: playerToMove.player.id,
        racerHistory: appendHistoryRecord(
          state.racerHistory,
          state.racers.find(r => r.player.id === playerToMove.player.id)
        ),
      };

      return playerEndedTurn(playerToMove)
        ? stopPlayer(movingState, playerToMove.player.id)
        : stepPlayer(movingState, playerToMove.player.id);
    }
    default:
      return state;
  }
}

function createGamePlayer(
  player: Player,
  racingTrack: RacingTrack
): RacingPlayer {
  const sectionIndex = getPlayerIntegerAttributeValue(
    player.tags,
    'rt_section',
    0
  );
  const laneIndex = getPlayerIntegerAttributeValue(player.tags, 'rt_lane', 0);
  const squareIndex = getPlayerIntegerAttributeValue(
    player.tags,
    'rt_square',
    0
  );

  const section = racingTrack.sections[sectionIndex];
  const lane = section.lanes[laneIndex];
  const square = lane.squares[squareIndex];

  return {
    player,
    position: {
      sectionIndex,
      laneIndex,
      squareIndex,
    },
    movesRemaining: getPlayerIntegerAttributeValue(player.tags, 'rt_moves', 0),
    isMoving: false,
    blocked: false,
    passedAnotherRacer: false,
    carColor: getPlayerAttributeValue(player.tags, 'rt_color', 'red'),
    carStyle: getPlayerAttributeValue(
      player.tags,
      'rt_car',
      'sports'
    ) as RacingCarStyles,
    gotBonusMoves: false,
    currentLap: getPlayerIntegerAttributeValue(player.tags, 'rt_lap', 0),
    finishPosition: getPlayerIntegerAttributeValue(player.tags, 'rt_finish', 0),
  };
}

function stopPlayer(gameState: GameState, playerId: string): GameState {
  const player = gameState.racers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  const updatedPlayer: RacingPlayer = {
    ...player,
    isMoving: false,
    passedAnotherRacer: false,
  };

  const updatedRacers = replaceWithUpdatedPlayer(
    updatedPlayer,
    gameState.racers
  ).map(rp => ({ ...rp, gotBonusMoves: false, blocked: false }));

  const playerIdsStillToMove = gameState.playersToMove
    .map(rp => rp.player.id)
    .filter(pid => pid !== player.player.id);

  const playerCanStillMove = (player: RacingPlayer): boolean => {
    return (
      player.movesRemaining > 0 &&
      getNextPlayerPosition(player, updatedRacers, gameState.racingTrack).moved
    );
  };
  const playersFinishedButCanNowMove = updatedRacers
    .filter(playerCanStillMove)
    .filter(rp => !playerIdsStillToMove.includes(rp.player.id));

  const updatedPlayersToMove = playersFinishedButCanNowMove.length
    ? [
        ...gameState.playersToMove.filter(
          p => p.player.id !== updatedPlayer.player.id
        ),
        ...playersFinishedButCanNowMove.sort(sortMovesRemaining),
      ]
    : gameState.playersToMove.filter(
        p => p.player.id !== updatedPlayer.player.id
      );

  const gamePhase =
    updatedPlayersToMove.length === 0
      ? GAME_PHASE.FINISHED_ROUND
      : GAME_PHASE.MOVING_PLAYERS;

  if (gamePhase == GAME_PHASE.FINISHED_ROUND) {
    console.log('HISTORY', gameState.racerHistory);
  }

  return {
    ...gameState,
    racers: updatedRacers,
    movingPlayerId: undefined,
    playersToMove: updatedPlayersToMove,
    allPlayersMoved: updatedPlayersToMove.length === 0,
    gamePhase,
    soundEffect: undefined,
    // racerHistory: appendHistoryRecord(gameState.racerHistory, updatedPlayer),
  };
}

function appendHistoryRecord(
  history: RacerHistoryRecord[],
  player?: RacingPlayer
): RacerHistoryRecord[] {
  if (!player) {
    return history;
  }
  return [
    ...history,
    {
      playerId: player.player.id,
      position: player.position,
      movesRemaining: player.movesRemaining,
      blocked: player.blocked,
      gotBonusMoves: player.gotBonusMoves,
      currentLap: player.currentLap,
      finishPosition: player.finishPosition,
    },
  ];
}

function stepPlayer(gameState: GameState, playerId: string): GameState {
  const player = gameState.racers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  const { racingTrack } = gameState;
  const newPosition = getNextPlayerPosition(
    player,
    gameState.racers,
    racingTrack
  );

  const currentLap = newPosition.moved
    ? racingTrack.sections[newPosition.position.sectionIndex].crossesFinishLine
      ? player.currentLap + 1
      : player.currentLap
    : player.currentLap;

  const finishedRace =
    !player.finishPosition && currentLap > gameState.racingTrack.totalLaps;

  const finishPosition = finishedRace
    ? Math.max(...gameState.racers.map(r => r.finishPosition || 0)) + 1
    : undefined;

  const squareType = getSquareBehaviour(
    racingTrack,
    newPosition.position,
    newPosition.swappedWithRacer
      ? MOVES_REQUIRED_TO_PASS
      : DEFAULT_MOVES_PER_SQUARE
  );

  const movesRemaining = finishedRace
    ? 0
    : newPosition.moved
    ? squareType.behaviour(player).movesRemaining
    : Math.min(player.movesRemaining, MAX_MOVES);
  const blocked = !newPosition.moved;

  const overtakenRacer: RacingPlayer | undefined = newPosition.swappedWithRacer
    ? { ...newPosition.swappedWithRacer, position: player.position }
    : undefined;

  const updatedPlayer: RacingPlayer = {
    ...player,
    isMoving: true,
    gotBonusMoves: false,
    blocked,
    passedAnotherRacer:
      newPosition.position.sectionIndex > player.position.sectionIndex &&
      gameState.racers.filter(
        rp =>
          rp.player.id !== player.player.id &&
          rp.position.sectionIndex === player.position.sectionIndex
      ).length > 0,
    position: newPosition.moved ? newPosition.position : player.position,
    currentLap,
    movesRemaining,
    finishPosition,
  };

  const racersWithUpdatedOvertakenPlayer = replaceWithUpdatedPlayer(
    overtakenRacer,
    gameState.racers
  );

  const racersWithUpdatedPlayer = replaceWithUpdatedPlayer(
    updatedPlayer,
    racersWithUpdatedOvertakenPlayer
  );

  const catchupBonusMoves = newPosition.moved
    ? racingTrack.sections[updatedPlayer.position.sectionIndex]
        .catchupBonusMoves
    : 0;

  const racersWithUpdatedBonusMoves = catchupBonusMoves
    ? applyCatchupBonus(
        racersWithUpdatedPlayer,
        updatedPlayer.position.sectionIndex,
        catchupBonusMoves
      )
    : racersWithUpdatedPlayer;

  return {
    ...gameState,
    racers: racersWithUpdatedBonusMoves,
    soundEffect: getMoveSoundEffect({
      squareType,
      catchupBonusMoves,
      blocked,
      finishedRace,
      swappedPlayer: !!newPosition.swappedWithRacer,
    }),
  };
}

function getMoveSoundEffect({
  squareType,
  catchupBonusMoves,
  blocked,
  finishedRace,
  swappedPlayer,
}: {
  squareType: RacingTrackType;
  catchupBonusMoves?: number;
  blocked: boolean;
  finishedRace: boolean;
  swappedPlayer: boolean;
}): keyof SoundMap | undefined {
  if (catchupBonusMoves) {
    return 'PowerMode';
  } else if (blocked) {
    return 'RacingCarHorn';
  } else if (finishedRace) {
    return 'SelectPrizePoints';
  } else if (swappedPlayer) {
    return 'MobLoseLife';
  } else {
    return squareType.sound;
  }
}

function applyCatchupBonus(
  allRacers: RacingPlayer[],
  sectionIndex: number,
  catchupMoves: number
): RacingPlayer[] {
  const allPlayersToGiveCatchupBonus = allRacers
    .filter(rp => rp.position.sectionIndex < sectionIndex)
    .filter(rp => !rp.finishPosition)
    .map(rp => rp.player.id);

  const updatedRacers = allRacers.map<RacingPlayer>(rp => {
    return allPlayersToGiveCatchupBonus.includes(rp.player.id)
      ? {
          ...rp,
          movesRemaining: rp.movesRemaining + catchupMoves,
          blocked: false,
          gotBonusMoves: true,
        }
      : rp;
  });

  return updatedRacers;
}

function getSquareBehaviour(
  raceTrack: RacingTrack,
  position: RacingTrackPosition,
  movesUsed: number
): RacingTrackType {
  const square =
    raceTrack.sections[position.sectionIndex].lanes[position.laneIndex].squares[
      position.squareIndex
    ];
  return square.type ? square.type : defaultTrackBehaviour(movesUsed);
}

type NextPositionResult = {
  position: RacingTrackPosition;
  moved: boolean;
  overtook: boolean;
  swappedWithRacer?: RacingPlayer;
};

function getNextPlayerPosition(
  player: RacingPlayer,
  racers: RacingPlayer[],
  racingTrack: RacingTrack
): NextPositionResult {
  const { position: currentPosition } = player;

  const endOfSquare =
    racingTrack.sections[currentPosition.sectionIndex].lanes[
      currentPosition.laneIndex
    ].squares.length ===
    currentPosition.squareIndex + 1;

  const maxSectionIndex = racingTrack.sections.length - 1;

  const nextSquareIndex = endOfSquare ? 0 : currentPosition.squareIndex + 1;

  const nextLaneIndex = endOfSquare ? 0 : currentPosition.laneIndex;

  const nextSectionIndex = endOfSquare
    ? currentPosition.sectionIndex + 1 > maxSectionIndex
      ? 0
      : currentPosition.sectionIndex + 1
    : currentPosition.sectionIndex;

  const possibleNewPosition: RacingTrackPosition = {
    sectionIndex: nextSectionIndex,
    laneIndex: nextLaneIndex,
    squareIndex: nextSquareIndex,
  };

  const nextLaneWithoutOvertake = getNextLane(
    player,
    possibleNewPosition,
    racingTrack,
    racers,
    false
  );

  return nextLaneWithoutOvertake.moved
    ? nextLaneWithoutOvertake
    : getNextLane(player, possibleNewPosition, racingTrack, racers, true);
}

function getNextLane(
  player: RacingPlayer,
  proposedPosition: RacingTrackPosition,
  racingTrack: RacingTrack,
  racers: RacingPlayer[],
  canOvertake: boolean
): NextPositionResult {
  let position: RacingTrackPosition = {
    ...proposedPosition,
  };

  let moved = false;
  let swappedPlayer: RacingPlayer | undefined;

  const maxLanes =
    racingTrack.sections[proposedPosition.sectionIndex].lanes.length;

  for (
    let laneIndex = proposedPosition.laneIndex;
    laneIndex < maxLanes;
    laneIndex++
  ) {
    position.laneIndex = laneIndex;

    const destinationSquareExists = !!racingTrack.sections[
      proposedPosition.sectionIndex
    ].lanes[laneIndex].squares[position.squareIndex];

    position.squareIndex = destinationSquareExists
      ? position.squareIndex
      : racingTrack.sections[proposedPosition.sectionIndex].lanes[laneIndex]
          .squares.length - 1;

    const racerInProposedSquare = racers.find(
      rp =>
        !rp.finishPosition &&
        rp.position.sectionIndex === proposedPosition.sectionIndex &&
        rp.position.laneIndex === laneIndex &&
        rp.position.squareIndex === position.squareIndex
    );

    if (
      canOvertake &&
      position.sectionIndex > 4 &&
      racerInProposedSquare &&
      player.movesRemaining >= MOVES_REQUIRED_TO_PASS
    ) {
      console.log('SWAPPED', player, racerInProposedSquare);

      swappedPlayer = racerInProposedSquare;
      moved = true;
      position.laneIndex = laneIndex;
      break;
    }

    const obstacle =
      racingTrack.sections[position.sectionIndex].lanes[position.laneIndex]
        .squares[position.squareIndex].type;

    const obstacleInTheWay = obstacle && obstacle.type === 'obstacle';

    if (!racerInProposedSquare && !obstacleInTheWay) {
      moved = true;
      position.laneIndex = laneIndex;
      break;
    }
  }
  const result: NextPositionResult = {
    position,
    moved,
    overtook: position.laneIndex < proposedPosition.laneIndex,
    swappedWithRacer: swappedPlayer,
  };

  return result;
}

function replaceWithUpdatedPlayer(
  updatedPlayer: RacingPlayer | undefined,
  racingPlayers: RacingPlayer[]
): RacingPlayer[] {
  if (!updatedPlayer) {
    return racingPlayers;
  }

  return racingPlayers.map(rp => {
    return rp.player.id === updatedPlayer.player.id ? updatedPlayer : rp;
  });
}
