import { cpuUsage } from 'process';
import { getPlayerIntegerAttributeValue } from '../../../../uplift/utils/player';
import { Player } from '../../../providers/PlayersProvider';
import { BOARD_CELL_TYPE, GameBoard, GamePlayer } from '../types';

export enum GAME_PHASE {
  READY = 0,
  SPLASH_PLAYER_MOVES = 1,
  START_MOVE_PLAYERS = 2,
}

type GameState = {
  gameBoard: GameBoard;
  gamePhase: GAME_PHASE;
  gamePlayers: GamePlayer[];
  playersToMove: GamePlayer[];
  movingPlayer?: GamePlayer;
  allPlayersMoved: boolean;
};

interface BaseAction {
  type: string;
}

interface StartGameAction extends BaseAction {
  type: 'START';
}

interface StartMovePlayersAction extends BaseAction {
  type: 'START_MOVE_PLAYERS';
}

interface InitiatePlayerMoveAction extends BaseAction {
  type: 'INITIATE_PLAYER_MOVE';
  playerId?: string;
}

interface MoveActivePlayerAction extends BaseAction {
  type: 'MOVE_ACTIVE_PLAYER';
}

interface AutoMovePlayerAction extends BaseAction {
  type: 'AUTO_MOVE_PLAYER';
}

// interface PlacePlayersAction extends BaseAction {
//   type: 'PLACE_PLAYER';
//   playerId: string;
//   destinationCell: number;
// }

interface StepPlayerAction extends BaseAction {
  type: 'STEP_PLAYER';
  playerId: string;
}

export const createInitialState = (
  gameBoard: GameBoard,
  allPlayers: Player[]
): GameState => {
  const gamePlayers = allPlayers.map(p => createGamePlayer(p, gameBoard));
  const playersToMove = gamePlayers.filter(gp => gp.movesRemaining > 0);
  return {
    gamePhase: GAME_PHASE.READY,
    gamePlayers: allPlayers.map(p => createGamePlayer(p, gameBoard)),
    playersToMove,
    gameBoard,
    allPlayersMoved: playersToMove.length === 0,
  };
};

type GamesActions =
  | StartGameAction
  | StartMovePlayersAction
  | StepPlayerAction
  | InitiatePlayerMoveAction
  | MoveActivePlayerAction
  | AutoMovePlayerAction;

export function reducer(state: GameState, action: GamesActions): GameState {
  switch (action.type) {
    case 'START': {
      return { ...state, gamePhase: GAME_PHASE.SPLASH_PLAYER_MOVES };
    }
    case 'START_MOVE_PLAYERS': {
      return { ...state, gamePhase: GAME_PHASE.START_MOVE_PLAYERS };
    }
    case 'STEP_PLAYER': {
      return stepPlayer(state, action.playerId);
    }
    case 'INITIATE_PLAYER_MOVE': {
      const playerToMove = action.playerId
        ? state.playersToMove.find(gp => gp.player.id === action.playerId)
        : state.playersToMove[0];
      return {
        ...state,
        movingPlayer: playerToMove,
      };
    }
    case 'MOVE_ACTIVE_PLAYER': {
      if (!state.movingPlayer) {
        return state;
      }

      const movedState = stepPlayer(state, state.movingPlayer.player.id);
      return {
        ...movedState,
      };
    }
    case 'AUTO_MOVE_PLAYER': {
      if (state.allPlayersMoved) {
        return state;
      }

      const playerToMove = state.movingPlayer || state.playersToMove[0];

      if (!playerToMove) {
        return {
          ...state,
          allPlayersMoved: true,
        };
      }

      const movingState: GameState = {
        ...state,
        movingPlayer: playerToMove,
      };

      return stepPlayer(movingState, playerToMove.player.id);
    }
    default:
      return state;
  }
}

function createGamePlayer(player: Player, gameBoard: GameBoard): GamePlayer {
  const currentCellIndex = getPlayerIntegerAttributeValue(
    player.tags,
    'sl_cell',
    0
  );
  const cell =
    gameBoard.cells.find(c => c.number === currentCellIndex) ||
    gameBoard.cells[0];
  return {
    player,
    cell,
    movesRemaining: getPlayerIntegerAttributeValue(player.tags, 'sl_moves', 0),
    isMoving: false,
  };
}

function stepPlayer(gameState: GameState, playerId: string): GameState {
  const player = gameState.gamePlayers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  const destinationCell = gameState.gameBoard.cells.find(
    c => c.number === player.cell.number + 1
  );

  if (!destinationCell) return gameState;

  const movesRemaining =
    destinationCell.type === BOARD_CELL_TYPE.END
      ? 0
      : player.movesRemaining - 1;

  const movedPlayer: GamePlayer = {
    ...player,
    movesRemaining,
    cell: destinationCell,
    isMoving: gameState.movingPlayer
      ? gameState.movingPlayer.player.id === playerId && movesRemaining > 0
      : false,
  };
  const updatedPlayers = gameState.gamePlayers.map(gp => {
    return gp.player.id === movedPlayer.player.id ? movedPlayer : gp;
  });

  const playersToMove = updatedPlayers.filter(gp => gp.movesRemaining > 0);

  return {
    ...gameState,
    gamePlayers: updatedPlayers,
    playersToMove,
    allPlayersMoved: playersToMove.length === 0,
    movingPlayer: movedPlayer.isMoving ? movedPlayer : undefined,
  };
}
