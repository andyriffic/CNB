import { useState, useEffect, useReducer } from 'react';
import { STATS_API_BASE_URL } from '../../environment';
import { useFetchJson } from '../../uplift/hooks/useFetchJson';

type RawMainPlayerJson = {
  playerid: string;
  min_round_number: string;
  min_round_players_eliminated: string;
  most_players_eliminated: string;
};

type MainPlayerHistoryStats = {
  playerId: string;
  mostPlayersEliminated: number;
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
        const mappedData: MobHistoryStats = {
          mainPlayer: data.map(raw => ({
            playerId: raw.playerid,
            mostPlayersEliminated: parseInt(raw.most_players_eliminated),
          })),
        };
        dispatch({ type: 'SET_STATS', value: mappedData });
      });
    });
  }, []);

  return state;
}
