import { Player } from '../../contexts/PlayersProvider';
import { GameHistoryRecord } from '../../types';
import {
  selectRandomOneOf,
  WeightedItem,
  selectWeightedRandomOneOf,
} from '../../utils/random';

export const getRandomPlayer = (
  allPlayers: Player[],
  gameHistory: GameHistoryRecord[]
): Player => {
  const allRecentPlayerNames = gameHistory.reduce(
    (accumulator: string[], record) => {
      return [...accumulator, record.player1, record.player2];
    },
    []
  );
  const uniqueRecentPlayers = Array.from(new Set(allRecentPlayerNames));

  console.log('recent players', uniqueRecentPlayers);
  const eligiblePlayers = allPlayers.filter(p => !p.tags.includes('retired'));

  const weightedPlayers = eligiblePlayers.map(player => {
    let lastPlayedIndex = uniqueRecentPlayers.findIndex(
      name => name === player.name
    );
    if (lastPlayedIndex === -1) {
      lastPlayedIndex = uniqueRecentPlayers.length;
    }

    return {
      item: player,
      weight: lastPlayedIndex + 1,
    } as WeightedItem<Player>;
  });
  console.log('player weightings', weightedPlayers);

  return selectWeightedRandomOneOf(weightedPlayers);
};
