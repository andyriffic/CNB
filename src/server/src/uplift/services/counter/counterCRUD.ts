import { Counter } from './types';

const createCounter = (id: string): Counter => {
  return {
    id,
    value: 0,
  };
};

const resetCounter = (counter: Counter): Counter => {
  return {
    ...counter,
    value: 0,
  };
};

const incrementCounter = (counter: Counter, by: number = 1): Counter => {
  return {
    ...counter,
    value: counter.value + by,
  };
};

const decrementCounter = (counter: Counter, by: number = 1): Counter => {
  return {
    ...counter,
    value: counter.value - by,
  };
};

export default {
  createCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
};
