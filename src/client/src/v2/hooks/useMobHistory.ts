import { useState, useEffect, useReducer } from 'react';
import { STATS_API_BASE_URL } from '../../environment';
import { useFetchJson } from '../../uplift/hooks/useFetchJson';

type RawMainPlayerJson = {
  player_id: string;
  max_round_number: string;
  players_eliminated: string;
};

type MainPlayerHistoryStats = {
  playerId: string;
  bestRounds: { roundNumber: number; playersEliminated: number }[];
};

type MobHistoryStats = {
  mainPlayer: MainPlayerHistoryStats[];
};

type State = {
  loading: boolean;
  stats?: MobHistoryStats;
};

type Action = { type: 'SET_STATS'; value: MobHistoryStats };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATS':
      return {
        ...state,
        loading: false,
        stats: action.value,
      };
    default:
      return state;
  }
}

export function useMobStats(): State {
  const [state, dispatch] = useReducer(reducer, { loading: true });

  useEffect(() => {
    fetch(`${STATS_API_BASE_URL}/mob-main-player-summary.json`, {
      cache: 'no-store',
    }).then(resp => {
      resp.json().then((data: RawMainPlayerJson[]) => {
        const allPlayerIds = data.map(raw => raw.player_id);
        const uniquePlayerIds = Array.from(new Set(allPlayerIds));

        const mappedData: MobHistoryStats = {
          mainPlayer: uniquePlayerIds.map(playerId => ({
            playerId: playerId,
            bestRounds: data
              .filter(raw => raw.player_id === playerId)
              .map(raw => ({
                roundNumber: parseInt(raw.max_round_number),
                playersEliminated: parseInt(raw.players_eliminated),
              })),
          })),
        };
        dispatch({ type: 'SET_STATS', value: mappedData });
      });
    });
  }, []);

  return state;
}
