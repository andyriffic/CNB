import { Counter } from './types';

const createCounter = (id: string, initialValue: number = 0): Counter => {
  return {
    id,
    value: initialValue,
  };
};

const resetCounter = (counter: Counter, to: number = 0): Counter => {
  return {
    ...counter,
    value: to,
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

export const counterService = {
  createCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
};
