export const IS_PRODUCTION =
  process.env.REACT_APP_PRODUCTION === 'true' || false;

export const STATS_API_BASE_URL =
  process.env.REACT_APP_STATS_API_BASE_URL ||
  'https://s3-ap-southeast-2.amazonaws.com/cnb-stats-dev-results';

export const SOCKETS_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || '';
