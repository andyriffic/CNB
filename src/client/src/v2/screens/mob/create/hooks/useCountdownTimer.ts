import { useEffect, useReducer, useState } from 'react';

type TimerStatus = 'stopped' | 'running' | 'complete';

type UseCountdownTimer = {
  secondsRemaining: number;
  status: TimerStatus;
  start: () => void;
  stop: () => void;
};

type State = {
  secondsRemaining: number;
  timer: TimerStatus;
};

function reducer(state: State, action: 'tick' | 'start' | 'stop'): State {
  switch (action) {
    case 'tick': {
      const secondsRemaining = Math.max(state.secondsRemaining - 1, 0);
      return {
        ...state,
        timer: secondsRemaining === 0 ? 'complete' : state.timer,
        secondsRemaining,
      };
    }
    case 'start': {
      return {
        ...state,
        timer: 'running',
      };
    }
    case 'stop': {
      return {
        ...state,
        timer: 'stopped',
      };
    }
    default:
      return state;
  }
}

export const useCountdownTimer = (
  startingSeconds: number
): UseCountdownTimer => {
  const [state, dispatch] = useReducer(reducer, {
    secondsRemaining: startingSeconds,
    timer: 'stopped',
  });

  useEffect(() => {
    if (state.timer === 'running') {
      const interval = setInterval(() => {
        dispatch('tick');
        console.log('tick');
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.timer, dispatch]);

  return {
    secondsRemaining: state.secondsRemaining,
    status: state.timer,
    start: () => dispatch('start'),
    stop: () => dispatch('stop'),
  };
};
