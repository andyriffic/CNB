import {
  TeamMatchup,
  Game,
  GameMove,
  GameMoveUpdate,
  PLAY_MODE,
} from './types';
import { GameResult } from '../game-result/types';

const createTeamMatchup = (
  id: string,
  teamIds: [string, string],
  pointCounterIds: [string, string],
  trophyCounterIds: [string, string],
  bonusCounterId: string,
  trophyGoal: number,
  themeId: string
): TeamMatchup => {
  const matchUp: TeamMatchup = {
    id,
    teamIds: [teamIds[0], teamIds[1]],
    pointCounterIds: [pointCounterIds[0], pointCounterIds[1]],
    trophyCounterIds: [trophyCounterIds[0], trophyCounterIds[1]],
    bonusCounterId,
    trophyGoal,
    themeId,
  };
  return matchUp;
};

const createGame = (
  id: string,
  teamIds: [string, string],
  trophyReset: boolean,
  playMode: PLAY_MODE = PLAY_MODE.Standard,
  gameAttributes: { [key: string]: any } = {}
): Game => {
  const game: Game = {
    id,
    moves: [{ teamId: teamIds[0] }, { teamId: teamIds[1] }],
    trophyWon: false,
    trophyReset,
    viewed: false,
    playMode,
    gameAttributes,
  };

  return game;
};

const resolveGame = (
  game: Game,
  result: GameResult,
  trophyWon: boolean,
  gameAttributes: { [key: string]: any } = {}
): Game => {
  return {
    ...game,
    result,
    trophyWon,
    gameAttributes: {
      ...game.gameAttributes,
      ...gameAttributes,
    },
  };
};

const setGamedViewed = (game: Game): Game => {
  return {
    ...game,
    viewed: true,
  };
};

const updateTeamMove = (
  game: Game,
  teamId: string,
  gameMoveUpdate: GameMoveUpdate
): Game => {
  const teamMoveIndex = game.moves.findIndex((m) => m && m.teamId === teamId);
  if (teamMoveIndex < 0) {
    throw new Error('Team move not found :(');
  }

  if (game.moves[teamMoveIndex].moveId) {
    // throw new Error('Already moved');
    // TODO throw an error but handle gracefully in calling code
    console.info('Player has already moved');
    return game;
  }

  const updatedMove = updateMove(game.moves[teamMoveIndex], gameMoveUpdate);

  const newGame: Game = {
    ...game,
  };
  newGame.moves[teamMoveIndex] = updatedMove;

  return newGame;
};

const updateMove = (
  gameMove: GameMove,
  gameMoveUpdate: GameMoveUpdate
): GameMove => {
  return {
    ...gameMove,
    ...gameMoveUpdate,
  };
};

export const matchupService = {
  createTeamMatchup,
  createGame,
  updateTeamMove,
  resolveGame,
  setGamedViewed,
};
