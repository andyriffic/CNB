import { useEffect, useReducer } from 'react';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { RacerHistoryRecord, RacerHistoryRecordsByDay } from '../types';
import { mockFlatHistory, mockHistory } from './mockHistory';

type UseRacingHistory = {
  dailyHistory: RacerHistoryRecordsByDay[];
  flatHistory: RacerHistoryRecord[];
};

type State = {
  isLoading: boolean;
  flatHistory: RacerHistoryRecord[];
};

type StartedFetch = { type: 'start' };
type FailedFetch = { type: 'failed' };
type LoadedHistory = { type: 'fetched'; history: RacerHistoryRecord[] };

const reducer = (
  state: State,
  action: StartedFetch | LoadedHistory | FailedFetch
): State => {
  switch (action.type) {
    case 'start': {
      return { isLoading: true, flatHistory: [] };
    }
    case 'failed': {
      return { isLoading: false, flatHistory: [] };
    }
    case 'fetched': {
      return { isLoading: false, flatHistory: action.history };
    }
    default: {
      return state;
    }
  }
};

export const useRacingHistory = (): State => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    flatHistory: [],
  });

  useEffect(() => {
    console.log('Fetching from', `${SOCKETS_ENDPOINT}/racing-history`);

    dispatch({ type: 'start' });
    fetch(`${SOCKETS_ENDPOINT}/racing-history`, {
      cache: 'no-store',
    })
      .then(data => data.json())
      .then((history: RacerHistoryRecord[]) => {
        dispatch({ type: 'fetched', history });
      })
      .catch(() => {
        dispatch({ type: 'failed' });
      });
  }, []);

  return state;
};
