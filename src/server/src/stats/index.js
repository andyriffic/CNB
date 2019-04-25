// @flow
import AWS from 'aws-sdk';
import uuid from 'uuid';
import { Game } from '../types/GameType';
import { Player } from '../types/PlayerType';
import { GameStats, PlayerStats } from './GameStatsType';
import {
  STATS_ENABLED,
  STATS_AWS_ACCESS_KEY_ID,
  STATS_AWS_SECRET_ACCESS_KEY,
  STATS_AWS_BUCKET_NAME,
} from '../environment';

const s3 = new AWS.S3({
  accessKeyId: STATS_AWS_ACCESS_KEY_ID, // 'AKIA3FBK3EE6SR37OIQF',
  secretAccessKey: STATS_AWS_SECRET_ACCESS_KEY, // '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',
  apiVersion: '2006-03-01',
});

const mapPlayerToStats = (player: Player, winner: boolean): PlayerStats => {
  return {
    team: player.name,
    move: player.move,
    powerUp: player.powerUp,
    player: player.avatar.name,
    winner,
  };
};

export const mapGameStateToStats = (game: Game, theme: string): GameStats => {

  return {
    date: new Date().toISOString(),
    player1: mapPlayerToStats(game.player1, game.result.winner === 'player1'),
    player2: mapPlayerToStats(game.player2, game.result.winner === 'player2'),
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
  const params = {
    Body: JSON.stringify(statsEntry),
    Bucket: STATS_AWS_BUCKET_NAME,
    Key: `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}-${uuid.v4()}.json`,
  };

  console.log('ABOUT TO PUT STATS', s3, params);

  s3.putObject(params, (err, data) => {
    if (err) {
      console.log('ERROR ADDING STATS', err, err.stack);
      return;
    }

    console.log('STATS ADDED', data);
  });
};
