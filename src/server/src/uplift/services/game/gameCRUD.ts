import { IdGenerator } from '../../@types/shortIdGenerator';
import shortId from 'shortid';
import { TeamMatchup, Game, GameMove, GameMoveUpdate } from './types';

const createTeamMatchupAsync = (
  teamIds: [string, string],
  idGenerator: IdGenerator = shortId
): Promise<TeamMatchup> => {
  const matchUp: TeamMatchup = {
    id: idGenerator.generate(),
    teamIds: [teamIds[0], teamIds[1]],
  };
  return Promise.resolve(matchUp);
};

const createGameForMatchupAsync = (
  teamIds: [string, string]
): Promise<Game> => {
  const promise = new Promise<Game>(resolve => {
    createGameAsync(teamIds).then(game => {
      resolve(game);
    });
  });

  return promise;
};

const createGameAsync = (
  teamIds: [string, string],
  idGenerator: IdGenerator = shortId
): Promise<Game> => {
  const game: Game = {
    id: idGenerator.generate(),
    moves: [{ teamId: teamIds[0] }, { teamId: teamIds[1] }],
  };

  return Promise.resolve(game);
};

const updateTeamMoveAsync = (
  game: Game,
  teamId: string,
  gameMoveUpdate: GameMoveUpdate
): Promise<Game> => {
  const promise = new Promise<Game>((resolve, reject) => {
    const teamMoveIndex = game.moves.findIndex(m => m && m.teamId === teamId);
    if (teamMoveIndex < 0) {
      reject('Team move not found :(');
    }

    updateMoveAsync(game.moves[teamMoveIndex], gameMoveUpdate).then(move => {
      const newGame: Game = {
        ...game,
      };
      newGame.moves[teamMoveIndex] = move;
      resolve(newGame);
    });
  });

  return promise;
};

const updateMoveAsync = (
  gameMove: GameMove,
  gameMoveUpdate: GameMoveUpdate
): Promise<GameMove> => {
  const updatedGameMove = {
    ...gameMove,
    ...gameMoveUpdate,
  };

  return Promise.resolve(updatedGameMove);
};

export default {
  createTeamMatchupAsync,
  createGameForMatchupAsync,
  updateTeamMoveAsync,
};
