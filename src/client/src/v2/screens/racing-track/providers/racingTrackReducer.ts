import { getPlayerIntegerAttributeValue } from '../../../../uplift/utils/player';
import { Player } from '../../../providers/PlayersProvider';
import {
  RacingPlayer,
  RacingTrack,
  RacingTrackPosition,
  RackingTrackSquare,
} from '../types';

type GameState = {
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

export const createInitialState = (
  racingTrack: RacingTrack,
  eligiblePlayers: Player[]
): GameState => {
  const racers = eligiblePlayers.map(p => createGamePlayer(p, racingTrack));
  const playersToMove = racers.filter(gp => gp.movesRemaining > 0);
  return {
    racers,
    playersToMove,
    racingTrack,
    allPlayersMoved: playersToMove.length === 0,
  };
};

type GamesActions = AutoMovePlayerAction;

export function reducer(state: GameState, action: GamesActions): GameState {
  switch (action.type) {
    case 'AUTO_MOVE_PLAYER': {
      if (state.allPlayersMoved) {
        return state;
      }

      const playerToMove = state.movingPlayerId
        ? state.racers.find(rp => rp.player.id === state.movingPlayerId)!
        : state.playersToMove[0];

      if (!playerToMove) {
        return {
          ...state,
          allPlayersMoved: true,
        };
      }

      const movingState: GameState = {
        ...state,
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

  const updatedPlayer: RacingPlayer = {
    ...player,
    position: newPosition.moved ? newPosition.position : player.position,
    movesRemaining: newPosition.moved ? player.movesRemaining - 1 : 0,
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
  };
}

function getNextLane(
  proposedPosition: RacingTrackPosition,
  maxLanes: number,
  racers: RacingPlayer[]
): { position: RacingTrackPosition; moved: boolean } {
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
      gr =>
        gr.position.sectionIndex === proposedPosition.sectionIndex &&
        gr.position.laneIndex === laneIndex &&
        gr.position.squareIndex === proposedPosition.squareIndex
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
