import { IdGenerator } from '../../@types/IdGenerator';
import shortId from 'shortid';
import { TeamMatchup, Game, GameMove, GameMoveUpdate } from './types';

const createTeamMatchup = (
  id: string,
  teamIds: [string, string]
): TeamMatchup => {
  const matchUp: TeamMatchup = {
    id,
    teamIds: [teamIds[0], teamIds[1]],
  };
  return matchUp;
};

const createGame = (
  id: string,
  teamIds: [string, string],
): Game => {
  const game: Game = {
    id,
    moves: [{ teamId: teamIds[0] }, { teamId: teamIds[1] }],
  };

  return game;
};

const updateTeamMove = (
  game: Game,
  teamId: string,
  gameMoveUpdate: GameMoveUpdate
): Game => {

  const teamMoveIndex = game.moves.findIndex(m => m && m.teamId === teamId);
  if (teamMoveIndex < 0) {
    throw new Error('Team move not found :(');
  }

  const updatedMove = updateMove(game.moves[teamMoveIndex], gameMoveUpdate);

  const newGame: Game = {
    ...game,
  }
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

export default {
  createTeamMatchup,
  createGame,
  updateTeamMove,
};
