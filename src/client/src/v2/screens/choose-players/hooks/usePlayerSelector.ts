import { useEffect, useRef, useState } from 'react';
import { STATS_API_BASE_URL } from '../../../../environment';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { useFetchJson } from '../../../../uplift/hooks/useFetchJson';
import { GameHistory } from '../../../../uplift/types';
import {
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../../../uplift/utils/random';

export type UsePlayerSelector = {
  hasLoaded: boolean;
  getNextPlayer: () => Player | undefined;
};

export const usePlayerSelector = () => {
  const { allPlayers } = usePlayersProvider();

  const [loadingGameHistory, gameHistory] = useFetchJson<GameHistory>(
    `${STATS_API_BASE_URL}/game-result-history.json`
  );

  const hasLoaded = useRef(false);
  const orderedPlayers = useRef<Player[]>([]);
  const weightedPlayers = useRef<WeightedItem<Player>[]>([]);

  useEffect(() => {
    if (allPlayers.length && gameHistory && !hasLoaded.current) {
      hasLoaded.current = true;

      const allRecentPlayerNames = gameHistory.result.reduce(
        (accumulator: string[], record) => {
          return [...accumulator, record.player1, record.player2];
        },
        []
      );
      const uniqueRecentPlayers = Array.from(new Set(allRecentPlayerNames));

      const eligiblePlayers = allPlayers.filter(
        p => !p.tags.includes('retired')
      );

      weightedPlayers.current = eligiblePlayers.map(player => {
        let lastPlayedIndex = uniqueRecentPlayers.findIndex(
          name => name === player.name
        );
        if (lastPlayedIndex === -1) {
          lastPlayedIndex = 30;
        }

        return {
          item: player,
          weight: lastPlayedIndex + 1,
        } as WeightedItem<Player>;
      });
    }
  }, [allPlayers, hasLoaded, loadingGameHistory]);

  const result: UsePlayerSelector = {
    hasLoaded: hasLoaded.current,
    getNextPlayer: () => {
      if (!hasLoaded.current || !weightedPlayers.current.length) {
        return;
      }
      const nextRandomPlayer = selectWeightedRandomOneOf(
        weightedPlayers.current
      );
      weightedPlayers.current = weightedPlayers.current.filter(
        i => i.item.id !== nextRandomPlayer.id
      );

      return nextRandomPlayer;
    },
  };

  return result;
};
