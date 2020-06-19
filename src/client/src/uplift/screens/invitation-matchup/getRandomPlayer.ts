import { Player } from '../../contexts/PlayersProvider';
import { GameHistoryRecord } from '../../types';
import {
  selectRandomOneOf,
  WeightedItem,
  selectWeightedRandomOneOf,
} from '../../utils/random';
import { getPlayerAttributeValue } from '../../utils/player';

export const getRandomPlayer = (
  allPlayers: Player[],
  gameHistory: GameHistoryRecord[],
  excludePlayers: Player[] = []
): Player => {
  console.log('EXCLUDED PLAYERS', excludePlayers);
  const allRecentPlayerNames = gameHistory.reduce(
    (accumulator: string[], record) => {
      return [...accumulator, record.player1, record.player2];
    },
    []
  );
  const uniqueRecentPlayers = Array.from(new Set(allRecentPlayerNames));

  console.log('recent players', uniqueRecentPlayers);
  const eligiblePlayers = allPlayers
    .filter(p => !p.tags.includes('retired'))
    .filter(p => !excludePlayers.find(ep => ep.id === p.id));

  if (!eligiblePlayers.length) {
    alert('out of players, reload the page to start again!');
    return allPlayers[0];
  }

  const priorityPlayer = eligiblePlayers.find(p =>
    p.tags.includes('priority_player')
  );
  if (priorityPlayer) {
    return priorityPlayer;
  }

  const weightedPlayers = eligiblePlayers.map(player => {
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
  console.log('player weightings', weightedPlayers);

  const adjustedWeightingForSnakesAndLaddersPosition = weightedPlayers.map(
    weightedPlayer => {
      const currentBoardPosition = parseInt(
        getPlayerAttributeValue(weightedPlayer.item.tags, 'sl_cell', '0')
      );

      const newWeight =
        currentBoardPosition === 0 ? 100 : weightedPlayer.weight;

      return {
        item: weightedPlayer.item,
        weight: newWeight,
      };
    }
  );

  console.log(
    'adjusted weightings',
    adjustedWeightingForSnakesAndLaddersPosition
  );

  return selectWeightedRandomOneOf(
    adjustedWeightingForSnakesAndLaddersPosition
  );
};
