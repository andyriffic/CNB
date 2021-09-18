import {
  getPlayerAttributeValue,
  getPlayerIntegerAttributeValue,
} from '../../../../uplift/utils/player';
import { Player } from '../../../providers/PlayersProvider';
import {
  RacingPlayer,
  RacingTrack,
  RacingTrackPosition,
  RackingTrackSquare,
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

const sortMovesRemaining = (a: RacingPlayer, b: RacingPlayer): 1 | -1 => {
  return a.movesRemaining <= b.movesRemaining ? 1 : -1;
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
  };
};

type GamesActions =
  | AutoMovePlayerAction
  | SyncDataToServerAction
  | SyncDataFromServerAction;

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
      };

      return stepPlayer(movingState, playerToMove.player.id);
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
  };
}

function stepPlayer(gameState: GameState, playerId: string): GameState {
  const player = gameState.racers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  const { racingTrack } = gameState;
  const { position: currentPosition } = player;

  const endOfSquare =
    racingTrack.sections[currentPosition.sectionIndex].lanes[
      currentPosition.laneIndex
    ].squares.length ===
    currentPosition.squareIndex + 1;

  const nextSquareIndex = endOfSquare ? 0 : currentPosition.squareIndex + 1;
  const nextLaneIndex = endOfSquare ? 0 : currentPosition.laneIndex;
  const nextSectionIndex = endOfSquare
    ? currentPosition.sectionIndex + 1
    : currentPosition.sectionIndex;

  const possibleNewPosition: RacingTrackPosition = {
    sectionIndex: nextSectionIndex,
    laneIndex: nextLaneIndex,
    squareIndex: nextSquareIndex,
  };

  const newPosition = getNextLane(
    possibleNewPosition,
    racingTrack.sections[possibleNewPosition.sectionIndex].lanes.length,
    gameState.racers
  );

  const movesRemaining = newPosition.moved ? player.movesRemaining - 1 : 0;

  const updatedPlayer: RacingPlayer = {
    ...player,
    blocked: !newPosition.moved,
    passedAnotherRacer:
      newPosition.position.sectionIndex > currentPosition.sectionIndex &&
      gameState.racers.filter(
        rp =>
          rp.player.id !== player.player.id &&
          rp.position.sectionIndex === currentPosition.sectionIndex
      ).length > 0,
    position: newPosition.moved ? newPosition.position : player.position,
    movesRemaining,
  };

  const updatedPlayers = replaceWithUpdatedPlayer(
    updatedPlayer,
    gameState.racers
  );

  return {
    ...gameState,
    movingPlayerId:
      player.movesRemaining - 1 > 0 ? player.player.id : undefined,
    racers: updatedPlayers,
    playersToMove: updatedPlayers.filter(rp => rp.movesRemaining > 0),
    allPlayersMoved:
      updatedPlayers.filter(rp => rp.movesRemaining > 0).length === 0,
    gamePhase:
      updatedPlayers.filter(rp => rp.movesRemaining > 0).length === 0
        ? GAME_PHASE.FINISHED_ROUND
        : GAME_PHASE.MOVING_PLAYERS,
  };
}

function getNextLane(
  proposedPosition: RacingTrackPosition,
  maxLanes: number,
  racers: RacingPlayer[]
): { position: RacingTrackPosition; moved: boolean; overtook: boolean } {
  let position: RacingTrackPosition = {
    ...proposedPosition,
  };

  let moved = false;

  for (
    let laneIndex = proposedPosition.laneIndex;
    laneIndex < maxLanes;
    laneIndex++
  ) {
    position.laneIndex = laneIndex;
    const squareOccupied = racers.find(
      rp =>
        rp.position.sectionIndex === proposedPosition.sectionIndex &&
        rp.position.laneIndex === laneIndex &&
        rp.position.squareIndex === proposedPosition.squareIndex
    );

    if (!squareOccupied) {
      moved = true;
      position.laneIndex = laneIndex;
      break;
    }
  }

  return {
    position,
    moved,
    overtook: position.laneIndex < proposedPosition.laneIndex,
  };
}

function replaceWithUpdatedPlayer(
  updatedPlayer: RacingPlayer,
  racingPlayers: RacingPlayer[]
): RacingPlayer[] {
  return racingPlayers.map(rp => {
    return rp.player.id === updatedPlayer.player.id ? updatedPlayer : rp;
  });
}
