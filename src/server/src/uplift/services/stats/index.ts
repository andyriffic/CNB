import { GameStatsEntry } from './types';
import shortid from 'shortid';
import {
  MOB_STATS_AWS_SOURCE_BUCKET_NAME,
  STATS_AWS_SOURCE_BUCKET_NAME,
  STATS_ENABLED,
} from '../../../environment';
import { statsS3Bucket } from '../../../stats/s3';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';
import moment from 'moment';
import { MobStatsRecord } from './mobMappers';

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

export const StatsService = {
  saveGameStatsEntry,
  saveMobGameStatsEntry,
};
