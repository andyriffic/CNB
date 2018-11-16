export const COUNTER_API_BASE_URL =
    process.env.REACT_APP_COUNTER_API_BASE_URL
    || 'https://counterapi.tangarineturkey.com/api/counter/group/2d45227e-b6a0-46cf-b155-d95ef57ebf5e';

export const IS_PRODUCTION =
    (process.env.REACT_APP_PRODUCTION === 'true') || false;
