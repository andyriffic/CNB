import axios from 'axios';
import { COUNTER_API_BASE_URL } from '../environment';

export const getCounters = processCounters => {
  console.log('Getting counters', COUNTER_API_BASE_URL);
  return axios
    .get(`${COUNTER_API_BASE_URL}`)
    .then(({ data }) => processCounters(data));
};
