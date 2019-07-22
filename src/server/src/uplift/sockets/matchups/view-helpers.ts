import {
  Game,
  MatchupSpectatorView,
  GameSpectatorView,
  GameMove,
  MoveSpectatorView,
  GameResultSpectatorView,
  GameMoveResultSpectatorView,
  MatchupPlayerView,
} from '../../services/matchup/types';
import { ALL_PLAYERS } from '../../services/player/constants';
import { viewsDatastore } from '../../datastore/views';
import { getGameStatus } from '../../services/matchup/gameStatus';

const getSpectatorMove = (move: GameMove): MoveSpectatorView => {
  return {
    moved: !!move.moveId,
    usedPowerup: !!move.powerUpId && move.powerUpId !== 'NONE',
    playerName: move.playerId
      ? ALL_PLAYERS.find(p => p.id === move.playerId)!.name
      : null,
  };
};

const getSpectatorResultGameMove = (
  move: GameMove
): GameMoveResultSpectatorView => {
  return {
    moveId: move.moveId!,
    powerUpId: move.powerUpId!,
  };
};

const getSpectatorGameResult = (
  game: Game
): GameResultSpectatorView | undefined => {
  if (!game.result) {
    return undefined;
  }

  return {
    draw: game.result.draw,
    winnerIndex: game.result.winnerIndex,
    moves: [
      getSpectatorResultGameMove(game.moves[0]),
      getSpectatorResultGameMove(game.moves[1]),
    ],
  };
};

const getGameInProgress = (
  matchupId: string,
  gamesInProgress: { [matchupId: string]: Game }
): GameSpectatorView | null => {
  const gameInProgress = gamesInProgress[matchupId];
  if (!gameInProgress) {
    return null;
  }

  return {
    id: gameInProgress.id,
    status: getGameStatus(gameInProgress),
    moves: [
      getSpectatorMove(gameInProgress.moves[0]),
      getSpectatorMove(gameInProgress.moves[1]),
    ],
    result: getSpectatorGameResult(gameInProgress),
  };
};

export const getMatchupView = (
  matchupId: string,
  gamesInProgress: { [matchupId: string]: Game }
): Promise<MatchupSpectatorView> => {
  return viewsDatastore.getMatchupSpectatorView(
    matchupId,
    getGameInProgress(matchupId, gamesInProgress)
  );
};

export const getPlayerMatchupView = (
  matchupId: string,
  playerId: string,
  gamesInProgress: { [matchupId: string]: Game }
): Promise<MatchupPlayerView> => {
  console.log('getPlayerMatchupView', playerId);
  return viewsDatastore.getPlayerMatchupView(
    matchupId,
    getGameInProgress(matchupId, gamesInProgress),
    playerId
  );
};
