import { TeamMatchup, Game } from '../matchup/types';
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
