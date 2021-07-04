export const STATS_ENABLED = process.env.STATS_ENABLED || false;
export const STATS_AWS_SOURCE_BUCKET_NAME =
  process.env.STATS_AWS_SOURCE_BUCKET_NAME || '';
export const STATS_AWS_RESULT_BUCKET_NAME =
  process.env.STATS_AWS_RESULT_BUCKET_NAME || '';
export const STATS_AWS_ATHENA_DB_NAME =
  process.env.STATS_AWS_ATHENA_DB_NAME || '';
export const STATS_AWS_ACCESS_KEY_ID =
  process.env.STATS_AWS_ACCESS_KEY_ID || '';
export const STATS_AWS_SECRET_ACCESS_KEY =
  process.env.STATS_AWS_SECRET_ACCESS_KEY || '';

export const DYNAMO_DB_COUNTERS_TABLE_NAME =
  process.env.DYNAMO_DB_COUNTERS_TABLE_NAME || '';
export const DYNAMO_DB_MATCHUPS_TABLE_NAME =
  process.env.DYNAMO_DB_MATCHUPS_TABLE_NAME || '';
export const DYNAMO_DB_PLAYERS_TABLE_NAME =
  process.env.DYNAMO_DB_PLAYERS_TABLE_NAME || '';

  export const MOB_STATS_AWS_SOURCE_BUCKET_NAME =
  process.env.MOB_STATS_AWS_SOURCE_BUCKET_NAME || '';
