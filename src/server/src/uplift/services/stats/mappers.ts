import {
  TeamMatchup,
  Game,
  MatchupSpectatorView,
  TeamSpectatorView,
  GameSpectatorView,
} from '../matchup/types';
import { GameStatsEntry, PlayerStatsEntry } from './types';

const mapMatchupPlayerToPlayerStatsEntry = (
  playerIndex: number,
  matchup: TeamMatchup,
  game: Game
): PlayerStatsEntry => {
  return {
    team: matchup.teamIds[playerIndex],
    move: game.moves[playerIndex].moveId!,
    powerUp: 'NONE',
    player: game.moves[playerIndex].playerId!,
    winner:
      game.result!.winnerIndex !== undefined &&
      game.result!.winnerIndex === playerIndex,
  };
};

const getWinner = (winnerIndex: number) => {
  switch (winnerIndex) {
    case 0:
      return 'player1';
    case 1:
      return 'player2';
    default:
      throw new Error('Unknown winner');
  }
};

export const mapMatchupGameToGameStatsEntry = (
  matchup: TeamMatchup,
  game: Game,
  theme: string
): GameStatsEntry | undefined => {
  if (!game.result) {
    return; // TODO: should throw error
  }

  return {
    date: new Date().toISOString(),
    matchupId: matchup.id,
    theme,
    player1: mapMatchupPlayerToPlayerStatsEntry(0, matchup, game),
    player2: mapMatchupPlayerToPlayerStatsEntry(1, matchup, game),
    result: {
      draw: game.result.draw ? true : false,
      winner:
        game.result.winnerIndex !== undefined
          ? getWinner(game.result.winnerIndex)
          : undefined,
    },
  };
};

const mapMatchupPlayerViewToPlayerStatsEntry = (
  playerIndex: number,
  team: TeamSpectatorView,
  game: GameSpectatorView
): PlayerStatsEntry => {
  return {
    team: team.name,
    move: game.result!.moves[playerIndex].moveId,
    powerUp: game.result!.moves[playerIndex].powerUpId,
    player: game.moves[playerIndex].playerName!,
    trophy: game.trophyWon,
    winner:
      game.result!.winnerIndex !== undefined &&
      game.result!.winnerIndex === playerIndex,
  };
};

export const mapMatchupViewToGameStatsEntry = (
  matchupView: MatchupSpectatorView
): GameStatsEntry | undefined => {
  if (!matchupView.gameInProgress) {
    return;
  }

  return {
    date: new Date().toISOString(),
    matchupId: matchupView.id,
    theme: matchupView.themeId,
    mode: matchupView.gameInProgress.playMode,
    player1: mapMatchupPlayerViewToPlayerStatsEntry(
      0,
      matchupView.teams[0],
      matchupView.gameInProgress
    ),
    player2: mapMatchupPlayerViewToPlayerStatsEntry(
      1,
      matchupView.teams[1],
      matchupView.gameInProgress
    ),
    result: {
      draw: matchupView.gameInProgress!.result!.draw ? true : false,
      winner:
        matchupView.gameInProgress!.result!.winnerIndex !== undefined
          ? getWinner(matchupView.gameInProgress!.result!.winnerIndex)
          : undefined,
    },
    attributes: matchupView.gameInProgress.attributes,
  };
};
