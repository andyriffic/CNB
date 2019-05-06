// @flow
import uuid from 'uuid';
import { Game } from '../types/GameType';
import { Player } from '../types/PlayerType';
import { GameStats, PlayerStats } from './GameStatsType';
import { statsS3Bucket } from './s3';
import { STATS_ENABLED, STATS_AWS_SOURCE_BUCKET_NAME } from '../environment';

const mapPlayerToStats = (
  player: Player,
  winner: boolean,
  points: number,
  powerUpAwarded: string,
  trophy: boolean
): PlayerStats => {
  return {
    team: player.name,
    move: player.move,
    powerUpUsed: player.powerUp,
    player: player.avatar.name,
    winner,
    points,
    powerUpAwarded,
    trophy,
  };
};

export const mapGameStateToStats = (
  game: Game,
  theme: string,
  pointsAwarded,
  powerUpsAwarded,
  trophyAwarded: string
): GameStats => {
  return {
    date: new Date().toISOString(),
    player1: mapPlayerToStats(
      game.player1,
      game.result.winner === 'player1',
      pointsAwarded.player1,
      powerUpsAwarded.player1,
      trophyAwarded === 'player1'
    ),
    player2: mapPlayerToStats(
      game.player2,
      game.result.winner === 'player2',
      pointsAwarded.player2,
      powerUpsAwarded.player2,
      trophyAwarded === 'player2'
    ),
    theme,
    result: {
      draw: game.result.draw,
      winner: game.result.winner,
    },
  };
};

export const addStatsEntry = statsEntry => {
  if (!STATS_ENABLED) {
    console.log('STATS DISABLED', statsEntry);
    return;
  }

  const today = new Date();
  const filename = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}-${uuid.v4()}.json`;

  statsS3Bucket.saveStats(STATS_AWS_SOURCE_BUCKET_NAME, filename, statsEntry);
};
