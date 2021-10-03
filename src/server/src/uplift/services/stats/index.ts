import { GameStatsEntry } from './types';
import shortid from 'shortid';
import {
  MOB_STATS_AWS_SOURCE_BUCKET_NAME,
  RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME,
  STATS_AWS_SOURCE_BUCKET_NAME,
  STATS_ENABLED,
} from '../../../environment';
import { statsS3Bucket } from '../../../stats/s3';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import moment from 'moment';
import { MobStatsRecord } from './mobMappers';
import { publishAthenaQueryResult } from '../../../stats/publishStats';
import { mobMainPlayerSummaryAthenaQuery } from './mob-main-player-summary-query';

const log = createLogger('statsService', LOG_NAMESPACE.stats);

const saveGameStatsEntry = (gameStatsEntry: GameStatsEntry) => {
  if (!STATS_ENABLED) {
    log('STATS DISABLED', gameStatsEntry);
    return;
  }

  const filename = `${moment().format(
    'YYYY-MM-DD'
  )}-${shortid.generate()}.json`;

  log('--- Saving stats record ---');
  // log('filename', filename);
  // log('bucket', STATS_AWS_SOURCE_BUCKET_NAME);
  // log('entry', gameStatsEntry);

  statsS3Bucket.saveStats(
    STATS_AWS_SOURCE_BUCKET_NAME,
    filename,
    gameStatsEntry
  );
};

const saveMobGameStatsEntry = (stats: MobStatsRecord): void => {
  if (!STATS_ENABLED) {
    log('STATS DISABLED', stats);
    return;
  }

  const filename = `${moment().format(
    'YYYY-MM-DD'
  )}-${shortid.generate()}.json`;

  log('--- Saving mob stats record ---');
  log('filename', filename);
  log('bucket', MOB_STATS_AWS_SOURCE_BUCKET_NAME);
  log('entry', stats);

  statsS3Bucket.saveStats(MOB_STATS_AWS_SOURCE_BUCKET_NAME, filename, stats);
};

const publishMobSummaryStats = () => {
  publishAthenaQueryResult(
    mobMainPlayerSummaryAthenaQuery,
    'mob-main-player-summary.json'
  );
};

const saveRacingHistory = (gameId: string, history: any) => {
  if (!STATS_ENABLED) {
    log('STATS DISABLED');
    return;
  }

  if (!RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME) {
    console.log('NO Racing Bucket to save stats to');
    return;
  }

  const filename = `${gameId}/${moment().format(
    'YYYY-MM-DD-hh-mm-ss-SSS'
  )}.json`;

  log('--- Saving racing history records ---');
  log('filename', filename);
  log('bucket', RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME);

  statsS3Bucket.saveStats(
    RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME,
    filename,
    history
  );
};

const getRacingHistorySummary = (gameId: string): Promise<any> => {
  return statsS3Bucket.getRacingStatSummary(
    gameId,
    RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME
  );
};

const getRacingHistoryFile = (gameId: string, key: string): Promise<any> => {
  return statsS3Bucket.getRacingStatsFile(
    gameId,
    key,
    RACING_HISTORY_STATS_AWS_SOURCE_BUCKET_NAME
  );
};

export const StatsService = {
  saveGameStatsEntry,
  saveMobGameStatsEntry,
  publishMobSummaryStats,
  saveRacingHistory,
  getRacingHistorySummary,
  getRacingHistoryFile,
};
