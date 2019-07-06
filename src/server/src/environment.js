export const STATS_ENABLED = process.env.STATS_ENABLED || false;
export const STATS_AWS_SOURCE_BUCKET_NAME = process.env.STATS_AWS_SOURCE_BUCKET_NAME || '';
export const STATS_AWS_RESULT_BUCKET_NAME = process.env.STATS_AWS_RESULT_BUCKET_NAME || '';
export const STATS_AWS_ATHENA_DB_NAME = process.env.STATS_AWS_ATHENA_DB_NAME || '';
export const STATS_AWS_ACCESS_KEY_ID = process.env.STATS_AWS_ACCESS_KEY_ID || '';
export const STATS_AWS_SECRET_ACCESS_KEY = process.env.STATS_AWS_SECRET_ACCESS_KEY || '';
export const COUNTER_API_BASE_URL =
  process.env.COUNTER_API_BASE_URL ||
  'https://counterapi.tangarineturkey.com/api/counter/group/2d45227e-b6a0-46cf-b155-d95ef57ebf5e';

