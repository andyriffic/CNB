import { GameStatsEntry } from './types';
import shortid from 'shortid';
import {
  STATS_AWS_SOURCE_BUCKET_NAME,
  STATS_ENABLED,
} from '../../../environment';
import { statsS3Bucket } from '../../../stats/s3';
import { createLogger, LOG_NAMESPACE } from '../../../utils/debug';

const log = createLogger('statsService', LOG_NAMESPACE.stats);

const saveGameStatsEntry = (gameStatsEntry: GameStatsEntry) => {
  if (!STATS_ENABLED) {
    log('STATS DISABLED', gameStatsEntry);
    return;
  }

  const today = new Date();
  const filename = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}-${shortid.generate()}.json`;

  log('--- Saving stats record ---');
  log('filename', filename);
  log('bucket', STATS_AWS_SOURCE_BUCKET_NAME);
  log('entry', gameStatsEntry);

  statsS3Bucket.saveStats(
    STATS_AWS_SOURCE_BUCKET_NAME,
    filename,
    gameStatsEntry
  );
};

export const StatsService = {
  saveGameStatsEntry,
};
