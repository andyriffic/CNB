import { useEffect, useReducer } from 'react';
import { STATS_API_BASE_URL } from '../../environment';

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

export function getMostPlayersEliminated(
  round: 1 | 2 | 3,
  stats: MainPlayerHistoryStats[]
): MainPlayerHistoryStats[] {
  const allRoundPlayers = stats
    .filter(stat => stat.bestRounds.find(br => br.roundNumber === round))
    .map(stat => ({
      ...stat,
      bestRounds: stat.bestRounds.filter(br => br.roundNumber === round),
    }));

  const maxPlayersEliminated = allRoundPlayers.reduce((max, stat) => {
    const playersEliminated = stat.bestRounds[0].playersEliminated;
    return playersEliminated > max ? playersEliminated : max;
  }, 0);

  return allRoundPlayers.filter(
    stat => stat.bestRounds[0].playersEliminated === maxPlayersEliminated
  );
}
