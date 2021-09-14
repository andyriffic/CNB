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
  movingPlayerId?: string;
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

interface AutoMovePlayerAction extends BaseAction {
  type: 'AUTO_MOVE_PLAYER';
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
  | AutoMovePlayerAction;

export function reducer(state: GameState, action: GamesActions): GameState {
  switch (action.type) {
    case 'START': {
      return { ...state, gamePhase: GAME_PHASE.SPLASH_PLAYER_MOVES };
    }
    case 'START_MOVE_PLAYERS': {
      return { ...state, gamePhase: GAME_PHASE.START_MOVE_PLAYERS };
    }
    case 'AUTO_MOVE_PLAYER': {
      if (state.allPlayersMoved) {
        return state;
      }

      const playerToMove = state.movingPlayerId
        ? state.gamePlayers.find(gp => gp.player.id === state.movingPlayerId)!
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

      return playerToMove.movesRemaining === 0
        ? landedInCell(movingState, playerToMove.player.id)
        : stepPlayer(movingState, playerToMove.player.id);
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

function landedInCell(gameState: GameState, playerId: string): GameState {
  const player = gameState.gamePlayers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  if (player.movesRemaining > 0) {
    return gameState;
  }

  const stoppedPlayer: GamePlayer = {
    ...player,
    isMoving: false,
  };

  const cellBehaviour = player.cell.behaviour;

  switch (cellBehaviour.type) {
    case 'ladder': {
      const destinationCell = gameState.gameBoard.cells.find(
        c => c.number === cellBehaviour.destinationCellNumber
      )!;
      const movedPlayer: GamePlayer = {
        ...stoppedPlayer,
        cell: destinationCell,
      };
      const updatedPlayers = replaceWithUpdatedPlayer(
        movedPlayer,
        gameState.gamePlayers
      );
      const playersToMove = updatedPlayers.filter(gp => gp.movesRemaining > 0);
      return {
        ...gameState,
        movingPlayerId: undefined,
        gamePlayers: updatedPlayers,
        playersToMove,
        allPlayersMoved: playersToMove.length === 0,
      };
    }
    default: {
      const updatedPlayers = replaceWithUpdatedPlayer(
        stoppedPlayer,
        gameState.gamePlayers
      );
      const playersToMove = updatedPlayers.filter(gp => gp.movesRemaining > 0);

      return {
        ...gameState,
        gamePlayers: updatedPlayers,
        movingPlayerId: undefined,
        playersToMove,
        allPlayersMoved: playersToMove.length === 0,
      };
    }
  }
}

function stepPlayer(gameState: GameState, playerId: string): GameState {
  const player = gameState.gamePlayers.find(gp => gp.player.id === playerId);
  if (!player) return gameState;

  const destinationCell = gameState.gameBoard.cells.find(
    c => c.number === player.cell.number + 1
  );

  if (!destinationCell) return gameState;

  const movesRemaining =
    destinationCell.behaviour.type === 'end'
      ? 0
      : Math.max(player.movesRemaining - 1, 0);

  const movedPlayer: GamePlayer = {
    ...player,
    movesRemaining,
    cell: destinationCell,
    isMoving: true,
  };

  const updatedPlayers = replaceWithUpdatedPlayer(
    movedPlayer,
    gameState.gamePlayers
  );

  return {
    ...gameState,
    gamePlayers: updatedPlayers,
  };
}

function replaceWithUpdatedPlayer(
  updatedPlayer: GamePlayer,
  gamePlayers: GamePlayer[]
): GamePlayer[] {
  return gamePlayers.map(gp => {
    return gp.player.id === updatedPlayer.player.id ? updatedPlayer : gp;
  });
}
