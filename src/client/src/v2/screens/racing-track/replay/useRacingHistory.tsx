import { useEffect, useReducer } from 'react';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { RacerHistoryRecord, RacerHistoryRecordsByDay } from '../types';

export type RacingDataFileLoading = {
  key: string;
  records?: RacerHistoryRecord[];
};

export type RacingDataFileLoaded = {
  key: string;
  title: string;
  records: RacerHistoryRecord[];
};

function formatRacingDataFileTitle(key: string): string {
  const parts = key.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export type RacingHistoryState = {
  isLoading: boolean;
  flatHistory: RacerHistoryRecord[];
  loadingHistoryFiles: RacingDataFileLoading[];
  loadedHistoryFiles: RacingDataFileLoaded[];
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
  state: RacingHistoryState,
  action: StartedFetch | LoadedFile | LoadedKeys | FailedFetch
): RacingHistoryState => {
  switch (action.type) {
    case 'start': {
      return {
        isLoading: true,
        flatHistory: [],
        loadingHistoryFiles: [],
        loadedHistoryFiles: [],
      };
    }
    case 'failed': {
      return {
        isLoading: false,
        flatHistory: [],
        loadingHistoryFiles: [],
        loadedHistoryFiles: [],
      };
    }
    case 'fetched_keys': {
      return {
        ...state,
        loadingHistoryFiles: action.keys.map<RacingDataFileLoading>(k => ({
          key: k,
        })),
      };
    }
    case 'fetched_file': {
      const updatedHistoryFiles = state.loadingHistoryFiles.map<
        RacingDataFileLoading
      >(h => (h.key === action.key ? { ...h, records: action.file } : h));

      const allRecordsLoaded = updatedHistoryFiles.every(h => !!h.records);

      const newState = {
        ...state,
        loadingHistoryFiles: updatedHistoryFiles,
        isLoading: !allRecordsLoaded,
        loadedHistoryFiles: allRecordsLoaded
          ? updatedHistoryFiles.map<RacingDataFileLoaded>(hf => ({
              key: hf.key,
              title: formatRacingDataFileTitle(hf.key),
              records: hf.records!,
            }))
          : [],
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

export const useRacingHistory = ({
  gameId,
}: {
  gameId: string;
}): RacingHistoryState => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    flatHistory: [],
    loadingHistoryFiles: [],
    loadedHistoryFiles: [],
  });

  useEffect(() => {
    console.log(
      'Fetching from',
      `${SOCKETS_ENDPOINT}/racing-history/summary/${gameId}`
    );

    dispatch({ type: 'start' });
    fetch(`${SOCKETS_ENDPOINT}/racing-history/summary/${gameId}`, {
      cache: 'no-store',
    })
      .then(data => data.json())
      .then((keys: string[]) => {
        console.log('GOT RACING HISTORY KEYS', keys);
        dispatch({ type: 'fetched_keys', keys });

        keys.forEach(key => {
          fetch(
            `${SOCKETS_ENDPOINT}/racing-history/game/${gameId}/file/${key}`,
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
