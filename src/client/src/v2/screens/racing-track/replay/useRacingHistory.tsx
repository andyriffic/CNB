import { useEffect, useReducer } from 'react';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { RacerHistoryRecord, RacerHistoryRecordsByDay } from '../types';
import { mockFlatHistory, mockHistory } from './mockHistory';

type RacingDataFile = {
  key: string;
  records?: RacerHistoryRecord[];
};

type State = {
  isLoading: boolean;
  flatHistory: RacerHistoryRecord[];
  historyFiles: RacingDataFile[];
};

type StartedFetch = { type: 'start' };
type FailedFetch = { type: 'failed' };
type LoadedKeys = { type: 'fetched_keys'; keys: string[] };
type LoadedFile = {
  type: 'fetched_file';
  key: string;
  file: RacerHistoryRecord[];
};

const reducer = (
  state: State,
  action: StartedFetch | LoadedFile | LoadedKeys | FailedFetch
): State => {
  switch (action.type) {
    case 'start': {
      return { isLoading: true, flatHistory: [], historyFiles: [] };
    }
    case 'failed': {
      return { isLoading: false, flatHistory: [], historyFiles: [] };
    }
    case 'fetched_keys': {
      return {
        ...state,
        historyFiles: action.keys.map<RacingDataFile>(k => ({ key: k })),
      };
    }
    case 'fetched_file': {
      const updatedHistoryFiles = state.historyFiles.map<RacingDataFile>(h =>
        h.key === action.key ? { ...h, records: action.file } : h
      );
      const allRecordsLoaded = updatedHistoryFiles.every(h => !!h.records);
      const newState = {
        ...state,
        historyFiles: updatedHistoryFiles,
        isLoading: !allRecordsLoaded,
        flatHistory: allRecordsLoaded
          ? updatedHistoryFiles.map(h => h.records!).flat()
          : [],
      };
      console.log('NEW STATE', newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};

const RACING_GAME_ID = 'game1';

export const useRacingHistory = (): State => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    flatHistory: [],
    historyFiles: [],
  });

  useEffect(() => {
    console.log(
      'Fetching from',
      `${SOCKETS_ENDPOINT}/racing-history/summary/${RACING_GAME_ID}`
    );

    dispatch({ type: 'start' });
    fetch(`${SOCKETS_ENDPOINT}/racing-history/summary/${RACING_GAME_ID}`, {
      cache: 'no-store',
    })
      .then(data => data.json())
      .then((keys: string[]) => {
        console.log('GOT RACING HISTORY KEYS', keys);
        dispatch({ type: 'fetched_keys', keys });

        keys.forEach(key => {
          fetch(
            `${SOCKETS_ENDPOINT}/racing-history/game/${RACING_GAME_ID}/file/${key}`,
            {
              cache: 'no-store',
            }
          )
            .then(data => data.json())
            .then((file: RacerHistoryRecord[]) => {
              dispatch({ type: 'fetched_file', key, file });
            });
        });

        // dispatch({ type: 'fetched', history });
      })
      .catch(() => {
        dispatch({ type: 'failed' });
      });
  }, []);

  return state;
};
