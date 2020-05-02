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
import { viewsDatastore } from '../../datastore/views';
import { getGameStatus } from '../../services/matchup/gameStatus';
import { Player } from '../../services/player/types';
import { playerService } from '../../services/player';
import { getPlayerImageUrl } from '../../sockets/players';

const getSpectatorMove = (
  move: GameMove,
  allPlayers: Player[]
): MoveSpectatorView => {
  const player = allPlayers.find((p) => p.id === move.playerId);

  return {
    moved: !!move.moveId,
    usedPowerup: !!move.powerUpId && move.powerUpId !== 'NONE',
    playerName: player ? player.name : null,
    playerId: player ? player.id : null,
    playerAvatarUrl: player ? getPlayerImageUrl(player.id, player.tags) : null,
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
  gamesInProgress: { [matchupId: string]: Game },
  allPlayers: Player[]
): GameSpectatorView | null => {
  const gameInProgress = gamesInProgress[matchupId];
  if (!gameInProgress) {
    return null;
  }

  return {
    id: gameInProgress.id,
    status: getGameStatus(gameInProgress),
    moves: [
      getSpectatorMove(gameInProgress.moves[0], allPlayers),
      getSpectatorMove(gameInProgress.moves[1], allPlayers),
    ],
    result: getSpectatorGameResult(gameInProgress),
    trophyWon: gameInProgress.trophyWon,
    trophyReset: gameInProgress.trophyReset,
    viewed: gameInProgress.viewed,
    playMode: gameInProgress.playMode,
    attributes: { ...gameInProgress.gameAttributes },
  };
};

export const getMatchupView = (
  matchupId: string,
  gamesInProgress: { [matchupId: string]: Game }
): Promise<MatchupSpectatorView> => {
  return new Promise<MatchupSpectatorView>((resolve) => {
    playerService.getPlayersAsync().then((allPlayers) => {
      resolve(
        viewsDatastore.getMatchupSpectatorView(
          matchupId,
          getGameInProgress(matchupId, gamesInProgress, allPlayers)
        )
      );
    });
  });
};

export const getPlayerMatchupView = (
  matchupId: string,
  playerId: string,
  gamesInProgress: { [matchupId: string]: Game }
): Promise<MatchupPlayerView> => {
  return new Promise<MatchupPlayerView>((resolve) => {
    playerService.getPlayersAsync().then((allPlayers) => {
      resolve(
        viewsDatastore.getPlayerMatchupView(
          matchupId,
          getGameInProgress(matchupId, gamesInProgress, allPlayers),
          playerId
        )
      );
    });
  });
};
